-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admins can manage certificates" ON certificates;
DROP POLICY IF EXISTS "Admins can insert certificates" ON certificates;
DROP POLICY IF EXISTS "Admins can update certificates" ON certificates;
DROP POLICY IF EXISTS "Admins can delete certificates" ON certificates;
DROP POLICY IF EXISTS "Public can view certificates" ON certificates;

-- Create new comprehensive policies
CREATE POLICY "Admins can do everything with certificates" ON certificates
  FOR ALL USING (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );

-- Public can read certificates for verification
CREATE POLICY "Public can read certificates" ON certificates
  FOR SELECT USING (true);
