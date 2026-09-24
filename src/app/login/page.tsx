import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function LoginPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-violet-950/20">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Access</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-400">Sign in to track orders, wallet balance, and seller activity.</p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-zinc-200">Email</label>
              <input type="email" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none ring-0 placeholder:text-zinc-500 focus:border-violet-500" placeholder="you@example.com" />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-zinc-200">
                <label>Password</label>
                <Link href="/forgot-password" className="text-violet-300 hover:text-violet-200">Forgot?</Link>
              </div>
              <input type="password" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500" placeholder="••••••••" />
            </div>

            <button type="submit" className="w-full rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500">Sign in</button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            No account yet? <Link href="/register" className="font-medium text-violet-300">Create one</Link>
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
