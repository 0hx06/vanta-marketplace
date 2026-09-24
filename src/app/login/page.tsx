import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <SiteShell>
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-white/10 bg-[#121419] p-8 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6975]">Accès VANTA</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Connecte-toi avec Discord</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Un seul compte, sans mot de passe à retenir. Ton profil Discord sert à sécuriser tes commandes et tes tickets.
          </p>
          <a
            href="/api/auth/discord"
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#5865F2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6975f5]"
          >
            <span className="text-lg">◉</span>
            Continuer avec Discord
          </a>
          {error && (
            <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}
          <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
            En te connectant, tu acceptes nos <Link href="/terms" className="text-zinc-300 hover:text-white">conditions</Link> et notre <Link href="/privacy" className="text-zinc-300 hover:text-white">politique de confidentialité</Link>.
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
