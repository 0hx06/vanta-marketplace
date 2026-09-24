import { SiteShell } from "@/components/site-shell";

const orders = [
  { id: "#GAM-1024", item: "Valorant Ranked Boost", status: "Completed", amount: "$52", date: "Sep 20" },
  { id: "#GAM-1027", item: "CS2 Case Pack", status: "In transit", amount: "$38", date: "Sep 18" },
  { id: "#GAM-1031", item: "Apex coaching", status: "Reviewing", amount: "$18", date: "Sep 14" },
];

export default function DashboardOrdersPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Orders</h1>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/80">
          <table className="min-w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900/90 text-zinc-400">
              <tr>
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Item</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-white/10">
                  <td className="px-5 py-4 text-white">{order.id}</td>
                  <td className="px-5 py-4">{order.item}</td>
                  <td className="px-5 py-4">{order.date}</td>
                  <td className="px-5 py-4"><span className="rounded-full border border-violet-500/40 bg-violet-500/10 px-2 py-1 text-xs text-violet-200">{order.status}</span></td>
                  <td className="px-5 py-4 text-white">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SiteShell>
  );
}
