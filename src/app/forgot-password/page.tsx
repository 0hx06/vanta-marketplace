import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function ForgotPasswordPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-violet-950/20">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Recovery</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Reset your password</h1>
          <p className="mt-2 text-sm text-zinc-400">Enter your email and we will send a reset link if there is an active account on this marketplace.</p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-zinc-200">Email</label>
              <input type="email" className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500" placeholder="you@example.com" />
            </div>
            <button type="submit" className="w-full rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500">Send reset link</button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Remembered it? <Link href="/login" className="font-medium text-violet-300">Back to login</Link>
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
