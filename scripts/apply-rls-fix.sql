-- Script to apply RLS fixes for internship_applications
-- Run this script directly in Supabase SQL Editor if migrations don't work

-- Step 1: Enable RLS if not already enabled
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

-- Step 2: Remove all existing policies
DROP POLICY IF EXISTS "Users can view their own applications" ON internship_applications;
DROP POLICY IF EXISTS "Users can insert applications" ON internship_applications;
DROP POLICY IF EXISTS "Users can update their own applications" ON internship_applications;
DROP POLICY IF EXISTS "Admins can view all applications" ON internship_applications;
DROP POLICY IF EXISTS "Anyone can insert applications" ON internship_applications;
DROP POLICY IF EXISTS "Admins can update applications" ON internship_applications;
DROP POLICY IF EXISTS "Service role can delete applications" ON internship_applications;
DROP POLICY IF EXISTS "Authenticated users can view applications" ON internship_applications;
DROP POLICY IF EXISTS "Authenticated users can update applications" ON internship_applications;

-- Step 3: Create simple, permissive policies for testing

-- Allow any authenticated user to read applications
CREATE POLICY "Authenticated users can view applications" ON internship_applications
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow anyone to insert applications (form submissions)
CREATE POLICY "Anyone can insert applications" ON internship_applications
    FOR INSERT WITH CHECK (true);

-- Allow any authenticated user to update applications
CREATE POLICY "Authenticated users can update applications" ON internship_applications
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Step 4: Verify policies are created
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE tablename = 'internship_applications';
