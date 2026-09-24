"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { productCatalog, sellers } from "@/lib/marketplace-data";

type Ticket = { id: string; subject: string; user: string; status: "Ouvert" | "En cours" | "Résolu" };

const initialTickets: Ticket[] = [
  { id: "TCK-1042", subject: "Question sur une livraison", user: "jules@client.fr", status: "Ouvert" },
  { id: "TCK-1041", subject: "Vérification vendeur", user: "ghostline", status: "En cours" },
  { id: "TCK-1038", subject: "Demande de remboursement", user: "amelie@client.fr", status: "Résolu" },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"overview" | "products" | "sellers" | "tickets">("overview");
  const [tickets, setTickets] = useState(initialTickets);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setAuthenticated(window.localStorage.getItem("vanta-admin-session") === "active");
  }, []);

  const metrics = useMemo(() => [
    { label: "Comptes en ligne", value: productCatalog.length.toString(), detail: "Catalogue Valorant" },
    { label: "Vendeurs vérifiés", value: sellers.length.toString(), detail: "Profils actifs" },
    { label: "Tickets ouverts", value: tickets.filter((ticket) => ticket.status !== "Résolu").length.toString(), detail: "À traiter aujourd'hui" },
    { label: "Taux de confiance", value: "96.4%", detail: "Sur les 30 derniers jours" },
  ], [tickets]);

  function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email === "admin@vanta.local" && password === "VantaAdmin2026!") {
      window.localStorage.setItem("vanta-admin-session", "active");
      setAuthenticated(true);
      setNotice("");
    } else {
      setNotice("Identifiants incorrects.");
    }
  }

  function logout() {
    window.localStorage.removeItem("vanta-admin-session");
    setAuthenticated(false);
  }

  function updateTicket(id: string, status: Ticket["status"]) {
    setTickets((current) => current.map((ticket) => ticket.id === id ? { ...ticket, status } : ticket));
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#090a0d] px-4 py-16 text-white">
        <div className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-[#121419] p-8 shadow-2xl">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">← Retour au site</Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6975]">VANTA / Admin</p>
          <h1 className="mt-3 text-3xl font-bold">Connexion administrateur</h1>
          <p className="mt-2 text-sm text-zinc-400">Gère les offres, les vendeurs et le support depuis cet espace privé.</p>
          <form onSubmit={login} className="mt-8 space-y-4">
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="Email admin" className="w-full rounded-2xl border border-white/10 bg-[#0c0d10] px-4 py-3 text-sm outline-none focus:border-[#ff4655]" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required placeholder="Mot de passe" className="w-full rounded-2xl border border-white/10 bg-[#0c0d10] px-4 py-3 text-sm outline-none focus:border-[#ff4655]" />
            {notice && <p className="text-sm text-red-300">{notice}</p>}
            <button className="w-full rounded-full bg-[#ff4655] px-5 py-3 text-sm font-semibold hover:bg-[#ff5d69]">Ouvrir le dashboard</button>
          </form>
          <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs text-zinc-500">
            Compte de lancement local : admin@vanta.local · VantaAdmin2026!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090a0d] text-white">
      <header className="border-b border-white/10 bg-[#0d0e12]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <Link href="/" className="text-lg font-bold tracking-[0.18em]">VANTA</Link>
            <p className="mt-1 text-xs text-zinc-500">Administration marketplace</p>
          </div>
          <button onClick={logout} className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5">Déconnexion</button>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6975]">Dashboard</p><h1 className="mt-3 text-4xl font-bold">Centre de contrôle</h1></div>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">Système opérationnel</span>
        </div>
        <nav className="mb-8 flex flex-wrap gap-2">
          {([["overview", "Vue d'ensemble"], ["products", "Comptes"], ["sellers", "Vendeurs"], ["tickets", "Tickets"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`rounded-full px-4 py-2 text-sm ${tab === key ? "bg-[#ff4655] text-white" : "border border-white/10 text-zinc-400 hover:text-white"}`}>{label}</button>
          ))}
        </nav>

        {tab === "overview" && <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => <div key={metric.label} className="rounded-[22px] border border-white/10 bg-[#121419] p-5"><div className="text-sm text-zinc-400">{metric.label}</div><div className="mt-3 text-3xl font-bold">{metric.value}</div><div className="mt-2 text-xs text-zinc-500">{metric.detail}</div></div>)}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="rounded-[24px] border border-white/10 bg-[#121419] p-6"><h2 className="text-lg font-semibold">Dernières offres</h2><div className="mt-5 space-y-3">{productCatalog.slice(0, 4).map((product) => <div key={product.id} className="flex items-center justify-between border-b border-white/5 pb-3"><div><p className="text-sm font-medium">{product.name}</p><p className="mt-1 text-xs text-zinc-500">{product.seller} · {product.subcategory}</p></div><span className="text-sm font-semibold">€{product.price}</span></div>)}</div></section>
            <section className="rounded-[24px] border border-white/10 bg-[#121419] p-6"><h2 className="text-lg font-semibold">À traiter</h2><div className="mt-5 space-y-3">{tickets.filter((ticket) => ticket.status !== "Résolu").map((ticket) => <div key={ticket.id} className="flex items-center justify-between border-b border-white/5 pb-3"><div><p className="text-sm font-medium">{ticket.subject}</p><p className="mt-1 text-xs text-zinc-500">{ticket.id} · {ticket.user}</p></div><span className="text-xs text-[#ff6975]">{ticket.status}</span></div>)}</div></section>
          </div>
        </>}
        {tab === "products" && <section className="rounded-[24px] border border-white/10 bg-[#121419] p-6"><div className="flex items-center justify-between"><div><h2 className="text-xl font-semibold">Comptes Valorant</h2><p className="mt-1 text-sm text-zinc-500">Les offres actuellement visibles sur le marketplace.</p></div><button onClick={() => setNotice("La création d'offre sera reliée à la base de données dans la prochaine étape.")} className="rounded-full bg-[#ff4655] px-4 py-2 text-sm font-semibold">+ Ajouter une offre</button></div><div className="mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs uppercase tracking-wider text-zinc-500"><tr><th className="pb-3">Offre</th><th className="pb-3">Vendeur</th><th className="pb-3">Prix</th><th className="pb-3">Stock</th></tr></thead><tbody>{productCatalog.map((product) => <tr key={product.id} className="border-t border-white/5"><td className="py-4 font-medium">{product.name}</td><td className="py-4 text-zinc-400">{product.seller}</td><td className="py-4">€{product.price}</td><td className="py-4 text-emerald-400">{product.stock}</td></tr>)}</tbody></table></div>{notice && <p className="mt-4 text-sm text-amber-300">{notice}</p>}</section>}
        {tab === "sellers" && <section className="rounded-[24px] border border-white/10 bg-[#121419] p-6"><h2 className="text-xl font-semibold">Vendeurs vérifiés</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{sellers.map((seller) => <div key={seller.id} className="rounded-2xl border border-white/10 bg-[#0d0e12] p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4655] text-xs font-bold">{seller.avatar}</div><div><p className="font-medium">{seller.name}</p><p className="text-xs text-zinc-500">{seller.discord}</p></div></div><div className="mt-4 flex justify-between text-sm"><span>⭐ {seller.rating}</span><span className="text-zinc-400">{seller.sales} ventes</span></div></div>)}</div></section>}
        {tab === "tickets" && <section className="rounded-[24px] border border-white/10 bg-[#121419] p-6"><h2 className="text-xl font-semibold">Support et tickets</h2><div className="mt-6 space-y-3">{tickets.map((ticket) => <div key={ticket.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d0e12] p-4"><div><p className="font-medium">{ticket.subject}</p><p className="mt-1 text-xs text-zinc-500">{ticket.id} · {ticket.user}</p></div><select value={ticket.status} onChange={(event) => updateTicket(ticket.id, event.target.value as Ticket["status"])} className="rounded-xl border border-white/10 bg-[#17191f] px-3 py-2 text-sm"><option>Ouvert</option><option>En cours</option><option>Résolu</option></select></div>)}</div></section>}
      </div>
    </main>
  );
}
