-- Create internship_applications table
CREATE TABLE public.internship_applications (
  id uuid not null default extensions.uuid_generate_v4 (),
  created_at timestamp with time zone null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  role text not null,
  education text not null,
  experience text null,
  skills text not null,
  motivation text null,
  resume_url text null,
  resume_filename text null,
  status text null default 'pending'::text,
  constraint internship_applications_pkey primary key (id)
) TABLESPACE pg_default;

-- Add indexes for better performance
CREATE INDEX idx_internship_applications_email ON internship_applications(email);
CREATE INDEX idx_internship_applications_status ON internship_applications(status);
CREATE INDEX idx_internship_applications_role ON internship_applications(role);

-- Add comments for documentation
COMMENT ON TABLE internship_applications IS 'Table to store internship applications submitted through the website';
COMMENT ON COLUMN internship_applications.status IS 'Application status: pending, accepted, or rejected';
COMMENT ON COLUMN internship_applications.resume_url IS 'URL to the stored resume file in Supabase storage';
COMMENT ON COLUMN internship_applications.resume_filename IS 'Original filename of the uploaded resume';
