import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

const topics = [
  "Statut de commande",
  "Vérification du compte",
  "Litige / remboursement",
  "Support vendeur",
];

export default function SupportPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Support</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Centre d’assistance</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <div key={topic} className="rounded-[24px] border border-white/10 bg-zinc-950/80 p-5 text-white">
              {topic}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6">
            <h2 className="text-xl font-semibold text-white">Créer un ticket</h2>
            <form className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-200">Email</label>
                  <input type="email" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500" placeholder="joueur@exemple.com" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-200">Objet</label>
                  <input type="text" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500" placeholder="Compte / livraison / litige" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-200">Type</label>
                <select className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500">
                  <option>Commande</option>
                  <option>Compte</option>
                  <option>Remboursement</option>
                  <option>Vendeur</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-200">Message</label>
                <textarea rows={6} className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500" placeholder="Décrivez votre problème ou votre demande..." />
              </div>
              <button type="submit" className="rounded-full bg-gradient-to-r from-violet-500 to-red-500 px-5 py-3 text-sm font-semibold text-white">Envoyer le ticket</button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6">
              <h2 className="text-lg font-semibold text-white">Support rapide</h2>
              <p className="mt-2 text-zinc-300">Réponse moyenne : 1h à 4h selon le type de demande.</p>
              <Link href="/login" className="mt-5 inline-flex rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white">Contact support</Link>
            </div>
            <div className="rounded-[28px] border border-violet-500/20 bg-violet-500/5 p-6">
              <h2 className="text-lg font-semibold text-white">Discord vendeur</h2>
              <p className="mt-2 text-zinc-300">Pour parler directement avec un vendeur, accédez à son Discord depuis sa fiche profil ou la liste des sellers.</p>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
