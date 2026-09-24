import { createHmac, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/auth";

export const runtime = "nodejs";

const STATE_COOKIE = "vanta_discord_oauth_state";
const STATE_MAX_AGE = 600;

function configurationError() {
  return NextResponse.json(
    { error: "Discord linking is not configured on this server." },
    { status: 503 },
  );
}

export async function GET() {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  if (
    !clientId ||
    !process.env.DISCORD_CLIENT_SECRET ||
    !redirectUri ||
    !process.env.VANTA_SESSION_SECRET
  ) {
    return configurationError();
  }

  const payload = Buffer.from(
    JSON.stringify({
      nonce: randomBytes(32).toString("base64url"),
      userId,
      exp: Math.floor(Date.now() / 1000) + STATE_MAX_AGE,
    }),
  ).toString("base64url");
  const signature = createHmac("sha256", process.env.VANTA_SESSION_SECRET)
    .update(payload)
    .digest("base64url");
  const state = `${payload}.${signature}`;

  const authorizationUrl = new URL("https://discord.com/oauth2/authorize");
  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("redirect_uri", redirectUri);
  authorizationUrl.searchParams.set("scope", "identify");
  authorizationUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizationUrl);
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    maxAge: STATE_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return response;
}
