-- Add email field to parents table
ALTER TABLE parents
ADD COLUMN IF NOT EXISTS email VARCHAR(255);

-- Add comment for clarity
COMMENT ON COLUMN parents.email IS 'Email address of parent or guardian for notifications';
