# Panduan Setup Lengkap - PPDB SMP Terpadu Al-Ittihadiyah

Dokumen ini menjelaskan langkah-langkah teknis untuk mengaktifkan seluruh fitur PPDB, terutama yang membutuhkan konfigurasi layanan eksternal (Vercel, Supabase, dan Resend).

---

## A. Setup Environment Variables di Vercel

Agar aplikasi berjalan di cloud (production), Anda harus memasukkan konfigurasi (Environment Variables) di Dashboard Vercel.

1.  **Masuk ke Project Settings**:
    *   Buka [Vercel Dashboard](https://vercel.com/dashboard).
    *   Pilih project `ppdb-smp-al-ittihadiyah`.
    *   Klik tab **Settings** di bagian atas.
    *   Pilih menu **Environment Variables** di sidebar kiri.
2.  **Tambahkan Variabel Berikut**:
    Masukkan `Key` dan `Value` satu per satu:

| Key | Value (Contoh) | Deskripsi |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xyz.supabase.co` | URL Project Supabase Anda. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhb...` | API Key Anonim dari Supabase. |
| `RESEND_API_KEY` | `re_123456789` | API Key dari Resend (untuk email). |
| `NEXT_PUBLIC_SITE_URL` | `https://ppdb-ittihadiyah.vercel.app` | URL utama website Anda. |

3.  **Lakukan Redeploy**:
    Setelah menambahkan/mengubah variabel, Anda **WAJIB** melakukan redeploy agar perubahan terbaca:
    *   Klik tab **Deployments**.
    *   Klik tombol titik tiga (...) pada deployment terbaru.
    *   Pilih **Redeploy**.

---

## B. Setup Email Notification (Resend)

Fitur notifikasi email otomatis menggunakan layanan [Resend](https://resend.com) (Free Tier: 3,000 email/bulan).

1.  **Daftar Akun**: Buat akun gratis di [Resend.com](https://resend.com/signup).
2.  **Ambil API Key**:
    *   Masuk ke menu **API Keys**.
    *   Klik **Create API Key**.
    *   Copy key yang muncul (biasanya berawalan `re_`).
3.  **Konfigurasi Domain (Opsional tapi Direkomendasikan)**:
    *   Secara default email dikirim dari `onboarding@resend.dev`.
    *   Untuk menggunakan email sekolah (misal: `admin@smpalittihadiyah.sch.id`), Anda harus melakukan verifikasi domain di menu **Domains**.
4.  **Masukkan Key ke Vercel**: (Lihat Bagian A di atas).

---

## C. Setup WhatsApp Link Admin

Sistem pendaftaran menyediakan tombol WhatsApp untuk memudahkan komunikasi. Ini bersifat **GRATIS** dan manual.

1.  **Konfigurasi Nomor**: Nomor WA Admin dikonfigurasi melalui database atau melalui menu CMS di Admin Panel.
2.  **Format Link**: Sistem secara otomatis akan membuat link dengan format:
    `https://wa.me/62xxxxxxxxxx?text=Halo%20Admin...`
3.  **Tidak Perlu API**: Fitur ini menggunakan fitur standard WhatsApp Click-to-Chat, sehingga tidak membutuhkan biaya langganan API WA Business (WABA).

---

## D. Setup Supabase

Aplikasi ini sangat bergantung pada database Supabase.

1.  **Database Schema**:
    *   Pastikan tabel `registrations`, `students`, `parents`, dan `documents` sudah ada.
    *   Jika baru setup, jalankan script yang ada di folder `supabase/migrations/` melalui SQL Editor di Dashboard Supabase.
2.  **Row Level Security (RLS)**:
    Sangat penting agar data pendaftar aman:
    *   **Pendaftaran**: Policy harus mengizinkan `INSERT` untuk role `anon`.
    *   **Admin Panel**: Policy harus mengizinkan `SELECT`, `UPDATE`, `DELETE` hanya untuk akun yang terdaftar di tabel `admin_users`.
3.  **Storage (File Dokumen)**:
    *   Pastikan bucket bernama `documents` sudah dibuat di menu **Storage**.
    *   Pastikan bucket bersifat **PRIVATE** (tidak public) agar dokumen siswa tidak bisa diakses sembarang orang.
    *   Link dokumen akan digenerate sebagai *Signed URL* oleh aplikasi.

---

## E. Checklist Sebelum Production (Go Live)

Sebelum membagikan link pendaftaran ke orang tua siswa, pastikan Anda mengecek hal berikut:

- [ ] **Form Pendaftaran**: Coba isi form pendaftaran dari awal sampai selesai. Pastikan tidak ada eror.
- [ ] **Email Konfirmasi**: Cek inbox email orang tua setelah mendaftar. Pastikan email dari Resend masuk.
- [ ] **Data Supabase**: Cek tabel `registrations` di Supabase. Pastikan data yang Anda masukkan tadi muncul lengkap.
- [ ] **Upload Dokumen**: Pastikan file KK, Akta, dll terupload dengan benar ke Storage Supabase.
- [ ] **WhatsApp Button**: Klik tombol "Hubungi Admin" di halaman konfirmasi, pastikan mengarah ke nomor WA yang benar.
- [ ] **Admin Panel**: Login ke `/login`, masuk ke Dashboard Admin, dan pastikan data pendaftar baru bisa dilihat dan dokumennya bisa didownload.
- [ ] **Download Excel**: Test export data ke Excel di halaman pendaftar admin.

---
> [!TIP]
> Jika pendaftaran sudah sangat banyak, jangan lupa lakukan backup berkala melalui fitur "Export Excel" di Admin Panel.
