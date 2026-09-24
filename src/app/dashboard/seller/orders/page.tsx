import { SiteShell } from "@/components/site-shell";

const orders = [
  { id: "#S-303", buyer: "Alicia", item: "Ranked Boost", value: "$32" },
  { id: "#S-405", buyer: "Dani", item: "Case Pack", value: "$38" },
  { id: "#S-512", buyer: "Ethan", item: "Coaching", value: "$65" },
];

export default function SellerOrdersPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Seller</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Orders</h1>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-[24px] border border-white/10 bg-zinc-950/80 p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold">{order.item}</div>
                  <div className="text-sm text-zinc-400">Buyer: {order.buyer}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-violet-200">{order.id}</div>
                  <div className="font-semibold">{order.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
