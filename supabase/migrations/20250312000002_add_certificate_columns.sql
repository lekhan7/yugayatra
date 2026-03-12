-- Add new columns to certificates table
ALTER TABLE certificates 
ADD COLUMN IF NOT EXISTS intern_name TEXT,
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS certificate_url TEXT,
ADD COLUMN IF NOT EXISTS qr_code_url TEXT;

-- Create indexes for new fields
CREATE INDEX IF NOT EXISTS idx_certificates_intern_name ON certificates(intern_name);
CREATE INDEX IF NOT EXISTS idx_certificates_start_date ON certificates(start_date);
CREATE INDEX IF NOT EXISTS idx_certificates_end_date ON certificates(end_date);
