-- Fix testimonials RLS policy - handle existing policies
-- Run this in your Supabase SQL Editor

-- First, let's see what policies currently exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'testimonials';

-- Drop all existing policies on testimonials table
DROP POLICY IF EXISTS "Anyone can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Anyone can read approved testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can read all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can delete testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can read all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON testimonials;

-- Create new policies with proper access control

-- Allow anyone to insert testimonials (for public submissions)
CREATE POLICY "Anyone can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read approved testimonials (for public display)
CREATE POLICY "Anyone can read approved testimonials" ON testimonials
  FOR SELECT USING (status = 'accepted');

-- Allow authenticated users to read all testimonials (for admin access)
CREATE POLICY "Authenticated users can read all testimonials" ON testimonials
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update testimonials (for admin access)
CREATE POLICY "Authenticated users can update testimonials" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete testimonials (for admin access)
CREATE POLICY "Authenticated users can delete testimonials" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

-- Verify the policies were created correctly
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'testimonials';
