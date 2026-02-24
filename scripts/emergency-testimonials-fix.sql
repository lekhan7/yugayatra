-- EMERGENCY FIX: Completely reset testimonials RLS policies
-- Run this in your Supabase SQL Editor

-- Disable RLS temporarily
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create simple policies that work
-- Allow anyone to insert testimonials
CREATE POLICY "Enable insert" ON testimonials
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read testimonials
CREATE POLICY "Enable select" ON testimonials
  FOR SELECT USING (true);

-- Allow authenticated users to update/delete
CREATE POLICY "Enable update" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

-- Check current policies
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'testimonials';
