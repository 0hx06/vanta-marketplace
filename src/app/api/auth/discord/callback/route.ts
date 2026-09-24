import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type DiscordUser = { id: string; username: string; global_name?: string | null; avatar?: string | null; email?: string };

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const savedState = cookieStore.get("discord_oauth_state")?.value;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl || !code || !state || !savedState || state !== savedState) {
    return NextResponse.redirect(new URL("/login?error=La+connexion+Discord+a+expire.+Reessaie.", url));
  }

  const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID ?? "",
      client_secret: process.env.DISCORD_CLIENT_SECRET ?? "",
      grant_type: "authorization_code",
      code,
      redirect_uri: `${siteUrl}/api/auth/discord/callback`,
    }),
  });
  if (!tokenResponse.ok) {
    return NextResponse.redirect(new URL("/login?error=Discord+n%27a+pas+valide+la+connexion.", url));
  }

  const token = await tokenResponse.json() as { access_token?: string };
  if (!token.access_token) {
    return NextResponse.redirect(new URL("/login?error=Jeton+Discord+invalide.", url));
  }
  const userResponse = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });
  if (!userResponse.ok) {
    return NextResponse.redirect(new URL("/login?error=Impossible+de+recuperer+ton+profil+Discord.", url));
  }

  const user = await userResponse.json() as DiscordUser;
  const response = NextResponse.redirect(new URL("/dashboard", url));
  response.cookies.set("vanta_discord_user", JSON.stringify({
    id: user.id,
    username: user.global_name || user.username,
    avatar: user.avatar ?? null,
    email: user.email ?? null,
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  response.cookies.delete("discord_oauth_state");
  return response;
}
