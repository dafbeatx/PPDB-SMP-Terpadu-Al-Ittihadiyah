-- Add new fields to students table
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

-- Add new fields to parents table
ALTER TABLE parents
ADD COLUMN IF NOT EXISTS pendidikan_ayah VARCHAR(50),
ADD COLUMN IF NOT EXISTS pendidikan_ibu VARCHAR(50),
ADD COLUMN IF NOT EXISTS nama_wali VARCHAR(100),
ADD COLUMN IF NOT EXISTS hubungan_wali VARCHAR(50);

-- Add comments for clarity
COMMENT ON COLUMN students.nik_siswa IS 'Nomor Induk Kependudukan Siswa';
COMMENT ON COLUMN students.anak_ke IS 'Siswa adalah anak ke-n';
COMMENT ON COLUMN students.tahun_lulus IS 'Tahun lulus dari sekolah asal';
COMMENT ON COLUMN students.tinggal_dengan IS 'Siswa tinggal dengan siapa (Orang Tua, Wali, Asrama, dll)';
