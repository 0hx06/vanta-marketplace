import { cookies } from "next/headers";
import { SiteShell } from "@/components/site-shell";
import { DashboardOverview } from "@/components/dashboard-overview";

export default async function DashboardPage() {
  const profileCookie = (await cookies()).get("vanta_discord_user")?.value;
  let profile: { username?: string; id?: string; avatar?: string | null } = {};
  if (profileCookie) {
    try { profile = JSON.parse(profileCookie); } catch { profile = {}; }
  }
  const avatarUrl = profile.id && profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=128` : null;

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#ff6975]">Espace personnel</p>
            <div className="mt-3 flex items-center gap-3">
              {avatarUrl && <img src={avatarUrl} alt="" className="h-10 w-10 rounded-full" />}
              <h1 className="text-3xl font-bold text-white">{profile.username ? `Bienvenue, ${profile.username}` : "Ton espace personnel"}</h1>
            </div>
          </div>
          <a href="/become-a-seller" className="rounded-full bg-[#ff4655] px-5 py-3 text-sm font-semibold text-white hover:bg-[#ff5d69]">Devenir vendeur</a>
        </div>
        <DashboardOverview />
      </div>
    </SiteShell>
  );
}
