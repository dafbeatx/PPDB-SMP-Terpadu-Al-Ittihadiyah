-- COMPREHENSIVE RLS FIX FOR REGISTRATION
-- Execute this in Supabase SQL Editor to ensure registration works for everyone (Anon & Admin)

-- 1. registrations table
DROP POLICY IF EXISTS "Allow public insert on registrations" ON registrations;
DROP POLICY IF EXISTS "Allow public select on registrations" ON registrations;

CREATE POLICY "Enable insert for all users" 
ON registrations FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Enable select for all users" 
ON registrations FOR SELECT 
TO public 
USING (true);

-- 2. students table
DROP POLICY IF EXISTS "Allow public insert on students" ON students;
DROP POLICY IF EXISTS "Allow public select on students" ON students;

CREATE POLICY "Enable insert for all users" 
ON students FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Enable select for all users" 
ON students FOR SELECT 
TO public 
USING (true);

-- 3. parents table
DROP POLICY IF EXISTS "Allow public insert on parents" ON parents;
DROP POLICY IF EXISTS "Allow public select on parents" ON parents;

CREATE POLICY "Enable insert for all users" 
ON parents FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Enable select for all users" 
ON parents FOR SELECT 
TO public 
USING (true);

-- 4. documents table (needed for the upload step)
DROP POLICY IF EXISTS "Allow public insert on documents" ON documents;
DROP POLICY IF EXISTS "Allow public select on documents" ON documents;

CREATE POLICY "Enable insert for all users" 
ON documents FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Enable select for all users" 
ON documents FOR SELECT 
TO public 
USING (true);
