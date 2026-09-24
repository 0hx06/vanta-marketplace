import { SiteShell } from "@/components/site-shell";

export default function TermsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Terms of service</h1>
        <div className="mt-6 space-y-4 text-zinc-300">
          <p>These terms govern marketplace access, offers, and the use of the platform by buyers, sellers, and support staff.</p>
          <p>Users are responsible for compliance with local laws, platform rules, and transaction integrity requirements before publishing, buying, or selling any goods or services.</p>
          <p>All transactions are subject to dispute review, verification checks, and seller policy alignment.</p>
        </div>
      </div>
    </SiteShell>
  );
}
