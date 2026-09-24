import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAuthenticatedUserId, verifySignedValue } from "@/lib/auth";
import { createDiscordLink } from "@/lib/discord";

export const runtime = "nodejs";

const STATE_COOKIE = "vanta_discord_oauth_state";

function resultUrl(request: Request, result: string) {
  const url = new URL("/dashboard/profile", request.url);
  url.searchParams.set("discord", result);
  return url;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!process.env.VANTA_SESSION_SECRET) {
    return NextResponse.redirect(resultUrl(request, "not_configured"));
  }
  const [cookieStore, userId] = await Promise.all([cookies(), getAuthenticatedUserId()]);
  const currentState = cookieStore.get(STATE_COOKIE)?.value;
  const stateUserId = state ? verifySignedValue(state, 600) : null;

  if (!code || !state || !currentState || currentState !== state || !userId || stateUserId !== userId) {
    return NextResponse.redirect(resultUrl(request, "invalid_state"));
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.redirect(resultUrl(request, "not_configured"));
  }

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
      cache: "no-store",
    });
    if (!tokenResponse.ok) {
      return NextResponse.redirect(resultUrl(request, "token_exchange_failed"));
    }

    const token = (await tokenResponse.json()) as { access_token?: unknown; token_type?: unknown };
    if (typeof token.access_token !== "string" || token.token_type !== "Bearer") {
      return NextResponse.redirect(resultUrl(request, "invalid_token"));
    }

    const identityResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${token.access_token}` },
      cache: "no-store",
    });
    if (!identityResponse.ok) {
      return NextResponse.redirect(resultUrl(request, "identity_validation_failed"));
    }
    const identity = (await identityResponse.json()) as {
      id?: unknown;
      username?: unknown;
      global_name?: unknown;
    };
    if (
      typeof identity.id !== "string" ||
      !/^\d{17,20}$/.test(identity.id) ||
      typeof identity.username !== "string" ||
      identity.username.length === 0 ||
      (identity.global_name !== null && identity.global_name !== undefined && typeof identity.global_name !== "string")
    ) {
      return NextResponse.redirect(resultUrl(request, "invalid_identity"));
    }

    await createDiscordLink(userId, {
      id: identity.id,
      username: identity.username,
      globalName: typeof identity.global_name === "string" ? identity.global_name : null,
    });
    const response = NextResponse.redirect(resultUrl(request, "linked"));
    response.cookies.delete(STATE_COOKIE);
    return response;
  } catch (error) {
    const result = error instanceof Error && error.message === "DISCORD_ACCOUNT_ALREADY_LINKED"
      ? "already_linked"
      : error instanceof Error && error.message === "USER_ALREADY_LINKED"
        ? "user_already_linked"
        : "server_error";
    return NextResponse.redirect(resultUrl(request, result));
  }
}
