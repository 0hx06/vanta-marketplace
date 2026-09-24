"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { getProductById } from "@/lib/marketplace-data";

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  const [method, setMethod] = useState("cmi");
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const priceMad = product ? Math.round(product.price * 10.8) : 0;

  if (!product) {
    return <SiteShell><div className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-3xl font-bold text-white">Offre introuvable</h1><Link href="/marketplace/valorant" className="mt-6 inline-block text-[#ff6975]">Retour aux comptes</Link></div></SiteShell>;
  }

  const productId = product.id;
  function submitPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, provider: method }),
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Le paiement n'a pas pu démarrer.");
        setPaid(true);
      })
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }

  if (paid) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-xl px-4 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-2xl text-emerald-400">✓</div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">Paiement confirmé</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Commande validée</h1>
          <p className="mt-4 text-zinc-400">Ton compte {product.name} est réservé. Le vendeur va transmettre les instructions de livraison dans ton espace commandes.</p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#121419] p-5 text-left">
            <div className="flex justify-between text-sm"><span className="text-zinc-400">Référence</span><span className="text-white">VNT-{Date.now().toString().slice(-6)}</span></div>
            <div className="mt-3 flex justify-between text-sm"><span className="text-zinc-400">Montant</span><span className="font-semibold text-white">{priceMad} MAD</span></div>
          </div>
          <Link href="/dashboard/orders" className="mt-8 inline-block rounded-full bg-[#ff4655] px-6 py-3 text-sm font-semibold text-white">Voir mes commandes</Link>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href={`/product/${product.id}`} className="text-sm text-zinc-500 hover:text-white">← Retour à l'offre</Link>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={submitPayment} className="rounded-[26px] border border-white/10 bg-[#121419] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6975]">Paiement sécurisé</p>
            <h1 className="mt-3 text-3xl font-bold text-white">Finaliser la commande</h1>
            <p className="mt-2 text-sm text-zinc-500">Prototype de paiement local — aucun débit réel n'est effectué.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["cmi", "paypal"].map((value) => <button type="button" key={value} onClick={() => setMethod(value)} className={`rounded-2xl border p-4 text-left text-sm font-medium ${method === value ? "border-[#ff4655] bg-[#ff4655]/10 text-white" : "border-white/10 text-zinc-400"}`}>{value === "cmi" ? "Carte marocaine" : "PayPal"}<span className="mt-1 block text-xs text-zinc-500">{value === "cmi" ? "CMI · Visa, Mastercard" : "Paiement express"}</span></button>)}
            </div>
            {method === "cmi" ? <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d0e12] p-5 text-sm text-zinc-400">Après validation, tu seras redirigé vers la page CMI sécurisée. Les données de carte ne transitent jamais par VANTA.</div> : <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d0e12] p-5 text-sm text-zinc-400">Tu seras redirigé vers PayPal après validation.</div>}
            <label className="mt-6 flex items-start gap-3 text-xs text-zinc-500"><input required type="checkbox" className="mt-0.5 accent-[#ff4655]" />J'accepte les conditions de vente et la politique de remboursement.</label>
            {error && <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
            <button disabled={loading} className="mt-7 w-full rounded-full bg-[#ff4655] px-5 py-3 font-semibold text-white hover:bg-[#ff5d69] disabled:opacity-60">{loading ? "Redirection..." : `Payer ${priceMad} MAD`}</button>
          </form>
          <aside className="h-fit rounded-[26px] border border-white/10 bg-[#121419] p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Récapitulatif</p>
            <div className="mt-5 flex gap-4"><div className="h-20 w-24 rounded-xl bg-[linear-gradient(135deg,_#292d38,_#ff4655)]" /><div><h2 className="font-semibold text-white">{product.name}</h2><p className="mt-1 text-sm text-zinc-500">{product.seller} · {product.subcategory}</p></div></div>
            <div className="mt-7 space-y-3 border-t border-white/10 pt-5 text-sm"><div className="flex justify-between text-zinc-400"><span>Sous-total</span><span>{priceMad} MAD</span></div><div className="flex justify-between text-zinc-400"><span>Frais de service</span><span>Inclus</span></div><div className="flex justify-between border-t border-white/10 pt-4 text-lg font-bold text-white"><span>Total</span><span>{priceMad} MAD</span></div></div>
            <p className="mt-6 text-xs leading-5 text-zinc-500">Paiement chiffré · Protection acheteur · Support disponible 24/7</p>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
