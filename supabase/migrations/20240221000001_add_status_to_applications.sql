-- Add status column to internship_applications table if it doesn't exist
-- This migration is kept for backward compatibility
-- The status column is now included in the initial table creation migration
ALTER TABLE internship_applications 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Add index for better performance if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_internship_applications_status 
ON internship_applications(status);

-- Add comment for documentation if it doesn't exist
COMMENT ON COLUMN internship_applications.status IS 'Application status: pending, accepted, or rejected';
