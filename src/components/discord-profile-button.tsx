"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Profile = { id: string; username: string; avatar: string | null };

export function DiscordProfileButton() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    fetch("/api/auth/me").then((response) => response.ok ? response.json() : null).then(setProfile).catch(() => undefined);
  }, []);

  if (!profile) {
    return <Link href="/login" className="rounded-full bg-[#ff4655] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(255,70,85,0.2)] transition hover:bg-[#ff5d69]">Connexion Discord</Link>;
  }

  const avatarUrl = profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=64` : null;
  return (
    <Link href="/dashboard" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-3 transition hover:bg-white/[0.08]">
      {avatarUrl ? <img src={avatarUrl} alt="" className="h-7 w-7 rounded-full" /> : <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5865F2] text-xs font-bold text-white">{profile.username.slice(0, 1).toUpperCase()}</span>}
      <span className="max-w-28 truncate text-sm font-medium text-white">{profile.username}</span>
    </Link>
  );
}
