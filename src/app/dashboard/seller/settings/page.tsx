import { SiteShell } from "@/components/site-shell";

export default function SellerSettingsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Seller</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Settings</h1>
        </div>

        <div className="space-y-4 rounded-[28px] border border-white/10 bg-zinc-950/80 p-6">
          <div>
            <label className="mb-2 block text-sm text-zinc-200">Display name</label>
            <input defaultValue="Aurora Guild" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-zinc-200">Public metadata</label>
            <textarea defaultValue="Fast, secure, premium support for ranked and account-related services." rows={4} className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500" />
          </div>
          <button className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500">Save changes</button>
        </div>
      </div>
    </SiteShell>
  );
}
