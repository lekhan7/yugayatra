-- Update certificates table to match new requirements
ALTER TABLE certificates 
ADD COLUMN IF NOT EXISTS intern_name TEXT,
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS certificate_url TEXT,
ADD COLUMN IF NOT EXISTS qr_code_url TEXT;

-- Add new RLS policies for the new fields
CREATE POLICY "Admins can insert certificates" ON certificates
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );

CREATE POLICY "Admins can update certificates" ON certificates
  FOR UPDATE USING (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );

CREATE POLICY "Admins can delete certificates" ON certificates
  FOR DELETE USING (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );

-- Create indexes for new fields
CREATE INDEX IF NOT EXISTS idx_certificates_intern_name ON certificates(intern_name);
CREATE INDEX IF NOT EXISTS idx_certificates_start_date ON certificates(start_date);
CREATE INDEX IF NOT EXISTS idx_certificates_end_date ON certificates(end_date);

CREATE POLICY "Admins can update certificates" ON certificates
  FOR UPDATE USING (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );

CREATE POLICY "Admins can delete certificates" ON certificates
  FOR DELETE USING (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );

-- Create indexes for new fields
CREATE INDEX IF NOT EXISTS idx_certificates_intern_name ON certificates(intern_name);
CREATE INDEX IF NOT EXISTS idx_certificates_start_date ON certificates(start_date);
CREATE INDEX IF NOT EXISTS idx_certificates_end_date ON certificates(end_date);
