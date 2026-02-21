-- Alternative simpler RLS policies for internship_applications
-- This provides broader access for testing and troubleshooting

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can view all applications" ON internship_applications;
DROP POLICY IF EXISTS "Anyone can insert applications" ON internship_applications;
DROP POLICY IF EXISTS "Admins can update applications" ON internship_applications;
DROP POLICY IF EXISTS "Service role can delete applications" ON internship_applications;

-- Simple Policy 1: Allow any authenticated user to read all applications
CREATE POLICY "Authenticated users can view applications" ON internship_applications
    FOR SELECT USING (auth.role() = 'authenticated');

-- Simple Policy 2: Allow anyone to insert applications (for form submissions)
CREATE POLICY "Anyone can insert applications" ON internship_applications
    FOR INSERT WITH CHECK (true);

-- Simple Policy 3: Allow any authenticated user to update applications
CREATE POLICY "Authenticated users can update applications" ON internship_applications
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Add comments
COMMENT ON POLICY "Authenticated users can view applications" ON internship_applications IS 'Allows any authenticated user to read all applications';
COMMENT ON POLICY "Anyone can insert applications" ON internship_applications IS 'Allows anyone to submit new applications';
COMMENT ON POLICY "Authenticated users can update applications" ON internship_applications IS 'Allows any authenticated user to update applications';
