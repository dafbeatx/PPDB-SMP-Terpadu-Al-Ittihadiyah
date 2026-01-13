-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM for registration status
CREATE TYPE registration_status AS ENUM ('pending', 'verified', 'accepted', 'rejected');

-- Table: registrations (main registration data)
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_number VARCHAR(20) UNIQUE NOT NULL,
  status registration_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: students (student data)
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  nisn VARCHAR(10) NOT NULL,
  birth_place VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  gender VARCHAR(20) NOT NULL CHECK (gender IN ('Laki-laki', 'Perempuan')),
  address TEXT NOT NULL,
  previous_school VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: parents (parent/guardian data)
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  father_name VARCHAR(255) NOT NULL,
  mother_name VARCHAR(255) NOT NULL,
  father_occupation VARCHAR(100),
  mother_occupation VARCHAR(100),
  phone_number VARCHAR(20) NOT NULL,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: documents (uploaded files metadata)
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('ktp', 'kartu_keluarga', 'ijazah')),
  file_path TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: admin_users (admin authentication)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_registrations_number ON registrations(registration_number);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_students_registration ON students(registration_id);
CREATE INDEX idx_parents_registration ON parents(registration_id);
CREATE INDEX idx_documents_registration ON documents(registration_id);

-- Function to auto-generate registration number
CREATE OR REPLACE FUNCTION generate_registration_number()
RETURNS TRIGGER AS $$
DECLARE
  year_code VARCHAR(4);
  sequence_num VARCHAR(6);
BEGIN
  -- Get current year (last 2 digits)
  year_code := TO_CHAR(NOW(), 'YY');
  
  -- Get sequence number (count + 1, padded to 6 digits)
  SELECT LPAD((COUNT(*) + 1)::TEXT, 6, '0') INTO sequence_num
  FROM registrations
  WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
  
  -- Format: PPDB-YY-XXXXXX (e.g., PPDB-26-000001)
  NEW.registration_number := 'PPDB-' || year_code || '-' || sequence_num;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate registration number on insert
CREATE TRIGGER trg_generate_registration_number
BEFORE INSERT ON registrations
FOR EACH ROW
WHEN (NEW.registration_number IS NULL OR NEW.registration_number = '')
EXECUTE FUNCTION generate_registration_number();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER trg_update_registrations_updated_at
BEFORE UPDATE ON registrations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_students_updated_at
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_parents_updated_at
BEFORE UPDATE ON parents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert new registrations (for public registration form)
CREATE POLICY "Allow public insert on registrations"
ON registrations
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow public insert on students"
ON students
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow public insert on parents"
ON parents
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow public insert on documents"
ON documents
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Admins can view and update all data
CREATE POLICY "Admin select all registrations"
ON registrations
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin update registrations"
ON registrations
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin select all students"
ON students
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin select all parents"
ON parents
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin select all documents"
ON documents
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.email = auth.jwt() ->> 'email'
  )
);

-- Storage bucket for documents
-- Run this in Supabase Dashboard SQL Editor or via API:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage policy: Allow public upload
-- CREATE POLICY "Allow public upload"
-- ON storage.objects FOR INSERT
-- TO anon
-- WITH CHECK (bucket_id = 'documents');

-- Storage policy: Admins can view all
-- CREATE POLICY "Admin select all"
-- ON storage.objects FOR SELECT
-- TO authenticated
-- USING (
--   bucket_id = 'documents' AND
--   EXISTS (
--     SELECT 1 FROM admin_users
--     WHERE admin_users.email = auth.jwt() ->> 'email'
--   )
-- );
