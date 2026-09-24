import { SiteShell } from "@/components/site-shell";

export default function SellerPolicyPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Seller policy</h1>
        <div className="mt-6 space-y-4 text-zinc-300">
          <p>All sellers must maintain clear service descriptions, accurate delivery windows, and responsible support expectations.</p>
          <p>Marketplace compliance includes identity verification, accurate listing disclosures, and customer protection obligations.</p>
          <p>Repeated policy violations may lead to temporary restrictions, delisting, or full account suspension depending on severity.</p>
        </div>
      </div>
    </SiteShell>
  );
}
