CREATE TABLE IF NOT EXISTS discord_account_links (
  user_id TEXT PRIMARY KEY,
  discord_user_id TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  global_name TEXT,
  linked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS discord_account_links_discord_user_id_idx
  ON discord_account_links (discord_user_id);
