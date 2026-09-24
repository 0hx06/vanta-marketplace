import { NextResponse } from "next/server";

const configuredProviders = {
  cmi: Boolean(process.env.CMI_MERCHANT_ID && process.env.CMI_SECRET),
  paypal: Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET),
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const provider: "cmi" | "paypal" | undefined =
    body?.provider === "cmi" || body?.provider === "paypal" ? body.provider : undefined;

  if (provider !== "cmi" && provider !== "paypal") {
    return NextResponse.json({ error: "Moyen de paiement non supporté." }, { status: 400 });
  }

  if (!configuredProviders[provider]) {
    return NextResponse.json(
      {
        error: `Le compte marchand ${provider === "cmi" ? "CMI" : "PayPal"} n'est pas encore configuré.`,
        setup: provider === "cmi"
          ? "Ajoute CMI_MERCHANT_ID et CMI_SECRET dans les variables d'environnement."
          : "Ajoute PAYPAL_CLIENT_ID et PAYPAL_CLIENT_SECRET dans les variables d'environnement.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ status: "gateway_ready", provider });
}
