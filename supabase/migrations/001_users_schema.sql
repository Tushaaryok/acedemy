-- ============================================================
-- Krishna Academy Upleta - Users Table Migration
-- Version: 1.0 | Phase 1 - Foundation
-- Run this in Supabase SQL Editor
-- ============================================================

-- Step 1: Enums banao (types for role and standard)
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE user_standard AS ENUM ('5', '6', '7', '8', '9', '10', '11_sci', '11_com', '12_sci', '12_com', 'jee', 'neet', 'cuet');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Step 2: Main users table
CREATE TABLE IF NOT EXISTS public.users (
  -- Auth se link (Supabase auth.users ka id)
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  
  -- Login details
  phone TEXT UNIQUE,                    -- Primary login identifier (+91XXXXXXXXXX)
  email TEXT UNIQUE,                    -- Optional email
  
  -- Profile info
  full_name TEXT,                       -- Pura naam
  avatar_url TEXT,                      -- Profile photo URL
  
  -- Academic info
  role user_role DEFAULT 'student' NOT NULL,     -- Access level
  standard user_standard,                         -- Class (sirf students ke liye)
  school_name TEXT,                              -- School/College ka naam
  
  -- Onboarding tracking (PRD Section 2.2)
  onboarding_completed BOOLEAN DEFAULT FALSE NOT NULL,
  onboarding_step INTEGER DEFAULT 0,    -- 0-5 steps track karta hai
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_seen_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Performance ke liye indexes
CREATE INDEX IF NOT EXISTS idx_users_phone ON public.users(phone);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_onboarding ON public.users(onboarding_completed);

-- Step 4: Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 5: New Supabase user ke liye auto-profile create karo
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, phone, email, role)
  VALUES (
    NEW.id,
    NEW.phone,
    NEW.email,
    'student'  -- Default role
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auth trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) - VERY IMPORTANT!
-- ============================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy 1: Apna profile khud dekh sakta hai
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Policy 2: Admin sabka profile dekh sakta hai
CREATE POLICY "admin_select_all" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy 3: Teacher apne students dekh sakta hai
CREATE POLICY "teacher_select_students" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'teacher'
    ) AND role = 'student'
  );

-- Policy 4: Apna profile update kar sakta hai
CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy 5: Admin kisi ka bhi update kar sakta hai
CREATE POLICY "admin_update_all" ON public.users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
