# Aplikasi Forum Diskusi

Submission Proyek: **Membangun Aplikasi React dengan Redux**  
Kelas: **Menjadi React Web Developer Expert - Dicoding Indonesia**

---

## 🌟 Fitur Utama & Kriteria Terpenuhi

### 1. Kriteria Utama (Wajib)
- **Registrasi Akun**: Mendaftar akun baru dengan validasi nama, email, dan kata sandi minimal 6 karakter.
- **Login Akun**: Masuk menggunakan akun terdaftar dan menyimpan sesi login secara aman di `localStorage`.
- **Daftar Threads**: Menampilkan daftar thread lengkap dengan judul, potongan isi, waktu relatif (`postedAt`), jumlah komentar, dan info pembuat (nama & avatar).
- **Detail Thread**: Menampilkan konten lengkap thread (mendukung HTML), waktu pembuatan, profil pembuat, serta daftar komentar.
- **Buat Thread Baru**: Pengguna terotentikasi dapat membuat thread baru dengan judul, kategori/tag, dan isi.
- **Buat Komentar**: Pengguna terotentikasi dapat menambahkan komentar pada thread yang dipilih.
- **Indikator Loading**: Progress bar di bagian paling atas aplikasi yang terhubung langsung ke Redux Store (`react-redux-loading-bar`).
- **React Strict Mode**: Aplikasi dibungkus penuh dengan `<React.StrictMode>`.
- **ESLint & Code Convention**: Konfigurasi ESLint (`.eslintrc.cjs`) bersih dengan **0 errors** dan **0 warnings**.
- **Arsitektur Redux yang Bersih**: Seluruh pemanggilan REST API dilakukan melalui Redux Thunk, tidak ada pemanggilan API di dalam lifecycle atau `useEffect` komponen.

### 2. Kriteria Saran (Target Bintang 5)
- **Fitur Votes (Upvote & Downvote)**:
  - Tersedia tombol up-vote dan down-vote pada thread dan seluruh komentar.
  - Indikasi visual warna tombol saat pengguna telah memberikan vote.
  - **Optimistically Apply Actions**: Pembaruan state di sisi UI langsung terjadi seketika saat tombol ditekan, dengan mekanisme rollback otomatis jika terjadi kegagalan request API.
  - Menampilkan jumlah vote secara akurat.
- **Leaderboards**:
  - Halaman khusus `/leaderboards` yang menampilkan peringkat pengguna paling aktif beserta avatar dan skor poin.
- **Filter Threads berdasarkan Kategori**:
  - Filter interaktif dengan pills kategori di halaman utama secara client-side.
- **UI/UX Modern & Responsif**:
  - Antarmuka rapi, bersih, kontras tinggi, dan sepenuhnya responsif pada perangkat seluler maupun desktop menggunakan Tailwind CSS.

---

## 🛠️ Teknologi & Pustaka yang Digunakan

- **React 18** (`react`, `react-dom`)
- **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux`)
- **React Router Dom v6** (`react-router-dom`)
- **React Redux Loading Bar** (`react-redux-loading-bar`)
- **Tailwind CSS**
- **HTML React Parser** (`html-react-parser`)
- **React Icons** (`react-icons`)
- **Vite**
- **ESLint**

---

## 📁 Struktur Proyek

```text
Aplikasi Forum Diskusi/
├── docs/                      # Dokumen kriteria submission
├── public/                    # Aset publik
├── src/
│   ├── components/            # Komponen modular & reusable
│   │   ├── CategoryFilter.jsx
│   │   ├── CommentInput.jsx
│   │   ├── CommentItem.jsx
│   │   ├── CommentList.jsx
│   │   ├── Footer.jsx
│   │   ├── LeaderboardItem.jsx
│   │   ├── Loading.jsx
│   │   ├── LoginInput.jsx
│   │   ├── Navbar.jsx
│   │   ├── RegisterInput.jsx
│   │   ├── ThreadDetail.jsx
│   │   ├── ThreadInput.jsx
│   │   ├── ThreadItem.jsx
│   │   ├── ThreadList.jsx
│   │   └── VoteButton.jsx
│   ├── pages/                 # Halaman aplikasi
│   │   ├── CreateThreadPage.jsx
│   │   ├── DetailPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LeaderboardsPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── RegisterPage.jsx
│   ├── states/                # Redux store, action creators, reducers, thunks
│   │   ├── authUser/
│   │   ├── isPreload/
│   │   ├── leaderboards/
│   │   ├── threadDetail/
│   │   ├── threads/
│   │   ├── users/
│   │   └── index.js
│   ├── utils/                 # API wrapper & date helpers
│   │   ├── api.js
│   │   └── index.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs              # Konfigurasi ESLint
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```

### 3. Menjalankan Pemeriksaan ESLint
```bash
npm run lint
```

### 4. Melakukan Build untuk Produksi
```bash
npm run build
```
