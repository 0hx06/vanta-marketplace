"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readLocalFavorites, readLocalOrders, type LocalOrder } from "@/lib/client-account-data";

export function DashboardOverview() {
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setOrders(readLocalOrders());
    setFavorites(readLocalFavorites());
  }, []);

  const stats = [
    ["Commandes", orders.length.toString()],
    ["Dépensé", `${orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString("fr-FR")} MAD`],
    ["Favoris", favorites.length.toString()],
    ["Tickets ouverts", "0"],
  ];

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-5">
            <div className="text-sm text-zinc-400">{label}</div>
            <div className="mt-4 text-3xl font-bold text-white">{value}</div>
            {label === "Dépensé" && <div className="mt-2 text-xs text-zinc-600">Basé sur tes commandes locales</div>}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Dernières commandes</h2>
            <Link href="/dashboard/orders" className="text-sm text-[#ff6975]">Tout voir</Link>
          </div>
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
              <p className="text-sm text-zinc-300">Aucune commande enregistrée.</p>
              <p className="mt-2 text-xs text-zinc-500">Tes achats confirmés apparaîtront ici.</p>
              <Link href="/marketplace/valorant" className="mt-5 inline-flex rounded-full bg-[#ff4655] px-4 py-2 text-sm font-semibold text-white">Parcourir les comptes</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/80 p-4">
                  <div><div className="font-medium text-white">{order.item}</div><div className="text-sm text-zinc-400">#{order.id}</div></div>
                  <div className="text-right"><div className="text-sm text-emerald-300">{order.status}</div><div className="text-sm font-semibold text-white">{order.amount.toLocaleString("fr-FR")} MAD</div></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6">
          <h2 className="text-lg font-semibold text-white">Accès rapides</h2>
          <div className="mt-5 space-y-3 text-sm text-zinc-300">
            {[
              ["/dashboard/orders", "Mes commandes"],
              ["/dashboard/wallet", "Mon solde"],
              ["/dashboard/favorites", "Mes favoris"],
              ["/dashboard/notifications", "Notifications"],
              ["/dashboard/seller", "Espace vendeur"],
            ].map(([href, label]) => <Link key={href} href={href} className="block rounded-2xl border border-white/10 bg-zinc-900 p-3 hover:border-[#ff4655]/60">{label}</Link>)}
          </div>
        </div>
      </div>
    </>
  );
}
