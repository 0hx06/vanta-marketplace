import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "vanta_session";

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="));
}

async function validSession(value: string | undefined) {
  const secret = process.env.VANTA_SESSION_SECRET;
  if (!value || !secret || secret.length < 32) return false;
  const [payload, providedSignature] = value.split(".");
  if (!payload || !providedSignature) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const signature = Uint8Array.from(
    decodeBase64Url(providedSignature),
    (character) => character.charCodeAt(0),
  );
  const validSignature = await crypto.subtle.verify(
    "HMAC",
    key,
    signature,
    new TextEncoder().encode(payload),
  );
  if (!validSignature) return false;

  try {
    const parsed = JSON.parse(decodeBase64Url(payload)) as {
      userId?: unknown;
      exp?: unknown;
    };
    return (
      typeof parsed.userId === "string" &&
      parsed.userId.length > 0 &&
      typeof parsed.exp === "number" &&
      parsed.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  if (!(await validSession(request.cookies.get(SESSION_COOKIE)?.value))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
