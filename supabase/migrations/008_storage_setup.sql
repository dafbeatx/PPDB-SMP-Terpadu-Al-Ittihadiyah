-- STORAGE BUCKET AND POLICIES FIX
-- Execute this in Supabase SQL Editor to ensure the 'documents' bucket exists and is accessible.

-- 1. Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow public select" ON storage.objects;
DROP POLICY IF EXISTS "Admin select all" ON storage.objects;

-- 3. Policy: Allow anyone (public) to upload files to the 'documents' bucket
CREATE POLICY "Allow public upload"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'documents');

-- 4. Policy: Allow anyone (public) to view files in the 'documents' bucket
-- (Needed so the app can verify/display uploaded files)
CREATE POLICY "Allow public select"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'documents');

-- 5. Policy: Allow anyone (public) to delete their own uploads if needed (optional)
-- For now, let's keep it simple with INSERT and SELECT.
