# Panduan Lengkap: Deployment, CI/CD, Branch Protection, dan Pengambilan Screenshot Manual

Panduan ini dibuat khusus untuk memandu Anda langkah demi langkah dalam melakukan deployment, menghubungkan CI/CD, mengatur proteksi branch di GitHub, serta mengambil **3 screenshot wajib** untuk memenuhi Kriteria Utama Submission 2 Dicoding.

---

## Daftar Isi
1. [Langkah 1: Inisialisasi Git & Push ke GitHub](#langkah-1-inisialisasi-git--push-ke-github)
2. [Langkah 2: Deployment ke Vercel (Continuous Deployment)](#langkah-2-deployment-ke-vercel-continuous-deployment)
3. [Langkah 3: Mengaktifkan Branch Protection di GitHub](#langkah-3-mengaktifkan-branch-protection-di-github)
4. [Langkah 4: Mengambil Screenshot 1 (1_ci_check_error)](#langkah-4-mengambil-screenshot-1-1_ci_check_error)
5. [Langkah 5: Mengambil Screenshot 2 (2_ci_check_pass)](#langkah-5-mengambil-screenshot-2-2_ci_check_pass)
6. [Langkah 6: Mengambil Screenshot 3 (3_branch_protection)](#langkah-6-mengambil-screenshot-3-3_branch_protection)
7. [Langkah 7: Penataan File Screenshot & Persiapan ZIP](#langkah-7-penataan-file-screenshot--persiapan-zip)
8. [Template Catatan Submission untuk Reviewer](#template-catatan-submission-untuk-reviewer)

---

## Langkah 1: Inisialisasi Git & Push ke GitHub

> [!IMPORTANT]
> Pastikan repository GitHub dibuat dengan visibilitas **Public** agar fitur **Branch Protection Rules** dapat diakses secara gratis. Setelah submission Anda dinilai dan lulus, Anda bisa mengubahnya menjadi **Private** jika diinginkan.

1. Buka [GitHub](https://github.com/) dan buat repository baru (misal: `aplikasi-forum-diskusi`).
2. Jangan centang "Initialize this repository with README, .gitignore, or license" (karena file-file ini sudah ada di proyek kita).
3. Buka terminal di folder proyek ini (`Aplikasi Forum Diskusi`), lalu jalankan perintah berikut:

```bash
# Tambahkan seluruh file ke git
git add .

# Buat commit utama
git commit -m "feat: complete submission 2 implementation with testing and ci/cd"

# Ubah nama branch utama menjadi master (atau main sesuai preferensi Anda)
git branch -M master

# Hubungkan dengan remote repository GitHub Anda (ganti URL di bawah dengan URL repository Anda)
git remote add origin https://github.com/USERNAME_ANDA/aplikasi-forum-diskusi.git

# Push ke GitHub
git push -u origin master
```

---

## Langkah 2: Deployment ke Vercel (Continuous Deployment)

1. Buka [Vercel](https://vercel.com/) dan login menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Cari repository `aplikasi-forum-diskusi` yang baru saja Anda push, lalu klik **"Import"**.
4. Pada bagian konfigurasi:
   - **Framework Preset**: Vite (terdeteksi otomatis).
   - **Root Directory**: `./` (default).
   - **Build Command**: `npm run build` (default).
   - **Output Directory**: `dist` (default).
5. Klik **"Deploy"** dan tunggu hingga proses build selesai.
6. Simpan URL aplikasi Anda (misal: `https://aplikasi-forum-diskusi-fahmimenjadihengker.vercel.app`).
   > Berkas `vercel.json` sudah kami sediakan di dalam proyek untuk menangani routing SPA agar halaman tidak 404 saat di-refresh!

---

## Langkah 3: Mengaktifkan Branch Protection di GitHub

Fitur ini mewajibkan setiap perubahan kode harus melalui Pull Request dan lolos pengujian otomatis (CI check) sebelum bisa digabungkan (*merged*) ke branch utama.

1. Buka repository Anda di GitHub.
2. Klik tab **"Settings"** (di kanan atas menu repository).
3. Di menu sebelah kiri, klik **"Branches"** (di bawah section *Code and automation*).
4. Klik tombol **"Add branch ruleset"** atau **"Add branch protection rule"**.
5. Isi konfigurasi sebagai berikut:
   - **Branch name pattern**: ketik `master` (atau `main` jika branch default Anda adalah main).
   - Centang **"Require a pull request before merging"**.
   - Centang **"Require status checks to pass before merging"**:
     - Pada kolom pencarian status checks yang muncul, ketik dan centang: `test` (sesuai nama job di `.github/workflows/ci.yml`).
     - Centang **"Require branches to be up to date before merging"**.
   - *(Opsional)* Centang **"Do not allow bypassing the above settings"** agar administrator juga terikat aturan ini.
6. Klik tombol **"Create"** atau **"Save changes"** di bagian bawah.

---

## Langkah 4: Mengambil Screenshot 1 (`1_ci_check_error`)

Kriteria Dicoding: Menunjukkan CI check gagal (error) karena pengujian gagal.

1. Buat branch baru untuk simulasi test error:
   ```bash
   git checkout -b test/ci-error
   ```
2. Buka file [`src/states/authUser/reducer.test.js`](file:///d:/fahmi/DIcoding/Menjadi%20React%20Web%20Developer%20Expert/Submission%201/Aplikasi%20Forum%20Diskusi/src/states/authUser/reducer.test.js).
3. Pada baris ke-49 (atau di dalam pengujian `UNSET_AUTH_USER`), ubah secara sengaja dari:
   ```javascript
   expect(nextState).toBeNull();
   ```
   Menjadi:
   ```javascript
   expect(nextState).toEqual('sengaja_error_untuk_screenshot_ci');
   ```
4. Commit dan push branch tersebut ke GitHub:
   ```bash
   git commit -am "test: trigger intentional failure for CI error screenshot"
   git push -u origin test/ci-error
   ```
5. Buka repository Anda di GitHub, lalu klik tombol **"Compare & pull request"** untuk membuat Pull Request dari branch `test/ci-error` ke `master`.
6. Tunggu beberapa saat hingga GitHub Actions selesai menjalankan workflow.
7. CI check akan berstatus **FAILED / MERAH** dengan tanda silang merah `✖ Continuous Integration / test (pull_request) Failing after...`.
8. Klik tombol **"Details"** pada check yang gagal tersebut (atau buka tab **"Actions"** -> klik workflow yang gagal -> klik job `test`).
9. **AMBIL SCREENSHOT**:
   - Tangkap layar halaman yang menunjukkan pesan error dan tanda silang merah pada job pengujian.
   - Simpan gambar dengan nama: `1_ci_check_error.png` (atau `.jpeg`).

---

## Langkah 5: Mengambil Screenshot 2 (`2_ci_check_pass`)

Kriteria Dicoding: Menunjukkan CI check berhasil (pass) karena seluruh pengujian lolos.

1. Sekarang kembalikan file test tadi ke kode aslinya yang benar:
   Buka kembali [`src/states/authUser/reducer.test.js`](file:///d:/fahmi/DIcoding/Menjadi%20React%20Web%20Developer%20Expert/Submission%201/Aplikasi%20Forum%20Diskusi/src/states/authUser/reducer.test.js), lalu ubah kembali menjadi:
   ```javascript
   expect(nextState).toBeNull();
   ```
2. Commit dan push perbaikan tersebut ke branch yang sama:
   ```bash
   git commit -am "fix: resolve intentional failure so all tests pass"
   git push
   ```
3. Buka kembali halaman Pull Request Anda di GitHub.
4. GitHub Actions akan otomatis berjalan ulang untuk commit terbaru.
5. Tunggu sekitar 1 menit hingga status check berubah menjadi **CENTANG HIJAU** bertuliskan:
   `✔ Continuous Integration / test (pull_request) Successful`.
6. Klik **"Details"** pada check yang sukses tersebut atau buka tab **"Checks"**.
7. **AMBIL SCREENSHOT**:
   - Tangkap layar halaman yang menunjukkan tanda centang hijau bahwa seluruh pengujian lolos tanpa error.
   - Simpan gambar dengan nama: `2_ci_check_pass.png` (atau `.jpeg`).

---

## Langkah 6: Mengambil Screenshot 3 (`3_branch_protection`)

Kriteria Dicoding: Menunjukkan branch protection rule pada halaman Pull Request.

1. Pada halaman Pull Request yang sama (atau saat pengujian sedang berlangsung / setelah pengujian selesai), gulir ke bagian bawah kotak status PR (tempat tombol Merge).
2. Di sana akan terlihat kotak peringatan/status Branch Protection, contohnya:
   - Ada keterangan: *"At least 1 approving review is required by reviewers with write access"* (jika review diaktifkan).
   - ATAU: *"Required status check 'test' must pass before merging"*.
   - ATAU: Status check yang terkunci / tombol merge yang dinonaktifkan dengan tulisan *"Merging is blocked"*.
3. **AMBIL SCREENSHOT**:
   - Tangkap layar seluruh area kotak status Pull Request tersebut yang dengan jelas memperlihatkan tulisan/indikator proteksi branch.
   - Simpan gambar dengan nama: `3_branch_protection.png` (atau `.jpeg`).
4. Setelah screenshot berhasil diambil, Anda boleh melakukan merge Pull Request ke `master` atau menutup PR tersebut:
   ```bash
   # Kembali ke branch master di komputer lokal
   git checkout master
   git pull origin master
   ```

---

## Langkah 7: Penataan File Screenshot & Persiapan ZIP

1. Simpan ketiga file screenshot di root proyek atau folder khusus:
   ```text
   Aplikasi Forum Diskusi/
   ├── 1_ci_check_error.png
   ├── 2_ci_check_pass.png
   ├── 3_branch_protection.png
   ├── .github/
   ├── .storybook/
   ├── cypress/
   ├── src/
   ├── package.json
   ...
   ```
2. Pastikan file `node_modules` **TIDAK IKUT DI-ZIP**!
   ```powershell
   # Contoh membuat ZIP bersih di Windows PowerShell (tanpa node_modules dan dist):
   # Pastikan Anda berada di direktori submission
   Compress-Archive -Path src, .github, .storybook, cypress, docs, public, index.html, package.json, package-lock.json, vite.config.js, tailwind.config.js, postcss.config.js, vercel.json, .eslintrc.cjs, .gitignore, README.md, PANDUAN_SCREENSHOT_DAN_CICD.md, 1_ci_check_error.png, 2_ci_check_pass.png, 3_branch_protection.png -DestinationPath submission2.zip
   ```

---

## Template Catatan Submission untuk Reviewer

Salin dan sesuaikan teks berikut saat mengumpulkan submission di platform Dicoding:

```markdown
Halo Reviewer Dicoding,

Berikut adalah Submission 2 saya untuk kelas "Menjadi React Web Developer Expert" pada proyek Aplikasi Forum Diskusi:

### 1. Informasi Deployment & Repositori
- **URL Aplikasi Vercel**: https://aplikasi-forum-diskusi-anda.vercel.app
- **URL Repositori GitHub**: https://github.com/USERNAME_ANDA/aplikasi-forum-diskusi

### 2. Kriteria Utama 1: Automation Testing
- **Reducer Testing (> 3 berkas)**:
  1. `src/states/authUser/reducer.test.js`
  2. `src/states/isPreload/reducer.test.js`
  3. `src/states/threads/reducer.test.js`
  4. `src/states/leaderboards/reducer.test.js`
  5. `src/states/threadDetail/reducer.test.js`
- **Thunk Testing (> 3 berkas)**:
  1. `src/states/authUser/action.test.js`
  2. `src/states/threads/action.test.js`
  3. `src/states/isPreload/action.test.js`
  4. `src/states/leaderboards/action.test.js`
- **Component Testing (> 3 berkas)**:
  1. `src/components/LoginInput.test.jsx`
  2. `src/components/RegisterInput.test.jsx`
  3. `src/components/ThreadInput.test.jsx`
  4. `src/components/VoteButton.test.jsx`
- **End-to-End Testing (Cypress)**:
  - Berkas: `cypress/e2e/login.cy.js` (skenario login lengkap, penanganan form, alert, hingga navigasi homepage).
- Seluruh berkas pengujian telah dilengkapi dengan blok komentar **Skenario Pengujian** sesuai panduan Dicoding.
- Perintah pengujian: `npm test` dan `npm run e2e`.

### 3. Kriteria Utama 2: Deployment & CI/CD
- **Continuous Integration (CI)**: GitHub Actions (`.github/workflows/ci.yml`) menjalankan linting, testing unit/komponen, dan build otomatis.
- **Continuous Deployment (CD)**: Vercel terintegrasi otomatis dengan repository dan dilengkapi file `vercel.json` untuk SPA routing.
- **Branch Protection**: Branch `master` diproteksi wajib lolos status check CI sebelum merge.
- **Bukti Screenshot**:
  1. `1_ci_check_error.png`
  2. `2_ci_check_pass.png`
  3. `3_branch_protection.png`

### 4. Kriteria Utama 3 & Saran: React Ecosystem
- **Storybook (4 Stories)**:
  1. `src/stories/LoginInput.stories.jsx`
  2. `src/stories/RegisterInput.stories.jsx`
  3. `src/stories/VoteButton.stories.jsx`
  4. `src/stories/CategoryFilter.stories.jsx`
  - Perintah Storybook: `npm run storybook` dan `npm run build-storybook`.
- **PropTypes**: Seluruh komponen utama telah dilengkapi validasi tipe props menggunakan library `prop-types`.

### 5. Mempertahankan Kriteria Submission 1
- Fitur Upvote/Downvote thread & komentar dengan optimistic update.
- Filter thread berdasarkan kategori.
- Halaman Leaderboards.
- Responsif, loading indicator, dan tampilan modern.

Terima kasih atas review yang diberikan!
```

