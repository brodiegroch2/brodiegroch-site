-- Create the items table for GPT API storage
-- Run this on your Postgres database

CREATE TABLE IF NOT EXISTS items (
  id text PRIMARY KEY,
  type text NOT NULL,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Create index on type for faster queries
CREATE INDEX IF NOT EXISTS idx_items_type ON items(type);

-- Create index on updated_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_items_updated_at ON items(updated_at);

