import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function RegisterPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-white/10 bg-[#121419] p-8 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6975]">Nouveau membre</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Crée ton compte avec Discord</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">Il n&apos;y a pas de formulaire séparé : ta connexion Discord crée automatiquement ton compte VANTA.</p>
          <a href="/api/auth/discord" className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#5865F2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#6975f5]">
            <span className="text-lg">◉</span>
            Créer mon compte Discord
          </a>
          <p className="mt-6 text-center text-sm text-zinc-500">Déjà membre ? <Link href="/login" className="text-zinc-300 hover:text-white">Se connecter</Link></p>
        </div>
      </div>
    </SiteShell>
  );
}
