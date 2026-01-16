# PPDB SMP Terpadu Al-Ittihadiyah

Sistem Penerimaan Peserta Didik Baru (PPDB) Online untuk SMP Terpadu Al-Ittihadiyah.

## 🚀 Quick Start

### 1. Setup Supabase

1. Buat project di [Supabase](https://supabase.com)
2. Copy file `.env.example` menjadi `.env.local` dan isi kredensial Supabase Anda.
   **PENTING: JANGAN PERNAH meng-commit file .env.local atau kredensial asli ke repository.**
3. Jalankan SQL schema di Supabase SQL Editor:
   - Buka `supabase/migrations/001_initial_schema.sql`
   - Copy seluruh isinya
   - Paste dan jalankan di Supabase SQL Editor

4. Buat Storage Bucket:
   ```sql
   -- Jalankan ini di Supabase SQL Editor
   INSERT INTO storage.buckets (id, name, public) 
   VALUES ('documents', 'documents', false);
   ```

5. Buat Admin User (opsional untuk testing):
   ```sql
   -- Buat user admin di Supabase Auth terlebih dahulu via dashboard
   -- Kemudian insert email admin ke tabel admin_users
   INSERT INTO admin_users (email) VALUES ('admin@example.com');
   ```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Gunakan `.env.example` sebagai template. Salin isinya ke file baru bernama `.env.local` di root folder:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Catatan Keamanan:**
- File `.env.local` sudah masuk dalam `.gitignore` agar tidak ter-commit ke GitHub.
- Pastikan Anda hanya mengisi nilai asli di `.env.local` (lokal) atau Vercel Dashboard (production).

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 📁 Struktur Project

```
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── register/        # Endpoint pendaftaran
│   │   ├── upload/          # Endpoint upload file
│   ├── daftar/              # Halaman pendaftaran
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── landing/            # Landing page sections
│   ├── registration/       # Form pendaftaran
│   └── ui/                 # UI components
├── lib/                     # Utilities & helpers
│   ├── supabase/           # Supabase clients
│   ├── validations/        # Form & file validations
│   └── utils.ts            # Helper functions
├── types/                   # TypeScript types
└── supabase/               # Database migrations
    └── migrations/
        └── 001_initial_schema.sql
```

## 🎯 Fitur

✅ **Landing Page**
- Hero dengan CTA
- Profil sekolah
- Visi & Misi
- Keunggulan
- Alur PPDB

✅ **Formulir Pendaftaran Multi-Step**
- Step 1: Data Siswa
- Step 2: Data Orang Tua
- Step 3: Upload Dokumen
- Validasi real-time
- Progress indicator

✅ **Upload Dokumen**
- Drag & drop interface
- Format JPG/JPEG only
- Validasi ukuran & resolusi
- Preview gambar
- Error handling lengkap

✅ **Konfirmasi Pendaftaran**
- Nomor pendaftaran otomatis
- Ringkasan data
- Status tracking

✅ **Security**
- Row Level Security (RLS)
- Validasi client & server side
- Safe file upload
- SQL injection protection

## 🔐 Keamanan

1. **Row Level Security (RLS)**: Database hanya bisa diakses sesuai permission
2. **Validasi Ganda**: Client-side & server-side validation
3. **Safe File Handling**: Type checking, size limits, resolution validation
4. **No Direct File URL**: Files disimpan di private bucket

## 📝 Validasi File

Dokumen yang di-upload harus memenuhi:
- ✓ Format: JPG atau JPEG (tidak menerima PNG, PDF)
- ✓ Ukuran max: 2MB
- ✓ Resolusi minimal: 800px width
- ✓ Gambar harus jelas dan terbaca

## 🚀 Deployment ke Vercel

1. Push code ke GitHub
2. Connect repository ke Vercel
3. Tambahkan Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## 📊 Database Schema

### Tables:
- `registrations` - Data pendaftaran utama
- `students` - Data siswa
- `parents` - Data orang tua
- `documents` - Metadata dokumen upload
- `admin_users` - Data admin

Lihat detail di `supabase/migrations/001_initial_schema.sql`

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Validation**: Zod
- **Icons**: Lucide React

## 📞 Support

Untuk bantuan teknis, hubungi developer atau buka issue di repository.

---

Made with ❤️ for SMP Terpadu Al-Ittihadiyah
