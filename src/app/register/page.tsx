import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function RegisterPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-violet-950/20">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Join</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Create your account</h1>

          <form className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-zinc-200">First name</label>
                <input type="text" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500" placeholder="Alex" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-200">Last name</label>
                <input type="text" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500" placeholder="Morgan" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-200">Email</label>
              <input type="email" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-200">Password</label>
              <input type="password" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500" placeholder="Create a secure password" />
            </div>
            <button type="submit" className="w-full rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500">Create account</button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Already registered? <Link href="/login" className="font-medium text-violet-300">Log in</Link>
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
