import Link from "next/link";
import { faqs, productCatalog, reviews, sellers } from "@/lib/marketplace-data";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#121419] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] md:p-12">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,_rgba(255,70,85,0.18),_transparent_65%)]" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#ff6975]">Marketplace Valorant</p>
              <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">
                Des comptes Valorant clean, vérifiés et prêts à jouer.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-zinc-300">
                Des comptes Valorant vérifiés, affichés clairement et livrés rapidement par des vendeurs suivis.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/marketplace/valorant" className="rounded-full bg-[#ff4655] px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(255,70,85,0.22)] transition hover:bg-[#ff5d69]">
                  Voir les comptes
                </Link>
                <Link href="/become-a-seller" className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
                  Vendre mes comptes
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-8 text-sm text-zinc-300">
                <div><span className="block text-2xl font-bold text-white">3.2k+</span> comptes vendus</div>
                <div><span className="block text-2xl font-bold text-white">99.2%</span> satisfaction</div>
                <div><span className="block text-2xl font-bold text-white">24/7</span> support</div>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-[#0d0e12] p-5 shadow-2xl">
              <div className="rounded-[21px] border border-white/10 bg-[#17191f] p-5 text-white">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                  <span>Compte en vedette</span>
                  <span className="text-emerald-400">Disponible</span>
                </div>
                <div className="mt-10 rounded-[18px] border border-white/10 bg-[#0d0e12] p-4">
                  <div className="mb-2 h-20 rounded-xl bg-[linear-gradient(135deg,_#292d38,_#ff4655)] opacity-80" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 rounded-lg bg-[#242832]" />
                    <div className="h-10 rounded-lg bg-[#242832]" />
                    <div className="h-10 rounded-lg bg-[#242832]" />
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#ff6975]">RADIANT · 145 SKINS</div>
                    <div className="mt-2 text-2xl font-bold">Compte premium</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Prix</div>
                    <div className="mt-2 text-2xl font-bold">€69</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6975]">Le catalogue</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Choisis ton compte</h2>
          </div>
          <Link href="/marketplace/valorant" className="text-sm text-violet-300 hover:text-violet-200">Voir tout</Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {productCatalog.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group rounded-[24px] border border-white/10 bg-[#121419] p-4 transition hover:-translate-y-1 hover:border-[#ff4655]/60">
              <div className="h-28 rounded-[18px] bg-[#1a1d24] p-3">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>{product.subcategory}</span>
                  <span className="text-emerald-400">{product.stock} dispo</span>
                </div>
                <div className="mt-6 h-7 rounded-lg bg-[linear-gradient(90deg,_#2a2e38,_#ff4655)] opacity-80" />
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{product.name.replace("Compte Valorant ", "")}</h3>
                  <p className="mt-1 text-xs text-zinc-500">{product.seller}</p>
                </div>
                <span className="text-lg font-bold text-white">€{product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">Comptes</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Meilleures ventes</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {productCatalog.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="rounded-[28px] border border-white/10 bg-[#0f172a]/80 p-4 transition hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_20px_60px_rgba(124,58,237,0.17)]">
              <div className="mb-4 h-36 rounded-[22px] bg-[linear-gradient(135deg,_rgba(17,24,39,0.9),_rgba(76,29,149,0.82),_rgba(124,58,237,0.22))] p-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-100">
                    {product.badge}
                  </span>
                  {product.sellerVerified && <span className="text-[10px] text-emerald-300">Vérifié</span>}
                </div>
                <div className="mt-8 flex gap-2">
                  {product.images.slice(0, 3).map((color, index) => (
                    <div key={`${product.id}-${index}`} style={{ background: color }} className="h-14 flex-1 rounded-xl border border-white/10" />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 text-xs text-zinc-400">
                <span>{product.game}</span>
                <span>{product.stock} dispo</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{product.name}</h3>
              <p className="mt-2 text-sm text-zinc-400">{product.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-2xl font-bold text-white">€{product.price}</span>
                <span className="rounded-full bg-gradient-to-r from-violet-500 to-red-500 px-3 py-1.5 text-xs font-medium text-white">Acheter</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">Vendeurs</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Trusted sellers</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {sellers.map((seller) => (
            <Link key={seller.id} href={`/seller/${seller.id}`} className="rounded-[28px] border border-white/10 bg-[#0f172a]/80 p-5 transition hover:border-violet-500/40">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-red-500 font-bold text-white">{seller.avatar}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{seller.name}</h3>
                    {seller.verified && <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">Verified</span>}
                  </div>
                  <p className="text-sm text-zinc-400">{seller.tagline}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm text-zinc-300">
                <span>⭐ {seller.rating}</span>
                <span>{seller.sales} ventes</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-violet-200">
                {seller.specialties.map((specialty) => (
                  <span key={specialty} className="rounded-full bg-violet-500/10 px-2 py-1">{specialty}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#0f172a]/80 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">Avis</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Ce que disent les joueurs</h2>
            <div className="mt-6 space-y-5">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <strong className="text-white">{review.user}</strong>
                    <span className="text-amber-400">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  </div>
                  <p className="text-zinc-300">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0f172a]/80 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">FAQ</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Questions fréquentes</h2>
            <div className="mt-6 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="font-medium text-white">{faq.question}</div>
                  <p className="mt-2 text-sm text-zinc-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
