-- 🛑 IMPORTANT: RUN master_schema.sql FIRST BEFORE RUNNING THIS SEED DATA

-- Start seeding
BEGIN;

-- 1. Insert Batches (Academic Courses)
INSERT INTO batches (id, name, year, demo_video_id, tags) VALUES
-- Secondary Classes
(gen_random_uuid(), 'Std 10 Secondary (Gujarati Med)', '2024-25', 'bfSoopCm0i8', ARRAY['Maths', 'Science', 'SS']),
(gen_random_uuid(), 'Std 10 Secondary (English Med)', '2024-25', 'bfSoopCm0i8', ARRAY['Maths', 'Science', 'English']),

-- Higher Secondary (11th)
(gen_random_uuid(), 'Std 11 Higher Secondary (Commerce)', '2024-25', 'bfSoopCm0i8', ARRAY['Accounts', 'Stats', 'Eco']),
(gen_random_uuid(), 'Std 11 Higher Secondary (Science)', '2024-25', 'bfSoopCm0i8', ARRAY['Physics', 'Chemistry', 'Maths']),

-- Higher Secondary (12th Board)
(gen_random_uuid(), 'Std 12 Higher Secondary (Science)', '2024-25', 'bfSoopCm0i8', ARRAY['Physics', 'Chemistry', 'Biology']),
(gen_random_uuid(), 'Std 12 Higher Secondary (Commerce)', '2024-25', 'bfSoopCm0i8', ARRAY['Accounts', 'Stats', 'B.A.']);

-- 2. Insert Basic notices
INSERT INTO notices (title, content, priority) VALUES
('Board Exam Registration', 'Students of Std 10 and 12 must submit their migration certificates by next Monday.', 'urgent'),
('Monthly Mock Test', 'The scholarship evaluation test for all batches is scheduled for coming Sunday at 9:00 AM.', 'normal'),
('Digital ID Cards', 'Please download your digital ID cards from the profile section for campus entry.', 'announcement');

-- 3. Insert Global Settings
INSERT INTO settings (id, academy_name, academic_year, admission_status, contact_phone)
VALUES ('global_config', 'Krishna Academy Upleta', '2024-25', 'Open', '+91 81609 91166')
ON CONFLICT (id) DO UPDATE SET academy_name = EXCLUDED.academy_name;

COMMIT;
