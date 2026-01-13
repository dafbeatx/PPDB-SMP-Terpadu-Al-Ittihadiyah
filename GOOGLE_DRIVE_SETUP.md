# Google Drive Setup Guide - PPDB Document Upload

Panduan lengkap untuk mengintegrasikan Google Drive sebagai storage untuk upload berkas pendaftaran.

## 📋 Prerequisites

- Google Account (Gmail)
- Akses ke Google Cloud Console
- Folder Google Drive yang sudah dibuat (sudah ada: `1E9hVD7hF22uoYIhCv9ysdV0v-ZZy1DhL`)

---

## 🚀 Step-by-Step Setup

### Step 1: Create Google Cloud Project

1. **Buka Google Cloud Console**
   ```
   https://console.cloud.google.com
   ```

2. **Create New Project**
   - Click dropdown di atas (sebelah "Google Cloud")
   - Click "NEW PROJECT"
   - Project name: `PPDB-SMP-Al-Ittihadiyah`
   - Click "CREATE"
   - Tunggu ~30 detik sampai project dibuat

---

### Step 2: Enable Google Drive API

1. **Select Project** (pastikan project `PPDB-SMP-Al-Ittihadiyah` active)

2. **Enable API**
   - Sidebar → **APIs & Services** → **Library**
   - Search: "Google Drive API"
   - Click **Google Drive API**
   - Click **ENABLE**
   - Tunggu loading selesai

---

### Step 3: Create Service Account

1. **Navigate to Service Accounts**
   - Sidebar → **APIs & Services** → **Credentials**
   - Click **+ CREATE CREDENTIALS**
   - Select **Service Account**

2. **Service Account Details**
   - Service account name: `ppdb-uploader`
   - Service account ID: (auto-generated) `ppdb-uploader@...`
   - Description: "Service account for PPDB document uploads"
   - Click **CREATE AND CONTINUE**

3. **Grant Access** (Step 2 of 3)
   - Click **CONTINUE** (skip granting role - we'll use folder sharing)

4. **Grant User Access** (Step 3 of 3)
   - Click **DONE**

---

### Step 4: Create Service Account Key (JSON)

1. **Find Service Account**
   - Di halaman Credentials
   - Scroll ke "Service Accounts"
   - Click email: `ppdb-uploader@xxx.iam.gserviceaccount.com`

2. **Generate Key**
   - Tab **KEYS**
   - Click **ADD KEY** → **Create new key**
   - Key type: **JSON**
   - Click **CREATE**
   - File JSON akan auto-download ke komputer Anda

3. **SIMPAN FILE INI** - nanti dibutuhkan!
   - Nama file: `ppdb-smp-al-ittihadiyah-xxxxx.json`
   - ⚠️ **JANGAN SHARE** ke siapapun atau upload ke GitHub!

---

### Step 5: Share Google Drive Folder dengan Service Account

1. **Copy Service Account Email**
   - Dari file JSON yang tadi didownload
   - Cari field: `"client_email"`
   - Copy emailnya (contoh: `ppdb-uploader@ppdb-smp-al-ittihadiyah.iam.gserviceaccount.com`)

2. **Open Google Drive**
   - Buka: https://drive.google.com/drive/folders/1E9hVD7hF22uoYIhCv9ysdV0v-ZZy1DhL

3. **Share Folder**
   - Right-click folder → **Share**
   - Paste service account email
   - Permission: **Editor** 
   - **UNCHECK** "Notify people" (email robot tidak perlu notif)
   - Click **Share**

---

### Step 6: Add Environment Variables

**Local Development** (`.env.local`):

```env
# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID=1E9hVD7hF22uoYIhCv9ysdV0v-ZZy1DhL
GOOGLE_SERVICE_ACCOUNT_EMAIL=ppdb-uploader@ppdb-smp-al-ittihadiyah.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Cara dapat Private Key:**
1. Buka file JSON yang didownload
2. Copy isi field `"private_key"` (include tanda `"`)
3. Paste ke `.env.local`

**Production (Vercel)**:

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. **Add variables** (1 by 1):
   ```
   Name: GOOGLE_DRIVE_FOLDER_ID
   Value: 1E9hVD7hF22uoYIhCv9ysdV0v-ZZy1DhL
   
   Name: GOOGLE_SERVICE_ACCOUNT_EMAIL
   Value: (email dari JSON file)
   
   Name: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
   Value: (private_key dari JSON file, dengan \n di-escape)
   ```

3. **Click "Save"**

---

## ✅ Verification

Test apakah setup berhasil:

```bash
# Terminal
cd /home/senku/.gemini/antigravity/scratch/ppdb-smp-al-ittihadiyah

# Test upload (after implementation)
npm run dev
```

Buka `http://localhost:3000/daftar` dan coba upload file.

---

## 🔍 Troubleshooting

### Error: "Insufficient Permission"
- ✅ Pastikan folder sudah di-share dengan service account email
- ✅ Permission harus "Editor", bukan "Viewer"

### Error: "Invalid credentials"
- ✅ Check GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY di `.env.local`
- ✅ Pastikan ada `\n` di string (newline)
- ✅ Private key harus dalam format: `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"`

### Error: "API not enabled"
- ✅ Pastikan Google Drive API sudah ENABLED di Google Cloud Console

---

## 📁 File Structure di Google Drive

Setelah implementasi, struktur folder akan seperti ini:

```
📁 PPDB 2026 (root folder)
  📁 PPDB-26-000001
    📄 ktp.jpg
    📄 kartu_keluarga.jpg
    📄 ijazah.jpg
  📁 PPDB-26-000002
    📄 ktp.jpg
    📄 kartu_keluarga.jpg
    📄 ijazah.jpg
  ...
```

Setiap pendaftar punya folder sendiri dengan nomor pendaftaran sebagai nama folder.

---

## 🚀 Next Steps

Setelah setup selesai:
1. ✅ Confirm ke saya bahwa setup sudah selesai
2. ✅ Share credential file (lewat DM, jangan di sini!)
3. ✅ Saya akan implement Google Drive upload code
4. ✅ Test upload
5. ✅ Deploy!

---

**Need Help?** Kalau ada error atau stuck di step manapun, screenshot dan kasih tau!
