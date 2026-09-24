import { notFound } from "next/navigation";
import { MarketplaceExplorer } from "@/components/marketplace-explorer";
import { SiteShell } from "@/components/site-shell";
import { getProductsForGame, games } from "@/lib/marketplace-data";

export default async function GameMarketplacePage({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game } = await params;
  const normalizedGame = game.replace(/-/g, " ");
  const isValid = games.some((entry) => entry.toLowerCase() === normalizedGame.toLowerCase());

  if (!isValid) {
    notFound();
  }

  const products = getProductsForGame(normalizedGame);

  return (
    <SiteShell>
      <MarketplaceExplorer products={products} title={`${normalizedGame} marketplace`} />
    </SiteShell>
  );
}
