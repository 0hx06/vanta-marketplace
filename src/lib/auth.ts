import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE = "vanta_session";

function secret() {
  const value = process.env.VANTA_SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error("VANTA_SESSION_SECRET must be configured with at least 32 characters.");
  }
  return value;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function verifySignedValue(value: string, maxAgeSeconds: number) {
  const [encodedPayload, signature] = value.split(".");
  if (!encodedPayload || !signature) return null;

  const expected = sign(encodedPayload);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as {
      userId?: unknown;
      exp?: unknown;
    };
    if (
      typeof payload.userId !== "string" ||
      !payload.userId ||
      typeof payload.exp !== "number" ||
      payload.exp < Math.floor(Date.now() / 1000) ||
      payload.exp > Math.floor(Date.now() / 1000) + maxAgeSeconds
    ) {
      return null;
    }
    return payload.userId;
  } catch {
    return null;
  }
}

export async function getAuthenticatedUserId() {
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  return session && process.env.VANTA_SESSION_SECRET
    ? verifySignedValue(session, 60 * 60 * 24 * 30)
    : null;
}
