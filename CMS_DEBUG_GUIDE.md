# Panduan Debugging CMS Save Issue

## Perubahan yang Dibuat

✅ **Enhanced Logging** - Console log untuk tracking save process
✅ **Better Error Messages** - Error message yang lebih detail
✅ **Auto Refresh** - Halaman auto-refresh setelah save sukses
✅ **Text Input Fix** - Font bold untuk visibility

---

## Cara Test CMS Sekarang

### Step 1: Clear Browser Cache
```
1. Tekan Ctrl+Shift+Delete (Chrome/Edge)
2. Pilih "Cached images and files"
3. Click "Clear data"
4. Atau Hard refresh: Ctrl+Shift+R
```

### Step 2: Login & Test
1. Login admin panel
2. Go to "Edit Content"
3. Pilih tab "Footer"
4. Ubah text (misal: "Jam Kerja Sabtu")
5. **Buka Console** (tekan F12)
6. Click "Simpan Perubahan"

### Step 3: Lihat Console Log
Akan muncul log seperti ini:

**Jika SUKSES:**
```
🔵 Starting save...
🔵 Response status: 200
🔵 Response data: { success: true, ... }
✅ Save successful!
→ Halaman auto-refresh dalam 2 detik
```

**Jika GAGAL:**
```
🔵 Starting save...
🔵 Response status: 500 (atau 401, 403)
🔵 Response data: { error: "..." }
❌ Error saving content: ...
→ Error message ditampilkan di UI
```

---

## Possible Issues & Solutions

### Issue 1: Error 401 Unauthorized
**Penyebab:** Session expired

**Solusi:**
```
1. Logout
2. Login ulang
3. Coba save lagi
```

### Issue 2: Error 403 Not an Admin
**Penyebab:** RLS policy atau email tidak di `admin_users`

**Solusi:**
```sql
-- Cek di Supabase SQL Editor
SELECT * FROM admin_users WHERE email = 'your-email@example.com';

-- Jika kosong, tambahkan:
INSERT INTO admin_users (email) VALUES ('your-email@example.com');
```

### Issue 3: Error 500 Internal Server Error
**Penyebab:** Database error atau RLS policy

**Solusi:**
1. Check Supabase logs (Dashboard → Logs)
2. Screenshot error di console
3. Jalankan migration `004_fix_admin_rls.sql`

### Issue 4: Save Success Tapi Data Tidak Berubah
**Penyebab:** Browser cache

**Solusi:**
```
1. Hard refresh: Ctrl+Shift+R
2. Clear cache
3. Check database langsung di Supabase
```

---

## Debug Checklist

Jika masih error, cek satu per satu:

- [ ] Email sudah terdaftar di `admin_users` table?
- [ ] Migration `004_fix_admin_rls.sql` sudah di-run?
- [ ] Browser console ada error merah?
- [ ] Network tab (F12 → Network) ada request failed?
- [ ] Supabase logs ada error?

---

## Screenshot Console Logs

Kalau masih error, tolong screenshot:
1. Console tab (F12) saat click "Simpan"
2. Network tab (F12 → Network) → Filter "content" → Click request → Response tab

Kirim ke saya untuk debugging lebih lanjut! 🔍
