import Link from "next/link";
import { cookies } from "next/headers";
import { SiteShell } from "@/components/site-shell";

const stats = [
  { label: "Commandes", value: "24", tone: "violet" },
  { label: "Solde", value: "1 420 MAD", tone: "red" },
  { label: "Favoris", value: "38", tone: "emerald" },
  { label: "Tickets ouverts", value: "02", tone: "amber" },
];

const recentOrders = [
  { order: "#VNT-1024", item: "Compte Radiant", status: "Livré", amount: "562 MAD" },
  { order: "#VNT-1027", item: "Compte Ascendant", status: "En cours", amount: "529 MAD" },
  { order: "#VNT-1031", item: "Compte Gold", status: "À vérifier", amount: "313 MAD" },
];

export default async function DashboardPage() {
  const profileCookie = (await cookies()).get("vanta_discord_user")?.value;
  let profile: { username?: string; id?: string; avatar?: string | null } = {};
  if (profileCookie) {
    try {
      profile = JSON.parse(profileCookie);
    } catch {
      profile = {};
    }
  }
  const avatarUrl = profile.id && profile.avatar
    ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=128`
    : null;

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#ff6975]">Espace personnel</p>
            <div className="mt-3 flex items-center gap-3">
              {avatarUrl && <img src={avatarUrl} alt="" className="h-10 w-10 rounded-full" />}
              <h1 className="text-3xl font-bold text-white">{profile.username ? `Bienvenue, ${profile.username}` : "Buyer control center"}</h1>
            </div>
          </div>
          <Link href="/become-a-seller" className="rounded-full bg-[#ff4655] px-5 py-3 text-sm font-semibold text-white hover:bg-[#ff5d69]">Devenir vendeur</Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-5">
              <div className="text-sm text-zinc-400">{stat.label}</div>
              <div className="mt-4 text-3xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Dernières commandes</h2>
              <Link href="/dashboard/orders" className="text-sm text-[#ff6975]">Tout voir</Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((row) => (
                <div key={row.order} className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/80 p-4">
                  <div>
                    <div className="font-medium text-white">{row.item}</div>
                    <div className="text-sm text-zinc-400">{row.order}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-violet-200">{row.status}</div>
                    <div className="text-sm font-semibold text-white">{row.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6">
            <h2 className="text-lg font-semibold text-white">Accès rapides</h2>
            <div className="mt-5 space-y-3 text-sm text-zinc-300">
              <Link href="/dashboard/orders" className="block rounded-2xl border border-white/10 bg-zinc-900 p-3 hover:border-[#ff4655]/60">Mes commandes</Link>
              <Link href="/dashboard/wallet" className="block rounded-2xl border border-white/10 bg-zinc-900 p-3 hover:border-[#ff4655]/60">Mon solde</Link>
              <Link href="/dashboard/favorites" className="block rounded-2xl border border-white/10 bg-zinc-900 p-3 hover:border-[#ff4655]/60">Mes favoris</Link>
              <Link href="/dashboard/notifications" className="block rounded-2xl border border-white/10 bg-zinc-900 p-3 hover:border-[#ff4655]/60">Notifications</Link>
              <Link href="/dashboard/seller" className="block rounded-2xl border border-white/10 bg-zinc-900 p-3 hover:border-[#ff4655]/60">Espace vendeur</Link>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
