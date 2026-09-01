"""
sync-to-mysql.py
-----------------
Mengotomatisasi langkah "export lalu import manual" jadi satu perintah.

Karena Equilife adalah situs statis (GitHub Pages), browser tidak bisa
membuka koneksi TCP langsung ke MySQL (itu keterbatasan browser, bukan
keterbatasan situsnya) — jadi "menarik data langsung dari sistem ke MySQL"
paling realistis dilakukan lewat file JSON yang di-export dari aplikasi,
lalu script ini yang membaca file tsb dan menuliskannya ke MySQL untukmu.

CARA PAKAI
1. Di aplikasi Equilife: klik "Export JSON" di sidebar. File
   equilife-export-YYYY-MM-DD.json akan terunduh ke folder Downloads.
2. Install dependency (sekali saja):
       pip install pandas sqlalchemy pymysql
3. Jalankan:
       python sync-to-mysql.py --file ~/Downloads/equilife-export-2026-09-01.json \
           --host localhost --user root --password rahasia --database equilife
4. Semua sheet/tabel (accounts, transactions, budget_categories,
   chart_of_accounts, debts, investments) otomatis dibuat/ditimpa di MySQL.

Supaya makin dekat ke "otomatis" (bukan manual export-lalu-jalankan-script
tiap kali), jadwalkan script ini dengan cron (Linux/Mac) atau Task
Scheduler (Windows) untuk berjalan tiap kamu biasa export, atau — kalau
kamu mau tanpa langkah export sama sekali — itu perlu backend sungguhan
(bukan localStorage), silakan minta bantuan lanjutan untuk itu.
"""

import argparse
import json
import sys

try:
    import pandas as pd
    from sqlalchemy import create_engine
except ImportError:
    sys.exit(
        "Package belum terinstall. Jalankan dulu:\n"
        "    pip install pandas sqlalchemy pymysql"
    )


def main():
    parser = argparse.ArgumentParser(description="Sync Equilife JSON export into MySQL")
    parser.add_argument("--file", required=True, help="Path ke file equilife-export-*.json")
    parser.add_argument("--host", default="localhost")
    parser.add_argument("--port", default=3306, type=int)
    parser.add_argument("--user", required=True)
    parser.add_argument("--password", required=True)
    parser.add_argument("--database", required=True, help="Database harus sudah dibuat: CREATE DATABASE equilife;")
    args = parser.parse_args()

    with open(args.file, "r", encoding="utf-8") as f:
        payload = json.load(f)

    exported_at = payload.pop("exported_at", None)
    owner_email = payload.pop("user", None)
    print(f"Membaca export milik: {owner_email or '(tidak diketahui)'}  |  diekspor pada: {exported_at}")

    engine = create_engine(
        f"mysql+pymysql://{args.user}:{args.password}@{args.host}:{args.port}/{args.database}"
    )

    for table_name, rows in payload.items():
        if not isinstance(rows, list):
            continue
        df = pd.DataFrame(rows)
        if df.empty:
            print(f"  - {table_name}: kosong, dilewati")
            continue
        df.to_sql(table_name, engine, if_exists="replace", index=False)
        print(f"  - {table_name}: {len(df)} baris tersinkron")

    print("Selesai. Tabel siap dipakai untuk query, Power BI, atau Tableau.")


if __name__ == "__main__":
    main()
