-- Manual Database Setup Script for Alumni Management System
-- Run this script in your Supabase SQL Editor

-- 1. Create alumni table
CREATE TABLE alumni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  image TEXT,
  batch TEXT NOT NULL,
  quote TEXT,
  achievements TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  linkedin TEXT,
  github TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for performance
CREATE INDEX idx_alumni_is_active ON alumni(is_active);
CREATE INDEX idx_alumni_display_order ON alumni(display_order);
CREATE INDEX idx_alumni_batch ON alumni(batch);

-- 3. Enable RLS (Row Level Security)
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;

-- 4. Create policies
-- Allow public read access for active alumni
CREATE POLICY "Public can view active alumni" ON alumni
  FOR SELECT USING (is_active = true);

-- Allow admin full access
CREATE POLICY "Admins can manage alumni" ON alumni
  FOR ALL USING (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );

-- 5. Create trigger for updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_alumni_updated_at
  BEFORE UPDATE ON alumni
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- 6. Create alumni-images storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'alumni-images', 
  'alumni-images', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- 7. Create policies for alumni-images bucket
-- Allow public read access to all images
CREATE POLICY "Public can view alumni images" ON storage.objects
  FOR SELECT USING (bucket_id = 'alumni-images');

-- Allow authenticated users to upload alumni images
CREATE POLICY "Authenticated users can upload alumni images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'alumni-images' AND 
    auth.role() = 'authenticated'
  );

-- Allow authenticated users to update their own alumni images
CREATE POLICY "Authenticated users can update alumni images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'alumni-images' AND 
    auth.role() = 'authenticated'
  );

-- Allow admins to delete alumni images
CREATE POLICY "Admins can delete alumni images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'alumni-images' AND
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );

-- 8. Insert sample alumni data (optional)
INSERT INTO alumni (name, role, company, location, batch, quote, achievements, skills, linkedin, github, display_order, is_active) VALUES
('Ganesh Lagad', 'Full Stack Developer', 'Tech Solutions Inc.', 'Bangalore, India', '2024', 
'YugaYatra Retail (OPC) Pvt Ltd provided me with the perfect platform to transition from learning to real-world application. The mentorship and hands-on projects were invaluable.',
ARRAY['Led development of 5+ enterprise applications', 'Mentored 20+ junior developers', 'Published technical articles on Medium'],
ARRAY['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'],
'https://linkedin.com/in/ganeshlagad', 'https://github.com/ganeshlagad', 1, true),

('Aashritha Reddy', 'Digital Marketing Manager', 'Growth Labs', 'Hyderabad, India', '2024',
'The digital marketing program at YugaYatra Retail (OPC) Pvt Ltd gave me practical skills that I could immediately apply. The industry connections I made were crucial for my career.',
ARRAY['Increased brand engagement by 150%', 'Managed $500K+ ad spend budget', 'Won Digital Marketing Excellence Award 2024'],
ARRAY['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Strategy'],
'https://linkedin.com/in/aashrithareddy', 'https://github.com/aashritha', 2, true),

('Samyuktha Nakirikanti', 'UX/UI Designer', 'Design Studio Pro', 'Pune, India', '2024',
'The design training at YugaYatra Retail (OPC) Pvt Ltd was comprehensive and industry-relevant. I learned not just tools, but the thinking process behind great design.',
ARRAY['Designed 15+ mobile applications', 'Improved user conversion by 40%', 'Featured in Design Weekly Magazine'],
ARRAY['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
'https://linkedin.com/in/samyuktha', 'https://github.com/samyuktha', 3, true);

-- Success message
SELECT 'Alumni Management System setup completed successfully!' as status;
