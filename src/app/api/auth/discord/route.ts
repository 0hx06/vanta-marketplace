import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { createSignedValue } from "@/lib/auth";

const STATE_COOKIE = "vanta_discord_oauth_state";
const STATE_MAX_AGE = 600;

export const runtime = "nodejs";

export async function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  const secret = process.env.VANTA_SESSION_SECRET;
  if (!clientId || !redirectUri || !secret || secret.length < 32) {
    return NextResponse.json({ error: "Discord authentication is not configured." }, { status: 503 });
  }

  const state = createSignedValue({
    nonce: randomBytes(32).toString("base64url"),
    intent: "login",
    exp: Math.floor(Date.now() / 1000) + STATE_MAX_AGE,
  });
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
