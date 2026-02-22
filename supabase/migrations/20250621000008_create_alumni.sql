-- Create alumni table
CREATE TABLE alumni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  image TEXT,
  batch TEXT NOT NULL,
  quote TEXT,
  achievements TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  linkedin TEXT,
  github TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_alumni_is_active ON alumni(is_active);
CREATE INDEX idx_alumni_display_order ON alumni(display_order);
CREATE INDEX idx_alumni_batch ON alumni(batch);

-- Enable RLS (Row Level Security)
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access for active alumni
CREATE POLICY "Public can view active alumni" ON alumni
  FOR SELECT USING (is_active = true);

-- Allow admin full access
CREATE POLICY "Admins can manage alumni" ON alumni
  FOR ALL USING (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_alumni_updated_at
  BEFORE UPDATE ON alumni
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
