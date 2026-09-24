import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const value = (await cookies()).get("vanta_discord_user")?.value;
  if (!value) return NextResponse.json({ authenticated: false }, { status: 401 });
  try {
    return NextResponse.json(JSON.parse(value));
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
