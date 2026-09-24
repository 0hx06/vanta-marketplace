import Link from "next/link";
import type { ReactNode } from "react";
import { DiscordProfileButton } from "@/components/discord-profile-button";
import { LanguageSwitcher } from "@/components/language-switcher";

const navItems = [
  { label: "Comptes", href: "/marketplace/valorant" },
  { label: "Vendeurs", href: "/sellers" },
  { label: "Support", href: "/support" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f5f7ff]">
      <div className="border-b border-white/[0.06] bg-[#0e1015] px-4 py-2 text-center text-[11px] font-medium text-zinc-400">
        <span className="text-emerald-400">●</span> Transactions protégées
        <span className="mx-3 text-zinc-700">/</span>
        Livraison instantanée après validation du paiement
      </div>
      <header className="sticky top-0 z-50 border-b border-[#263440] bg-[#0b1118]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4655] font-black text-white shadow-[0_0_24px_rgba(255,70,85,0.22)]">
              V
            </div>
            <div>
              <div className="text-lg font-black tracking-[0.18em] text-white">VANTA</div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-zinc-400">Comptes Valorant</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.025] p-1 text-sm text-zinc-300 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 transition hover:bg-white/[0.07] hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/become-a-seller" className="hidden rounded-full border border-[#ff4655]/30 bg-[#ff4655]/[0.08] px-4 py-2 text-sm font-medium text-[#ffb0b6] transition hover:border-[#ff4655]/60 hover:bg-[#ff4655]/[0.14] md:inline-flex">
              Devenir vendeur
            </Link>
            <DiscordProfileButton />
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/[0.08] bg-[#0b0d11]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="mb-3 text-lg font-semibold tracking-[0.18em] text-white">VANTA</div>
            <p className="max-w-xs text-sm leading-6 text-zinc-400">
              Marketplace premium pour comptes Valorant vérifiés, livraison rapide et sécurité renforcée.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Navigation</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/marketplace">Marketplace</Link></li>
              <li><Link href="/sellers">Vendeurs</Link></li>
              <li><Link href="/support">Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Légal</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/privacy">Confidentialité</Link></li>
              <li><Link href="/terms">Conditions</Link></li>
              <li><Link href="/refund-policy">Remboursements</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Valorant</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/marketplace/valorant">Comptes</Link></li>
              <li><Link href="/marketplace/valorant">Rangs</Link></li>
              <li><Link href="/become-a-seller">Vendre</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
          © 2026 VANTA. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
