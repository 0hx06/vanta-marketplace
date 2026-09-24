"use client";

import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { readLocalFavorites } from "@/lib/client-account-data";

export default function DashboardFavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => setFavorites(readLocalFavorites()), []);
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8"><p className="text-xs uppercase tracking-[0.3em] text-[#ff6975]">Espace personnel</p><h1 className="mt-3 text-3xl font-bold text-white">Mes favoris</h1></div>
        {favorites.length === 0 ? <div className="rounded-[28px] border border-dashed border-white/10 bg-zinc-950/80 p-12 text-center text-zinc-400">Tu n&apos;as encore ajouté aucun favori.</div> : <div className="grid gap-4 md:grid-cols-2">{favorites.map((item) => <div key={item} className="rounded-[24px] border border-white/10 bg-zinc-950/80 p-5 text-white">{item}</div>)}</div>}
      </div>
    </SiteShell>
  );
}
