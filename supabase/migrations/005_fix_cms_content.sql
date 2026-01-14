-- Fix for CMS Content Save Issue
-- This migration ensures all content fields exist and can be edited

-- First, delete old keunggulan content that uses wrong key format
DELETE FROM page_contents 
WHERE category = 'keunggulan' 
AND section = 'keunggulan'
AND key LIKE 'item_%_title';

DELETE FROM page_contents 
WHERE category = 'keunggulan' 
AND section = 'keunggulan'
AND key LIKE 'item_%_desc';

-- Insert Keunggulan content with correct structure (matching component expectations)
INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES 
-- Item 1
('keunggulan', 'item_1', 'title', 'Prestasi Akademik', 'Keunggulan 1 - Judul', 'text', 1),
('keunggulan', 'item_1', 'description', 'Siswa kami konsisten meraih prestasi di berbagai kompetisi lokal dan nasional', 'Keunggulan 1 - Deskripsi', 'textarea', 2),
-- Item 2
('keunggulan', 'item_2', 'title', 'Kurikulum Terpadu', 'Keunggulan 2 - Judul', 'text', 3),
('keunggulan', 'item_2', 'description', 'Menggabungkan kurikulum nasional dengan pendidikan agama Islam yang komprehensif', 'Keunggulan 2 - Deskripsi', 'textarea', 4),
-- Item 3
('keunggulan', 'item_3', 'title', 'Guru Profesional', 'Keunggulan 3 - Judul', 'text', 5),
('keunggulan', 'item_3', 'description', 'Tenaga pendidik berpengalaman, berkompeten, dan penuh dedikasi', 'Keunggulan 3 - Deskripsi', 'textarea', 6),
-- Item 4
('keunggulan', 'item_4', 'title', 'Fasilitas Lengkap', 'Keunggulan 4 - Judul', 'text', 7),
('keunggulan', 'item_4', 'description', 'Sarana prasarana modern untuk mendukung kegiatan belajar mengajar', 'Keunggulan 4 - Deskripsi', 'textarea', 8)
ON CONFLICT (section, key) DO UPDATE
SET value = EXCLUDED.value,
    label = EXCLUDED.label,
    value_type = EXCLUDED.value_type,
    display_order = EXCLUDED.display_order;

-- Insert Fasilitas content (under profile category)
INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES 
('profile', 'fasilitas', 'item_1', 'Ruang kelas ber-AC', 'Fasilitas 1', 'text', 100),
('profile', 'fasilitas', 'item_2', 'Laboratorium Komputer & Sains', 'Fasilitas 2', 'text', 101),
('profile', 'fasilitas', 'item_3', 'Perpustakaan Digital', 'Fasilitas 3', 'text', 102),
('profile', 'fasilitas', 'item_4', 'Lapangan Olahraga', 'Fasilitas 4', 'text', 103)
ON CONFLICT (section, key) DO UPDATE
SET value = EXCLUDED.value,
    label = EXCLUDED.label;

-- Insert Program Unggulan content (under profile category)
INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES
('profile', 'program', 'item_1', 'Tahfidz Al-Quran', 'Program Unggulan 1', 'text', 104),
('profile', 'program', 'item_2', 'Bahasa Arab & Inggris', 'Program Unggulan 2', 'text', 105),
('profile', 'program', 'item_3', 'Olimpiade Sains', 'Program Unggulan 3', 'text', 106),
('profile', 'program', 'item_4', 'Ekstrakurikuler Beragam', 'Program Unggulan 4', 'text', 107)
ON CONFLICT (section, key) DO UPDATE
SET value = EXCLUDED.value,
    label = EXCLUDED.label;
