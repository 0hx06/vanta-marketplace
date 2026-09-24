import { Pool, type PoolClient } from "pg";
import { randomUUID } from "node:crypto";

export type DiscordLink = {
  discordUserId: string;
  username: string;
  globalName: string | null;
  linkedAt: Date;
};

declare global {
  var vantaPool: Pool | undefined;
}

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be configured to manage Discord links.");
  }
  global.vantaPool ??= new Pool({ connectionString: process.env.DATABASE_URL });
  return global.vantaPool;
}

export async function getDiscordLink(userId: string) {
  const result = await getPool().query<{
    discord_user_id: string;
    username: string;
    global_name: string | null;
    linked_at: Date;
  }>(
    `SELECT discord_user_id, username, global_name, linked_at
     FROM discord_account_links
     WHERE user_id = $1`,
    [userId],
  );
  const row = result.rows[0];
  return row
    ? {
        discordUserId: row.discord_user_id,
        username: row.username,
        globalName: row.global_name,
        linkedAt: row.linked_at,
      }
    : null;
}

export async function createDiscordLink(
  userId: string,
  identity: { id: string; username: string; globalName: string | null },
) {
  const client: PoolClient = await getPool().connect();
  try {
    await client.query("BEGIN");
    const existing = await client.query<{ user_id: string }>(
      `SELECT user_id FROM discord_account_links
       WHERE discord_user_id = $1 OR user_id = $2
       FOR UPDATE`,
      [identity.id, userId],
    );

    const conflictingUser = existing.rows.find((row) => row.user_id !== userId);
    if (conflictingUser) {
      throw new Error("DISCORD_ACCOUNT_ALREADY_LINKED");
    }

    if (existing.rows.some((row) => row.user_id === userId)) {
      throw new Error("USER_ALREADY_LINKED");
    }

    await client.query(
      `INSERT INTO discord_account_links
        (user_id, discord_user_id, username, global_name)
       VALUES ($1, $2, $3, $4)`,
      [userId, identity.id, identity.username, identity.globalName],
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "23505"
    ) {
      throw new Error("DISCORD_ACCOUNT_ALREADY_LINKED");
    }
    throw error;
  } finally {
    client.release();
  }
}

export async function getOrCreateUserForDiscord(identity: {
  id: string;
  username: string;
  globalName: string | null;
}) {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const existing = await client.query<{ user_id: string }>(
      `SELECT user_id FROM discord_account_links WHERE discord_user_id = $1 FOR UPDATE`,
      [identity.id],
    );
    const userId = existing.rows[0]?.user_id ?? randomUUID();
    if (!existing.rows[0]) {
      await client.query(
        `INSERT INTO discord_account_links
          (user_id, discord_user_id, username, global_name)
         VALUES ($1, $2, $3, $4)`,
        [userId, identity.id, identity.username, identity.globalName],
      );
    }
    await client.query("COMMIT");
    return userId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
