-- Create testimonials table with approval workflow
CREATE TABLE public.testimonials (
  id uuid not null default extensions.uuid_generate_v4 (),
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  full_name text not null,
  email text not null,
  linkedin_url text null,
  description text not null,
  status text not null default 'pending'::text,
  constraint testimonials_pkey primary key (id),
  constraint testimonials_description_check check (char_length(description) >= 20),
  constraint testimonials_status_check check (status in ('pending'::text, 'accepted'::text, 'rejected'::text))
) TABLESPACE pg_default;

-- Add indexes for better performance
CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at DESC);

-- Add comments for documentation
COMMENT ON TABLE testimonials IS 'Table to store user testimonials with approval workflow';
COMMENT ON COLUMN testimonials.status IS 'Testimonial status: pending, accepted, or rejected';
COMMENT ON COLUMN testimonials.linkedin_url IS 'Optional LinkedIn profile URL';
COMMENT ON COLUMN testimonials.description IS 'Testimonial content with minimum 20 characters';

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert testimonials (for public submissions)
CREATE POLICY "Anyone can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to read all testimonials
CREATE POLICY "Admins can read all testimonials" ON testimonials
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- Allow authenticated admins to update testimonials
CREATE POLICY "Admins can update testimonials" ON testimonials
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

-- Allow authenticated admins to delete testimonials
CREATE POLICY "Admins can delete testimonials" ON testimonials
  FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');
