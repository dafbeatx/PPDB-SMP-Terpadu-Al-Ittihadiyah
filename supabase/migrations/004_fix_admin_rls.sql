-- Fix RLS policy for admin_users table
-- The issue: admin_users policies are too restrictive, causing circular dependency

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow authenticated read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Admin read admin_users" ON admin_users;

-- Allow any authenticated user to read admin_users table
-- This is safe because we check admin status separately in application logic
CREATE POLICY "Allow authenticated read admin_users"
ON admin_users
FOR SELECT
TO authenticated
USING (true);

-- Note: We ONLY allow reading. Writing is still protected.
-- This allows the login flow to check if a user is an admin.
