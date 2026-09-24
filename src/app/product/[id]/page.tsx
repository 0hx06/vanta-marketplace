import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getProductById, reviews } from "@/lib/marketplace-data";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3 text-sm text-zinc-400">
          <Link href="/marketplace">Marketplace</Link>
          <span>/</span>
          <span>{product.game}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="rounded-[30px] border border-white/10 bg-[#18181B] p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-200">{product.badge}</span>
                {product.sellerVerified && <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">Verified seller</span>}
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {product.images.map((color, index) => (
                  <div key={`${product.id}-${index}`} style={{ background: color }} className="h-52 rounded-2xl border border-white/10" />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#18181B] p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-violet-300">{product.category}</p>
            <h1 className="mt-3 text-3xl font-bold text-white">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-zinc-400">
              <span>⭐ {product.sellerRating}</span>
              <span>•</span>
              <span>{product.sales} sales</span>
              <span>•</span>
              <span>{product.stock} in stock</span>
            </div>
            <div className="mt-6 text-4xl font-bold text-white">€{product.price}</div>
            <div className="mt-6 flex gap-3">
              <Link href={`/checkout/${product.id}`} className="flex-1 rounded-full bg-[#ff4655] px-4 py-3 text-center font-semibold text-white hover:bg-[#ff5d69]">Acheter maintenant</Link>
              <button className="rounded-full border border-white/10 bg-zinc-800 px-4 py-3 font-semibold text-white">Add to favorites</button>
            </div>
            <div className="mt-6 space-y-3 text-sm text-zinc-300">
              <div className="flex justify-between border-b border-white/10 pb-2"><span>Seller</span><span>{product.seller}</span></div>
              <div className="flex justify-between border-b border-white/10 pb-2"><span>Game</span><span>{product.game}</span></div>
              <div className="flex justify-between border-b border-white/10 pb-2"><span>Disponibilité</span><span>{product.stock > 0 ? "En stock" : "Rupture"}</span></div>
              <div className="flex justify-between border-b border-white/10 pb-2"><span>Livraison</span><span>Instantanée / vérifiée</span></div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#18181B] p-6">
            <h2 className="text-2xl font-bold text-white">Description</h2>
            <p className="mt-4 text-zinc-300">{product.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-200">#{tag}</span>
              ))}
            </div>
            <ul className="mt-6 space-y-3 text-zinc-300">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3"><span className="inline-block h-2 w-2 rounded-full bg-violet-400" />{feature}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#18181B] p-6">
            <h2 className="text-2xl font-bold text-white">Buyer protection</h2>
            <ul className="mt-6 space-y-4 text-zinc-300">
              <li>Secure payment workflow</li>
              <li>Refund policy review</li>
              <li>Fraud detection and support escalation</li>
              <li>Listing report available</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-[28px] border border-white/10 bg-[#18181B] p-6">
          <h2 className="text-2xl font-bold text-white">Reviews</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between text-sm text-zinc-300">
                  <span>{review.user}</span>
                  <span className="text-amber-400">{'★'.repeat(review.rating)}</span>
                </div>
                <p className="mt-4 text-zinc-300">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
