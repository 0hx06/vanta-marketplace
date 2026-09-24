import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

const panels = [
  { label: "Products", href: "/dashboard/seller/products", value: "18 live" },
  { label: "Orders", href: "/dashboard/seller/orders", value: "12 active" },
  { label: "Earnings", href: "/dashboard/seller/earnings", value: "$3,240" },
  { label: "Settings", href: "/dashboard/seller/settings", value: "Profile" },
];

export default function SellerDashboardPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Seller</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Seller dashboard</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {panels.map((panel) => (
            <Link key={panel.href} href={panel.href} className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-5 hover:border-violet-500/40">
              <div className="text-sm text-zinc-400">{panel.label}</div>
              <div className="mt-4 text-2xl font-bold text-white">{panel.value}</div>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
