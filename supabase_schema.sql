CREATE TABLE enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  class TEXT NOT NULL,
  board TEXT NOT NULL,
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX idx_enquiries_status ON enquiries(status);

-- Enable Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Only allow inserts from backend (service role key)
CREATE POLICY "Backend only insert" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Also add these columns later for analytics:
ALTER TABLE enquiries ADD COLUMN source TEXT DEFAULT 'website';
ALTER TABLE enquiries ADD COLUMN notes TEXT DEFAULT '';
