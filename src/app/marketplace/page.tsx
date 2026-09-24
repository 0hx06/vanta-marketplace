import { MarketplaceExplorer } from "@/components/marketplace-explorer";
import { SiteShell } from "@/components/site-shell";
import { productCatalog } from "@/lib/marketplace-data";

export default function MarketplacePage() {
  return (
    <SiteShell>
      <MarketplaceExplorer products={productCatalog} title="Marketplace" />
    </SiteShell>
  );
}
