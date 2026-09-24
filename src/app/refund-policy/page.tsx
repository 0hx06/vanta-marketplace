import { SiteShell } from "@/components/site-shell";

export default function RefundPolicyPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Refund policy</h1>
        <div className="mt-6 space-y-4 text-zinc-300">
          <p>Refund eligibility depends on delivery status, service completion, and supporting evidence provided by both buyer and seller.</p>
          <p>Orders with failed fulfillment, non-delivery, or policy violations may qualify for partial or full reversal after review.</p>
          <p>Disputes are evaluated by marketplace staff with the aim of fairness, operational continuity, and prevention of abuse.</p>
        </div>
      </div>
    </SiteShell>
  );
}
