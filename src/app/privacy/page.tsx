import { SiteShell } from "@/components/site-shell";

export default function PrivacyPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Privacy policy</h1>
        <div className="mt-6 space-y-4 text-zinc-300">
          <p>We process only the information necessary to operate a trusted marketplace and protect our users from fraudulent or forbidden activity.</p>
          <p>Profile data, payment references, verification details, and support communications are stored according to retention, access, and dispute review standards.</p>
          <p>We do not request or store platform passwords, MFA recovery material, private keys, or session secrets from third-party services.</p>
        </div>
      </div>
    </SiteShell>
  );
}
