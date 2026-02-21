-- Setup script for YugYatra Internship Application System
-- Run this in your Supabase SQL Editor

-- 1. Create the resumes storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes', 
  'resumes', 
  true, -- Public bucket (allows public URLs)
  5242880, -- 5MB in bytes
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
) ON CONFLICT (id) DO NOTHING;

-- 2. Set up Row Level Security (RLS) policies for the resumes bucket

-- Allow anyone to upload resumes (public bucket)
CREATE POLICY "Anyone can upload resumes" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'resumes'
);

-- Allow anyone to read resumes (public bucket)
CREATE POLICY "Anyone can read resumes" ON storage.objects
FOR SELECT USING (
  bucket_id = 'resumes'
);

-- Allow service role to manage all resumes (for admin access)
CREATE POLICY "Service role can manage all resumes" ON storage.objects
FOR ALL USING (
  bucket_id = 'resumes' AND
  auth.role() = 'service_role'
);

-- 3. Ensure the internship_applications table exists with the correct structure
CREATE TABLE IF NOT EXISTS internship_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL,
  education TEXT NOT NULL,
  experience TEXT,
  skills TEXT NOT NULL,
  motivation TEXT,
  resume_url TEXT,
  resume_filename TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected'))
);

-- 4. Set up RLS for internship_applications table
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert applications (for form submissions)
CREATE POLICY "Anyone can submit applications" ON internship_applications
FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admins) to read all applications
CREATE POLICY "Authenticated users can read applications" ON internship_applications
FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users (admins) to update applications
CREATE POLICY "Authenticated users can update applications" ON internship_applications
FOR UPDATE USING (auth.role() = 'authenticated');

-- 5. Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_internship_applications_status ON internship_applications(status);
CREATE INDEX IF NOT EXISTS idx_internship_applications_created_at ON internship_applications(created_at DESC);

-- 6. Grant necessary permissions
GRANT ALL ON storage.buckets TO authenticated;
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON internship_applications TO authenticated;
GRANT SELECT ON internship_applications TO anon; -- Allow reading for stats if needed
