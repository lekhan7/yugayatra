-- Add RLS policies for internship_applications table
-- This migration fixes the issue where authenticated users cannot read applications

-- First, ensure RLS is enabled on the table
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own applications" ON internship_applications;
DROP POLICY IF EXISTS "Users can insert applications" ON internship_applications;
DROP POLICY IF EXISTS "Users can update their own applications" ON internship_applications;

-- Policy 1: Allow authenticated users to read all applications (admin access)
CREATE POLICY "Admins can view all applications" ON internship_applications
    FOR SELECT USING (
        auth.role() = 'authenticated' 
        AND EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.email()
        )
    );

-- Policy 2: Allow anyone to insert applications (for form submissions)
CREATE POLICY "Anyone can insert applications" ON internship_applications
    FOR INSERT WITH CHECK (true);

-- Policy 3: Allow authenticated admins to update applications (for status changes)
CREATE POLICY "Admins can update applications" ON internship_applications
    FOR UPDATE USING (
        auth.role() = 'authenticated' 
        AND EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.email()
        )
    );

-- Policy 4: Allow service role to delete applications (for maintenance)
CREATE POLICY "Service role can delete applications" ON internship_applications
    FOR DELETE USING (auth.role() = 'service_role');

-- Add comments for documentation
COMMENT ON POLICY "Admins can view all applications" ON internship_applications IS 'Allows authenticated admin users to read all internship applications';
COMMENT ON POLICY "Anyone can insert applications" ON internship_applications IS 'Allows anonymous users to submit new applications';
COMMENT ON POLICY "Admins can update applications" ON internship_applications IS 'Allows authenticated admin users to update application status';
COMMENT ON POLICY "Service role can delete applications" ON internship_applications IS 'Allows service role to delete applications for maintenance';
