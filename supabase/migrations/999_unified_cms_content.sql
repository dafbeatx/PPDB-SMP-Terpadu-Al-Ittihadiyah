-- UNIFIED CMS CONTENT SCHEMA
-- Execute this in Supabase SQL Editor to sync all website content
-- This uses ON CONFLICT to ensure existing data is updated, not duplicated.

INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES 
-- HERO SECTION (category: hero, section: hero)
('hero', 'hero', 'school_name', 'SMP Terpadu Al-Ittihadiyah', 'Nama Sekolah', 'text', 1),
('hero', 'hero', 'tagline', 'Pendaftaran Peserta Didik Baru (PPDB)', 'Tagline', 'text', 2),
('hero', 'hero', 'year', 'Tahun Ajaran 2026/2027', 'Tahun Ajaran', 'text', 3),
('hero', 'hero', 'stat_experience', '20', 'Tahun Berpengalaman', 'number', 4),
('hero', 'hero', 'stat_graduate', '95', 'Persentase Melanjutkan SMA (%)', 'number', 5),
('hero', 'hero', 'stat_accreditation', 'A', 'Akreditasi', 'text', 6),

-- PROFILE SECTION (category: profile, section: profile)
('profile', 'profile', 'title', 'Profil Sekolah', 'Judul Section', 'text', 10),
('profile', 'profile', 'subtitle', 'Mengenal lebih dekat SMP Terpadu Al-Ittihadiyah', 'Subjudul', 'text', 11),
('profile', 'profile', 'paragraph_1', 'SMP Terpadu Al-Ittihadiyah adalah lembaga pendidikan Islam yang berkomitmen untuk mencetak generasi unggul dalam prestasi akademik dan berakhlak mulia.', 'Paragraf 1', 'textarea', 12),
('profile', 'profile', 'paragraph_2', 'Sekolah kami menggabungkan kurikulum nasional dengan pendidikan karakter Islami, menciptakan lingkungan belajar yang kondusif.', 'Paragraf 2', 'textarea', 13),

-- FASILITAS (category: profile, section: fasilitas)
('profile', 'fasilitas', 'item_1', 'Ruang kelas ber-AC', 'Fasilitas 1', 'text', 20),
('profile', 'fasilitas', 'item_2', 'Laboratorium Komputer & Sains', 'Fasilitas 2', 'text', 21),
('profile', 'fasilitas', 'item_3', 'Perpustakaan Digital', 'Fasilitas 3', 'text', 22),
('profile', 'fasilitas', 'item_4', 'Lapangan Olahraga', 'Fasilitas 4', 'text', 23),

-- PROGRAM UNGGULAN (category: profile, section: program)
('profile', 'program', 'item_1', 'Tahfidz Al-Quran', 'Program Unggulan 1', 'text', 30),
('profile', 'program', 'item_2', 'Bahasa Arab & Inggris', 'Program Unggulan 2', 'text', 31),
('profile', 'program', 'item_3', 'Olimpiade Sains', 'Program Unggulan 3', 'text', 32),
('profile', 'program', 'item_4', 'Ekstrakurikuler Beragam', 'Program Unggulan 4', 'text', 33),

-- KEUNGGULAN (category: keunggulan, section: keunggulan & item_x)
('keunggulan', 'keunggulan', 'title', 'Keunggulan Sekolah', 'Judul Section', 'text', 40),
('keunggulan', 'keunggulan', 'subtitle', 'Mengapa memilih SMP Terpadu Al-Ittihadiyah?', 'Subjudul', 'text', 41),
('keunggulan', 'item_1', 'title', 'Prestasi Akademik', 'Keunggulan 1 - Judul', 'text', 42),
('keunggulan', 'item_1', 'description', 'Siswa kami konsisten meraih prestasi di berbagai kompetisi lokal dan nasional', 'Keunggulan 1 - Deskripsi', 'textarea', 43),
('keunggulan', 'item_2', 'title', 'Kurikulum Terpadu', 'Keunggulan 2 - Judul', 'text', 44),
('keunggulan', 'item_2', 'description', 'Menggabungkan kurikulum nasional dengan pendidikan agama Islam yang komprehensif', 'Keunggulan 2 - Deskripsi', 'textarea', 45),
('keunggulan', 'item_3', 'title', 'Guru Profesional', 'Keunggulan 3 - Judul', 'text', 46),
('keunggulan', 'item_3', 'description', 'Tenaga pendidik berpengalaman, berkompeten, dan penuh dedikasi', 'Keunggulan 3 - Deskripsi', 'textarea', 47),
('keunggulan', 'item_4', 'title', 'Fasilitas Lengkap', 'Keunggulan 4 - Judul', 'text', 48),
('keunggulan', 'item_4', 'description', 'Sarana prasarana modern untuk mendukung kegiatan belajar mengajar', 'Keunggulan 4 - Deskripsi', 'textarea', 49),

-- ALUR PPDB (category: alur, section: alur)
('alur', 'alur', 'title', 'Alur Pendaftaran PPDB', 'Judul Section', 'text', 60),
('alur', 'alur', 'subtitle', 'Proses pendaftaran yang mudah dan cepat', 'Subjudul', 'text', 61),
('alur', 'alur', 'step_1_title', 'Isi Formulir', 'Step 1 - Judul', 'text', 62),
('alur', 'alur', 'step_1_desc', 'Lengkapi data siswa dan orang tua dengan benar', 'Step 1 - Deskripsi', 'text', 63),
('alur', 'alur', 'step_2_title', 'Upload Dokumen', 'Step 2 - Judul', 'text', 64),
('alur', 'alur', 'step_2_desc', 'Unggah KTP, Kartu Keluarga, dan Ijazah (format JPG)', 'Step 2 - Deskripsi', 'text', 65),
('alur', 'alur', 'step_3_title', 'Verifikasi Admin', 'Step 3 - Judul', 'text', 66),
('alur', 'alur', 'step_3_desc', 'Tim kami akan memverifikasi data Anda (1-3 hari kerja)', 'Step 3 - Deskripsi', 'text', 67),
('alur', 'alur', 'step_4_title', 'Konfirmasi Diterima', 'Step 4 - Judul', 'text', 68),
('alur', 'alur', 'step_4_desc', 'Anda akan dihubungi untuk proses selanjutnya', 'Step 4 - Deskripsi', 'text', 69),
('alur', 'alur', 'cta_title', 'Siap Mendaftar?', 'CTA - Judul', 'text', 70),
('alur', 'alur', 'cta_text', 'Proses pendaftaran online hanya membutuhkan waktu sekitar 10-15 menit', 'CTA - Teks', 'text', 71),

-- VISI & MISI (category: visi_misi, section: visi_misi)
('visi_misi', 'visi_misi', 'title', 'Visi & Misi', 'Judul Section', 'text', 80),
('visi_misi', 'visi_misi', 'subtitle', 'Arah dan tujuan pendidikan kami', 'Subjudul', 'text', 81),
('visi_misi', 'visi_misi', 'visi', 'Menjadi lembaga pendidikan Islam terpadu yang unggul dalam prestasi, berakhlak mulia, dan berjiwa pemimpin berdasarkan nilai-nilai Al-Quran dan As-Sunnah.', 'Visi', 'textarea', 82),
('visi_misi', 'visi_misi', 'misi_1', 'Menyelenggarakan pendidikan berkualitas dengan kurikulum terpadu', 'Misi 1', 'text', 83),
('visi_misi', 'visi_misi', 'misi_2', 'Membentuk karakter Islami yang kuat', 'Misi 2', 'text', 84),
('visi_misi', 'visi_misi', 'misi_3', 'Mengembangkan potensi siswa secara maksimal', 'Misi 3', 'text', 85),
('visi_misi', 'visi_misi', 'misi_4', 'Menciptakan lingkungan belajar yang kondusif', 'Misi 4', 'text', 86),

-- FOOTER (category: footer, section: footer)
('footer', 'footer', 'school_desc', 'Lembaga pendidikan Islam terpadu yang berkomitmen mencetak generasi unggul dan berakhlak mulia.', 'Deskripsi Sekolah', 'textarea', 90),
('footer', 'footer', 'address', 'Jl. Pendidikan No. 123, Medan', 'Alamat', 'text', 91),
('footer', 'footer', 'phone', '(061) 1234-5678', 'Telepon', 'text', 92),
('footer', 'footer', 'email', 'info@smptalittihadiyah.sch.id', 'Email', 'text', 93),
('footer', 'footer', 'hours_weekday', 'Senin - Jumat: 07:30 - 16:00', 'Jam Kerja Weekday', 'text', 94),
('footer', 'footer', 'hours_saturday', 'Sabtu: 07:30 - 12:00', 'Jam Kerja Sabtu', 'text', 95),
('footer', 'footer', 'hours_sunday', 'Minggu: Libur', 'Jam Kerja Minggu', 'text', 96)

ON CONFLICT (section, key) DO UPDATE 
SET 
  value = EXCLUDED.value,
  label = EXCLUDED.label,
  category = EXCLUDED.category,
  value_type = EXCLUDED.value_type,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();
