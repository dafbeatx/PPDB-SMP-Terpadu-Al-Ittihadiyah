-- Add logo field to page_contents for logo customization
INSERT INTO page_contents (section, key, value_type, value, label, category, display_order) VALUES
('branding', 'logo_url', 'text', '/logo.png', 'URL Logo Sekolah', 'branding', 1),
('branding', 'school_name_short', 'text', 'SMP Al-Ittihadiyah', 'Nama Sekolah (Singkat)', 'branding', 2);

-- Add settings category for CMS
INSERT INTO page_contents (section, key, value_type, value, label, category, display_order) VALUES
('settings', 'show_custom_logo', 'text', 'false', 'Gunakan Logo Custom (true/false)', 'settings', 1);
