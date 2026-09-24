import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE = "vanta_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

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

export function createSignedValue(payload: Record<string, unknown>) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifySignedPayload(value: string, maxAgeSeconds: number) {
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
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as Record<
      string,
      unknown
    >;
    if (
      typeof payload.exp !== "number" ||
      payload.exp < Math.floor(Date.now() / 1000) ||
      payload.exp > Math.floor(Date.now() / 1000) + maxAgeSeconds
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function verifySignedValue(value: string, maxAgeSeconds: number) {
  const payload = verifySignedPayload(value, maxAgeSeconds);
  return typeof payload?.userId === "string" && payload.userId ? payload.userId : null;
}

export async function getAuthenticatedUserId() {
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  return session && process.env.VANTA_SESSION_SECRET
    ? verifySignedValue(session, SESSION_MAX_AGE)
    : null;
}

export function setSession(response: Response, userId: string) {
  response.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE}=${createSignedValue({
      userId,
      exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
    })}; HttpOnly; Path=/; Max-Age=${SESSION_MAX_AGE}; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`,
  );
}
