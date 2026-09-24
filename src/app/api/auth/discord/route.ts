import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "node:crypto";

export async function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!clientId || !siteUrl) {
    redirect("/login?error=La+connexion+Discord+n%27est+pas+encore+configuree.");
  }

  const state = crypto.randomBytes(24).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set("discord_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: `${siteUrl}/api/auth/discord/callback`,
    scope: "identify email",
    state,
  });
  redirect(`https://discord.com/oauth2/authorize?${params.toString()}`);
}
