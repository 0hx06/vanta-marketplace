import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { getAuthenticatedUserId } from "@/lib/auth";
import { getDiscordLink } from "@/lib/discord";

const messages: Record<string, string> = {
  linked: "Votre compte Discord est maintenant lié.",
  already_linked: "Ce compte Discord est déjà lié à un autre compte VANTA.",
  user_already_linked: "Un compte Discord est déjà lié à votre compte VANTA.",
  invalid_state: "La demande Discord a expiré ou n’est plus valide. Recommencez.",
  not_configured: "La liaison Discord n’est pas encore configurée par l’administrateur.",
  token_exchange_failed: "Discord n’a pas accepté l’autorisation.",
  identity_validation_failed: "L’identité Discord n’a pas pu être vérifiée.",
  invalid_identity: "Discord a renvoyé une identité invalide.",
  server_error: "Impossible d’enregistrer la liaison Discord. Réessayez.",
};

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ discord?: string }>;
}) {
  const userId = await getAuthenticatedUserId();
  const discordConfigured = Boolean(
    process.env.DATABASE_URL &&
      process.env.DISCORD_CLIENT_ID &&
      process.env.DISCORD_CLIENT_SECRET &&
      process.env.DISCORD_REDIRECT_URI,
  );
  const link = userId && discordConfigured ? await getDiscordLink(userId) : null;
  const result = (await searchParams).discord;

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Account</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Profile and connections</h1>
        {result && messages[result] && (
          <p className="mt-5 rounded-2xl border border-violet-400/30 bg-violet-500/10 p-4 text-sm text-violet-100">
            {messages[result]}
          </p>
        )}
        <section className="mt-8 rounded-[28px] border border-white/10 bg-zinc-950/80 p-6">
          <h2 className="text-lg font-semibold text-white">Discord</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Link Discord to verify your identity without sharing a Discord password or token with VANTA.
          </p>
          {!discordConfigured ? (
            <p className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
              Discord linking is not configured on this server.
            </p>
          ) : userId ? (
            link ? (
              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <p className="font-medium text-emerald-100">
                  {link.globalName ?? link.username}
                </p>
                <p className="mt-1 text-sm text-emerald-200/70">@{link.username} linked</p>
              </div>
            ) : (
              <Link
                href="/api/discord/link"
                className="mt-6 inline-flex rounded-full bg-[#5865F2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#4752C4]"
              >
                Link Discord account
              </Link>
            )
          ) : (
            <p className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
              Sign in to link a Discord account.
            </p>
          )}
        </section>
      </div>
    </SiteShell>
  );
}
