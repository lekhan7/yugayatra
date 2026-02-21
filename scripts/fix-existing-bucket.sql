-- Fix existing resumes bucket to be public
-- Run this in Supabase SQL Editor if bucket already exists

UPDATE storage.buckets 
SET public = true 
WHERE id = 'resumes' AND name = 'resumes';

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Users can read own resumes" ON storage.objects;
DROP POLICY IF EXISTS "Service role can manage all resumes" ON storage.objects;

-- Create new policies for public access
CREATE POLICY "Anyone can upload resumes" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'resumes'
);

CREATE POLICY "Anyone can read resumes" ON storage.objects
FOR SELECT USING (
  bucket_id = 'resumes'
);

CREATE POLICY "Service role can manage all resumes" ON storage.objects
FOR ALL USING (
  bucket_id = 'resumes' AND
  auth.role() = 'service_role'
);
