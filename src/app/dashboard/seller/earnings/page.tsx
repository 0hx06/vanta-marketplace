import { SiteShell } from "@/components/site-shell";

export default function SellerEarningsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Seller</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Earnings</h1>
        </div>

        <div className="rounded-[28px] border border-violet-500/30 bg-gradient-to-br from-violet-600/20 to-red-600/10 p-6">
          <div className="text-sm text-zinc-300">Net revenue</div>
          <div className="mt-3 text-4xl font-bold text-white">$3,240.00</div>
          <div className="mt-4 text-sm text-emerald-300">+18.2% vs past month</div>
        </div>
      </div>
    </SiteShell>
  );
}
