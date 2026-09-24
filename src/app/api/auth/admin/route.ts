import { cookies } from "next/headers";

export async function GET() {
  const raw = (await cookies()).get("vanta_discord_user")?.value;
  if (!raw) return Response.json({ authenticated: false }, { status: 401 });

  try {
    const profile = JSON.parse(raw) as { username?: string; global_name?: string };
    const configuredAdmin = (process.env.DISCORD_ADMIN_USERNAME || "0xh06").toLowerCase();
    const names = [profile.username, profile.global_name].filter(Boolean).map((name) => name!.toLowerCase());
    const authenticated = names.includes(configuredAdmin);
    return Response.json({ authenticated, username: profile.global_name || profile.username || null }, { status: authenticated ? 200 : 403 });
  } catch {
    return Response.json({ authenticated: false }, { status: 401 });
  }
}
