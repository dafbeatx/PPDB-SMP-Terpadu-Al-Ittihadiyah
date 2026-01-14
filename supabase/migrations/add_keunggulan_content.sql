-- Add Keunggulan (School Excellence) content to CMS
-- This allows editing of the 4 keunggulan items via admin panel

-- Keunggulan Item 1: Prestasi Akademik
INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES 
('keunggulan', 'item_1', 'title', 'Prestasi Akademik', 'Keunggulan 1 - Judul', 'text', 1),
('keunggulan', 'item_1', 'description', 'Siswa kami konsisten meraih prestasi di berbagai kompetisi lokal dan nasional', 'Keunggulan 1 - Deskripsi', 'textarea', 2);

-- Keunggulan Item 2: Kurikulum Terpadu  
INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES
('keunggulan', 'item_2', 'title', 'Kurikulum Terpadu', 'Keunggulan 2 - Judul', 'text', 3),
('keunggulan', 'item_2', 'description', 'Menggabungkan kurikulum nasional dengan pendidikan agama Islam yang komprehensif', 'Keunggulan 2 - Deskripsi', 'textarea', 4);

-- Keunggulan Item 3: Guru Profesional
INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES
('keunggulan', 'item_3', 'title', 'Guru Profesional', 'Keunggulan 3 - Judul', 'text', 5),
('keunggulan', 'item_3', 'description', 'Tenaga pendidik berpengalaman, berkompeten, dan penuh dedikasi', 'Keunggulan 3 - Deskripsi', 'textarea', 6);

-- Keunggulan Item 4: Fasilitas Lengkap
INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES
('keunggulan', 'item_4', 'title', 'Fasilitas Lengkap', 'Keunggulan 4 - Judul', 'text', 7),
('keunggulan', 'item_4', 'description', 'Sarana prasarana modern untuk mendukung kegiatan belajar mengajar', 'Keunggulan 4 - Deskripsi', 'textarea', 8);
