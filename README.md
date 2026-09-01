# Equilife — Personal Financial Balance (GitHub Pages)

Situs statis (HTML + CSS + JavaScript murni), tanpa Streamlit/Python, siap di-host gratis
di **GitHub Pages**.

---

## 0. Ringkasan revisi kali ini

| # | Permintaan | Yang dikerjakan |
|---|---|---|
| 1 | Warna ala SAP, jangan "AI banget" | Tema diubah total ke **SAP Fiori Horizon** (light workspace putih/abu‑abu Fiori, biru `#0070F2`, warna semantik good/critical/bad dari palet chart SAP) + sidebar gelap ala *shell bar* Fiori |
| 2 | Database Excel + tarik ke MySQL + Power BI/Tableau | Tombol **Export ke Excel** (multi-sheet, siap import) + panduan lengkap di bagian 5 |
| 3 | Sidebar bisa ditutup/dibuka | Tombol `‹ / ›` di atas sidebar, status tersimpan otomatis |
| 4 | Liability di Overview (Loan, Interest, status, filter bulan/tahun) | Panel **Liability** baru di Overview, di bawah kartu Pemasukan/Pengeluaran/Sisa |
| 5a | Input utang dengan bunga otomatis | Form **Utang & Cicilan** di menu Transaksi, rumus bunga persis seperti gambar yang kamu kirim |
| 5b | Kelola kategori dengan "kecerdasan" nomor akun | Form **Kelola Kategori**: ketik nama akun → sistem menyarankan jenis (Harta/Utang/Modal/Pendapatan/Beban) dan nomor kode otomatis |
| 5c | Investasi (beli/jual, untung/rugi, multi jenis aset) | Form **Investasi** dengan Saham/Crypto/Obligasi/Emas/Reksa Dana/Lainnya, otomatis hitung untung(hijau)/rugi(merah), muncul di Overview sejajar rekening bank |
| 6 | Kategori baru otomatis muncul di Anggaran | Karena Anggaran membaca daftar kategori yang sama secara langsung, kategori baru/dihapus langsung tersinkron |
| 7 | Indikator kemampuan bayar utang & alokasi investasi di Analysis | 3 kartu indikator baru: **DSR** (rasio cicilan/pemasukan), **Laba/Rugi Investasi Terealisasi**, **Porsi Investasi dari Total Aset** |
| 8 | Input nominal penuh (mis. 15.052.500) | Semua input nominal sekarang memakai **rupiah mask** (format titik ribuan otomatis saat mengetik) — bukan `<input type=number>` yang membatasi |
| — | Cara update situs yang sudah live | Lihat bagian 4 di bawah |

---

## 1. Struktur file

```
equilife/
├── index.html
├── css/style.css
├── js/app.js
├── assets/logo.png
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

## 3. Cara update situs yang sudah live (git add, dst) — INI YANG KAMU TANYAKAN

Karena repo kamu **sudah ada dan sudah ter-deploy**, kamu tidak perlu `git init` lagi.
Ganti saja file-file lama di folder project kamu dengan file-file baru dari revisi ini
(timpa `index.html`, `css/style.css`, `js/app.js` — struktur foldernya sama persis),
lalu dari folder project itu jalankan:

```bash
git add .
git commit -m "Revisi: tema SAP, liability, utang, investasi, kelola kategori, export excel"
git push
```

Itu saja — 3 baris. Penjelasan tiap baris:
- `git add .` → menandai **semua file yang berubah** (termasuk yang baru) untuk di-commit.
- `git commit -m "pesan"` → menyimpan perubahan itu sebagai satu titik riwayat, dengan
  pesan bebas menjelaskan apa yang berubah.
- `git push` → mengirim commit tadi ke GitHub. Karena branch `main` sudah pernah di-set
  (`git push -u origin main` di awal), cukup `git push` saja, tidak perlu tulis lagi
  `-u origin main`.

Setelah `git push` selesai, tunggu **1–2 menit**, lalu refresh
`https://USERNAME.github.io/equilife/` (kalau perlu, refresh dengan **Ctrl+Shift+R** /
**Cmd+Shift+R** supaya browser tidak memakai file lama dari cache).

### Kalau pakai VS Code (tanpa command line)
1. Timpa file lama dengan file baru di folder project (Explorer di VS Code).
2. Buka tab **Source Control** (Ctrl+Shift+G).
3. Semua file yang berubah otomatis terlihat di daftar **Changes**.
4. Ketik pesan commit di kotak atas, klik ikon **✓ Commit**.
5. Klik **Sync Changes** (ikon panah) untuk push ke GitHub.

### Cek status / riwayat (opsional, untuk memastikan)
```bash
git status          # lihat file apa saja yang berubah sebelum commit
git log --oneline   # lihat riwayat commit
```

> **Catatan penting:** karena data (rekening/transaksi/utang/investasi) disimpan di
> **localStorage browser** (lihat bagian 6), meng-update file situs lewat git **tidak
> menghapus data pengguna yang sudah tersimpan di browser mereka** — git hanya
> memperbarui tampilan & logika aplikasinya.

---

## 4. Preview lokal sebelum push (disarankan)

Supaya tidak salah upload, cek dulu di komputer sendiri:
- **VS Code**: install extension **Live Server**, klik kanan `index.html` → *Open with Live Server*.
- **Tanpa VS Code**: cukup buka `index.html` langsung dua‑kali‑klik di file explorer.

---

## 5. Export ke Excel → MySQL → Power BI / Tableau

Karena GitHub Pages tidak bisa menjalankan Python/pandas, alur "database Excel" versi
ini bekerja seperti ini:

```
Aplikasi (localStorage) → tombol "Export Excel" → file .xlsx multi-sheet
      → import ke MySQL → konek Power BI / Tableau ke MySQL
```

### 5.1. Export data
Klik **"⬇ Export Excel"** di sidebar. File `equilife-export-YYYY-MM-DD.xlsx` akan
terunduh, isinya 6 sheet siap pakai (nama kolom sudah dalam format `snake_case` yang
gampang di-mapping ke tabel database):

| Sheet | Isi |
|---|---|
| `accounts` | rekening bank/dompet, saldo awal & saldo berjalan |
| `transactions` | seluruh transaksi (pemasukan/pengeluaran/transfer), termasuk `debt_id` bila cicilan terkait utang |
| `budget_categories` | kategori pos pengeluaran (Beban) beserta target Rp/% |
| `chart_of_accounts` | akun Harta/Utang/Modal/Pendapatan yang kamu buat lewat Kelola Kategori |
| `debts` | data utang: kewajiban, admin, diterima, jangka waktu, bunga, status |
| `investments` | data investasi: beli/jual, modal, laba/rugi |

### 5.2. Import Excel ke MySQL

**Opsi A — MySQL Workbench (paling gampang, GUI):**
1. Buat database baru: `CREATE DATABASE equilife;`
2. Klik kanan schema `equilife` → **Table Data Import Wizard**.
3. Pilih file `.xlsx` → pilih sheet (mis. `transactions`) → wizard otomatis membuat
   tabel dengan kolom sesuai header sheet tersebut.
4. Ulangi untuk tiap sheet (`accounts`, `budget_categories`, `chart_of_accounts`,
   `debts`, `investments`).

**Opsi B — command line (`LOAD DATA INFILE`), kalau Excel sudah disimpan sebagai CSV:**
```sql
CREATE TABLE transactions (
  transaction_id VARCHAR(20) PRIMARY KEY,
  date DATE,
  type VARCHAR(20),
  account_from VARCHAR(100),
  account_to VARCHAR(100),
  category_code VARCHAR(10),
  amount DECIMAL(15,2),
  notes VARCHAR(255),
  debt_id VARCHAR(20)
);

LOAD DATA LOCAL INFILE 'transactions.csv'
INTO TABLE transactions
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```
(Buat tabel serupa untuk `accounts`, `debts`, `investments`, `budget_categories`,
`chart_of_accounts` — kolomnya persis mengikuti header di masing-masing sheet Excel.)

**Opsi C — Python (kalau kamu mau belajar sekalian, paling fleksibel untuk otomatisasi):**
```python
import pandas as pd
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://user:password@localhost:3306/equilife")
xls = pd.ExcelFile("equilife-export-2026-08-29.xlsx")

for sheet in xls.sheet_names:
    df = pd.read_excel(xls, sheet_name=sheet)
    df.to_sql(sheet, engine, if_exists="replace", index=False)
```
Ini otomatis membuat/mengisi ulang semua tabel MySQL dari seluruh sheet sekaligus —
cocok dijalankan tiap kali kamu export data baru dari aplikasi.

### 5.3. Konek ke Power BI
1. **Get Data → MySQL database** (kalau belum ada, install **MySQL Connector/NET**
   dari dev.mysql.com — Power BI butuh ini untuk konek ke MySQL).
2. Masukkan Server (`localhost:3306` atau alamat server kamu) dan nama database
   `equilife`.
3. Pilih tabel-tabel yang tadi diimport (`transactions`, `accounts`, `debts`,
   `investments`, dst) → **Load**.
4. Buat relasi antar tabel di **Model view**, misalnya `transactions.category_code`
   ↔ `budget_categories.category_code`, atau `transactions.debt_id` ↔ `debts.debt_id`.
5. Dari sini tinggal bikin visual (bar chart pengeluaran per kategori, line chart
   saldo dari waktu ke waktu, dsb) — sama seperti dashboard Analisis di aplikasi ini,
   tapi versi Power BI kamu sendiri.

### 5.4. Konek ke Tableau
1. **Connect → To a Server → MySQL** (kalau connector belum ada, Tableau akan
   mengarahkan ke halaman download driver MySQL).
2. Isi Server, Port `3306`, Database `equilife`, lalu Sign In.
3. Drag tabel-tabel ke kanvas, atur join/relationship sama seperti di Power BI.
4. Mulai buat worksheet/dashboard dari data yang sudah masuk.

> Alur ini sengaja dipisah manual (export → import → konek) karena GitHub Pages murni
> hosting statis, tidak bisa menjalankan server database. Kalau nanti kamu mau proses
> ini **otomatis** (tanpa export manual tiap kali), itu butuh backend sungguhan
> (mis. Node/Python di server + MySQL beneran, bukan localStorage) — kabari saya kalau
> mau dibantu ke arah situ, itu proyek lanjutan yang cukup berbeda dari situs statis ini.

---

## 6. Tentang penyimpanan data (localStorage)

Data (rekening, transaksi, utang, investasi, kategori) disimpan di **localStorage**
browser, per perangkat/browser:
- Tersimpan otomatis setiap tambah/edit/hapus data — tidak perlu "save" manual.
- Tidak otomatis sinkron antar perangkat/browser (pakai **Export Excel** kalau mau
  memindahkan data, atau backend sungguhan kalau mau sinkron real-time).
- Tombol **"Reset data contoh"** di sidebar mengembalikan ke data demo awal.

---

## 7. Cara kustomisasi

- **Ganti logo**: timpa `assets/logo.png`.
- **Ganti warna**: semua warna adalah CSS variable di `:root` pada `css/style.css`
  (`--accent`, `--positive`, `--negative`, dst — sudah memakai skema warna semantik
  ala SAP Fiori: biru untuk aksen, hijau untuk positif, merah untuk negatif, amber
  untuk peringatan). Sidebar pakai token terpisah berawalan `--shell-*` karena
  warnanya gelap sedangkan konten utama terang.
- **Aturan "kecerdasan" nomor akun** (item 5b): lihat `COA_RULES` di `js/app.js` —
  daftar kata kunci per jenis akun (Harta/Utang/Modal/Pendapatan). Beban adalah
  default kalau tidak ada kata kunci yang cocok. Tambahkan kata kunci di sana kalau
  mau perluas deteksinya.
- **Rumus bunga utang** (item 5a): fungsi `calcDebtInterest()` di `js/app.js`,
  persis mengikuti rumus di gambar yang kamu kirim:
  `Total Bunga = (Tagihan per Bulan × Jangka Waktu) − Kewajiban`,
  `Persentase Bunga = (Total Bunga ÷ Kewajiban) × 100%`.
- **Kategori/rekening default**: array `budget` dan `accounts` di `buildSeedState()`
  pada `js/app.js`.

---

## 8. Catatan desain

- Tema **SAP Fiori Horizon**: kanvas konten terang (putih/abu‑abu `#F5F6F7`), aksen
  biru SAP `#0070F2`, warna semantik dari palet chart SAP (good/critical/bad/neutral),
  sidebar gelap ala *shell bar* Fiori untuk kontras & orientasi.
- Semua grafik (donut, bar chart, progress bar) dibuat manual dengan HTML/CSS — bukan
  library chart generik — supaya terasa fungsional dan bukan template AI/dashboard umum.
- Sidebar bisa **collapse/expand** (tombol `‹ / ›`), status tersimpan otomatis.
- Ikon & emoji diminimalkan; navigasi dan tombol pakai label teks.
- Font **Poppins**, angka pakai tabular numerals, dan semua input nominal memakai
  rupiah mask supaya bisa mengetik nominal penuh tanpa batasan.
