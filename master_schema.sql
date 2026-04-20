-- Consolidated Master Schema for Krishna Academy

-- 1. Users Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT, -- Nullable initially
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'teacher', 'student')),
  standard TEXT,
  school_name TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_step INTEGER DEFAULT 1,
  credits INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create public.users on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, phone, email, role)
  VALUES (NEW.id, NEW.phone, NEW.email, 'student');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Batches Table
CREATE TABLE IF NOT EXISTS batches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, -- e.g., 'Std 10 Science', 'Std 12 Commerce'
  year TEXT NOT NULL, -- e.g., '2024-25'
  demo_video_id TEXT,
  tags TEXT[],
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

-- 8. Materials Table
CREATE TABLE IF NOT EXISTS materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL, -- PDF, IMAGE, DOC
  category TEXT NOT NULL, -- Revision, Question Bank, Practical
  batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  file_url TEXT NOT NULL,
  file_size TEXT,
  priority TEXT DEFAULT 'normal',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Enquiries Table
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

-- 10. Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY, -- e.g., 'global_config'
  academy_name TEXT DEFAULT 'Krishna Academy',
  academic_year TEXT DEFAULT '2024-25',
  admission_status TEXT DEFAULT 'Open',
  contact_phone TEXT,
  whatsapp_enabled BOOLEAN DEFAULT TRUE,
  maintenance_mode BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Live Sessions Table
CREATE TABLE IF NOT EXISTS live_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  meeting_url TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'finished')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view batches" ON batches FOR SELECT USING (true);
CREATE POLICY "Public profiles are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can edit own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Notices are viewable by all" ON notices FOR SELECT USING (true);
CREATE POLICY "Materials are viewable by students in batch" ON materials FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM enrollments 
    WHERE student_id = auth.uid() AND batch_id = materials.batch_id
  ) OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'teacher')
  )
);
CREATE POLICY "Fees viewable by own student or admin" ON fees FOR SELECT USING (auth.uid() = student_id OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Settings viewable by all" ON settings FOR SELECT USING (true);
CREATE POLICY "Settings editable by admin" ON settings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Live sessions viewable by enrolled students" ON live_sessions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM enrollments 
    WHERE student_id = auth.uid() AND batch_id = live_sessions.batch_id
  ) OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'teacher')
  )
);

CREATE POLICY "Public can submit enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view enquiries" ON enquiries FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin can update enquiries" ON enquiries FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- 12. Doubts Table
CREATE TABLE IF NOT EXISTS doubts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Doubt Messages Table
CREATE TABLE IF NOT EXISTS doubt_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doubt_id UUID REFERENCES doubts(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  attachment_url TEXT,
  attachment_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE doubts ENABLE ROW LEVEL SECURITY;
ALTER TABLE doubt_messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Doubts viewable by owner or teacher" ON doubts FOR SELECT USING (
  student_id = auth.uid() OR teacher_id = auth.uid() OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Students can create doubts" ON doubts FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Doubt messages viewable by participants" ON doubt_messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM doubts WHERE id = doubt_messages.doubt_id AND (student_id = auth.uid() OR teacher_id = auth.uid())
  ) OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Participants can send messages" ON doubt_messages FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM doubts WHERE id = doubt_messages.doubt_id AND (student_id = auth.uid() OR teacher_id = auth.uid())
  ) OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- 14. Homework Table
CREATE TABLE IF NOT EXISTS homework (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  deadline TIMESTAMPTZ,
  urgency TEXT DEFAULT 'medium' CHECK (urgency IN ('low', 'medium', 'high')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Homework Submissions Table
CREATE TABLE IF NOT EXISTS homework_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  homework_id UUID REFERENCES homework(id) ON DELETE CASCADE,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  file_url TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded')),
  grade TEXT,
  feedback TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Homework viewable by batch students" ON homework FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM enrollments 
    WHERE student_id = auth.uid() AND batch_id = homework.batch_id
  ) OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'teacher')
  )
);
CREATE POLICY "Students can view own submissions" ON homework_submissions FOR SELECT USING (
  student_id = auth.uid() OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'teacher'))
);
CREATE POLICY "Students can submit homework" ON homework_submissions FOR INSERT WITH CHECK (auth.uid() = student_id);
