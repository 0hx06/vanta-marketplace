import { SiteShell } from "@/components/site-shell";

const products = [
  { name: "Valorant Ranked Boost", status: "Live", price: "$29" },
  { name: "Immortal Coaching Bundle", status: "Draft", price: "$65" },
  { name: "CS2 Premium Case Pack", status: "Live", price: "$38" },
];

export default function SellerProductsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Seller</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Products</h1>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.name} className="flex items-center justify-between rounded-[24px] border border-white/10 bg-zinc-950/80 p-5">
              <div>
                <div className="font-semibold text-white">{product.name}</div>
                <div className="text-sm text-zinc-400">{product.status}</div>
              </div>
              <div className="text-lg font-semibold text-violet-200">{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
