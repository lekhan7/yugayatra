-- Add status column to internship_applications table
ALTER TABLE internship_applications 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_internship_applications_status 
ON internship_applications(status);

-- Add comment for documentation
COMMENT ON COLUMN internship_applications.status IS 'Application status: pending, accepted, or rejected';
