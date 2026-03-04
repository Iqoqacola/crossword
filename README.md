# Crossword Generator & Player

Aplikasi Teka-Teki Silang (TTS) interaktif yang terdiri dari panel Admin/Creator untuk membuat puzzle secara otomatis, dan halaman Player untuk memainkannya. Proyek ini dikembangkan sebagai pemenuhan Technical Test Fullstack Web & Game Developer untuk PT. Memento Game Studios.

## 📖 Deskripsi Singkat

Aplikasi ini memungkinkan pengguna (Creator) untuk memasukkan daftar kata dan petunjuk (clue), yang kemudian secara otomatis disusun menjadi grid teka-teki silang (berpotongan mendatar dan menurun). Setelah di-publish, puzzle tersebut menghasilkan URL unik yang dapat dibagikan agar bisa dimainkan oleh siapa saja secara interaktif.

## 🚀 Tech Stack

Berdasarkan arsitektur _Fullstack_, proyek ini dibangun menggunakan:

**Frontend:**

- React (Vite)
- Tailwind CSS (Styling)
- React Router DOM (Routing)
- Axios (Data Fetching)

**Backend:**

- Node.js & Express.js
- Sequelize ORM (dengan dukungan SQLite/MySQL)
- JSON Web Token (JWT) & Bcrypt (Autentikasi Admin)
- Cors & Dotenv

## ⚙️ Fitur Utama

1. **TTS Creator / Admin Panel**
   - Form input daftar kata (5 - 15 kata) dan clue.
   - Algoritma _Generate TTS_ otomatis untuk menyusun grid yang saling berpotongan (Across/Down).
   - _Preview_ grid sebelum disimpan.
   - Manajemen riwayat puzzle (History).
2. **TTS Player**
   - Grid interaktif (dukungan navigasi sel menggunakan mouse dan keyboard).
   - Validasi jawaban dan visualisasi interaktif (indikasi benar/salah dan sel aktif).
   - Notifikasi saat puzzle berhasil diselesaikan.
3. **Akses & Share**
   - URL unik/ID untuk setiap puzzle yang di-_publish_.
   - Halaman daftar puzzle yang tersedia untuk dimainkan umum.

## ✨ Fitur Tambahan

- **Sistem Autentikasi Admin:** Menggunakan JWT dan Bcrypt untuk mengamankan panel Creator.
- **Dockerized Environment:** Menggunakan Docker & Docker Compose untuk mempermudah setup dan _deployment_.

---

## 🛠️ Cara Menjalankan di Lokal

### Opsi 1: Menggunakan Docker (Rekomendasi)

Karena proyek ini sudah dilengkapi dengan konfigurasi Docker, Anda bisa menjalankan keseluruhan aplikasi (beserta databasenya) secara bersamaan tanpa perlu setup manual.

Pastikan **Docker Desktop** sudah terinstal dan menyala, lalu jalankan perintah berikut di terminal (pada _root directory_ project):

```bash
docker-compose up -d --build
```

Frontend akan otomatis berjalan di port yang diatur (misal: http://localhost:5173).

Backend akan otomatis berjalan di port yang diatur (misal: http://localhost:3000).

Untuk mematikan aplikasi:

```bash
docker-compose down
```

### Opsi 2: Menjalankan Secara Manual

#### Prasyarat

Pastikan Anda sudah menginstal Node.js, npm, dan aplikasi server Database seperti MySQL/MariaDB (misalnya menggunakan XAMPP, MAMP, atau Laragon) di komputer Anda.

#### 1. Setup Database (MySQL)

Nyalakan service MySQL di komputer Anda (misal via XAMPP Control Panel).

Buka phpMyAdmin atau database client lainnya, lalu buat database baru (misal: crossword_db).

Import file crossword_db.sql yang ada di root direktori project ke dalam database yang baru dibuat tersebut.

#### 2. Setup Backend (Server)

Buka terminal dan masuk ke folder server:

```bash
cd server
npm install
```

Buat file .env di folder server dari .env.dev (jika ada) dan pastikan kredensial koneksi database (DB_NAME, DB_USER, DB_PASS) sudah sesuai dengan setup lokal Anda. Kemudian jalankan server:

```bash
# Untuk mode development
npm run dev

# Atau mode production
npm start
```

Server akan berjalan di port sesuai env atau default 5000.

#### 3. Setup Frontend (Client)

Buka terminal baru dan masuk ke folder client:

```bash
cd client
npm install
```

Jalankan klien:

```bash
npm run dev
```

Klien akan berjalan di http://localhost:5173.
