"use client";

import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { readLocalOrders, type LocalOrder } from "@/lib/client-account-data";

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  useEffect(() => setOrders(readLocalOrders()), []);
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8"><p className="text-xs uppercase tracking-[0.3em] text-[#ff6975]">Espace personnel</p><h1 className="mt-3 text-3xl font-bold text-white">Mes commandes</h1></div>
        {orders.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-zinc-950/80 p-12 text-center"><p className="text-zinc-300">Tu n&apos;as encore aucune commande.</p><p className="mt-2 text-sm text-zinc-500">Les commandes confirmées depuis ce navigateur apparaîtront ici.</p></div>
        ) : (
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/80">
            <table className="min-w-full text-left text-sm text-zinc-300"><thead className="bg-zinc-900/90 text-zinc-400"><tr><th className="px-5 py-4">Référence</th><th className="px-5 py-4">Offre</th><th className="px-5 py-4">Date</th><th className="px-5 py-4">Statut</th><th className="px-5 py-4">Montant</th></tr></thead>
              <tbody>{orders.map((order) => <tr key={order.id} className="border-t border-white/10"><td className="px-5 py-4 text-white">#{order.id}</td><td className="px-5 py-4">{order.item}</td><td className="px-5 py-4">{new Date(order.createdAt).toLocaleDateString("fr-FR")}</td><td className="px-5 py-4"><span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">{order.status}</span></td><td className="px-5 py-4 text-white">{order.amount.toLocaleString("fr-FR")} MAD</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
