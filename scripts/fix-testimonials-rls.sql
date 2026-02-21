-- Fix RLS policies for testimonials table
-- Run this in your Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can read all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can delete testimonials" ON testimonials;

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
