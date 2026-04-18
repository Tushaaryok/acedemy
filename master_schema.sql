-- Consolidated Master Schema for Krishna Academy

-- 1. Users Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
  credits INTEGER DEFAULT 0, -- XP points for students
  streak INTEGER DEFAULT 0, -- Learning streak
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Batches Table
CREATE TABLE IF NOT EXISTS batches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, -- e.g., 'Std 10 Science', 'Std 12 Commerce'
  year TEXT NOT NULL, -- e.g., '2024-25'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, batch_id)
);

-- 4. Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  subject_id UUID REFERENCES subjects(id),
  marked_by UUID REFERENCES users(id),
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  date DATE DEFAULT CURRENT_DATE,
  lecture_no INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Fees Table
CREATE TABLE IF NOT EXISTS fees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  fee_type TEXT DEFAULT 'monthly_tuition',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'verified')),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Notices Table
CREATE TABLE IF NOT EXISTS notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('normal', 'urgent', 'announcement')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  class TEXT NOT NULL,
  board TEXT NOT NULL,
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'rejected')),
  source TEXT DEFAULT 'website',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can edit own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Notices are viewable by all" ON notices FOR SELECT USING (true);
CREATE POLICY "Fees viewable by own student or admin" ON fees FOR SELECT USING (auth.uid() = student_id OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
