-- ============================================================
-- Copy this ENTIRE block and paste into Supabase SQL Editor
-- Project: krishna-acedeny (klpswxpiryahiiggumfs)
-- URL: https://supabase.com/dashboard/project/klpswxpiryahiiggumfs/sql/new
-- ============================================================

-- Step 1: Create otp_verifications table
CREATE TABLE IF NOT EXISTS otp_verifications (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  phone       TEXT        NOT NULL,
  otp_code    TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  expires_at  TIMESTAMPTZ NOT NULL,
  is_verified BOOLEAN     DEFAULT FALSE
);

-- Step 2: Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_otp_phone      ON otp_verifications(phone);
CREATE INDEX IF NOT EXISTS idx_otp_expires_at ON otp_verifications(expires_at);

-- Step 3: Enable Row Level Security
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Step 4: RLS Policies (allow all operations from backend with anon key)
CREATE POLICY "Allow insert otp" ON otp_verifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select otp" ON otp_verifications
  FOR SELECT USING (true);

CREATE POLICY "Allow update otp" ON otp_verifications
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete otp" ON otp_verifications
  FOR DELETE USING (true);

-- Verify: You should see "Success. No rows returned." after running.
-- Then go to Table Editor and confirm otp_verifications table exists.
