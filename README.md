# Equilife — Personal Financial Balance (GitHub Pages)

Situs statis (HTML + CSS + JavaScript murni), tanpa Streamlit/Python, siap di-host gratis
di **GitHub Pages**.

---

## 0. Ringkasan revisi kali ini

| # | Permintaan | Yang dikerjakan |
|---|---|---|
| 1 | Sumber pemasukan, bukan sekadar rekening tujuan | Transaksi **Pemasukan** sekarang punya field **Sumber Pemasukan**: Gaji Bulanan / Side Income / Penghasilan Lainnya, terpisah dari rekening tujuan |
| 2 | Semua kata harus bisa diterjemahkan | String yang sebelumnya hardcode (mis. `/bln`) sudah dipindah ke kamus terjemahan ID/EN; hanya isi **Keterangan** (teks bebas dari pengguna) yang memang tidak diterjemahkan |
| 3 & 7 | Login lengkap + tiap orang datanya sendiri, tidak terlihat orang lain | Sistem **Login/Daftar** penuh (lihat bagian 6) dengan isolasi data per akun |
| 4 | Budget dari gaji bulanan saja | Target anggaran & live-calc sekarang dihitung dari transaksi **Gaji Bulanan** saja (bukan semua pemasukan); info "Gaji Bulanan bulan ini: Rp …" ditampilkan di atas tabel Monitoring Anggaran |
| 5 | Export dipertahankan + cara tarik ke MySQL, hide semua info Overview, filter bulan/tahun income & expense, filter tahun tidak cuma 2026, liability dipisah per sumber | Export Excel **tetap ada**, ditambah **Export JSON** untuk otomatisasi (lihat bagian 7); toggle "Sembunyikan" sekarang menyamarkan **semua** angka di Overview; filter bulan/tahun baru untuk kartu Pemasukan/Pengeluaran; rentang tahun di semua filter sekarang luas (bukan cuma 2026); panel Liability punya filter **Sumber** terpisah dari filter bulan/tahun |
| 6 | Sidebar lebih profesional & fleksibel di HP/tablet | Sidebar dirapikan (kartu profil pengguna, label section "MENU"); di tablet otomatis menyempit jadi ikon saja; di HP jadi **drawer** (menu geser) lewat tombol hamburger, bukan lagi baris ikon yang di-scroll horizontal |

---

## 1. Struktur file

```
equilife/
├── index.html
├── css/style.css
├── js/app.js
├── assets/logo.png
├── scripts/sync-to-mysql.py   ← baru: otomasi export→MySQL
└── README.md
```

Tidak ada proses build. Buka `index.html` langsung di browser pun sudah jalan
(atau pakai Live Server di VS Code untuk pratinjau).

---

## 2. Deploy pertama kali (kalau belum pernah)

```bash
git init
git add .
git commit -m "Equilife static site"
git branch -M main
git remote add origin https://github.com/USERNAME/equilife.git
git push -u origin main
```
Lalu di GitHub: **Settings → Pages → Source: branch `main`, folder `/ (root)` → Save**.
Situs aktif di `https://USERNAME.github.io/equilife/` dalam 1–2 menit.

---

## 3. Cara update situs yang sudah live

Timpa file-file lama (`index.html`, `css/style.css`, `js/app.js`, dan tambahkan folder
`scripts/`) dengan yang baru, lalu dari folder project jalankan:

```bash
git add .
git commit -m "Revisi: login multi-user, sumber pemasukan, budget dari gaji, sidebar drawer, filter overview"
git push
```

Tunggu 1–2 menit, refresh `https://USERNAME.github.io/equilife/` (pakai **Ctrl+Shift+R** /
**Cmd+Shift+R** kalau browser masih menampilkan versi lama dari cache).

> **Penting:** karena versi ini menambahkan sistem login, siapa pun yang sudah memakai
> versi lama (tanpa login) akan diminta mendaftar/masuk saat pertama kali membuka versi
> baru. Data lama mereka **tidak hilang** — begitu mereka login pertama kali, aplikasi
> otomatis memindahkan data lama (yang tersimpan tanpa akun) ke akun yang baru dibuat itu.

---

## 4. Preview lokal sebelum push

- **VS Code**: install extension **Live Server**, klik kanan `index.html` → *Open with Live Server*.
- **Tanpa VS Code**: buka `index.html` langsung dua-kali-klik di file explorer (fitur login
  tetap jalan meski dibuka lewat `file://`, dengan sedikit catatan keamanan di bagian 6.3).

---

## 5. Anggaran berbasis Gaji Bulanan

Target anggaran (baik live-calc Rp⇄% maupun tabel Monitoring) sekarang dihitung dari
**total transaksi Pemasukan bersumber "Gaji Bulanan" pada bulan berjalan**. Kalau bulan ini
belum ada transaksi gaji, sistem otomatis memakai bulan terakhir yang punya data gaji,
supaya anggaran tetap bisa dihitung sebelum gajian berikutnya tercatat.

Side Income dan Penghasilan Lainnya **tidak** ikut dihitung sebagai dasar target anggaran —
tapi tetap masuk ke Total Saldo dan kartu Pemasukan di Overview seperti biasa, karena itu
tetap uang yang kamu punya, hanya tidak dijadikan basis alokasi anggaran bulanan.

---

## 6. Login & data per pengguna

### 6.1. Cara kerja
- **Daftar**: isi Nama Lengkap, Tanggal Lahir, Kota Kelahiran, Email, dan Kata Sandi.
- Sistem mengirim **kode verifikasi 6 digit**. Kalau kamu belum menyambungkan layanan
  email (lihat 6.2), kode itu ditampilkan langsung di layar dengan label jelas "Mode
  pratinjau" — supaya kamu tetap bisa mencoba alurnya tanpa perlu setup apa pun dulu.
- Setelah kode diverifikasi, kamu otomatis masuk.
- **Masuk** berikutnya cukup Email + Kata Sandi.
- Data keuangan (rekening, transaksi, utang, investasi, kategori) disimpan **terpisah per
  akun** di localStorage browser — akun lain yang login di browser yang sama **tidak bisa
  melihat data akun kamu**, dan sebaliknya.

### 6.2. Supaya kode verifikasi benar-benar terkirim lewat email
Situs statis tidak bisa mengirim email sendiri, tapi bisa disambungkan ke layanan pihak
ketiga **EmailJS** (ada paket gratis, tanpa perlu server):
1. Daftar di [emailjs.com](https://www.emailjs.com), buat *Email Service* (mis. sambungkan
   Gmail kamu) dan sebuah *Email Template* dengan variabel `{{to_email}}`, `{{to_name}}`,
   `{{verify_code}}`.
2. Tambahkan script EmailJS di `index.html`, sebelum `<script src="js/app.js">`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```
3. Di `js/app.js`, isi bagian ini (dekat awal blok AUTH) dengan kunci dari akun EmailJS-mu:
   ```js
   const EMAILJS_CONFIG = { publicKey: "xxxx", serviceId: "xxxx", templateId: "xxxx" };
   ```
4. Push perubahan (lihat bagian 3). Setelah ini, kode verifikasi betulan terkirim ke email
   pendaftar — mode pratinjau di layar otomatis tidak muncul lagi.

### 6.3. Catatan jujur soal keamanan
Ini **bukan sistem autentikasi tingkat enterprise**. Karena semuanya berjalan di browser
tanpa server sungguhan:
- Kata sandi di-hash (SHA-256) sebelum disimpan, tapi tetap tersimpan di localStorage
  perangkat itu — siapa pun yang punya akses fisik/DevTools ke browser tsb bisa membacanya
  dalam bentuk hash.
- Tidak ada perlindungan terhadap manipulasi langsung lewat DevTools oleh pengguna yang
  cukup paham teknis di perangkatnya sendiri.
- Cocok untuk **penggunaan personal/keluarga/demo**, bukan untuk data sensitif banyak
  orang yang saling tidak percaya di perangkat bersama.
- Kalau nanti butuh keamanan sungguhan (password hashing di server, token sesi, dsb), itu
  perlu backend asli (mis. Node/Express + database) — di luar cakupan situs statis ini,
  tapi bisa dibantu sebagai proyek lanjutan kalau diperlukan.

---

## 7. Export data & tarik ke MySQL → Power BI / Tableau

Tombol export **Excel tetap ada** (tidak dihapus), ditambah **Export JSON** yang lebih cocok
untuk otomatisasi.

### 7.1. Cara paling manual (Excel)
Klik **"⬇ Export Excel"** → dapat file `.xlsx` 6 sheet (`accounts`, `transactions`,
`budget_categories`, `chart_of_accounts`, `debts`, `investments`) → import manual ke MySQL
lewat **Table Data Import Wizard** di MySQL Workbench.

### 7.2. Cara yang lebih otomatis — "menarik", bukan cuma export manual
Klik **"⬇ Export JSON"**, lalu jalankan script yang sudah disiapkan di
`scripts/sync-to-mysql.py`:

```bash
pip install pandas sqlalchemy pymysql
python scripts/sync-to-mysql.py \
  --file ~/Downloads/equilife-export-2026-09-01.json \
  --host localhost --user root --password rahasia --database equilife
```

Script ini otomatis membuat/menimpa semua tabel MySQL dari satu file JSON — jadi kamu tidak
perlu klik-klik satu-satu lewat wizard tiap kali. Kalau mau makin otomatis lagi (tanpa perlu
klik "Export JSON" secara manual sama sekali), jadwalkan lewat **cron** (Linux/Mac) atau
**Task Scheduler** (Windows) untuk menjalankan script itu di folder Downloads secara berkala.

> **Kenapa tidak bisa "tarik langsung" tanpa file export sama sekali?** Browser tidak
> diizinkan membuka koneksi TCP mentah ke MySQL (port 3306) — itu batasan keamanan semua
> browser, bukan batasan situs ini. Supaya benar-benar realtime tanpa file perantara, kamu
> butuh backend (API kecil di server yang bicara ke MySQL, lalu situs memanggil API itu).
> Itu proyek lanjutan yang berbeda dari situs statis GitHub Pages ini — kabari saya kalau
> mau dibantu ke arah situ.

### 7.3. Konek ke Power BI
**Get Data → MySQL database** → isi Server & Database `equilife` → pilih tabel-tabel hasil
sync tadi → **Load** → buat relasi di **Model view** (mis. `transactions.category_code` ↔
`budget_categories.category_code`) → mulai bikin visual.

### 7.4. Konek ke Tableau
**Connect → To a Server → MySQL** → isi Server, Port `3306`, Database `equilife` → Sign In
→ drag tabel ke kanvas, atur relationship → mulai bikin worksheet.

---

## 8. Overview: privasi, filter, dan liability per sumber

- Tombol **"Sembunyikan"** di Overview sekarang menyamarkan **semua** angka di halaman itu
  (saldo total, tiap kartu rekening/investasi, Pemasukan/Pengeluaran/Sisa, angka Liability,
  dan nominal di daftar Transaksi Terakhir) — bukan cuma saldo rekening seperti sebelumnya.
- Kartu **Pemasukan / Pengeluaran / Sisa** sekarang punya filter **bulan & tahun** sendiri
  (sebelumnya selalu "bulan berjalan" dan tidak bisa diubah).
- Semua filter tahun (Overview, Liability, dst.) sekarang menampilkan rentang tahun yang
  luas (beberapa tahun ke belakang & ke depan), digabung dengan tahun data asli kamu —
  bukan cuma menampilkan 2026.
- Panel **Liability** punya filter **Sumber** (Bank / SPinjam / Paylater / dst.) terpisah
  dari filter bulan/tahun, jadi kamu bisa melihat angka Total Pokok Pinjaman & Total Bunga
  untuk satu sumber utang saja, bukan selalu gabungan semua sumber.

---

## 9. Sidebar: profesional & responsif

- **Desktop** (>1024px): sidebar penuh seperti biasa, bisa di-collapse manual lewat tombol `‹ / ›`.
- **Tablet** (769–1024px): sidebar otomatis menyempit jadi ikon saja, menghemat ruang layar.
- **HP** (≤768px): sidebar jadi **drawer** (menu geser dari kiri) yang dibuka lewat tombol
  hamburger di bilah atas, dan ditutup dengan tap di luar area menu — pola yang lebih rapi
  dibanding baris ikon yang di-scroll horizontal pada versi sebelumnya.
- Kartu profil pengguna (nama + tombol Keluar) ditambahkan di sidebar bagian bawah.

---

## 10. Cara kustomisasi

- **Ganti logo**: timpa `assets/logo.png`.
- **Ganti warna**: CSS variable di `:root` pada `css/style.css` (skema SAP Fiori Horizon —
  biru aksen, hijau positif, merah negatif, amber peringatan; sidebar pakai token terpisah
  berawalan `--shell-*` karena warnanya gelap).
- **Kata kunci sumber pemasukan / kategori COA**: lihat `COA_RULES` di `js/app.js`.
- **Rumus bunga utang**: fungsi `calcDebtInterest()` di `js/app.js`.
- **Aktifkan email verifikasi sungguhan**: lihat bagian 6.2.
- **Kategori/rekening default untuk akun baru**: fungsi `buildSeedState()` di `js/app.js`.

---

## 11. Tentang penyimpanan data

Data disimpan di **localStorage** browser, per akun, per perangkat/browser:
- Tersimpan otomatis setiap tambah/edit/hapus — tidak perlu "save" manual.
- Tidak otomatis sinkron antar perangkat (pakai **Export Excel/JSON** untuk memindahkan
  data, atau backend sungguhan kalau mau sinkron real-time antar perangkat).
- Tombol **"Reset data contoh"** di sidebar mengembalikan akun yang sedang login ke kondisi
  data kosong — akun lain tidak terpengaruh.
