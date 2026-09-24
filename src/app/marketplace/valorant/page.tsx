import { MarketplaceExplorer } from "@/components/marketplace-explorer";
import { SiteShell } from "@/components/site-shell";
import { getProductsForGame } from "@/lib/marketplace-data";

export default function ValorantMarketplacePage() {
  const products = getProductsForGame("Valorant");

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 pb-2 pt-12 sm:px-6 lg:px-8">
        <div className="vanta-border relative overflow-hidden rounded-[30px] bg-[#111318] p-7 md:p-9">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#ff4655]/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                <span className="h-2 w-2 rounded-full bg-[#ff4655]" /> VANTA / Marketplace
              </div>
              <h1 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">Comptes Valorant vérifiés</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
            Découvre des comptes propres, des rangs et des offres publiées par des vendeurs vérifiés. Aucune donnée sensible n'est demandée.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center md:min-w-[300px]">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-3"><div className="text-lg font-bold text-white">130+</div><div className="text-[10px] uppercase tracking-wider text-zinc-500">offres</div></div>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-3"><div className="text-lg font-bold text-white">4.9/5</div><div className="text-[10px] uppercase tracking-wider text-zinc-500">avis</div></div>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-3"><div className="text-lg font-bold text-white">&lt; 5 min</div><div className="text-[10px] uppercase tracking-wider text-zinc-500">livraison</div></div>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceExplorer products={products} title="Marketplace Valorant" />
    </SiteShell>
  );
}
