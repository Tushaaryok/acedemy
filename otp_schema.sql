-- ============================================================
-- KRISHNA ACADEMY — SUPABASE SQL SCHEMA (OTP SYSTEM)
-- Run this in Supabase SQL Editor → New Query
-- ============================================================

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- TABLE 1: otp_verifications
-- Stores OTPs generated for phone verification
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE TABLE IF NOT EXISTS otp_verifications (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  phone       TEXT        NOT NULL,                        -- 10-digit Indian mobile number
  otp_code    TEXT        NOT NULL,                        -- 6-digit OTP
  created_at  TIMESTAMPTZ DEFAULT NOW(),                   -- When OTP was generated
  expires_at  TIMESTAMPTZ NOT NULL,                        -- created_at + 5 minutes
  is_verified BOOLEAN     DEFAULT FALSE                    -- true after successful verification
);

-- Index for fast phone lookups (most queries filter by phone)
CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_verifications(phone);

-- Index for cleanup jobs (expired OTPs)
CREATE INDEX IF NOT EXISTS idx_otp_expires_at ON otp_verifications(expires_at);

-- Enable Row Level Security
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Allow backend (service role / anon key with server) to insert & update
CREATE POLICY "Allow insert otp" ON otp_verifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select otp" ON otp_verifications
  FOR SELECT USING (true);

CREATE POLICY "Allow update otp" ON otp_verifications
  FOR UPDATE USING (true);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- TABLE 2: enquiries
-- Stores final admission enquiry submissions
-- (If you already created this table, skip this block)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE TABLE IF NOT EXISTS enquiries (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT        NOT NULL,
  parent_name  TEXT        NOT NULL,
  phone        TEXT        NOT NULL,                       -- OTP-verified phone
  class        TEXT        NOT NULL,
  board        TEXT        NOT NULL,
  message      TEXT        DEFAULT '',
  status       TEXT        DEFAULT 'new'
                           CHECK (status IN ('new', 'contacted', 'enrolled', 'rejected')),
  source       TEXT        DEFAULT 'website',
  notes        TEXT        DEFAULT '',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status     ON enquiries(status);

-- Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert enquiry" ON enquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select enquiry" ON enquiries
  FOR SELECT USING (true);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- CLEANUP FUNCTION (Optional but recommended)
-- Automatically deletes OTPs older than 1 hour
-- Schedule this via pg_cron or Supabase edge functions
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- SELECT cron.schedule('cleanup-otps', '0 * * * *',
--   $$DELETE FROM otp_verifications WHERE expires_at < NOW() - INTERVAL '1 hour'$$
-- );
