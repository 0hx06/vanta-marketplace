import { SiteShell } from "@/components/site-shell";

export default function DashboardWalletPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Wallet</h1>
        </div>

        <div className="rounded-[28px] border border-violet-500/30 bg-gradient-to-br from-violet-600/20 to-red-600/10 p-6">
          <div className="text-sm text-violet-100">Available balance</div>
          <div className="mt-4 text-4xl font-bold text-white">$1,420.00</div>
          <div className="mt-6 flex gap-3">
            <button className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white">Add funds</button>
            <button className="rounded-full border border-white/10 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white">Withdraw</button>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
