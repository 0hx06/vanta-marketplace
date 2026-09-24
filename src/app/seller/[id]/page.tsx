import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { sellers } from "@/lib/marketplace-data";

export default async function SellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seller = sellers.find((entry) => entry.id === id);

  if (!seller) {
    notFound();
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-white/10 bg-[#18181B] p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-red-500 text-2xl font-black text-white">{seller.avatar}</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-white">{seller.name}</h1>
                  {seller.verified && <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] text-emerald-300">Verified</span>}
                </div>
                <p className="mt-2 text-zinc-300">{seller.tagline}</p>
              </div>
            </div>
            <Link href="/become-a-seller" className="rounded-full bg-violet-500 px-5 py-3 font-medium text-white">Become seller</Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Rating</div><div className="mt-3 text-2xl font-bold text-white">{seller.rating}</div></div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Sales</div><div className="mt-3 text-2xl font-bold text-white">{seller.sales}</div></div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Response</div><div className="mt-3 text-2xl font-bold text-white">{seller.responseTime}</div></div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Location</div><div className="mt-3 text-2xl font-bold text-white">{seller.location}</div></div>
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-[28px] border border-violet-500/20 bg-violet-500/5 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-violet-200">Discord</p>
              <p className="mt-2 text-lg font-semibold text-white">{seller.discord}</p>
            </div>
            <div className="flex gap-3">
              <a href={seller.discordUrl} target="_blank" rel="noreferrer" className="rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white">Open Discord</a>
              <Link href={`/support?seller=${seller.id}`} className="rounded-full border border-white/10 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white">Create ticket</Link>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
