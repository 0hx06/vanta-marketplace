import { SiteShell } from "@/components/site-shell";

export default function LoginPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-violet-950/20">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Access</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Sign in with Discord</h1>
          <p className="mt-2 text-sm text-zinc-400">Discord is the only sign-in method. Existing VANTA accounts remain intact and can be connected by an administrator.</p>
          <a href="/api/auth/discord" className="mt-8 block w-full rounded-full bg-[#5865F2] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#4752C4]">Continue with Discord</a>
        </div>
      </div>
    </SiteShell>
  );
}
