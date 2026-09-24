import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

const stats = [
  { label: "Orders", value: "24", tone: "violet" },
  { label: "Wallet", value: "$1,420", tone: "red" },
  { label: "Favorites", value: "38", tone: "emerald" },
  { label: "Disputes", value: "02", tone: "amber" },
];

const recentOrders = [
  { order: "#GAM-1024", item: "Valorant Boost", status: "Completed", amount: "$52" },
  { order: "#GAM-1027", item: "CS2 Case Pack", status: "In transit", amount: "$38" },
  { order: "#GAM-1031", item: "Apex coaching", status: "Reviewing", amount: "$18" },
];

export default function DashboardPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Dashboard</p>
            <h1 className="mt-3 text-3xl font-bold text-white">Buyer control center</h1>
          </div>
          <Link href="/become-a-seller" className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500">Sell on marketplace</Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-5">
              <div className="text-sm text-zinc-400">{stat.label}</div>
              <div className="mt-4 text-3xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent orders</h2>
              <Link href="/dashboard/orders" className="text-sm text-violet-300">View all</Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((row) => (
                <div key={row.order} className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/80 p-4">
                  <div>
                    <div className="font-medium text-white">{row.item}</div>
                    <div className="text-sm text-zinc-400">{row.order}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-violet-200">{row.status}</div>
                    <div className="text-sm font-semibold text-white">{row.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6">
            <h2 className="text-lg font-semibold text-white">Quick links</h2>
            <div className="mt-5 space-y-3 text-sm text-zinc-300">
              <Link href="/dashboard/orders" className="block rounded-2xl border border-white/10 bg-zinc-900 p-3 hover:border-violet-500/60">Orders</Link>
              <Link href="/dashboard/wallet" className="block rounded-2xl border border-white/10 bg-zinc-900 p-3 hover:border-violet-500/60">Wallet</Link>
              <Link href="/dashboard/favorites" className="block rounded-2xl border border-white/10 bg-zinc-900 p-3 hover:border-violet-500/60">Favorites</Link>
              <Link href="/dashboard/notifications" className="block rounded-2xl border border-white/10 bg-zinc-900 p-3 hover:border-violet-500/60">Notifications</Link>
              <Link href="/dashboard/seller" className="block rounded-2xl border border-white/10 bg-zinc-900 p-3 hover:border-violet-500/60">Seller panel</Link>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
