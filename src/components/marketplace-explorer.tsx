'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/marketplace-data";

export function MarketplaceExplorer({
  products,
  title = "Marketplace",
}: {
  products: Product[];
  title?: string;
}) {
  const [query, setQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState("Tous les jeux");
  const [selectedCategory, setSelectedCategory] = useState("Toutes les catégories");

  const games = useMemo(
    () => ["Tous les jeux", ...new Set(products.map((product) => product.game))],
    [products],
  );

  const categories = useMemo(
    () => ["Toutes les catégories", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesGame = selectedGame === "Tous les jeux" || product.game === selectedGame;
      const matchesCategory =
        selectedCategory === "Toutes les catégories" || product.category === selectedCategory;
      const q = query.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        product.name.toLowerCase().includes(q) ||
        product.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        product.seller.toLowerCase().includes(q);
      return matchesGame && matchesCategory && matchesSearch;
    });
  }, [products, query, selectedCategory, selectedGame]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((product) => product.name.toLowerCase().includes(q) || product.game.toLowerCase().includes(q))
      .slice(0, 5)
      .map((product) => ({ name: product.name, href: `/product/${product.id}` }));
  }, [products, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6975]">Comptes Valorant</p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">{title}</h1>
        </div>
        <div className="relative w-full max-w-xl">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un rang, un skin ou un vendeur..."
            className="w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-zinc-500"
          />
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-white/10 bg-zinc-900 p-2 shadow-2xl">
              {suggestions.map((suggestion) => (
                <Link
                  key={suggestion.name}
                  href={suggestion.href}
                  className="block rounded-xl px-3 py-2 text-sm text-zinc-200 hover:bg-white/5"
                >
                  {suggestion.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="rounded-2xl border border-white/10 bg-zinc-900 p-3 text-sm text-zinc-200">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-zinc-400">Game</span>
          <select
            value={selectedGame}
            onChange={(event) => setSelectedGame(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white outline-none"
          >
            {games.map((game) => (
              <option key={game} value={game}>
                {game}
              </option>
            ))}
          </select>
        </label>
        <label className="rounded-2xl border border-white/10 bg-zinc-900 p-3 text-sm text-zinc-200">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-zinc-400">Category</span>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-3 text-sm text-violet-100">
          <div className="text-xs uppercase tracking-[0.2em] text-violet-300">Popular</div>
          <div className="mt-2 font-semibold">Ranked boosts</div>
        </div>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">
          <div className="text-xs uppercase tracking-[0.2em] text-red-300">New</div>
          <div className="mt-2 font-semibold">Verified sellers</div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between text-sm text-zinc-400">
        <span>{filteredProducts.length} offres</span>
        <span>Stock vérifié · Livraison rapide</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-[#18181B] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-violet-500/40"
          >
            <div className="h-52 bg-gradient-to-br from-zinc-800 via-zinc-900 to-violet-900 p-5">
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-zinc-200">
                  {product.badge}
                </span>
                {product.sellerVerified && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-emerald-300">Verified</span>
                )}
              </div>
              <div className="mt-10 flex gap-2">
                {product.images.map((color, index) => (
                  <div
                    key={`${product.id}-img-${index}`}
                    style={{ background: color }}
                    className="h-20 flex-1 rounded-2xl border border-white/10"
                  />
                ))}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">{product.game}</span>
                <span className="text-sm font-medium text-emerald-400">{product.stock} disponibles</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-white">{product.name}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-zinc-400">{product.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-violet-200">
                {product.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-violet-500/10 px-2 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">€{product.price}</div>
                  <div className="text-xs text-zinc-400">Vendeur : {product.seller}</div>
                </div>
                <div className="rounded-full bg-violet-500 px-3 py-2 text-sm font-medium text-white">
                  Voir le compte
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-zinc-950/60 p-12 text-center text-zinc-400">
          Aucune offre ne correspond à ta recherche.
        </div>
      )}
    </div>
  );
}
