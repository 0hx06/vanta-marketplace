import { SiteShell } from "@/components/site-shell";

const favorites = ["Valorant Ranked Boost", "Apex Coaching", "Fortnite Vault Bundle", "CS2 Premium Case Pack"];

export default function DashboardFavoritesPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Favorites</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {favorites.map((item) => (
            <div key={item} className="rounded-[24px] border border-white/10 bg-zinc-950/80 p-5 text-white">
              {item}
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
