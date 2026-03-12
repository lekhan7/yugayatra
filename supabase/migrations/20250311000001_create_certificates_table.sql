-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  intern_id TEXT UNIQUE NOT NULL,
  prefix TEXT NOT NULL DEFAULT 'Mr.',
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  company_name TEXT NOT NULL DEFAULT 'YUGA YATRA RETAIL (OPC) PRIVATE LIMITED',
  company_title TEXT NOT NULL DEFAULT 'Certificate of Internship',
  company_description TEXT,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  issue_date DATE NOT NULL,
  signature_image TEXT,
  qr_code TEXT,
  signer_name TEXT NOT NULL DEFAULT 'Debashish Kumar',
  signer_title TEXT NOT NULL DEFAULT 'Founder & CEO',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can do everything
CREATE POLICY "Admins can manage certificates" ON certificates
  FOR ALL USING (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );

-- Policy: Public can read certificates for verification
CREATE POLICY "Public can view certificates" ON certificates
  FOR SELECT USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_certificates_intern_id ON certificates(intern_id);
CREATE INDEX IF NOT EXISTS idx_certificates_full_name ON certificates(full_name);
CREATE INDEX IF NOT EXISTS idx_certificates_issue_date ON certificates(issue_date);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at
CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
