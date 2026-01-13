-- CMS Content Management Table
CREATE TABLE IF NOT EXISTS page_contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section VARCHAR(100) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value_type VARCHAR(20) NOT NULL,
  value TEXT NOT NULL,
  label VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id),
  UNIQUE(section, key)
);

-- Index for faster queries
CREATE INDEX idx_page_contents_category ON page_contents(category);
CREATE INDEX idx_page_contents_section ON page_contents(section);

-- Trigger to update updated_at
CREATE TRIGGER trg_update_page_contents_updated_at
BEFORE UPDATE ON page_contents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Seed default content from existing landing page

-- HERO SECTION
INSERT INTO page_contents (section, key, value_type, value, label, category, display_order) VALUES
('hero', 'school_name', 'text', 'SMP Terpadu Al-Ittihadiyah', 'Nama Sekolah', 'hero', 1),
('hero', 'tagline', 'text', 'Pendaftaran Peserta Didik Baru (PPDB)', 'Tagline', 'hero', 2),
('hero', 'year', 'text', 'Tahun Ajaran 2026/2027', 'Tahun Ajaran', 'hero', 3),
('hero', 'stat_experience', 'number', '20', 'Tahun Berpengalaman', 'hero', 4),
('hero', 'stat_graduate', 'number', '95', 'Persentase Melanjutkan SMA (%)', 'hero', 5),
('hero', 'stat_accreditation', 'text', 'A', 'Akreditasi', 'hero', 6);

-- PROFILE SECTION
INSERT INTO page_contents (section, key, value_type, value, label, category, display_order) VALUES
('profile', 'title', 'text', 'Profil Sekolah', 'Judul Section', 'profile', 1),
('profile', 'subtitle', 'text', 'Mengenal lebih dekat SMP Terpadu Al-Ittihadiyah', 'Subjudul', 'profile', 2),
('profile', 'paragraph_1', 'textarea', 'SMP Terpadu Al-Ittihadiyah adalah lembaga pendidikan Islam yang berkomitmen untuk mencetak generasi unggul dalam prestasi akademik dan berakhlak mulia. Dengan pengalaman lebih dari 20 tahun, kami telah melahirkan ribuan alumni yang sukses di berbagai bidang.', 'Paragraf 1', 'profile', 3),
('profile', 'paragraph_2', 'textarea', 'Sekolah kami menggabungkan kurikulum nasional dengan pendidikan karakter Islami, menciptakan lingkungan belajar yang kondusif dan menyenangkan. Didukung oleh tenaga pendidik yang profesional dan berpengalaman, serta fasilitas yang lengkap dan modern.', 'Paragraf 2', 'profile', 4);

-- VISI MISI
INSERT INTO page_contents (section, key, value_type, value, label, category, display_order) VALUES
('visi_misi', 'title', 'text', 'Visi & Misi', 'Judul Section', 'visi_misi', 1),
('visi_misi', 'subtitle', 'text', 'Arah dan tujuan pendidikan kami', 'Subjudul', 'visi_misi', 2),
('visi_misi', 'visi', 'textarea', 'Menjadi lembaga pendidikan Islam terpadu yang unggul dalam prestasi, berakhlak mulia, dan berjiwa pemimpin berdasarkan nilai-nilai Al-Quran dan As-Sunnah.', 'Visi', 'visi_misi', 3),
('visi_misi', 'misi_1', 'text', 'Menyelenggarakan pendidikan berkualitas dengan kurikulum terpadu', 'Misi 1', 'visi_misi', 4),
('visi_misi', 'misi_2', 'text', 'Membentuk karakter Islami yang kuat', 'Misi 2', 'visi_misi', 5),
('visi_misi', 'misi_3', 'text', 'Mengembangkan potensi siswa secara maksimal', 'Misi 3', 'visi_misi', 6),
('visi_misi', 'misi_4', 'text', 'Menciptakan lingkungan belajar yang kondusif', 'Misi 4', 'visi_misi', 7);

-- KEUNGGULAN
INSERT INTO page_contents (section, key, value_type, value, label, category, display_order) VALUES
('keunggulan', 'title', 'text', 'Keunggulan Sekolah', 'Judul Section', 'keunggulan', 1),
('keunggulan', 'subtitle', 'text', 'Mengapa memilih SMP Terpadu Al-Ittihadiyah?', 'Subjudul', 'keunggulan', 2),
('keunggulan', 'item_1_title', 'text', 'Prestasi Akademik', 'Keunggulan 1 - Judul', 'keunggulan', 3),
('keunggulan', 'item_1_desc', 'textarea', 'Siswa kami konsisten meraih prestasi di berbagai kompetisi lokal dan nasional', 'Keunggulan 1 - Deskripsi', 'keunggulan', 4),
('keunggulan', 'item_2_title', 'text', 'Kurikulum Terpadu', 'Keunggulan 2 - Judul', 'keunggulan', 5),
('keunggulan', 'item_2_desc', 'textarea', 'Menggabungkan kurikulum nasional dengan pendidikan agama Islam yang komprehensif', 'Keunggulan 2 - Deskripsi', 'keunggulan', 6),
('keunggulan', 'item_3_title', 'text', 'Guru Profesional', 'Keunggulan 3 - Judul', 'keunggulan', 7),
('keunggulan', 'item_3_desc', 'textarea', 'Tenaga pendidik berpengalaman, berkompeten, dan penuh dedikasi', 'Keunggulan 3 - Deskripsi', 'keunggulan', 8),
('keunggulan', 'item_4_title', 'text', 'Fasilitas Lengkap', 'Keunggulan 4 - Judul', 'keunggulan', 9),
('keunggulan', 'item_4_desc', 'textarea', 'Sarana prasarana modern untuk mendukung kegiatan belajar mengajar', 'Keunggulan 4 - Deskripsi', 'keunggulan', 10);

-- ALUR PPDB
INSERT INTO page_contents (section, key, value_type, value, label, category, display_order) VALUES
('alur', 'title', 'text', 'Alur Pendaftaran PPDB', 'Judul Section', 'alur', 1),
('alur', 'subtitle', 'text', 'Proses pendaftaran yang mudah dan cepat', 'Subjudul', 'alur', 2),
('alur', 'step_1_title', 'text', 'Isi Formulir', 'Step 1 - Judul', 'alur', 3),
('alur', 'step_1_desc', 'text', 'Lengkapi data siswa dan orang tua dengan benar', 'Step 1 - Deskripsi', 'alur', 4),
('alur', 'step_2_title', 'text', 'Upload Dokumen', 'Step 2 - Judul', 'alur', 5),
('alur', 'step_2_desc', 'text', 'Unggah KTP, Kartu Keluarga, dan Ijazah (format JPG)', 'Step 2 - Deskripsi', 'alur', 6),
('alur', 'step_3_title', 'text', 'Verifikasi Admin', 'Step 3 - Judul', 'alur', 7),
('alur', 'step_3_desc', 'text', 'Tim kami akan memverifikasi data Anda (1-3 hari kerja)', 'Step 3 - Deskripsi', 'alur', 8),
('alur', 'step_4_title', 'text', 'Konfirmasi Diterima', 'Step 4 - Judul', 'alur', 9),
('alur', 'step_4_desc', 'text', 'Anda akan dihubungi untuk proses selanjutnya', 'Step 4 - Deskripsi', 'alur', 10),
('alur', 'cta_title', 'text', 'Siap Mendaftar?', 'CTA - Judul', 'alur', 11),
('alur', 'cta_text', 'text', 'Proses pendaftaran online hanya membutuhkan waktu sekitar 10-15 menit', 'CTA - Teks', 'alur', 12);

-- FOOTER
INSERT INTO page_contents (section, key, value_type, value, label, category, display_order) VALUES
('footer', 'school_desc', 'textarea', 'Lembaga pendidikan Islam terpadu yang berkomitmen mencetak generasi unggul dan berakhlak mulia.', 'Deskripsi Sekolah', 'footer', 1),
('footer', 'address', 'text', 'Jl. Pendidikan No. 123, Medan', 'Alamat', 'footer', 2),
('footer', 'phone', 'text', '(061) 1234-5678', 'Telepon', 'footer', 3),
('footer', 'email', 'text', 'info@smptalittihadiyah.sch.id', 'Email', 'footer', 4),
('footer', 'hours_weekday', 'text', 'Senin - Jumat: 07:30 - 16:00', 'Jam Kerja Weekday', 'footer', 5),
('footer', 'hours_saturday', 'text', 'Sabtu: 07:30 - 12:00', 'Jam Kerja Sabtu', 'footer', 6),
('footer', 'hours_sunday', 'text', 'Minggu: Libur', 'Jam Kerja Minggu', 'footer', 7);

-- RLS Policies for page_contents
ALTER TABLE page_contents ENABLE ROW LEVEL SECURITY;

-- Anyone can read content
CREATE POLICY "Allow public read on page_contents"
ON page_contents
FOR SELECT
TO anon, authenticated
USING (true);

-- Only admins can update content
CREATE POLICY "Admin update page_contents"
ON page_contents
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.email = auth.jwt() ->> 'email'
  )
);

-- Only admins can insert content
CREATE POLICY "Admin insert page_contents"
ON page_contents
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.email = auth.jwt() ->> 'email'
  )
);

-- Only admins can delete content
CREATE POLICY "Admin delete page_contents"
ON page_contents
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.email = auth.jwt() ->> 'email'
  )
);
