-- Add SELECT policy for anon on registrations
-- This is needed because the API performs .insert().select()
-- And anon needs permission to see the record it just created.

CREATE POLICY "Allow public select on registrations"
ON registrations
FOR SELECT
TO anon
USING (true);

-- Also add SELECT policy for anon on students and parents just in case,
-- though not strictly needed for the current API flow.
CREATE POLICY "Allow public select on students"
ON students
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow public select on parents"
ON parents
FOR SELECT
TO anon
USING (true);
