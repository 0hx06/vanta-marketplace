import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { sellers } from "@/lib/marketplace-data";

export default function SellersPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Sellers</p>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">Verified sellers</h1>
          </div>
          <Link href="/become-a-seller" className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500">
            Become a seller
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sellers.map((seller) => (
            <div key={seller.id} className="group rounded-[28px] border border-white/10 bg-zinc-950/70 p-5 transition hover:border-violet-500/60 hover:bg-zinc-900/80">
              <Link href={`/seller/${seller.id}`} className="block">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-red-500 text-lg font-bold text-white">
                    {seller.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-white">{seller.name}</h2>
                      {seller.verified && <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-emerald-300">Verified</span>}
                    </div>
                    <p className="text-sm text-zinc-300">{seller.specialties.join(" • ")}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-zinc-300">{seller.tagline}</p>
              </Link>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-zinc-300">
                <span>{seller.sales} ventes</span>
                <span>{seller.rating.toFixed(1)}★</span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <a href={seller.discordUrl} target="_blank" rel="noreferrer" className="text-sm text-violet-300 hover:text-violet-200">
                  Discord: {seller.discord}
                </a>
                <Link href={`/support?seller=${seller.id}`} className="rounded-full bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-200">
                  Ticket
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
