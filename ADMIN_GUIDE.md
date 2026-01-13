# Panduan Admin CMS - PPDB SMP Terpadu Al-Ittihadiyah

Panduan lengkap untuk mengakses dan menggunakan Admin Panel + Content Management System.

## 🔐 Cara Akses Admin Panel

### Step 1: Setup Admin Account (Pertama Kali)

Sebelum bisa login, Anda harus membuat admin account di Supabase:

1. **Login ke Supabase Dashboard**
   - Buka [app.supabase.com](https://app.supabase.com)
   - Pilih project PPDB Anda

2. **Jalankan Database Migration**
   - SQL Editor → New Query
   - Copy & paste isi file: `supabase/migrations/002_cms_content.sql`
   - Click "Run" (✅ harus success)
   - Ini akan membuat tabel `page_contents` dan seed data default

3. **Buat Admin User**
   - Sidebar → **Authentication** → **Users**
   - Click **"Add user"** → **"Create new user"**
   - Isi:
     - **Email**: `admin@smpalittihadiyah.sch.id` (atau email yang Anda inginkan)
     - **Password**: (buat password yang kuat, contoh: `Admin@PPDB2026!`)
     - **Auto Confirm User**: ✅ Centang ini!
   - Click **"Create user"**

4. **Daftarkan Email ke Tabel Admin**
   - SQL Editor → New Query
   - Jalankan SQL ini:
   ```sql
   INSERT INTO admin_users (email) 
   VALUES ('admin@smpalittihadiyah.sch.id');
   ```
   - Ganti email sesuai yang Anda buat di step 3

### Step 2: Login ke Admin Panel

1. **Buka Halaman Login**
   ```
   URL: https://your-site.com/admin/login
   
   Jika local:
   URL: http://localhost:3000/admin/login
   ```

2. **Masukkan Kredensial**
   - Email: `admin@smpalittihadiyah.sch.id`
   - Password: (password yang Anda buat)
   - Click "Masuk"

3. **Berhasil!**
   - Anda akan diarahkan ke Dashboard Admin
   - Sekarang Anda sudah bisa mengakses semua menu

---

## 📝 Menggunakan Content Editor (CMS)

### Akses Content Editor

1. Login ke Admin Panel
2. Sidebar → **"Edit Content"**
3. Anda akan melihat halaman dengan 6 tabs

### Tabs yang Tersedia

| Tab | Isi Content |
|-----|-------------|
| **Hero Section** | Nama sekolah, tagline, tahun ajaran, statistik (pengalaman, lulusan, akreditasi) |
| **Profil Sekolah** | Judul, subjudul, paragraf 1 & 2 tentang sekolah |
| **Visi & Misi** | Visi sekolah dan 4 poin misi |
| **Keunggulan** | 4 keunggulan sekolah (judul + deskripsi masing-masing) |
| **Alur PPDB** | 4 step pendaftaran + CTA text |
| **Footer** | Deskripsi, alamat, kontak, jam operasional |

### Cara Edit Content

1. **Pilih Tab** yang mau diedit (contoh: "Hero Section")

2. **Edit Teks**
   - Anda akan melihat form dengan field-field yang bisa diedit
   - Ubah teks sesuai keinginan
   - Untuk field panjang (textarea), Anda bisa menulis beberapa baris

3. **Simpan Perubahan**
   - Click tombol **"Simpan Perubahan"** di bawah form
   - Tunggu notifikasi "Berhasil disimpan!" muncul
   - ✅ Perubahan langsung tersimpan!

4. **Lihat Hasil**
   - Buka website di tab baru
   - Refresh halaman (Ctrl+F5 atau Cmd+R)
   - Teks yang Anda edit sudah berubah!

### Tips Edit Content

✅ **DO**:
- Gunakan Bahasa Indonesia yang formal dan profesional
- Pastikan ejaan benar (gunakan EYD)
- Tulis kalimat yang jelas dan mudah dipahami
- Untuk angka statistik, tulis angka saja (tanpa simbol)

❌ **DON'T**:
- Jangan gunakan bahasa gaul atau tidak formal
- Jangan tulis terlalu panjang (user enggan membaca)
- Jangan gunakan simbol aneh atau emoji berlebihan
- Jangan copy-paste dari website lain (buat original)

### Contoh Edit yang Baik

**BEFORE** (default):
```
Tahun Berpengalaman: 20
```

**AFTER** (jika sekolah sudah 25 tahun):
```
Tahun Berpengalaman: 25
```

**BEFORE** (Visi):
```
Menjadi lembaga pendidikan Islam terpadu yang unggul...
```

**AFTER** (disesuaikan):
```
Menjadi lembaga pendidikan Islam terbaik di Sumatera Utara yang menghasilkan lulusan berakhlak mulia dan berprestasi...
```

---

## 👥 Mengelola Pendaftar

### Akses Daftar Pendaftar

1. Sidebar → **"Daftar Pendaftar"**
2. Anda akan melihat table dengan semua pendaftar

### Fitur yang Tersedia

- ✅ **Lihat semua data pendaftar**
- ✅ **Search** by nama atau nomor pendaftaran
- ✅ **Filter by status** (pending, verified, accepted, rejected)
- ✅ **View detail** pendaftar (click nomor pendaftaran)
- ✅ **Update status** pendaftaran
- ✅ **Export to CSV** (backup data)

### Update Status Pendaftar

1. Click **nomor pendaftaran** di table
2. Anda akan ke halaman detail
3. Lihat data lengkap siswa & dokumen
4. Di bagian atas, ada dropdown **"Status"**
5. Pilih status:
   - `Pending` - Menunggu verifikasi (default)
   - `Verified` - Sudah diverifikasi
   - `Accepted` - DITERIMA 🎉
   - `Rejected` - Ditolak
6. Click **"Update Status"**
7. Status tersimpan & pendaftar bisa lihat di halaman konfirmasi

---

## 📊 Dashboard

Dashboard menampilkan:
- 📈 **Statistik**: Total pendaftar, pending, diterima, ditolak
- 📋 **Pendaftar Terbaru**: 5 pendaftar terakhir
- 🔗 **Quick Access**: Link ke menu lain

---

## 🔒 Keamanan

### Logout

Setelah selesai:
1. Sidebar (paling bawah) → Click **"Logout"**
2. Anda akan kembali ke halaman login
3. Session di-clear, aman!

### Password Lupa

Jika lupa password:
1. Reset via Supabase Dashboard
2. Authentication → Users → Cari email Anda
3. Click email → Click "Reset Password"
4. Supabase akan kirim email reset
5. Follow link di email untuk set password baru

### Keamanan Tambahan

- ✅ Session timeout otomatis setelah tidak aktif
- ✅ Hanya email yang terdaftar di `admin_users` yang bisa akses
- ✅ All admin routes protected (tidak bisa diakses tanpa login)
- ✅ Password terenkripsi oleh Supabase

---

## ❓ Troubleshooting

### "Email atau password salah"
- ✅ Pastikan email EXACT sama dengan di Supabase
- ✅ Check caps lock (password case-sensitive)
- ✅ Pastikan user sudah di-create di Supabase Auth
- ✅ Pastikan "Auto Confirm User" dicentang saat create user

### "Anda tidak memiliki akses admin"
- ✅ Pastikan email sudah diinsert ke tabel `admin_users`
- ✅ Jalankan SQL:
  ```sql
  SELECT * FROM admin_users WHERE email = 'your-email@example.com';
  ```
- ✅ Jika tidak ada hasil, jalankan INSERT lagi

### Perubahan content tidak muncul
- ✅ Click "Simpan Perubahan" dulu
- ✅ Tunggu notifikasi "Berhasil disimpan!"
- ✅ Hard refresh browser (Ctrl+Shift+R atau Cmd+Shift+R)
- ✅ Clear browser cache

### Cannot login setelah deploy ke Vercel
- ✅ Pastikan environment variables sudah diset di Vercel
- ✅ Pastikan database migration sudah dijalankan
- ✅ Test create user lagi di production database

---

## 📱 Akses dari HP

Admin panel juga bisa diakses dari HP:

1. Buka browser (Chrome/Safari)
2. Ketik URL: `https://your-site.com/admin/login`
3. Login seperti biasa
4. UI responsive, tapi lebih nyaman dari komputer

---

## 🎓 Best Practices

### DO

✅ **Logout setelah selesai** (terutama di komputer umum)  
✅ **Backup data** secara berkala dengan export CSV  
✅ **Update content** sebelum tahun ajaran baru  
✅ **Check pendaftar baru** setiap hari  
✅ **Verifikasi dokumen** dengan teliti  

### DON'T

❌ Jangan share password dengan orang lain  
❌ Jangan edit content asal-asalan  
❌ Jangan hapus content penting  
❌ Jangan lupa logout di komputer umum  

---

## 📞 Need Help?

Jika ada masalah:
1. Check troubleshooting section di atas
2. Check Supabase logs (Dashboard → Logs)
3. Contact developer/IT support

---

**Selamat mengelola website PPDB! 🎉**
