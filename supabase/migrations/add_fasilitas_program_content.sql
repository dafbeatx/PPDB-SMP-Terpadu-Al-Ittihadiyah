-- Add Fasilitas (Facilities) and Program Unggulan (Featured Programs) content to CMS
-- This allows editing via admin panel

-- Fasilitas (4 items)
INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES 
('profile', 'fasilitas', 'item_1', 'Ruang kelas ber-AC', 'Fasilitas 1', 'text', 100),
('profile', 'fasilitas', 'item_2', 'Laboratorium Komputer & Sains', 'Fasilitas 2', 'text', 101),
('profile', 'fasilitas', 'item_3', 'Perpustakaan Digital', 'Fasilitas 3', 'text', 102),
('profile', 'fasilitas', 'item_4', 'Lapangan Olahraga', 'Fasilitas 4', 'text', 103);

-- Program Unggulan (4 items)
INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES
('profile', 'program', 'item_1', 'Tahfidz Al-Quran', 'Program Unggulan 1', 'text', 104),
('profile', 'program', 'item_2', 'Bahasa Arab & Inggris', 'Program Unggulan 2', 'text', 105),
('profile', 'program', 'item_3', 'Olimpiade Sains', 'Program Unggulan 3', 'text', 106),
('profile', 'program', 'item_4', 'Ekstrakurikuler Beragam', 'Program Unggulan 4', 'text', 107);
