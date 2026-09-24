import { SiteShell } from "@/components/site-shell";

const notifications = [
  { title: "Seller review complete", detail: "Your Apex coaching order has been approved.", time: "5 min ago" },
  { title: "Payment received", detail: "A payout of $240 is now in your wallet.", time: "1 hour ago" },
  { title: "Marketplace alert", detail: "New verified sellers are live in CS2 and Valorant.", time: "Today" },
];

export default function DashboardNotificationsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Notifications</h1>
        </div>

        <div className="space-y-4">
          {notifications.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-white/10 bg-zinc-950/80 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                  <p className="mt-1 text-sm text-zinc-400">{item.detail}</p>
                </div>
                <span className="text-xs text-zinc-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
