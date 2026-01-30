-- Supabase SQL Schema for Clobster
-- Run this in Supabase SQL Editor

-- Account table
CREATE TABLE IF NOT EXISTS account (
  id INTEGER PRIMARY KEY DEFAULT 1,
  balance DECIMAL(12,2) NOT NULL DEFAULT 1500,
  initial_balance DECIMAL(12,2) NOT NULL DEFAULT 1500,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Positions table
CREATE TABLE IF NOT EXISTS positions (
  id SERIAL PRIMARY KEY,
  market_id TEXT NOT NULL,
  market_slug TEXT,
  market_title TEXT NOT NULL,
  outcome TEXT NOT NULL,
  shares DECIMAL(12,6) NOT NULL,
  entry_price DECIMAL(8,6) NOT NULL,
  current_price DECIMAL(8,6) NOT NULL,
  invested DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(market_id, outcome)
);

-- Trades table
CREATE TABLE IF NOT EXISTS trades (
  id SERIAL PRIMARY KEY,
  market_id TEXT NOT NULL,
  market_slug TEXT,
  market_title TEXT NOT NULL,
  outcome TEXT NOT NULL,
  action TEXT NOT NULL,
  shares DECIMAL(12,6) NOT NULL,
  price DECIMAL(8,6) NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  pnl DECIMAL(12,2) DEFAULT 0,
  reasoning TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Thoughts table
CREATE TABLE IF NOT EXISTS thoughts (
  id SERIAL PRIMARY KEY,
  trade_id INTEGER REFERENCES trades(id),
  content TEXT NOT NULL,
  market_title TEXT,
  action TEXT,
  outcome TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_positions_market ON positions(market_id);
CREATE INDEX IF NOT EXISTS idx_trades_created ON trades(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_thoughts_created ON thoughts(created_at DESC);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE account ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE thoughts ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all access (for serverless functions)
CREATE POLICY "Allow all" ON account FOR ALL USING (true);
CREATE POLICY "Allow all" ON positions FOR ALL USING (true);
CREATE POLICY "Allow all" ON trades FOR ALL USING (true);
CREATE POLICY "Allow all" ON thoughts FOR ALL USING (true);

-- Insert initial account
INSERT INTO account (id, balance, initial_balance) 
VALUES (1, 1500, 1500) 
ON CONFLICT (id) DO NOTHING;
