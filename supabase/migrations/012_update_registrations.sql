-- Migration to synchronize all form fields and ensure correct types
-- This script uses ALTER TABLE to avoid data loss.

-- 1. Ensure students table has all fields from StudentFormData
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS nik_siswa VARCHAR(16),
ADD COLUMN IF NOT EXISTS agama VARCHAR(20),
ADD COLUMN IF NOT EXISTS anak_ke INTEGER,
ADD COLUMN IF NOT EXISTS desa VARCHAR(100),
ADD COLUMN IF NOT EXISTS kecamatan VARCHAR(100),
ADD COLUMN IF NOT EXISTS kabupaten VARCHAR(100),
ADD COLUMN IF NOT EXISTS tahun_lulus VARCHAR(4),
ADD COLUMN IF NOT EXISTS prestasi TEXT,
ADD COLUMN IF NOT EXISTS hafalan_quran VARCHAR(100),
ADD COLUMN IF NOT EXISTS tinggal_dengan VARCHAR(50);

-- 2. Ensure parents table has all fields from ParentFormData
ALTER TABLE parents
ADD COLUMN IF NOT EXISTS email VARCHAR(255),
ADD COLUMN IF NOT EXISTS whatsapp VARCHAR(20), -- Explicit whatsapp field if needed
ADD COLUMN IF NOT EXISTS pendidikan_ayah VARCHAR(50),
ADD COLUMN IF NOT EXISTS pendidikan_ibu VARCHAR(50),
ADD COLUMN IF NOT EXISTS nama_wali VARCHAR(100),
ADD COLUMN IF NOT EXISTS hubungan_wali VARCHAR(50);

-- 3. Add index to email for faster lookups in admin/notifications
CREATE INDEX IF NOT EXISTS idx_parents_email ON parents(email);

-- 4. Ensure registrations has updated_at and status is correct
-- status enum already exists: 'pending', 'verified', 'accepted', 'rejected'

COMMENT ON COLUMN parents.whatsapp IS 'Nomor WhatsApp orang tua/wali';
COMMENT ON COLUMN parents.email IS 'Email orang tua/wali untuk notifikasi';
