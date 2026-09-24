import { SiteShell } from "@/components/site-shell";

export default function BecomeASellerPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-violet-500/20 bg-zinc-950/80 p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Seller onboarding</p>
          <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">Apply to sell on the marketplace</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">We review sellers based on trust score, item quality, and platform policy compliance. The process is designed for transparent, compliant business relationships.</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <form className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-200">Seller name</label>
                  <input type="text" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500" placeholder="NightRise Trading" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-200">Business email</label>
                  <input type="email" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500" placeholder="hello@nightrise.gg" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-200">Primary gaming focus</label>
                <select className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500">
                  <option>Valorant</option>
                  <option>League of Legends</option>
                  <option>CS2</option>
                  <option>EA FC</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-200">Tell us about your operation</label>
                <textarea rows={5} className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500" placeholder="Describe your customer support, fulfillment process, and compliance practices." />
              </div>

              <button type="submit" className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500">Submit application</button>
            </form>

            <aside className="rounded-[28px] border border-white/10 bg-zinc-900/80 p-6">
              <h2 className="text-lg font-semibold text-white">Seller benefits</h2>
              <ul className="mt-5 space-y-4 text-sm text-zinc-300">
                <li>Access to a buyer protection framework</li>
                <li>Priority listings and showcase placements</li>
                <li>Performance analytics and payout tracking</li>
                <li>Dedicated dispute and moderation support</li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
