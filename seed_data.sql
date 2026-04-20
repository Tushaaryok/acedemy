-- Sample Seed Data for Krishna Academy
-- Run this in Supabase SQL Editor to populate the database with demo data.

-- 1. Insert Initial Admin Profile (Assuming the user has signed up)
-- Replace '00000000-0000-0000-0000-000000000000' with your actual Supabase User ID from the Auth table
-- INSERT INTO public.users (id, full_name, email, role, onboarding_completed) 
-- VALUES ('YOUR_USER_ID', 'Project Director', 'admin@krishnaacademy.com', 'admin', true);

-- 2. Insert Batches
INSERT INTO public.batches (name, year, demo_video_id, tags) VALUES
('Std 10 Board Prep', '2024-25', 'KQoaQ9QDB-4', ARRAY['Maths', 'Science', 'English', 'SST']),
('Std 12 Science (A)', '2024-25', 'bfSoopCm0i8', ARRAY['Physics', 'Chemistry', 'Maths']),
('Std 12 Commerce (G)', '2024-25', 'U5PGuVDYbXc', ARRAY['Accounts', 'Stats', 'Eco']),
('Std 9 Secondary', '2024-25', 'JJeFfFoghIo', ARRAY['Foundation', 'Logic']);

-- 3. Insert Settings
INSERT INTO public.settings (id, academy_name, academic_year, admission_status, contact_phone)
VALUES ('global_config', 'Krishna Academy Upleta', '2024-25', 'Open', '+91 81609 91166')
ON CONFLICT (id) DO UPDATE SET academy_name = EXCLUDED.academy_name;

-- 4. Insert Notices
INSERT INTO public.notices (title, content, priority) VALUES
('Independence Day Holiday', 'The academy will remain closed on 15th August for celebrations.', 'normal'),
('Fees Deadline Reminder', 'Installment #3 for the academic session is due by 30th April. Please clear to avoid late fees.', 'urgent'),
('New Study Material for Std 12', 'Practical manuals for Chemistry have been uploaded to the material section.', 'announcement');

-- 5. Insert Sample Enquiries (Leads)
INSERT INTO public.enquiries (student_name, parent_name, phone, class, board, message, status) VALUES
('Yash Vardhan', 'Sanjay Bhai', '9876543210', 'Std 12 Science', 'GSEB', 'Interested in JEE/NEET hybrid batch.', 'contacted'),
('Priya Mehta', 'Rajesh K.', '8123456789', 'Std 10 Board', 'CBSE', 'Inquiry for personal home tuition options.', 'new'),
('Tushar Kansara', 'Mahendra P.', '9900887766', 'Std 12 Science', 'GSEB', 'Want to enroll for physics special batch.', 'enrolled');

-- 6. Insert Dynamic Materials (Replace UUIDs with real Batch IDs normally)
-- Note: This requires real UUIDs from previous inserts. These are placeholders.
-- INSERT INTO public.materials (title, content_type, category, batch_id, file_url, file_size) VALUES
-- ('Calculus Mastery PDF', 'pdf', 'Question Bank', (SELECT id FROM batches WHERE name = 'Std 12 Science (A)' LIMIT 1), 'https://example.com/notes.pdf', '2.4 MB');
