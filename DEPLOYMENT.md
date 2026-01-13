# Panduan Deploy ke Vercel - PPDB SMP Terpadu Al-Ittihadiyah

## 📋 Persiapan

### 1. Akun yang Diperlukan
- ✅ GitHub account
- ✅ Vercel account (gratis) - [vercel.com](https://vercel.com)
- ✅ Supabase account (gratis) - [supabase.com](https://supabase.com)

### 2. Setup Supabase Database

#### A. Buat Project Supabase
1. Login ke [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Isi:
   - **Name**: "PPDB SMP Al-Ittihadiyah"
   - **Database Password**: (simpan password ini!)
   - **Region**: Singapore (terdekat untuk Indonesia)
4. Tunggu ~2 menit sampai project ready

#### B. Jalankan Database Schema
1. Buka project Supabase Anda
2. Sidebar → **SQL Editor**
3. Click "+ New query"
4. Copy seluruh isi file: `supabase/migrations/001_initial_schema.sql`
5. Paste ke SQL Editor
6. Click "Run" (✅ harus success tanpa error)

#### C. Buat Storage Bucket
Di SQL Editor yang sama, jalankan:
```sql
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false);
```

#### D. Dapatkan API Keys
1. Sidebar → **Settings** → **API**
2. Copy 2 values ini:
   - `Project URL` (contoh: `https://xxxxx.supabase.co`)
   - `anon public` key (panjang, seperti `eyJhbGc...`)

### 3. Push Code ke GitHub

```bash
# Di folder project
cd /home/senku/.gemini/antigravity/scratch/ppdb-smp-al-ittihadiyah

# Initialize Git (jika belum)
git add .
git commit -m "Initial commit: PPDB system"

# Create repository di GitHub
# Lalu:
git remote add origin https://github.com/USERNAME/ppdb-smp-al-ittihadiyah.git
git branch -M main
git push -u origin main
```

## 🚀 Deploy ke Vercel

### Cara 1: Via Vercel Dashboard (Recommended)

1. **Login ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Login dengan GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Pilih repository: `ppdb-smp-al-ittihadiyah`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - Click "Environment Variables"

4. **Add Environment Variables**
   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | (Paste URL dari Supabase) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (Paste anon key dari Supabase) |
   
   Click "Add" untuk setiap variable

5. **Deploy**
   - Click "Deploy"
   - ⏱️ Tunggu ~2-3 menit
   - ✅ Done! Your site is live!

6. **Get URL**
   - Vercel akan memberikan URL: `https://ppdb-smp-al-ittihadiyah.vercel.app`
   - Bisa juga pakai custom domain

### Cara 2: Via Vercel CLI (Advanced)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Saat ditanya Environment Variables, jawab:
# - NEXT_PUBLIC_SUPABASE_URL? → Paste URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY? → Paste key

# Deploy to production
vercel --prod
```

## ✅ Verifikasi Deployment

Setelah deploy, test:

1. **Landing Page**: Buka URL Vercel Anda
   - ✓ Hero section muncul
   - ✓ All sections load
   - ✓ Button "Daftar Sekarang" works

2. **Registration Form**:
   - ✓ Isi form step 1 (data siswa)
   - ✓ Lanjut ke step 2 (data orang tua)
   - ✓ Upload 3 dokumen JPG
   - ✓ Submit berhasil

3. **Confirmation Page**:
   - ✓ Nomor pendaftaran muncul
   - ✓ Data ditampilkan dengan benar

4. **Database Check**:
   - Buka Supabase → **Table Editor**
   - Check table `registrations` → harus ada data baru
   - Check table `students` → data siswa tersimpan
   - Check table `documents` → 3 files uploaded

## 🌐 Custom Domain (Optional)

### Pakai Domain Sendiri

1. **Di Vercel Dashboard**:
   - Buka project
   - Tab "Settings" → "Domains"
   - Click "Add"
   - Masukkan domain: `ppdb.smpalittihadiyah.sch.id`

2. **Di Domain Registrar** (Niagahoster, Rumahweb, dll):
   - Add CNAME record:
     - Type: `CNAME`
     - Name: `ppdb`
     - Value: `cname.vercel-dns.com`
   - Tunggu ~15 menit sampai propagate

3. **SSL Certificate**:
   - Vercel otomatis provide HTTPS
   - Free SSL dari Let's Encrypt

## 🔒 Security Checklist

Sebelum go-live:

- [x] Environment variables set di Vercel (tidak di code)
- [x] `.env.local` TIDAK di-commit ke Git
- [x] Supabase RLS policies active
- [x] Storage bucket private (bukan public)
- [ ] Ganti password Supabase database
- [ ] Enable "Branch Protection" di GitHub
- [ ] Backup database secara berkala

## 📊 Monitoring & Maintenance

### Vercel Dashboard
- **Analytics**: Lihat jumlah visitor
- **Deployments**: History semua deploy
- **Logs**: Debug jika ada error

### Supabase Dashboard
- **Table Editor**: Lihat data pendaftar
- **SQL Editor**: Query data
- **Storage**: Lihat uploaded files
- **Logs**: API request logs

## 🆘 Troubleshooting

### Build Failed di Vercel

**Error**: "Module not found"
```bash
# Pastikan semua dependencies terinstall
npm install
npm run build  # Test locally first
```

**Error**: "Environment variable not set"
- Check di Vercel → Settings → Environment Variables
- Pastikan nama EXACT: `NEXT_PUBLIC_SUPABASE_URL`

### Form Tidak Bisa Submit

**Check**:
1. Buka DevTools (F12) → Console tab
2. Lihat error message
3. Verifikasi Supabase URL & Key benar
4. Check Supabase RLS policies

### File Upload Gagal

**Possible causes**:
- Storage bucket "documents" belum dibuat
- File bukan JPG/JPEG
- File size > 2MB
- Internet connection issue

## 📝 Update Kode di Production

Jika ada perubahan kode:

```bash
# Edit files
# Test locally
npm run dev

# Build test
npm run build

# Commit & push
git add .
git commit -m "Update: ..."
git push

# Vercel akan auto-deploy!
```

## 💡 Tips

1. **Test di Local dulu** sebelum push
2. **Use Branch** untuk development
3. **Backup database** sebelum update schema
4. **Monitor logs** setelah deploy
5. **Keep Supabase keys secret** - jangan share!

## 📞 Support

Jika ada masalah:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Google error message
4. Check Next.js documentation

---

✅ **Your site is now LIVE and ready for students to register!**

Share URL: `https://your-project.vercel.app/daftar`
