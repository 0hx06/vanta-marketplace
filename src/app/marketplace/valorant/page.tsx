import { MarketplaceExplorer } from "@/components/marketplace-explorer";
import { SiteShell } from "@/components/site-shell";
import { getProductsForGame } from "@/lib/marketplace-data";

export default function ValorantMarketplacePage() {
  const products = getProductsForGame("Valorant");

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-[28px] border border-white/10 bg-[#121419] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ff6975]">Valorant</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Comptes Valorant vérifiés</h1>
          <p className="mt-2 max-w-2xl text-zinc-300">
            Découvre des comptes propres, des rangs et des offres publiées par des vendeurs vérifiés. Aucune donnée sensible n'est demandée.
          </p>
        </div>
      </div>
      <MarketplaceExplorer products={products} title="Valorant marketplace" />
    </SiteShell>
  );
}
