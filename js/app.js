/* ==========================================================================
   Equilife — application logic
   Static, client-side. Data persists in the browser via localStorage.
   ========================================================================== */

const STORAGE_KEY_LEGACY = "equilife_data_v3";

const T = {
  ID: {
    tagline: "Pencatatan Keuangan Pribadi",
    nav_overview: "Overview", nav_transaksi: "Transaksi", nav_anggaran: "Anggaran", nav_analisis: "Analisis",
    page_sub_overview: "Ringkasan saldo, kewajiban, dan aktivitas finansial Anda",
    page_sub_transaksi: "Kelola transaksi harian, hutang, investasi, dan kategori akun",
    page_sub_anggaran: "Atur target pos anggaran dan pantau realisasi bulanan",
    page_sub_analisis: "Evaluasi pola pengeluaran dan indikator kesehatan keuangan",
    total_balance: "TOTAL SALDO KESELURUHAN",
    hide_balance: "Sembunyikan Saldo", show_balance: "Tampilkan Saldo",
    add_account: "+ Tambah rekening / dompet baru",
    acc_name: "Nama Rekening / Dompet Baru",
    initial_bal: "Saldo Awal (Rp)",
    save: "Simpan", cancel: "Batal", other: "Lainnya",
    income_month: "PEMASUKAN", expense_month: "PENGELUARAN", surplus_month: "SISA / SURPLUS",
    this_month: "Bulan ini",
    recent_tx: "Transaksi Terakhir", see_all: "Lihat semua →",
    add_tx_title: "Tambah Transaksi Baru", add_tx_desc: "Catat pemasukan, pengeluaran, atau mutasi transfer",
    expense: "Pengeluaran", income: "Pemasukan", transfer: "Transfer",
    date: "Tanggal", acc_from: "Sumber Dana", acc_to: "Rekening Tujuan",
    from_acc: "Dari Rekening", to_acc: "Ke Rekening",
    per_month: "/bln", months_unit: "bln", debt_bunga_persen_short: "bunga",
    category: "Kategori Pos Pengeluaran",
    amount: "Nominal Transaksi (Rp)", notes: "Keterangan",
    tx_history: "Riwayat Transaksi",
    tx_count: (n) => `${n} transaksi tercatat`,
    sec_tx: "Transaksi", sec_debt: "Hutang & Cicilan", sec_invest: "Investasi", sec_category: "Kelola Kategori",
    setting_title: "Target Anggaran & Perhitungan Gaji",
    setting_desc: "Sesuaikan alokasi nominal (Rp) atau persentase (%) berdasarkan basis Gaji.",
    budget_period_title: "PERIODE ANGGARAN BULANAN",
    code: "Kode", target_rp: "Target (Rp)", target_pct: "Target (%)",
    total_all: "TOTAL KESELURUHAN", save_setting: "Simpan Target Anggaran",
    budget_vs_act: "Monitoring Anggaran", budget_vs_act_desc: "Perbandingan anggaran vs realisasi aktual",
    category_col: "Kategori", type_col: "Tipe", target: "Target", actual: "Realisasi", remaining: "Sisa", status: "Status",
    status_ok: "Aman", status_over: "Melampaui Batas",
    chart_title: "Grafik Perbandingan Anggaran & Realisasi",
    monthly: "Bulanan", weekly: "Mingguan", week_label: "Minggu ke-",
    donut_title: "Komposisi Pengeluaran Konsumtif vs Non-Konsumtif",
    lifestyle_ratio: "Rasio Pengeluaran Konsumtif", from_income: "dari total Gaji bersih",
    status_wise: "Proporsional", status_warning: "Perlu Perhatian", status_high: "Tingkat Konsumtif Tinggi",
    total_income_lbl: "Total Gaji Bulan Ini", total_expense_lbl: "Total Pengeluaran", konsumtif_expense_lbl: "Total Pengeluaran Konsumtif",
    category_detail: "Rincian Pengeluaran per Kategori",
    correct_title: "Koreksi Transaksi", save_changes: "Simpan Perubahan",
    no_tx: "Belum ada catatan transaksi pada periode ini.",
    no_data_chart: "Belum ada data untuk direpresentasikan dalam grafik.",
    income_info: (v) => `Basis Gaji bersih tercatat pada periode ini: <strong>${v}</strong>`,
    no_income_warn: "Belum ada catatan Pemasukan berjenis 'Gaji'. Tambahkan gaji untuk mengkalkulasi target anggaran otomatis.",
    salary_info: (v, m) => `Anggaran bulanan ini dikalkulasi murni dari Gaji bulan ${m}: <strong>${v}</strong>`,
    no_salary_warn: "Belum ada pemasukan Gaji yang tercatat di bulan ini.",
    total_ok: "Alokasi target anggaran sudah mencapai 100% secara sempurna.",
    total_warn: (p) => `Total alokasi target saat ini ${p}% — idealnya pas di angka 100%.`,
    reset_data: "Reset data demo",
    export_lib_missing: "Library ekspor Excel belum dimuat. Periksa koneksi internet Anda.",
    reset_confirm: "Tindakan ini akan menghapus seluruh data lokal Anda dan mereset ke data awal. Lanjutkan?",
    delete_confirm: "Hapus transaksi ini? Saldo rekening akan disesuaikan kembali secara otomatis.",
    delete_debt_confirm: "Hapus data rekaman hutang ini?",
    delete_cat_confirm: "Hapus kategori ini dari sistem?",
    saved_ok: "Berhasil Disimpan ✓",
    konsumtif: "Konsumtif", nonkonsumtif: "Non-Konsumtif",
    liability_title: "Kewajiban Hutang (Liability)", liability_desc: "Pantauan pinjaman, cicilan, dan bunga berjalan",
    cashflow_title: "ARUS KAS BULANAN", all_sources: "Semua Sumber Hutang",
    liab_total_loan: "Total Pokok Pinjaman Aktif", liab_total_interest: "Total Beban Bunga Berjalan",
    no_debt: "Tidak ada catatan hutang aktif pada periode terpilih.",
    debt_form_title: "Tambah Pinjaman / Hutang Baru", debt_form_desc: "Kewajiban pokok, biaya admin, dan bunga dihitung secara presisi",
    debt_source: "Lembaga / Sumber Hutang", debt_start: "Tanggal Mulai",
    debt_kewajiban: "Kewajiban Pokok Pinjaman", debt_admin: "Biaya Administrasi",
    debt_diterima: "Dana Bersih Diterima", debt_jangka: "Tenor Jangka Waktu (Bulan)",
    debt_tagihan: "Cicilan Tagihan per Bulan", debt_bunga_nominal: "Akumulasi Bunga Total",
    debt_bunga_persen: "Persentase Bunga Efektif", debt_save: "Simpan Data Hutang",
    debt_list_title: "Daftar Hutang & Pinjaman", debt_count: (n) => `${n} hutang tercatat`,
    debt_aktif: "Aktif", debt_lunas: "Lunas", mark_paid: "Tandai Lunas", mark_active: "Tandai Aktif",
    tx_debt_link: "Tautkan ke Cicilan Hutang", debt_no_link: "- (Pengeluaran umum / Bebas hutang)",
    debt_remaining_short: "Sisa Sembuh", debt_progress: (paid, total) => `Terbayar ${paid} dari ${total}`,
    invest_form_title: "Pencatatan Investasi", invest_form_desc: "Rekam aktivitas pembelian maupun pelepasan aset investasi",
    invest_buy: "Beli Aset", invest_sell: "Jual Aset",
    invest_jenis: "Instrumen Investasi", invest_kode: "Kode Ticker / Nama Aset",
    invest_pilih_lot: "Pilih Portofolio Aktif", invest_nominal: "Modal Pembelian (Rp)",
    invest_terima: "Dana Penjualan Diterima (Rp)",
    invest_saham: "Saham", invest_crypto: "Kripto", invest_obligasi: "Obligasi / SBN",
    invest_emas: "Emas Logam Mulia", invest_reksadana: "Reksa Dana",
    invest_list_title: "Portofolio Posisi Investasi", invest_active: "Portofolio Aktif", invest_none_active: "Tidak ada instrumen portofolio aktif yang dapat dijual.",
    no_invest: "Belum ada portofolio investasi tercatat.",
    invest_summary: (n, v) => `${n} posisi aktif · total modal tertanam ${v}`,
    cat_title: "Pengaturan Akun & Kategori (COA)", cat_desc: "Sistem mengotomatisasi kode perkiraan sesuai standar akuntansi.",
    cat_name: "Nama Akun / Kategori", cat_jenis: "Klasifikasi Akun", cat_code: "Kode Akun",
    cat_konsumtif_type: "Klasifikasi Beban", cat_add: "Tambah Akun", cat_update: "Perbarui Akun",
    cat_list_title: "Daftar Akun & Kategori Keuangan",
    jenis_harta: "Harta (Asset)", jenis_hutang: "Hutang (Liability)", jenis_modal: "Modal (Equity)", jenis_pendapatan: "Pendapatan (Revenue)", jenis_beban: "Beban (Expense)",
    edit: "Ubah", delete: "Hapus",
    cat_name_required: "Nama akun atau kategori wajib diisi.",
    cat_code_exists: "Kode akun tersebut sudah digunakan.",
    extra_indicators_title: "Indikator Kesehatan Finansial Utama",
    extra_indicators_desc: "Analisis rasio cicilan, akumulasi profit, dan porsi aset.",
    dsr_title: "Debt Service Ratio (DSR)",
    dsr_note: "Perbandingan total cicilan hutang bulanan terhadap rata-rata Gaji.",
    dsr_sehat: "Sehat", dsr_waspada: "Waspada", dsr_berisiko: "Berisiko Tinggi",
    invest_realized_title: "Laba / Rugi Investasi Terealisasi",
    invest_realized_note: "Akumulasi selisih jual bersih terhadap modal aset yang telah dilepas.",
    invest_ratio_title: "Rasio Alokasi Aset Investasi",
    invest_ratio_note: "Persentase modal aktif investasi dibandingkan total kekayaan.",
    invest_low: "Konservatif", invest_moderate: "Moderat", invest_aggressive: "Agresif",
    nav_section_menu: "MENU UTAMA", logout: "Keluar Sesi", export_excel: "⬇ Ekspor ke Excel", export_json: "⬇ Cadangkan ke JSON",
    auth_login_tab: "Masuk Akun", auth_register_tab: "Pendaftaran",
    auth_email: "Alamat Email", auth_password: "Kata Sandi", auth_login_btn: "Masuk ke Aplikasi",
    auth_fullname: "Nama Lengkap Anda", auth_birthdate: "Tanggal Lahir", auth_birthplace: "Kota Asal Kelahiran",
    auth_password_hint: "Gunakan sandi unik minimal 6 karakter", auth_register_btn: "Daftar Akun Baru",
    auth_verify_code: "Kode Verifikasi Keamanan (6 Digit)", auth_verify_btn: "Verifikasi & Masuk", auth_resend: "Kirim ulang kode verifikasi",
    auth_disclaimer: "Data privasi finansial Anda tersimpan aman secara lokal di browser perangkat ini.",
    auth_verify_desc: (email) => `Kode verifikasi telah dikirimkan ke email <strong>${email}</strong>.`,
    auth_dev_preview: (code) => `Kode simulasi pengembang: ${code}`,
    auth_email_failed: (code) => `Pengiriman email gagal. Kode verifikasi Anda: ${code}`,
    auth_err_not_found: "Email tersebut belum terdaftar dalam sistem.",
    auth_err_wrong_password: "Kata sandi yang Anda masukkan keliru.",
    auth_err_email_taken: "Email ini sudah digunakan oleh akun lain.",
    auth_err_password_short: "Kata sandi minimal harus terdiri dari 6 karakter.",
    auth_err_code_expired: "Masa berlaku kode verifikasi telah habis.",
    auth_err_code_wrong: "Kode verifikasi yang Anda masukkan tidak valid.",
    auth_err_generic: "Terjadi kendala teknis yang tidak terduga.",
    tenor_label: "Pilihan Tenor Cicilan",
    src_gaji: "Gaji", src_sidejob: "Side Job", src_hutang: "Hutang", src_lainnya: "Lainnya",
  },
  EN: {
    tagline: "Personal Financial Records",
    nav_overview: "Overview", nav_transaksi: "Transactions", nav_anggaran: "Budget", nav_analisis: "Analysis",
    page_sub_overview: "Summary of balances, liabilities, and core financial activity",
    page_sub_transaksi: "Manage daily records, debts, investments, and account categories",
    page_sub_anggaran: "Set budget targets and monitor monthly realizations",
    page_sub_analisis: "Evaluate spending patterns and financial health indicators",
    total_balance: "TOTAL OVERALL BALANCE",
    hide_balance: "Hide Balance", show_balance: "Show Balance",
    add_account: "+ Add new account / wallet",
    acc_name: "New Account / Wallet Name",
    initial_bal: "Initial Balance (Rp)",
    save: "Save", cancel: "Cancel", other: "Other",
    income_month: "INCOME", expense_month: "EXPENSE", surplus_month: "REMAINING / SURPLUS",
    this_month: "This month",
    recent_tx: "Recent Transactions", see_all: "View all →",
    add_tx_title: "Add New Transaction", add_tx_desc: "Record income, expense, or internal transfer",
    expense: "Expense", income: "Income", transfer: "Transfer",
    date: "Date", acc_from: "Source Account / Type", acc_to: "Destination Account",
    from_acc: "From Account", to_acc: "To Account",
    per_month: "/mo", months_unit: "mo", debt_bunga_persen_short: "interest",
    category: "Expense Category",
    amount: "Transaction Amount (Rp)", notes: "Notes",
    tx_history: "Transaction History",
    tx_count: (n) => `${n} transactions recorded`,
    sec_tx: "Transactions", sec_debt: "Debt & Loans", sec_invest: "Investments", sec_category: "Manage Categories",
    setting_title: "Budget Targets & Salary Allocation",
    setting_desc: "Adjust monetary amounts (Rp) or percentages (%) based on Salary.",
    budget_period_title: "MONTHLY BUDGET PERIOD",
    code: "Code", target_rp: "Target (Rp)", target_pct: "Target (%)",
    total_all: "OVERALL TOTAL", save_setting: "Save Budget Targets",
    budget_vs_act: "Budget Monitoring", budget_vs_act_desc: "Budget vs actual monthly realization",
    category_col: "Category", type_col: "Type", target: "Target", actual: "Actual", remaining: "Remaining", status: "Status",
    status_ok: "On Track", status_over: "Exceeded Limit",
    chart_title: "Budget vs Actual Visualization Chart",
    monthly: "Monthly", weekly: "Weekly", week_label: "Week ",
    donut_title: "Lifestyle vs Essential Spending Composition",
    lifestyle_ratio: "Lifestyle Consumption Ratio", from_income: "of net Salary",
    status_wise: "Proportional", status_warning: "Needs Attention", status_high: "High Consumption Level",
    total_income_lbl: "Total Salary This Month", total_expense_lbl: "Total Expenses", konsumtif_expense_lbl: "Lifestyle Expenses",
    category_detail: "Category Expense Breakdown",
    correct_title: "Correct Transaction", save_changes: "Save Changes",
    no_tx: "No transaction records found for this period.",
    no_data_chart: "No data available to render chart.",
    income_info: (v) => `Net Salary basis recorded for this period: <strong>${v}</strong>`,
    no_income_warn: "No Salary income recorded yet. Add a Salary record to auto-calculate budgets.",
    salary_info: (v, m) => `This monthly budget is calculated purely from ${m} Salary: <strong>${v}</strong>`,
    no_salary_warn: "No Salary income recorded for this month.",
    total_ok: "Budget target allocations total 100% perfectly.",
    total_warn: (p) => `Current target allocation is ${p}% — ideally it should equal 100%.`,
    reset_data: "Reset sample demo data",
    export_lib_missing: "Excel export library not loaded. Check your connection.",
    reset_confirm: "This will erase all local data and restore defaults. Continue?",
    delete_confirm: "Delete this transaction? Account balance will be reverted.",
    delete_debt_confirm: "Delete this debt record?",
    delete_cat_confirm: "Delete this account category?",
    saved_ok: "Saved Successfully ✓",
    konsumtif: "Lifestyle", nonkonsumtif: "Essential",
    liability_title: "Debt Liabilities", liability_desc: "Overview of active loans, installments, and running interest",
    cashflow_title: "MONTHLY CASH FLOW", all_sources: "All Debt Sources",
    liab_total_loan: "Total Active Loan Principal", liab_total_interest: "Total Running Interest",
    no_debt: "No active liabilities in this period.",
    debt_form_title: "Add New Loan / Debt", debt_form_desc: "Principal, admin fee, and interest calculated precisely",
    debt_source: "Lender / Debt Source", debt_start: "Start Date",
    debt_kewajiban: "Loan Principal Obligation", debt_admin: "Administration Fee",
    debt_diterima: "Net Funds Received", debt_jangka: "Term (Months)",
    debt_tagihan: "Monthly Installment", debt_bunga_nominal: "Total Accumulated Interest",
    debt_bunga_persen: "Effective Interest Percentage", debt_save: "Save Debt Record",
    debt_list_title: "Debt & Loan Directory", debt_count: (n) => `${n} debts recorded`,
    debt_aktif: "Active", debt_lunas: "Paid Off", mark_paid: "Mark Paid Off", mark_active: "Mark Active",
    tx_debt_link: "Link to Debt Installment", debt_no_link: "- (General expense / No debt link)",
    debt_remaining_short: "Remaining", debt_progress: (paid, total) => `Paid ${paid} of ${total}`,
    invest_form_title: "Investment Portfolio", invest_form_desc: "Record buy or sell activities for investment assets",
    invest_buy: "Buy Asset", invest_sell: "Sell Asset",
    invest_jenis: "Asset Instrument", invest_kode: "Ticker Code / Asset Name",
    invest_pilih_lot: "Select Active Portfolio", invest_nominal: "Purchase Capital (Rp)",
    invest_terima: "Sale Proceeds Received (Rp)",
    invest_saham: "Stocks", invest_crypto: "Crypto", invest_obligasi: "Bonds / SBN",
    invest_emas: "Gold Bullion", invest_reksadana: "Mutual Funds",
    invest_list_title: "Investment Positions Portfolio", invest_active: "Active Portfolios", invest_none_active: "No active portfolios available for sale.",
    no_invest: "No investment portfolio recorded yet.",
    invest_summary: (n, v) => `${n} active positions · total capital ${v}`,
    cat_title: "Account & Category Management (COA)", cat_desc: "System automates standard accounting account coding.",
    cat_name: "Account / Category Name", cat_jenis: "Account Classification", cat_code: "Account Code",
    cat_konsumtif_type: "Expense Classification", cat_add: "Add Account", cat_update: "Update Account",
    cat_list_title: "Financial Accounts & Categories List",
    jenis_harta: "Asset", jenis_hutang: "Liability", jenis_modal: "Equity", jenis_pendapatan: "Revenue", jenis_beban: "Expense",
    edit: "Edit", delete: "Delete",
    cat_name_required: "Account or category name is required.",
    cat_code_exists: "Account code is already in use.",
    extra_indicators_title: "Key Financial Health Indicators",
    extra_indicators_desc: "Analysis of debt service ratio, investment profit, and asset allocation.",
    dsr_title: "Debt Service Ratio (DSR)",
    dsr_note: "Ratio of total monthly debt installments to average Salary.",
    dsr_sehat: "Healthy", dsr_waspada: "Caution", dsr_berisiko: "High Risk",
    invest_realized_title: "Realized Investment Profit / Loss",
    invest_realized_note: "Accumulated net proceeds difference for sold assets.",
    invest_ratio_title: "Investment Asset Allocation Ratio",
    invest_ratio_note: "Percentage of active investment capital relative to total wealth.",
    invest_low: "Conservative", invest_moderate: "Moderate", invest_aggressive: "Aggressive",
    nav_section_menu: "MAIN MENU", logout: "Log Out Session", export_excel: "⬇ Export to Excel", export_json: "⬇ Backup to JSON",
    auth_login_tab: "Log In", auth_register_tab: "Register",
    auth_email: "Email Address", auth_password: "Password", auth_login_btn: "Log In to App",
    auth_fullname: "Your Full Name", auth_birthdate: "Date of Birth", auth_birthplace: "City of Birth",
    auth_password_hint: "Use a secure password with at least 6 characters", auth_register_btn: "Create New Account",
    auth_verify_code: "Security Verification Code (6 Digits)", auth_verify_btn: "Verify & Log In", auth_resend: "Resend verification code",
    auth_disclaimer: "Your financial data privacy is safely stored locally in this device browser.",
    auth_verify_desc: (email) => `Verification code has been sent to <strong>${email}</strong>.`,
    auth_dev_preview: (code) => `Developer preview code: ${code}`,
    auth_email_failed: (code) => `Email delivery failed. Your verification code: ${code}`,
    auth_err_not_found: "Email is not registered in the system.",
    auth_err_wrong_password: "The password you entered is incorrect.",
    auth_err_email_taken: "This email is already registered by another account.",
    auth_err_password_short: "Password must be at least 6 characters long.",
    auth_err_code_expired: "The verification code has expired.",
    auth_err_code_wrong: "The verification code you entered is invalid.",
    auth_err_generic: "An unexpected technical issue occurred.",
    tenor_label: "Installment Term (Months)",
    src_gaji: "Salary", src_sidejob: "Side Job", src_hutang: "Debt", src_lainnya: "Other",
  }
};

const COA_RULES = [
  { jenis: "Hutang", prefix: "2", keywords: ["hutang", "utang", "pinjam", "kredit", "cicilan", "paylater", "pay later", "spinjam", "kta", "kartu kredit", "kpr", "debt", "loan"] },
  { jenis: "Modal", prefix: "3", keywords: ["modal", "ekuitas", "equity", "saldo awal"] },
  { jenis: "Pendapatan", prefix: "4", keywords: ["gaji", "pendapatan", "bonus", "komisi", "honor", "thr", "freelance", "income", "salary"] },
  { jenis: "Harta", prefix: "1", keywords: ["bank", "tabungan", "kas", "dompet", "emas", "saham", "investasi", "crypto", "reksadana", "obligasi", "deposito", "giro", "piutang", "asset", "wallet"] },
];
function suggestJenis(name) {
  const s = (name || "").toLowerCase();
  for (const rule of COA_RULES) { if (rule.keywords.some(k => s.includes(k))) return rule.jenis; }
  return "Beban";
}
const JENIS_PREFIX = { Harta: "1", Hutang: "2", Modal: "3", Pendapatan: "4", Beban: "5" };

let state = null;
let draftBudget = null;
let currentView = "overview";
let currentTxSection = "tx";
let investType = "beli";

function buildSeedState() {
  const accounts = [
    { id: "ACC-01", name: "Bank BRI", initial: 0, balance: 0 },
    { id: "ACC-02", name: "Bank Mandiri", initial: 0, balance: 0 },
    { id: "ACC-03", name: "ShopeePay", initial: 0, balance: 0 },
    { id: "ACC-04", name: "GoPay", initial: 0, balance: 0 },
    { id: "ACC-05", name: "Bank Jago", initial: 0, balance: 0 },
  ];

  const budget = [
    { code: "5101", name: "Zakat & Sedekah", type: "Non-Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5102", name: "Transfer Orang Tua", type: "Non-Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5103", name: "Sewa Kost", type: "Non-Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5104", name: "Bayar Hutang / Cicilan", type: "Non-Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5105", name: "Beban Pasangan / Pacar", type: "Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5106", name: "Beban Hiburan & Rekreasi", type: "Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5107", name: "Makan & Minum Harian", type: "Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5108", name: "Utilitas (Listrik/Internet)", type: "Non-Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5109", name: "Transportasi & Bensin", type: "Non-Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "1201", name: "Tabungan / Investasi", type: "Non-Konsumtif", targetPercent: 0, targetBudget: 0 },
  ];

  return {
    lang: "ID",
    showBalance: true,
    sidebarCollapsed: false,
    accounts,
    budget,
    monthlyBudgets: {},
    transactions: [],
    debts: [],
    investments: [],
    chartOfAccounts: [],
    txCounter: 0,
    accCounter: accounts.length,
    debtCounter: 0,
    investCounter: 0,
  };
}

function calcDebtInterest(kewajiban, tagihanPerBulan, jangkaWaktu) {
  const totalBunga = (tagihanPerBulan * jangkaWaktu) - kewajiban;
  const persenBunga = kewajiban > 0 ? (totalBunga / kewajiban) * 100 : 0;
  return { totalBunga, persenBunga };
}

function migrateState(s) {
  if (s.sidebarCollapsed === undefined) s.sidebarCollapsed = false;
  if (!s.debts) s.debts = [];
  if (!s.investments) s.investments = [];
  if (!s.chartOfAccounts) s.chartOfAccounts = [];
  if (!s.monthlyBudgets) s.monthlyBudgets = {};
  if (s.debtCounter === undefined) s.debtCounter = s.debts.length;
  if (s.investCounter === undefined) s.investCounter = s.investments.length;
  return s;
}

function dataKeyForUser(userId) { return `equilife_data_v3__${userId}`; }

function loadState() {
  try {
    const raw = localStorage.getItem(dataKeyForUser(currentUser.id));
    if (raw) return migrateState(JSON.parse(raw));
  } catch (e) { }
  const seeded = buildSeedState();
  persist(seeded);
  return seeded;
}

function persist(s) {
  if (!currentUser) return;
  try { localStorage.setItem(dataKeyForUser(currentUser.id), JSON.stringify(s)); } catch (e) { }
}
function saveState() { persist(state); }

function findAccount(s, name) { return s.accounts.find(a => a.name === name); }

function applyTxEffect(s, tx, sign) {
  const amt = tx.amount * sign;
  if (tx.type === "Pengeluaran") {
    const a = findAccount(s, tx.accountFrom); if (a) a.balance -= amt;
  } else if (tx.type === "Pemasukan") {
    const a = findAccount(s, tx.accountTo); if (a) a.balance += amt;
  } else {
    const f = findAccount(s, tx.accountFrom); if (f) f.balance -= amt;
    const t = findAccount(s, tx.accountTo); if (t) t.balance += amt;
  }
}

function addTransaction(tx) {
  state.txCounter += 1;
  tx.id = `TX-${String(state.txCounter).padStart(4, "0")}`;
  state.transactions.push(tx);
  applyTxEffect(state, tx, 1);
  saveState();
}
function deleteTransaction(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;
  applyTxEffect(state, tx, -1);
  state.transactions = state.transactions.filter(t => t.id !== id);
  saveState();
}
function updateTransaction(id, { date, amount, notes }) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;
  applyTxEffect(state, tx, -1);
  tx.date = date; tx.amount = amount; tx.notes = notes;
  applyTxEffect(state, tx, 1);
  saveState();
}
function addAccount(name, initialBalance) {
  state.accCounter += 1;
  state.accounts.push({ id: `ACC-${String(state.accCounter).padStart(2, "0")}`, name, initial: initialBalance, balance: initialBalance });
  saveState();
}

let uiLang = "ID";
function tr() { return T[state && state.lang ? state.lang : uiLang]; }

function fmtRp(n) {
  const v = Math.round(n || 0);
  const sign = v < 0 ? "-" : "";
  return sign + "Rp " + Math.abs(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function fmtDateDisplay(iso) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
function parseISO(iso) { return new Date(iso + "T00:00:00"); }
function isoWeek(iso) {
  const d = parseISO(iso);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}
function todayISO() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function addMonthsToISO(iso, months) {
  const d = parseISO(iso);
  d.setMonth(d.getMonth() + months);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
const MONTH_NAMES_ID = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const MONTH_NAMES_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function monthLabelFromKey(key) {
  if (!key) return "";
  const [y, m] = key.split("-");
  const names = state.lang === "ID" ? MONTH_NAMES_ID : MONTH_NAMES_EN;
  return `${names[Number(m) - 1]} ${y}`;
}
function flash(btn, text) {
  const original = btn.textContent;
  btn.textContent = text;
  btn.disabled = true;
  setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 1300);
}
function niceCeil(max) {
  if (max <= 0) return 100000;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  let nice;
  if (n <= 1) nice = 1; else if (n <= 2) nice = 2; else if (n <= 5) nice = 5; else nice = 10;
  return nice * pow;
}
function abbrRp(v) {
  if (v >= 1000000) return (v / 1000000).toFixed(v % 1000000 === 0 ? 0 : 1) + "jt";
  if (v >= 1000) return Math.round(v / 1000) + "rb";
  return String(Math.round(v));
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function sortTxDesc(a, b) {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.id < b.id ? 1 : -1;
}

function attachRupiahMask(el) {
  el.setAttribute("inputmode", "numeric");
  el.addEventListener("input", () => {
    let raw = el.value.replace(/[^\d]/g, "").replace(/^0+(?=\d)/, "");
    el.value = raw ? Number(raw).toLocaleString("id-ID") : "";
    el.dispatchEvent(new CustomEvent("rupiahchange", { bubbles: true }));
  });
}
function rawNumber(el) {
  return Number((el.value || "").replace(/[^\d]/g, "")) || 0;
}
function setRupiahValue(el, n) {
  el.value = n ? Number(Math.round(n)).toLocaleString("id-ID") : "0";
}

function applyI18n() {
  const dict = tr();
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined && typeof dict[key] === "string") el.textContent = dict[key];
  });
  document.getElementById("langToggle").textContent = uiLang === "ID" ? "ID / EN" : "EN / ID";
  if (state) { updateBalanceToggleLabel(); updatePageHeader(); }
}
function updateBalanceToggleLabel() {
  const dict = tr();
  document.getElementById("toggleBalance").textContent = state.showBalance ? dict.hide_balance : dict.show_balance;
}
function updatePageHeader() {
  const dict = tr();
  const titles = { overview: dict.nav_overview, transaksi: dict.nav_transaksi, anggaran: dict.nav_anggaran, analisis: dict.nav_analisis };
  const subs = { overview: dict.page_sub_overview, transaksi: dict.page_sub_transaksi, anggaran: dict.page_sub_anggaran, analisis: dict.page_sub_analisis };
  document.getElementById("pageTitle").textContent = titles[currentView];
  document.getElementById("pageSubtitle").textContent = subs[currentView];
}

function setView(name) {
  currentView = name;
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(`view-${name}`).classList.add("active");
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  updatePageHeader();
  if (name === "anggaran") renderAnggaran();
  if (name === "analisis") renderAnalisis();
  window.scrollTo(0, 0);
}

function setTxSection(name) {
  currentTxSection = name;
  document.querySelectorAll(".tx-section").forEach(s => s.classList.remove("active"));
  document.getElementById(`txSection-${name}`).classList.add("active");
  document.querySelectorAll("#txSectionGroup .pill").forEach(p => p.classList.toggle("active", p.dataset.section === name));
  if (name === "tx") renderTxFormOptions();
  if (name === "debt") renderDebtSection();
  if (name === "invest") renderInvestSection();
  if (name === "category") renderCategorySection();
}

function activeInvestmentsByKode() {
  const map = {};
  state.investments.filter(i => i.status === "Aktif").forEach(i => {
    const key = i.kode + "|" + i.jenis;
    if (!map[key]) map[key] = { kode: i.kode, jenis: i.jenis, modal: 0, count: 0 };
    map[key].modal += i.modal;
    map[key].count += 1;
  });
  return Object.values(map);
}

function maskVal(text) { return state.showBalance ? text : "••••••"; }

function renderOverview() {
  const dict = tr();
  const total = state.accounts.reduce((s, a) => s + a.balance, 0);
  document.getElementById("totalBalanceFigure").textContent = state.showBalance ? fmtRp(total) : "Rp ••••••••";

  const grid = document.getElementById("accountsGrid");
  grid.innerHTML = "";
  state.accounts.forEach(a => {
    const card = document.createElement("div");
    card.className = "acc-card";
    card.innerHTML = `
      <div class="acc-name"><span class="acc-avatar">${escapeHtml(a.name.charAt(0))}</span>${escapeHtml(a.name)}</div>
      <div class="acc-balance">${state.showBalance ? fmtRp(a.balance) : "Rp ••••••"}</div>`;
    grid.appendChild(card);
  });

  const invGroups = activeInvestmentsByKode();
  let investTotal = 0;
  invGroups.forEach(g => {
    investTotal += g.modal;
    const card = document.createElement("div");
    card.className = "acc-card invest";
    card.innerHTML = `
      <span class="acc-badge">${escapeHtml(g.jenis)}</span>
      <div class="acc-name"><span class="acc-avatar">${escapeHtml(g.kode.charAt(0))}</span>${escapeHtml(g.kode)}</div>
      <div class="acc-balance">${state.showBalance ? fmtRp(g.modal) : "Rp ••••••"}</div>`;
    grid.appendChild(card);
  });
  document.getElementById("investSummaryLine").textContent =
    invGroups.length ? (state.showBalance ? dict.invest_summary(invGroups.length, fmtRp(investTotal)) : dict.invest_summary(invGroups.length, "Rp ••••••")) : "";

  const ovMonthSel = document.getElementById("ovMonth");
  const ovYearSel = document.getElementById("ovYear");
  if (!ovMonthSel.dataset.bound) {
    populateMonthYearSelect(ovMonthSel, ovYearSel);
    ovMonthSel.dataset.bound = "1";
  }
  const ovMonth = Number(ovMonthSel.value) || (new Date().getMonth() + 1);
  const ovYear = Number(ovYearSel.value) || new Date().getFullYear();
  const periodTx = state.transactions.filter(t => {
    const d = parseISO(t.date);
    return d.getFullYear() === ovYear && d.getMonth() + 1 === ovMonth;
  });
  const income = periodTx.filter(t => t.type === "Pemasukan").reduce((s, t) => s + t.amount, 0);
  const expense = periodTx.filter(t => t.type === "Pengeluaran").reduce((s, t) => s + t.amount, 0);
  document.getElementById("sumIncome").textContent = state.showBalance ? fmtRp(income) : "Rp ••••••";
  document.getElementById("sumExpense").textContent = state.showBalance ? fmtRp(expense) : "Rp ••••••";
  document.getElementById("sumSurplus").textContent = state.showBalance ? fmtRp(income - expense) : "Rp ••••••";

  renderLiabilityPanel();

  const recent = [...state.transactions].sort(sortTxDesc).slice(0, 5);
  const list = document.getElementById("recentTxList");
  list.innerHTML = "";
  if (recent.length === 0) {
    list.innerHTML = `<p class="muted small">${dict.no_tx}</p>`;
  } else {
    recent.forEach(tx => list.appendChild(renderTxRow(tx, false)));
    if (!state.showBalance) list.querySelectorAll(".tx-amount").forEach(el => { el.textContent = "••••••"; });
  }
}

function debtStatus(debt) {
  if (debt.manualStatus) return debt.manualStatus;
  const totalToRepay = totalToRepayForDebt(debt);
  const paid = totalPaidForDebt(debt.id);
  if (totalToRepay > 0 && paid >= totalToRepay) return "Lunas";
  const end = addMonthsToISO(debt.startDate, debt.jangkaWaktu);
  return todayISO() <= end ? "Aktif" : "Lunas";
}

const DEBT_CATEGORY_CODE = "5104";
function totalToRepayForDebt(debt) {
  const calculated = (debt.tagihanPerBulan || 0) * (debt.jangkaWaktu || 1);
  return calculated > 0 ? calculated : (debt.kewajiban || 0);
}
function totalPaidForDebt(debtId) {
  return state.transactions
    .filter(t => t.type === "Pengeluaran" && t.debtId === debtId)
    .reduce((s, t) => s + t.amount, 0);
}

function populateMonthYearSelect(monthSel, yearSel) {
  const names = state.lang === "ID" ? MONTH_NAMES_ID : MONTH_NAMES_EN;
  const now = new Date();
  const prevMonth = monthSel.value ? Number(monthSel.value) : now.getMonth() + 1;
  const prevYear = yearSel.value ? Number(yearSel.value) : now.getFullYear();
  monthSel.innerHTML = names.map((n, i) => `<option value="${i + 1}">${n}</option>`).join("");
  monthSel.value = prevMonth;

  const years = new Set();
  for (let y = now.getFullYear() - 6; y <= now.getFullYear() + 2; y++) years.add(y);
  state.debts.forEach(d => years.add(parseISO(d.startDate).getFullYear()));
  state.transactions.forEach(t => years.add(parseISO(t.date).getFullYear()));
  const yearList = [...years].sort((a, b) => a - b);
  yearSel.innerHTML = yearList.map(y => `<option value="${y}">${y}</option>`).join("");
  yearSel.value = prevYear;
}

function populateLiabSourceSelect(sel) {
  const dict = tr();
  const prev = sel.value;
  const sources = [...new Set(state.debts.map(d => d.source))].sort();
  sel.innerHTML = `<option value="__all">${dict.all_sources}</option>` + sources.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");
  sel.value = sources.includes(prev) ? prev : "__all";
}

function renderLiabilityPanel() {
  const dict = tr();
  const monthSel = document.getElementById("liabMonth");
  const yearSel = document.getElementById("liabYear");
  const sourceSel = document.getElementById("liabSource");
  if (!monthSel.dataset.bound) {
    populateMonthYearSelect(monthSel, yearSel);
    populateLiabSourceSelect(sourceSel);
    monthSel.dataset.bound = "1";
  } else if (!monthSel.value) {
    populateMonthYearSelect(monthSel, yearSel);
  }
  populateLiabSourceSelect(sourceSel);
  const month = Number(monthSel.value) || (new Date().getMonth() + 1);
  const year = Number(yearSel.value) || new Date().getFullYear();
  const periodStart = `${year}-${String(month).padStart(2, "0")}-01`;
  const sourceFilter = sourceSel.value || "__all";

  const periodEndExclusive = addMonthsToISO(periodStart, 1);
  const debtsInPeriod = state.debts.filter(d => {
    const end = addMonthsToISO(d.startDate, d.jangkaWaktu);
    const inPeriod = d.startDate < periodEndExclusive && periodStart <= end;
    const sourceMatch = sourceFilter === "__all" || d.source === sourceFilter;
    return inPeriod && sourceMatch;
  });

  const totalLoan = debtsInPeriod.reduce((s, d) => s + d.kewajiban, 0);
  const totalInterest = debtsInPeriod.reduce((s, d) => s + d.totalBunga, 0);

  document.getElementById("liabSummaryGrid").innerHTML = `
    <div class="summary-card">
      <div class="eyebrow">${dict.liab_total_loan}${sourceFilter !== "__all" ? ` · ${escapeHtml(sourceFilter)}` : ""}</div>
      <div class="summary-value negative">${state.showBalance ? fmtRp(totalLoan) : "Rp ••••••"}</div>
    </div>
    <div class="summary-card">
      <div class="eyebrow">${dict.liab_total_interest}${sourceFilter !== "__all" ? ` · ${escapeHtml(sourceFilter)}` : ""}</div>
      <div class="summary-value" style="color:var(--warning)">${state.showBalance ? fmtRp(totalInterest) : "Rp ••••••"}</div>
    </div>`;

  const list = document.getElementById("liabList");
  list.innerHTML = "";
  if (debtsInPeriod.length === 0) {
    list.innerHTML = `<p class="muted small">${dict.no_debt}</p>`;
  } else {
    debtsInPeriod.forEach(d => {
      const status = debtStatus(d);
      const remaining = Math.max(totalToRepayForDebt(d) - totalPaidForDebt(d.id), 0);
      const row = document.createElement("div");
      row.className = "tx-row";
      row.innerHTML = `
        <div class="tx-left">
          <span class="tx-dot out"></span>
          <div class="tx-info">
            <div class="tx-title">${escapeHtml(d.source)} ${d.notes ? "· " + escapeHtml(d.notes) : ""}</div>
            <div class="tx-meta">${dict.debt_tagihan}: ${state.showBalance ? fmtRp(d.tagihanPerBulan) : "Rp ••••••"}${dict.per_month} · ${d.jangkaWaktu} ${dict.months_unit} · ${dict.debt_remaining_short}: ${state.showBalance ? fmtRp(remaining) : "Rp ••••••"}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="tx-amount out">${state.showBalance ? fmtRp(d.kewajiban) : "Rp ••••••"}</span>
          <span class="status-tag ${status === 'Aktif' ? 'aktif' : 'lunas'}">${status === 'Aktif' ? dict.debt_aktif : dict.debt_lunas}</span>
        </div>`;
      list.appendChild(row);
    });
  }
}

function txKindClass(type) { return type === "Pemasukan" ? "in" : type === "Pengeluaran" ? "out" : "transfer"; }

function renderTxRow(tx, withActions) {
  const dict = tr();
  const row = document.createElement("div");
  row.className = "tx-row";
  const kind = txKindClass(tx.type);
  const sign = tx.type === "Pemasukan" ? "+" : tx.type === "Pengeluaran" ? "-" : "~";
  const typeLabel = tx.type === "Pemasukan" ? dict.income : tx.type === "Pengeluaran" ? dict.expense : dict.transfer;
  let acc;
  if (tx.type === "Pengeluaran") acc = tx.accountFrom;
  else if (tx.type === "Pemasukan") acc = `${tx.accountFrom} → ${tx.accountTo}`;
  else acc = `${tx.accountFrom} → ${tx.accountTo}`;

  row.innerHTML = `
    <div class="tx-left">
      <span class="tx-dot ${kind}"></span>
      <div class="tx-info">
        <div class="tx-title">${escapeHtml(tx.notes || typeLabel)}</div>
        <div class="tx-meta">${fmtDateDisplay(tx.date)} · ${escapeHtml(acc)}</div>
      </div>
    </div>
    <div class="tx-right" style="display:flex;align-items:center;gap:10px;">
      <span class="tx-amount ${kind}">${sign}${fmtRp(tx.amount)}</span>
      ${withActions ? `
      <span class="tx-actions">
        <button class="icon-btn edit-tx" data-id="${tx.id}" title="${dict.save_changes}">✎</button>
        <button class="icon-btn danger del-tx" data-id="${tx.id}" title="${dict.correct_title}">✕</button>
      </span>` : ""}
    </div>`;
  return row;
}

let txType = "Pengeluaran";

function renderTxFormOptions() {
  const dict = tr();
  const accFrom = document.getElementById("txAccFrom");
  const accTo = document.getElementById("txAccTo");
  const cat = document.getElementById("txCategory");
  const labelAccFrom = document.getElementById("labelAccFrom");

  let accountOptions = [];
  if (txType === "Pemasukan") {
    labelAccFrom.textContent = state.lang === "ID" ? "Sumber Pendapatan" : "Income Source";
    accountOptions = [
      { val: "Gaji", label: dict.src_gaji },
      { val: "Side Job", label: dict.src_sidejob },
      { val: "Hutang", label: dict.src_hutang },
      { val: "Lainnya", label: dict.src_lainnya }
    ];
  } else if (txType === "Pengeluaran") {
    labelAccFrom.textContent = dict.acc_from;
    accountOptions = [...state.accounts.map(a => ({ val: a.name, label: a.name })), { val: "Paylater", label: "Paylater" }];
  } else {
    labelAccFrom.textContent = dict.acc_from;
    accountOptions = state.accounts.map(a => ({ val: a.name, label: a.name }));
  }

  const prevFrom = accFrom.value;
  const prevTo = accTo.value;

  accFrom.innerHTML = accountOptions.map(opt => `<option value="${escapeHtml(opt.val)}">${escapeHtml(opt.label)}</option>`).join("");
  if (prevFrom && accountOptions.some(opt => opt.val === prevFrom)) accFrom.value = prevFrom;

  accTo.innerHTML = state.accounts.map(a => `<option value="${escapeHtml(a.name)}">${escapeHtml(a.name)}</option>`).join("");
  if (prevTo) accTo.value = prevTo;
  if (accTo.selectedIndex === 0 && state.accounts.length > 1) accTo.selectedIndex = 1;
  
  cat.innerHTML = state.budget.map(b => `<option value="${b.code}">${b.code} — ${escapeHtml(b.name)}</option>`).join("");

  const debtLink = document.getElementById("txDebtLink");
  const prevDebtLink = debtLink.value;
  const activeDebts = state.debts.filter(d => debtStatus(d) === "Aktif");
  debtLink.innerHTML = `<option value="">${dict.debt_no_link}</option>` + activeDebts.map(d => {
    const remaining = totalToRepayForDebt(d) - totalPaidForDebt(d.id);
    return `<option value="${d.id}">${escapeHtml(d.source)}${d.notes ? " · " + escapeHtml(d.notes) : ""} — ${dict.debt_remaining_short}: ${fmtRp(remaining)}</option>`;
  }).join("");
  if ([...debtLink.options].some(o => o.value === prevDebtLink)) debtLink.value = prevDebtLink;

  updateDebtLinkVisibility();
  updatePaylaterTenorVisibility();
}

function updateDebtLinkVisibility() {
  const fieldDebtLink = document.getElementById("fieldDebtLink");
  const cat = document.getElementById("txCategory").value;
  const show = txType === "Pengeluaran" && cat === DEBT_CATEGORY_CODE;
  fieldDebtLink.classList.toggle("hidden", !show);
}

function updatePaylaterTenorVisibility() {
  const accFromEl = document.getElementById("txAccFrom");
  const fieldTenor = document.getElementById("fieldPaylaterTenor");
  if (!accFromEl || !fieldTenor) return;
  const isPaylater = accFromEl.value.toLowerCase() === "paylater";
  fieldTenor.classList.toggle("hidden", !isPaylater || txType !== "Pengeluaran");
}

function applyTxTypeUI() {
  const dict = tr();
  document.querySelectorAll("#txTypeGroup .pill").forEach(p => p.classList.toggle("active", p.dataset.type === txType));
  
  const fieldAccFrom = document.getElementById("fieldAccFrom");
  const fieldPaylaterTenor = document.getElementById("fieldPaylaterTenor");
  const fieldAccTo = document.getElementById("fieldAccTo");
  const fieldCategory = document.getElementById("fieldCategory");
  const labelAccTo = document.getElementById("labelAccTo");

  fieldAccFrom.classList.remove("hidden");

  if (txType === "Pengeluaran") {
    fieldAccTo.classList.add("hidden");
    fieldCategory.classList.remove("hidden");
    updatePaylaterTenorVisibility();
  } else if (txType === "Pemasukan") {
    if (fieldPaylaterTenor) fieldPaylaterTenor.classList.add("hidden");
    fieldAccTo.classList.remove("hidden");
    fieldCategory.classList.add("hidden");
    labelAccTo.textContent = dict.acc_to;
  } else {
    if (fieldPaylaterTenor) fieldPaylaterTenor.classList.add("hidden");
    fieldAccTo.classList.remove("hidden");
    fieldCategory.classList.add("hidden");
  }
  renderTxFormOptions();
  updateDebtLinkVisibility();
}

function renderTransaksi() {
  const dict = tr();
  renderTxFormOptions();
  applyTxTypeUI();

  const all = [...state.transactions].sort(sortTxDesc);
  document.getElementById("txCount").textContent = dict.tx_count(all.length);
  const list = document.getElementById("fullTxList");
  list.innerHTML = "";
  if (all.length === 0) {
    list.innerHTML = `<p class="muted small">${dict.no_tx}</p>`;
  } else {
    all.forEach(tx => list.appendChild(renderTxRow(tx, true)));
  }

  list.querySelectorAll(".edit-tx").forEach(b => b.addEventListener("click", () => openEditModal(b.dataset.id)));
  list.querySelectorAll(".del-tx").forEach(b => b.addEventListener("click", () => {
    if (confirm(dict.delete_confirm)) {
      deleteTransaction(b.dataset.id);
      renderEverything();
    }
  }));
}

function openEditModal(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;
  document.getElementById("editTxDate").value = tx.date;
  setRupiahValue(document.getElementById("editTxAmount"), tx.amount);
  document.getElementById("editTxNotes").value = tx.notes || "";
  document.getElementById("editModal").dataset.editingId = id;
  document.getElementById("editModal").classList.remove("hidden");
}
function closeEditModal() { document.getElementById("editModal").classList.add("hidden"); }

function recalcDebtFormPreview() {
  const kewajiban = rawNumber(document.getElementById("debtKewajiban"));
  const admin = rawNumber(document.getElementById("debtAdmin"));
  const jangka = Number(document.getElementById("debtJangka").value) || 0;
  const tagihan = rawNumber(document.getElementById("debtTagihan"));
  const diterima = kewajiban - admin;
  const { totalBunga, persenBunga } = calcDebtInterest(kewajiban, tagihan, jangka);
  document.getElementById("debtDiterima").textContent = fmtRp(diterima);
  document.getElementById("debtBungaNominal").textContent = fmtRp(totalBunga);
  document.getElementById("debtBungaPersen").textContent = persenBunga.toFixed(2) + "%";
}

function renderDebtSection() {
  const dict = tr();
  document.getElementById("debtCount").textContent = dict.debt_count(state.debts.length);
  const list = document.getElementById("debtList");
  list.innerHTML = "";
  if (state.debts.length === 0) {
    list.innerHTML = `<p class="muted small">${dict.no_tx}</p>`;
    return;
  }
  [...state.debts].sort((a, b) => (a.startDate < b.startDate ? 1 : -1)).forEach(d => {
    const status = debtStatus(d);
    const totalToRepay = totalToRepayForDebt(d);
    const paid = totalPaidForDebt(d.id); // <-- Pastikan ini dipanggil
    const remaining = Math.max(totalToRepay - paid, 0);
    const pct = totalToRepay > 0 ? Math.min((paid / totalToRepay) * 100, 100) : 0;
    const row = document.createElement("div");
    row.className = "tx-row";
    row.innerHTML = `
      <div class="tx-left">
        <span class="tx-dot out"></span>
        <div class="tx-info">
          <div class="tx-title">${escapeHtml(d.source)} ${d.notes ? "· " + escapeHtml(d.notes) : ""}</div>
          <div class="tx-meta">${fmtDateDisplay(d.startDate)} · ${fmtRp(d.tagihanPerBulan)}${dict.per_month} × ${d.jangkaWaktu}${dict.months_unit} · ${dict.debt_bunga_persen_short} ${d.persenBunga.toFixed(2)}%</div>
          <div class="tx-meta">${dict.debt_progress(fmtRp(paid), fmtRp(totalToRepay))} · ${dict.debt_remaining_short}: ${fmtRp(remaining)}</div>
          <div class="rank-track" style="margin-top:4px;max-width:220px;"><div class="rank-fill N" style="width:${pct}%"></div></div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="tx-amount out">${fmtRp(d.kewajiban)}</span>
        <span class="status-tag ${status === 'Aktif' ? 'aktif' : 'lunas'}">${status === 'Aktif' ? dict.debt_aktif : dict.debt_lunas}</span>
        <span class="tx-actions">
          <button class="icon-btn toggle-debt-status" data-id="${d.id}" title="${status === 'Aktif' ? dict.mark_paid : dict.mark_active}">${status === 'Aktif' ? '✓' : '↺'}</button>
          <button class="icon-btn danger del-debt" data-id="${d.id}" title="${dict.delete}">✕</button>
        </span>
      </div>`;
    list.appendChild(row);
  });

  list.querySelectorAll(".toggle-debt-status").forEach(b => b.addEventListener("click", () => {
    const d = state.debts.find(x => x.id === b.dataset.id);
    if (!d) return;
    const cur = debtStatus(d);
    d.manualStatus = cur === "Aktif" ? "Lunas" : "Aktif";
    saveState();
    renderDebtSection();
    renderOverview();
    renderTxFormOptions();
    if (currentView === "analisis") renderAnalisis();
  }));
  list.querySelectorAll(".del-debt").forEach(b => b.addEventListener("click", () => {
    if (confirm(dict.delete_debt_confirm)) {
      state.debts = state.debts.filter(d => d.id !== b.dataset.id);
      saveState();
      renderDebtSection();
      renderOverview();
      renderTxFormOptions();
      if (currentView === "analisis") renderAnalisis();
    }
  }));
}

function applyInvestTypeUI() {
  const dict = tr();
  document.querySelectorAll("#investTypeGroup .pill").forEach(p => p.classList.toggle("active", p.dataset.invtype === investType));
  const fieldJenis = document.getElementById("fieldInvJenis");
  const fieldKode = document.getElementById("fieldInvKode");
  const fieldLot = document.getElementById("fieldInvLot");
  const fieldNominal = document.getElementById("fieldInvNominal");
  const fieldTerima = document.getElementById("fieldInvTerima");
  const submitBtn = document.getElementById("investSubmitBtn");

  if (investType === "beli") {
    fieldJenis.classList.remove("hidden");
    fieldKode.classList.remove("hidden");
    fieldLot.classList.add("hidden");
    fieldNominal.classList.remove("hidden");
    fieldTerima.classList.add("hidden");
    submitBtn.textContent = dict.invest_buy;
  } else {
    fieldJenis.classList.add("hidden");
    fieldKode.classList.add("hidden");
    fieldLot.classList.remove("hidden");
    fieldNominal.classList.add("hidden");
    fieldTerima.classList.remove("hidden");
    submitBtn.textContent = dict.invest_sell;
    const lotSelect = document.getElementById("invLotSelect");
    const lots = activeInvestmentLots();
    lotSelect.innerHTML = lots.length
      ? lots.map(l => `<option value="${l.id}">${escapeHtml(l.kode)} · ${fmtRp(l.modal)} · ${fmtDateDisplay(l.tanggalBeli)}</option>`).join("")
      : `<option value="">${dict.invest_none_active}</option>`;
  }
}

function renderInvestSection() {
  const dict = tr();
  applyInvestTypeUI();
  const list = document.getElementById("investList");
  list.innerHTML = "";
  if (state.investments.length === 0) {
    list.innerHTML = `<p class="muted small">${dict.no_invest}</p>`;
    return;
  }
  [...state.investments].sort((a, b) => (a.tanggalBeli < b.tanggalBeli ? 1 : -1)).forEach(inv => {
    const row = document.createElement("div");
    row.className = "tx-row";
    let rightHtml;
    if (inv.status === "Terjual") {
      const profit = inv.profitLoss >= 0;
      rightHtml = `
        <span class="pl-value ${profit ? 'profit' : 'loss'}" style="font-weight:600;">${profit ? '+' : ''}${fmtRp(inv.profitLoss)} (${profit ? '+' : ''}${inv.profitPct.toFixed(2)}%)</span>
        <span class="status-tag terjual">${state.lang === 'ID' ? 'Terjual' : 'Sold'}</span>`;
    } else {
      rightHtml = `<span class="tx-amount out">${fmtRp(inv.modal)}</span><span class="status-tag aktif">${dict.debt_aktif}</span>`;
    }
    row.innerHTML = `
      <div class="tx-left">
        <span class="tx-dot ${inv.status === 'Terjual' ? (inv.profitLoss >= 0 ? 'in' : 'out') : 'transfer'}"></span>
        <div class="tx-info">
          <div class="tx-title">${escapeHtml(inv.kode)} <span class="muted small">(${escapeHtml(inv.jenis)})</span></div>
          <div class="tx-meta">${dict.invest_form_title}: ${fmtDateDisplay(inv.tanggalBeli)} · ${fmtRp(inv.modal)}${inv.status === 'Terjual' ? ` · ${dict.invest_sell}: ${fmtDateDisplay(inv.tanggalJual)} · ${fmtRp(inv.nominalDiterima)}` : ''}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        ${rightHtml}
        <span class="tx-actions"><button class="icon-btn danger del-invest" data-id="${inv.id}" title="${dict.delete}">✕</button></span>
      </div>`;
    list.appendChild(row);
  });

  list.querySelectorAll(".del-invest").forEach(b => b.addEventListener("click", () => {
    if (confirm(dict.delete_confirm)) {
      state.investments = state.investments.filter(i => i.id !== b.dataset.id);
      saveState();
      renderInvestSection();
      renderOverview();
      if (currentView === "analisis") renderAnalisis();
    }
  }));
}

function activeInvestmentLots() { return state.investments.filter(i => i.status === "Aktif"); }

let catManualOverride = false;
let editingCatCode = null;

function nextCategoryCode(jenis) {
  if (!state) return "";
  const p = JENIS_PREFIX[jenis];
  const existing = [
    ...state.budget.map(b => b.code),
    ...state.chartOfAccounts.map(c => c.code),
  ].filter(c => c && c.startsWith(p)).map(c => parseInt(c, 10)).filter(n => !isNaN(n));
  const base = parseInt(p + "000", 10);
  const maxN = existing.length ? Math.max(...existing, base) : base;
  return String(maxN + 1);
}

function applyCatFormAutoSuggest() {
  if (catManualOverride || !state) return;
  const name = document.getElementById("catName").value;
  const jenis = suggestJenis(name);
  document.getElementById("catJenis").value = jenis;
  document.getElementById("catCode").value = nextCategoryCode(jenis);
  toggleKonsumtifWrap();
}
function toggleKonsumtifWrap() {
  const jenis = document.getElementById("catJenis").value;
  document.getElementById("catKonsumtifWrap").classList.toggle("hidden", jenis !== "Beban");
}

function renderCategorySection() {
  const dict = tr();
  const tbody = document.getElementById("catTableBody");
  tbody.innerHTML = "";

  const bebanRows = state.budget.map(b => ({ code: b.code, name: b.name, jenis: "Beban", konsumtif: b.type, source: "budget" }));
  const otherRows = state.chartOfAccounts.map(c => ({ code: c.code, name: c.name, jenis: c.jenis, konsumtif: null, source: "coa" }));
  const rows = [...bebanRows, ...otherRows].sort((a, b) => a.code.localeCompare(b.code));

  const jenisLabel = { Harta: dict.jenis_harta, Hutang: dict.jenis_hutang, Modal: dict.jenis_modal, Pendapatan: dict.jenis_pendapatan, Beban: dict.jenis_beban };
  const jenisTagClass = { Harta: "harta", Hutang: "utang", Modal: "modal", Pendapatan: "pendapatan", Beban: "nonkonsumtif" };

  rows.forEach(r => {
    const tr_ = document.createElement("tr");
    tr_.innerHTML = `
      <td class="num">${r.code}</td>
      <td>${escapeHtml(r.name)}</td>
      <td><span class="tag ${jenisTagClass[r.jenis]}">${jenisLabel[r.jenis]}</span></td>
      <td style="text-align:right;white-space:nowrap;">
        <button class="icon-btn edit-cat" data-code="${r.code}" data-source="${r.source}" title="${dict.edit}">✎</button>
        <button class="icon-btn danger del-cat" data-code="${r.code}" data-source="${r.source}" title="${dict.delete}">✕</button>
      </td>`;
    tbody.appendChild(tr_);
  });

  tbody.querySelectorAll(".edit-cat").forEach(b => b.addEventListener("click", () => startEditCategory(b.dataset.code, b.dataset.source)));
  tbody.querySelectorAll(".del-cat").forEach(b => b.addEventListener("click", () => deleteCategory(b.dataset.code, b.dataset.source)));
}

function startEditCategory(code, source) {
  const dict = tr();
  catManualOverride = true;
  editingCatCode = code;
  document.getElementById("catCancelEdit").classList.remove("hidden");
  document.getElementById("catSubmitBtn").textContent = dict.cat_update;
  if (source === "budget") {
    const row = state.budget.find(b => b.code === code);
    document.getElementById("catName").value = row.name;
    document.getElementById("catJenis").value = "Beban";
    document.getElementById("catCode").value = row.code;
    document.getElementById("catKonsumtif").value = row.type;
  } else {
    const row = state.chartOfAccounts.find(c => c.code === code);
    document.getElementById("catName").value = row.name;
    document.getElementById("catJenis").value = row.jenis;
    document.getElementById("catCode").value = row.code;
  }
  toggleKonsumtifWrap();
  document.getElementById("catName").focus();
}
function cancelEditCategory() {
  catManualOverride = false;
  editingCatCode = null;
  document.getElementById("catForm").reset();
  document.getElementById("catCancelEdit").classList.add("hidden");
  document.getElementById("catSubmitBtn").textContent = tr().cat_add;
  applyCatFormAutoSuggest();
}
function deleteCategory(code, source) {
  if (!confirm(tr().delete_cat_confirm)) return;
  if (source === "budget") state.budget = state.budget.filter(b => b.code !== code);
  else state.chartOfAccounts = state.chartOfAccounts.filter(c => c.code !== code);
  saveState();
  draftBudget = null;
  renderCategorySection();
  renderEverything();
}

/* ---------------------------------------------------------------------- */
/* ANGGARAN                                                               */
/* ---------------------------------------------------------------------- */
function populateBudgetMonthYear() {
  const mSel = document.getElementById("bgMonth");
  const ySel = document.getElementById("bgYear");
  if (!mSel.dataset.bound) {
    populateMonthYearSelect(mSel, ySel);
    mSel.dataset.bound = "1";
    mSel.addEventListener("change", renderAnggaran);
    ySel.addEventListener("change", renderAnggaran);
  } else if (!mSel.value) {
    populateMonthYearSelect(mSel, ySel);
  }
}

function getSelectedBudgetPeriodKey() {
  const m = String(document.getElementById("bgMonth").value || (new Date().getMonth() + 1)).padStart(2, "0");
  const y = String(document.getElementById("bgYear").value || new Date().getFullYear());
  return `${y}-${m}`;
}

function getActiveMonthBudgetList() {
  const key = getSelectedBudgetPeriodKey();
  if (!state.monthlyBudgets[key]) {
    state.monthlyBudgets[key] = JSON.parse(JSON.stringify(state.budget));
  }
  const list = state.monthlyBudgets[key];
  state.budget.forEach(masterCat => {
    if (!list.find(l => l.code === masterCat.code)) {
      list.push({...masterCat, targetPercent: 0, targetBudget: 0});
    }
  });
  const validCodes = state.budget.map(b => b.code);
  state.monthlyBudgets[key] = list.filter(l => validCodes.includes(l.code));
  return state.monthlyBudgets[key];
}

function ensureDraftBudget() {
  const activeList = getActiveMonthBudgetList();
  draftBudget = JSON.parse(JSON.stringify(activeList));
}

function monthlySalaryBasis(year, month) {
  const incomeTx = state.transactions.filter(t => {
    if (t.type !== "Pemasukan") return false;
    const d = parseISO(t.date);
    const matchDate = d.getFullYear() === year && d.getMonth() + 1 === month;
    const source = (t.accountFrom || "").toLowerCase();
    const isSalary = source.includes("gaji") || source.includes("salary");
    return matchDate && isSalary;
  });

  if (incomeTx.length === 0) return { amount: 0, monthKey: `${year}-${String(month).padStart(2, "0")}` };
  const totalIncome = incomeTx.reduce((s, t) => s + t.amount, 0);
  return { amount: totalIncome, monthKey: `${year}-${String(month).padStart(2, "0")}` };
}

function renderBudgetSettings() {
  const dict = tr();
  ensureDraftBudget();
  
  const m = Number(document.getElementById("bgMonth").value || (new Date().getMonth() + 1));
  const y = Number(document.getElementById("bgYear").value || new Date().getFullYear());
  const salary = monthlySalaryBasis(y, m);
  const income = salary.amount;

  const infoBox = document.getElementById("incomeInfo");
  if (income > 0) {
    infoBox.className = "callout ok";
    infoBox.innerHTML = dict.salary_info(fmtRp(income), monthLabelFromKey(salary.monthKey));
  } else {
    infoBox.className = "callout warn";
    infoBox.textContent = dict.no_income_warn;
  }

  const rowsWrap = document.getElementById("budgetSettingRows");
  rowsWrap.innerHTML = "";

  draftBudget.forEach((row, idx) => {
    const locked = !!row.locked;
    if (locked) {
      row.targetPercent = 2.5;
      row.targetBudget = income * 0.025;
    }
    const rowEl = document.createElement("div");
    rowEl.className = "budget-grid budget-row";
    rowEl.innerHTML = `
      <span class="cat-code">${row.code}</span>
      <span class="cat-name">${escapeHtml(row.name)}</span>
      ${locked
        ? `<span class="locked">${fmtRp(row.targetBudget)}</span>`
        : `<input type="text" inputmode="numeric" id="rp-${idx}" value="${Math.round(row.targetBudget).toLocaleString('id-ID')}">`}
      ${locked
        ? `<span class="locked">${row.targetPercent.toFixed(2)}%</span>`
        : `<input type="number" min="0" step="0.1" id="pct-${idx}" value="${row.targetPercent.toFixed(2)}">`}
    `;
    rowsWrap.appendChild(rowEl);

    if (!locked) {
      const rpInput = rowEl.querySelector(`#rp-${idx}`);
      const pctInput = rowEl.querySelector(`#pct-${idx}`);
      attachRupiahMask(rpInput);
      rpInput.addEventListener("rupiahchange", () => {
        const val = rawNumber(rpInput);
        draftBudget[idx].targetBudget = val;
        draftBudget[idx].targetPercent = income > 0 ? (val / income) * 100 : 0;
        pctInput.value = draftBudget[idx].targetPercent.toFixed(2);
        updateBudgetTotals();
      });
      pctInput.addEventListener("input", () => {
        const val = parseFloat(pctInput.value) || 0;
        draftBudget[idx].targetPercent = val;
        draftBudget[idx].targetBudget = income > 0 ? (income * val) / 100 : 0;
        setRupiahValue(rpInput, draftBudget[idx].targetBudget);
        updateBudgetTotals();
      });
    }
  });

  updateBudgetTotals();
}

function updateBudgetTotals() {
  const dict = tr();
  const totalRp = draftBudget.reduce((s, r) => s + r.targetBudget, 0);
  const totalPct = draftBudget.reduce((s, r) => s + r.targetPercent, 0);
  document.getElementById("budgetTotalRp").textContent = fmtRp(totalRp);
  document.getElementById("budgetTotalPct").textContent = totalPct.toFixed(2) + "%";

  const statusBox = document.getElementById("budgetTotalStatus");
  if (Math.abs(totalPct - 100) < 0.1) {
    statusBox.className = "callout ok";
    statusBox.textContent = dict.total_ok;
  } else {
    statusBox.className = "callout warn";
    statusBox.textContent = dict.total_warn(totalPct.toFixed(2));
  }
}

function renderBudgetMonitoring() {
  const dict = tr();
  const spentByCategory = {};
  
  const m = Number(document.getElementById("bgMonth").value || (new Date().getMonth() + 1));
  const y = Number(document.getElementById("bgYear").value || new Date().getFullYear());

  state.transactions.filter(t => {
    if (t.type !== "Pengeluaran") return false;
    const d = parseISO(t.date);
    return d.getFullYear() === y && d.getMonth() + 1 === m;
  }).forEach(t => {
    spentByCategory[t.categoryCode] = (spentByCategory[t.categoryCode] || 0) + t.amount;
  });

  const salary = monthlySalaryBasis(y, m);
  const salaryBox = document.getElementById("salaryBasisInfo");
  if (salary.amount > 0) {
    salaryBox.className = "callout ok";
    salaryBox.innerHTML = dict.salary_info(fmtRp(salary.amount), monthLabelFromKey(salary.monthKey));
  } else {
    salaryBox.className = "callout warn";
    salaryBox.textContent = dict.no_salary_warn;
  }

  const tbody = document.getElementById("budgetTableBody");
  tbody.innerHTML = "";
  const activeList = getActiveMonthBudgetList();
  
  activeList.forEach(row => {
    const actual = spentByCategory[row.code] || 0;
    const remaining = row.targetBudget - actual;
    const ok = actual <= row.targetBudget;
    const tr_ = document.createElement("tr");
    tr_.innerHTML = `
      <td>${row.code} — ${escapeHtml(row.name)}</td>
      <td><span class="tag ${row.type === "Konsumtif" ? "konsumtif" : "nonkonsumtif"}">${row.type === "Konsumtif" ? dict.konsumtif : dict.nonkonsumtif}</span></td>
      <td class="num">${fmtRp(row.targetBudget)}</td>
      <td class="num">${fmtRp(actual)}</td>
      <td class="num ${remaining < 0 ? "negative" : ""}">${fmtRp(remaining)}</td>
      <td><span class="status-dot-cell"><span class="status-dot ${ok ? "ok" : "over"}"></span>${ok ? dict.status_ok : dict.status_over}</span></td>
    `;
    tbody.appendChild(tr_);
  });

  return { spentByCategory, activeList };
}

function renderBudgetChart(data) {
  const chart = document.getElementById("budgetChart");
  chart.innerHTML = "";

  const maxVal = niceCeil(Math.max(...data.activeList.map(r => Math.max(r.targetBudget, data.spentByCategory[r.code] || 0)), 1));
  const gridWrap = document.createElement("div");
  gridWrap.className = "gridlines";
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = (maxVal / steps) * i;
    const line = document.createElement("div");
    line.className = "gridline";
    line.style.bottom = `${(v / maxVal) * 100}%`;
    line.innerHTML = `<span>${abbrRp(v)}</span>`;
    gridWrap.appendChild(line);
  }
  chart.appendChild(gridWrap);

  data.activeList.forEach(row => {
    const actual = data.spentByCategory[row.code] || 0;
    const col = document.createElement("div");
    col.className = "chart-col";
    const tH = maxVal > 0 ? (row.targetBudget / maxVal) * 100 : 0;
    const aH = maxVal > 0 ? (actual / maxVal) * 100 : 0;
    col.innerHTML = `
      <div class="chart-bars">
        <div class="chart-bar target" style="height:${tH}%" title="${tr().target}: ${fmtRp(row.targetBudget)}"></div>
        <div class="chart-bar actual" style="height:${aH}%" title="${tr().actual}: ${fmtRp(actual)}"></div>
      </div>
      <div class="chart-col-label">${row.code}</div>
    `;
    chart.appendChild(col);
  });
}

function renderAnggaran() {
  populateBudgetMonthYear();
  renderBudgetSettings();
  const data = renderBudgetMonitoring();
  renderBudgetChart(data);
}

/* ---------------------------------------------------------------------- */
/* ANALISIS                                                               */
/* ---------------------------------------------------------------------- */
let period = "monthly";
let selectedWeek = null; 

function weekOfMonthBucket(iso) {
  const day = parseISO(iso).getDate();
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
}

function renderAnalisis() {
  const dict = tr();
  const anMonthSel = document.getElementById("anMonth");
  const anYearSel = document.getElementById("anYear");
  if (!anMonthSel.dataset.bound) {
    populateMonthYearSelect(anMonthSel, anYearSel);
    anMonthSel.dataset.bound = "1";
  }
  const anMonth = Number(anMonthSel.value) || (new Date().getMonth() + 1);
  const anYear = Number(anYearSel.value) || new Date().getFullYear();

  const weekSelect = document.getElementById("weekSelect");
  if (period === "weekly") {
    weekSelect.classList.remove("hidden");
    if (!weekSelect.dataset.bound) {
      weekSelect.innerHTML = [1, 2, 3, 4].map(w => `<option value="${w}">${dict.week_label}${w}</option>`).join("");
      weekSelect.dataset.bound = "1";
    }
    if (selectedWeek === null) selectedWeek = 1;
    weekSelect.value = selectedWeek;
  } else {
    weekSelect.classList.add("hidden");
  }

  let dashTx = state.transactions.filter(t => {
    if (t.type !== "Pengeluaran") return false;
    const d = parseISO(t.date);
    return d.getFullYear() === anYear && d.getMonth() + 1 === anMonth;
  });
  if (period === "weekly" && selectedWeek !== null) {
    dashTx = dashTx.filter(t => weekOfMonthBucket(t.date) === selectedWeek);
  }

  const spentByCategory = {};
  dashTx.forEach(t => { spentByCategory[t.categoryCode] = (spentByCategory[t.categoryCode] || 0) + t.amount; });

  const konsumtifAmt = state.budget.filter(b => b.type === "Konsumtif").reduce((s, b) => s + (spentByCategory[b.code] || 0), 0);
  const nonKonsumtifAmt = state.budget.filter(b => b.type === "Non-Konsumtif").reduce((s, b) => s + (spentByCategory[b.code] || 0), 0);

  const periodIncome = state.transactions
    .filter(t => t.type === "Pemasukan")
    .filter(t => { const d = parseISO(t.date); return d.getFullYear() === anYear && d.getMonth() + 1 === anMonth; })
    .reduce((s, t) => s + t.amount, 0);

  const totalExpenseDash = konsumtifAmt + nonKonsumtifAmt;
  const ratio = periodIncome > 0 ? (konsumtifAmt / periodIncome) * 100 : 0;

  const donut = document.getElementById("donutChart");
  const legend = document.getElementById("donutLegend");
  const grandTotal = konsumtifAmt + nonKonsumtifAmt;
  if (grandTotal <= 0) {
    donut.style.background = "var(--surface-raised)";
    legend.innerHTML = `<p class="muted small">${dict.no_data_chart}</p>`;
  } else {
    const kPct = (konsumtifAmt / grandTotal) * 100;
    donut.style.background = `conic-gradient(var(--consumptive) 0% ${kPct}%, var(--non-consumptive) ${kPct}% 100%)`;
    legend.innerHTML = `
      <div class="donut-legend-item">
        <span class="lbl"><span class="legend-dot" style="background:var(--consumptive)"></span>${dict.konsumtif}</span>
        <span class="val">${fmtRp(konsumtifAmt)}</span>
      </div>
      <div class="donut-legend-item">
        <span class="lbl"><span class="legend-dot" style="background:var(--non-consumptive)"></span>${dict.nonkonsumtif}</span>
        <span class="val">${fmtRp(nonKonsumtifAmt)}</span>
      </div>`;
  }

  document.getElementById("lifestylePct").textContent = ratio.toFixed(1) + "%";
  document.getElementById("lifestyleBar").style.width = Math.min(ratio, 100) + "%";
  const statusEl = document.getElementById("lifestyleStatus");
  let tier, cls;
  if (ratio < 20) { tier = dict.status_wise; cls = "ok"; document.getElementById("lifestyleBar").style.background = "var(--positive)"; }
  else if (ratio <= 35) { tier = dict.status_warning; cls = "warn"; document.getElementById("lifestyleBar").style.background = "var(--warning)"; }
  else { tier = dict.status_high; cls = "bad"; document.getElementById("lifestyleBar").style.background = "var(--negative)"; }
  statusEl.className = `status-pill ${cls}`;
  statusEl.textContent = tier;

  document.getElementById("lifestyleBreakdown").innerHTML = `
    <div class="kv-row"><span class="k">${dict.total_income_lbl}</span><span class="v">${fmtRp(periodIncome)}</span></div>
    <div class="kv-row"><span class="k">${dict.total_expense_lbl}</span><span class="v">${fmtRp(totalExpenseDash)}</span></div>
    <div class="kv-row"><span class="k">${dict.konsumtif_expense_lbl}</span><span class="v">${fmtRp(konsumtifAmt)}</span></div>
  `;

  const rows = state.budget
    .map(b => ({ ...b, actual: spentByCategory[b.code] || 0 }))
    .filter(b => b.actual > 0)
    .sort((a, b) => b.actual - a.actual);

  const rankWrap = document.getElementById("categoryBreakdown");
  rankWrap.innerHTML = "";
  if (rows.length === 0) {
    rankWrap.innerHTML = `<p class="muted small">${dict.no_data_chart}</p>`;
  } else {
    const maxAmt = rows[0].actual;
    rows.forEach(r => {
      const letter = r.type === "Konsumtif" ? "K" : "N";
      const pct = maxAmt > 0 ? (r.actual / maxAmt) * 100 : 0;
      const el = document.createElement("div");
      el.className = "rank-row";
      el.innerHTML = `
        <div class="rank-top">
          <span class="rank-name"><span class="rank-badge ${letter}">${letter}</span>${escapeHtml(r.name)}</span>
          <span class="rank-amount">${fmtRp(r.actual)}</span>
        </div>
        <div class="rank-track"><div class="rank-fill ${letter}" style="width:${pct}%"></div></div>
      `;
      rankWrap.appendChild(el);
    });
  }

  renderExtraIndicators(state.transactions.filter(t => t.type === "Pemasukan").reduce((s, t) => s + t.amount, 0));
}

function renderExtraIndicators(totalIncome) {
  const dict = tr();
  const wrap = document.getElementById("extraIndicators");
  wrap.innerHTML = "";

  const activeDebts = state.debts.filter(d => debtStatus(d) === "Aktif");
  const totalMonthlyInstallment = activeDebts.reduce((s, d) => s + d.tagihanPerBulan, 0);
  const incomeMonths = new Set(state.transactions.filter(t => t.type === "Pemasukan").map(t => t.date.slice(0, 7)));
  const monthCount = Math.max(incomeMonths.size, 1);
  const avgMonthlyIncome = totalIncome / monthCount;
  const dsr = avgMonthlyIncome > 0 ? (totalMonthlyInstallment / avgMonthlyIncome) * 100 : 0;
  let dsrTier, dsrCls;
  if (dsr < 30) { dsrTier = dict.dsr_sehat; dsrCls = "ok"; }
  else if (dsr <= 50) { dsrTier = dict.dsr_waspada; dsrCls = "warn"; }
  else { dsrTier = dict.dsr_berisiko; dsrCls = "bad"; }
  const dsrCard = document.createElement("div");
  dsrCard.className = "indicator-card";
  dsrCard.innerHTML = `
    <div class="eyebrow">${dict.dsr_title}</div>
    <div class="indicator-value ${dsrCls}">${dsr.toFixed(1)}% <span class="status-pill ${dsrCls}" style="margin:0 0 0 6px;padding:2px 8px;font-size:0.66rem;">${dsrTier}</span></div>
    <div class="indicator-note">${dict.dsr_note}</div>`;
  wrap.appendChild(dsrCard);

  const soldInvestments = state.investments.filter(i => i.status === "Terjual");
  const realizedPL = soldInvestments.reduce((s, i) => s + i.profitLoss, 0);
  const plCls = realizedPL > 0 ? "ok" : realizedPL < 0 ? "bad" : "";
  const plCard = document.createElement("div");
  plCard.className = "indicator-card";
  plCard.innerHTML = `
    <div class="eyebrow">${dict.invest_realized_title}</div>
    <div class="indicator-value ${plCls}">${realizedPL >= 0 ? "+" : ""}${fmtRp(realizedPL)}</div>
    <div class="indicator-note">${dict.invest_realized_note} (${soldInvestments.length})</div>`;
  wrap.appendChild(plCard);

  const activeInvestCost = activeInvestmentsByKode().reduce((s, g) => s + g.modal, 0);
  const totalAccountBalance = state.accounts.reduce((s, a) => s + a.balance, 0);
  const totalAssets = totalAccountBalance + activeInvestCost;
  const investRatio = totalAssets > 0 ? (activeInvestCost / totalAssets) * 100 : 0;
  let investTier;
  if (investRatio < 10) investTier = dict.invest_low;
  else if (investRatio <= 30) investTier = dict.invest_moderate;
  else investTier = dict.invest_aggressive;
  const ratioCard = document.createElement("div");
  ratioCard.className = "indicator-card";
  ratioCard.innerHTML = `
    <div class="eyebrow">${dict.invest_ratio_title}</div>
    <div class="indicator-value">${investRatio.toFixed(1)}% <span class="status-pill ok" style="margin:0 0 0 6px;padding:2px 8px;font-size:0.66rem;">${investTier}</span></div>
    <div class="indicator-note">${dict.invest_ratio_note}</div>`;
  wrap.appendChild(ratioCard);
}

function buildExportTables() {
  return {
    accounts: state.accounts.map(a => ({
      account_id: a.id, account_name: a.name, initial_balance: a.initial, current_balance: a.balance,
    })),
    transactions: state.transactions.map(t => ({
      transaction_id: t.id, date: t.date, type: t.type,
      account_from: t.accountFrom, account_to: t.accountTo,
      category_code: t.categoryCode, income_source: t.incomeSource || "",
      amount: t.amount, notes: t.notes || "", debt_id: t.debtId || "",
    })),
    budget_categories: state.budget.map(b => ({
      category_code: b.code, category_name: b.name, expense_type: b.type,
      target_percent: b.targetPercent, target_amount: b.targetBudget,
    })),
    chart_of_accounts: state.chartOfAccounts.map(c => ({ account_code: c.code, account_name: c.name, account_type: c.jenis })),
    debts: state.debts.map(d => ({
      debt_id: d.id, source: d.source, start_date: d.startDate,
      kewajiban_principal: d.kewajiban, admin_fee: d.admin, amount_received: d.diterima,
      term_months: d.jangkaWaktu, monthly_installment: d.tagihanPerBulan,
      total_interest_amount: d.totalBunga, total_interest_percent: d.persenBunga,
      total_to_repay: totalToRepayForDebt(d), amount_paid: totalPaidForDebt(d.id),
      amount_remaining: Math.max(totalToRepayForDebt(d) - totalPaidForDebt(d.id), 0),
      status: debtStatus(d), notes: d.notes || "",
    })),
    investments: state.investments.map(i => ({
      investment_id: i.id, type: i.jenis, code: i.kode,
      buy_date: i.tanggalBeli, cost_amount: i.modal, status: i.status,
      sell_date: i.tanggalJual || "", amount_received: i.nominalDiterima || "",
      profit_loss: i.profitLoss === null ? "" : i.profitLoss,
      profit_loss_percent: i.profitPct === null ? "" : i.profitPct,
      notes: i.notes || "",
    })),
  };
}

function exportToExcel() {
  if (typeof XLSX === "undefined") { alert(tr().export_lib_missing); return; }
  const tables = buildExportTables();
  const wb = XLSX.utils.book_new();
  Object.keys(tables).forEach(sheetName => {
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(tables[sheetName]), sheetName);
  });
  XLSX.writeFile(wb, `equilife-export-${todayISO()}.xlsx`);
}

function exportToJSON() {
  const tables = buildExportTables();
  const payload = { exported_at: new Date().toISOString(), user: currentUser ? currentUser.email : null, ...tables };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `equilife-export-${todayISO()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function renderEverything() {
  renderOverview();
  renderTransaksi();
  if (currentTxSection === "debt") renderDebtSection();
  if (currentTxSection === "invest") renderInvestSection();
  if (currentTxSection === "category") renderCategorySection();
  if (currentView === "anggaran") renderAnggaran();
  if (currentView === "analisis") renderAnalisis();
  updateBalanceToggleLabel();
}

function applySidebarState() {
  document.getElementById("sidebar").classList.toggle("collapsed", !!state.sidebarCollapsed);
  document.getElementById("sidebarToggle").textContent = state.sidebarCollapsed ? "›" : "‹";
}

function init() {
  applyI18n();

  document.getElementById("txDate").value = todayISO();
  document.getElementById("debtStartDate").value = todayISO();
  document.getElementById("invDate").value = todayISO();
  attachRupiahMask(document.getElementById("txAmount"));
  document.getElementById("txAmount").dispatchEvent(new CustomEvent("rupiahchange"));
  attachRupiahMask(document.getElementById("newAccBalance"));
  attachRupiahMask(document.getElementById("editTxAmount"));
  attachRupiahMask(document.getElementById("debtKewajiban"));
  attachRupiahMask(document.getElementById("debtAdmin"));
  attachRupiahMask(document.getElementById("debtTagihan"));
  attachRupiahMask(document.getElementById("invNominal"));
  attachRupiahMask(document.getElementById("invNominalTerima"));

  document.querySelectorAll(".nav-item").forEach(btn => btn.addEventListener("click", () => { setView(btn.dataset.view); closeDrawer(); }));
  document.querySelectorAll("[data-goto]").forEach(btn => btn.addEventListener("click", () => { setView(btn.dataset.goto); closeDrawer(); }));

  document.getElementById("sidebarToggle").addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    saveState();
    applySidebarState();
  });
  document.getElementById("hamburgerBtn").addEventListener("click", toggleDrawer);
  document.getElementById("sidebarBackdrop").addEventListener("click", closeDrawer);

  document.getElementById("langToggle").addEventListener("click", () => {
    uiLang = uiLang === "ID" ? "EN" : "ID";
    if (state) { state.lang = uiLang; saveState(); }
    applyI18n();
    if (state) renderEverything();
  });

  document.getElementById("exportExcelBtn").addEventListener("click", exportToExcel);
  document.getElementById("exportJsonBtn").addEventListener("click", exportToJSON);

  document.getElementById("resetDataBtn").addEventListener("click", () => {
    if (confirm(tr().reset_confirm)) {
      localStorage.removeItem(dataKeyForUser(currentUser.id));
      draftBudget = null;
      state = loadState();
      applyI18n();
      applySidebarState();
      renderEverything();
    }
  });

  document.getElementById("toggleBalance").addEventListener("click", () => {
    state.showBalance = !state.showBalance;
    saveState();
    updateBalanceToggleLabel();
    renderOverview();
  });

  const addAccBtn = document.getElementById("addAccountBtn");
  const addAccForm = document.getElementById("addAccountForm");
  addAccBtn.addEventListener("click", () => addAccForm.classList.toggle("hidden"));
  document.getElementById("cancelAddAccount").addEventListener("click", () => addAccForm.classList.add("hidden"));
  addAccForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("newAccName").value.trim();
    const bal = rawNumber(document.getElementById("newAccBalance"));
    if (!name) return;
    addAccount(name, bal);
    addAccForm.reset();
    setRupiahValue(document.getElementById("newAccBalance"), 0);
    addAccForm.classList.add("hidden");
    renderEverything();
  });

  document.getElementById("liabMonth").addEventListener("change", renderLiabilityPanel);
  document.getElementById("liabYear").addEventListener("change", renderLiabilityPanel);
  document.getElementById("liabSource").addEventListener("change", renderLiabilityPanel);
  document.getElementById("ovMonth").addEventListener("change", renderOverview);
  document.getElementById("ovYear").addEventListener("change", renderOverview);

  document.querySelectorAll("#txSectionGroup .pill").forEach(p => p.addEventListener("click", () => setTxSection(p.dataset.section)));
  document.querySelectorAll("#txTypeGroup .pill").forEach(p => p.addEventListener("click", () => { txType = p.dataset.type; applyTxTypeUI(); }));

  const txAmount = document.getElementById("txAmount");
  const txAmountHint = document.getElementById("txAmountHint");
  txAmount.addEventListener("rupiahchange", () => { txAmountHint.textContent = fmtRp(rawNumber(txAmount)); });

  document.getElementById("txCategory").addEventListener("change", updateDebtLinkVisibility);
  document.getElementById("txAccFrom").addEventListener("change", updatePaylaterTenorVisibility);

  document.getElementById("txForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("txDate").value || todayISO();
    const amount = rawNumber(txAmount);
    const notes = document.getElementById("txNotes").value.trim();
    const accFrom = (txType !== "Pemasukan") ? document.getElementById("txAccFrom").value : "-";
    const accTo = document.getElementById("txAccTo").value;
    const category = document.getElementById("txCategory").value;
    const debtLinkId = document.getElementById("txDebtLink").value;
    
    const tenorEl = document.getElementById("txPaylaterTenor");
    const jangkaWaktu = (accFrom.toLowerCase() === "paylater" && tenorEl) ? Number(tenorEl.value) || 1 : 1;

    if (txType === "Pengeluaran" && accFrom.toLowerCase() === "paylater") {
      state.debtCounter += 1;
      const autoDebtId = `DEBT-${String(state.debtCounter).padStart(3, "0")}`;
      const tagihanPerBulan = amount / jangkaWaktu;
      
      state.debts.push({
        id: autoDebtId,
        source: "Paylater",
        startDate: date,
        kewajiban: amount,
        admin: 0,
        diterima: amount,
        jangkaWaktu: jangkaWaktu,
        tagihanPerBulan: tagihanPerBulan,
        totalBunga: 0,
        persenBunga: 0,
        manualStatus: "Aktif",
        notes: notes ? `Belanja Paylater (${jangkaWaktu} bln): ${notes}` : `Pengeluaran via Paylater (${jangkaWaktu} bln)`
      });
    }

    const tx = {
      date, type: txType,
      accountFrom: txType === "Pemasukan" ? document.getElementById("txAccFrom").value : accFrom,
      accountTo: txType === "Pengeluaran" ? "-" : accTo,
      categoryCode: txType === "Pengeluaran" ? category : "-",
      incomeSource: "-",
      debtId: (txType === "Pengeluaran" && category === DEBT_CATEGORY_CODE && debtLinkId) ? debtLinkId : null,
      amount, notes,
    };
    
    addTransaction(tx);
    document.getElementById("txNotes").value = "";
    if (tenorEl) tenorEl.value = "1";
    renderEverything();
    const submitBtn = e.target.querySelector("button[type=submit]");
    if (submitBtn) flash(submitBtn, tr().saved_ok);
  });

  document.getElementById("closeEditModal").addEventListener("click", closeEditModal);
  document.getElementById("editModal").addEventListener("click", (e) => { if (e.target.id === "editModal") closeEditModal(); });
  document.getElementById("editTxForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("editModal").dataset.editingId;
    const date = document.getElementById("editTxDate").value;
    const amount = rawNumber(document.getElementById("editTxAmount"));
    const notes = document.getElementById("editTxNotes").value.trim();
    updateTransaction(id, { date, amount, notes });
    closeEditModal();
    renderEverything();
  });

  const settingBody = document.getElementById("budgetSettingBody");
  const chevron = document.getElementById("budgetSettingChevron");
  document.getElementById("budgetSettingToggle").addEventListener("click", () => {
    const willOpen = settingBody.classList.contains("hidden");
    settingBody.classList.toggle("hidden");
    chevron.textContent = willOpen ? "−" : "＋";
    if (willOpen) { ensureDraftBudget(); renderBudgetSettings(); }
  });
  
  document.getElementById("saveBudgetBtn").addEventListener("click", () => {
    const key = getSelectedBudgetPeriodKey();
    state.monthlyBudgets[key] = JSON.parse(JSON.stringify(draftBudget));
    state.budget.forEach(masterRow => {
      const draftRow = draftBudget.find(d => d.code === masterRow.code);
      if (draftRow) {
        masterRow.targetPercent = draftRow.targetPercent;
        masterRow.targetBudget = draftRow.targetBudget;
      }
    });
    saveState();
    const data = renderBudgetMonitoring();
    renderBudgetChart(data);
    flash(document.getElementById("saveBudgetBtn"), tr().saved_ok);
  });

  document.querySelectorAll("#periodGroup .pill").forEach(p => {
    p.addEventListener("click", () => {
      period = p.dataset.period;
      document.querySelectorAll("#periodGroup .pill").forEach(x => x.classList.toggle("active", x === p));
      renderAnalisis();
    });
  });
  document.getElementById("weekSelect").addEventListener("change", (e) => { selectedWeek = Number(e.target.value); renderAnalisis(); });
  document.getElementById("anMonth").addEventListener("change", renderAnalisis);
  document.getElementById("anYear").addEventListener("change", renderAnalisis);

  ["debtKewajiban", "debtAdmin", "debtJangka", "debtTagihan"].forEach(id => {
    document.getElementById(id).addEventListener("input", recalcDebtFormPreview);
  });
  recalcDebtFormPreview();
  document.getElementById("debtForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const kewajiban = rawNumber(document.getElementById("debtKewajiban"));
    const admin = rawNumber(document.getElementById("debtAdmin"));
    const jangka = Number(document.getElementById("debtJangka").value) || 0;
    const tagihan = rawNumber(document.getElementById("debtTagihan"));
    const { totalBunga, persenBunga } = calcDebtInterest(kewajiban, tagihan, jangka);
    state.debtCounter += 1;
    state.debts.push({
      id: `DEBT-${String(state.debtCounter).padStart(3, "0")}`,
      source: document.getElementById("debtSource").value,
      startDate: document.getElementById("debtStartDate").value || todayISO(),
      kewajiban, admin, diterima: kewajiban - admin,
      jangkaWaktu: jangka, tagihanPerBulan: tagihan,
      totalBunga, persenBunga, manualStatus: null,
      notes: document.getElementById("debtNotes").value.trim(),
    });
    saveState();
    document.getElementById("debtForm").reset();
    setRupiahValue(document.getElementById("debtKewajiban"), 0);
    setRupiahValue(document.getElementById("debtAdmin"), 0);
    setRupiahValue(document.getElementById("debtTagihan"), 0);
    document.getElementById("debtJangka").value = 12;
    document.getElementById("debtStartDate").value = todayISO();
    recalcDebtFormPreview();
    renderDebtSection();
    renderOverview();
    renderTxFormOptions();
    if (currentView === "analisis") renderAnalisis();
    flash(e.target.querySelector("button[type=submit]"), tr().saved_ok);
  });

  document.querySelectorAll("#investTypeGroup .pill").forEach(p => p.addEventListener("click", () => { investType = p.dataset.invtype; applyInvestTypeUI(); }));
  document.getElementById("investForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("invDate").value || todayISO();
    const notes = document.getElementById("invNotes").value.trim();
    if (investType === "beli") {
      const jenis = document.getElementById("invJenis").value;
      const kode = document.getElementById("invKode").value.trim();
      const modal = rawNumber(document.getElementById("invNominal"));
      if (!kode || modal <= 0) return;
      state.investCounter += 1;
      state.investments.push({
        id: `INV-${String(state.investCounter).padStart(3, "0")}`,
        jenis, kode, tanggalBeli: date, modal, status: "Aktif",
        tanggalJual: null, nominalDiterima: null, profitLoss: null, profitPct: null, notes,
      });
    } else {
      const lotId = document.getElementById("invLotSelect").value;
      const lot = state.investments.find(i => i.id === lotId);
      if (!lot) return;
      const terima = rawNumber(document.getElementById("invNominalTerima"));
      lot.status = "Terjual";
      lot.tanggalJual = date;
      lot.nominalDiterima = terima;
      lot.profitLoss = terima - lot.modal;
      lot.profitPct = lot.modal > 0 ? (lot.profitLoss / lot.modal) * 100 : 0;
      if (notes) lot.notes = notes;
    }
    saveState();
    document.getElementById("investForm").reset();
    setRupiahValue(document.getElementById("invNominal"), 0);
    setRupiahValue(document.getElementById("invNominalTerima"), 0);
    document.getElementById("invDate").value = todayISO();
    applyInvestTypeUI();
    renderInvestSection();
    renderOverview();
    if (currentView === "analisis") renderAnalisis();
    flash(e.target.querySelector("button[type=submit]"), tr().saved_ok);
  });

  document.getElementById("catName").addEventListener("input", applyCatFormAutoSuggest);
  document.getElementById("catJenis").addEventListener("change", () => { catManualOverride = true; toggleKonsumtifWrap(); });
  document.getElementById("catCode").addEventListener("input", () => { catManualOverride = true; });
  document.getElementById("catCancelEdit").addEventListener("click", cancelEditCategory);
  document.getElementById("catForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const dict = tr();
    const name = document.getElementById("catName").value.trim();
    const jenis = document.getElementById("catJenis").value;
    const code = document.getElementById("catCode").value.trim() || nextCategoryCode(jenis);
    if (!name) { alert(dict.cat_name_required); return; }

    const codeTaken = [...state.budget.map(b => b.code), ...state.chartOfAccounts.map(c => c.code)]
      .some(c => c === code && c !== editingCatCode);
    if (codeTaken) { alert(dict.cat_code_exists); return; }

    if (editingCatCode !== null) {
      state.budget = state.budget.filter(b => b.code !== editingCatCode);
      state.chartOfAccounts = state.chartOfAccounts.filter(c => c.code !== editingCatCode);
    }

    if (jenis === "Beban") {
      const konsumtif = document.getElementById("catKonsumtif").value;
      state.budget.push({ code, name, type: konsumtif, targetPercent: 0, targetBudget: 0 });
      draftBudget = null;
    } else {
      state.chartOfAccounts.push({ code, name, jenis });
    }
    saveState();
    cancelEditCategory();
    renderCategorySection();
    renderEverything();
  });
  toggleKonsumtifWrap();
  applyCatFormAutoSuggest();
}

/* ==========================================================================
   AUTH
   ========================================================================== */
const USERS_KEY = "equilife_users_v1";
const SESSION_KEY = "equilife_session_v1";
const EMAILJS_CONFIG = { publicKey: "", serviceId: "", templateId: "" };

let currentUser = null; 
let pendingVerifyUserId = null;

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch (e) { return {}; }
}
function saveUsers(users) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch (e) { }
}
function findUserByEmail(email) {
  const users = loadUsers();
  return Object.values(users).find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

async function hashText(text) {
  if (window.crypto && window.crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  }
  let h = 0;
  for (let i = 0; i < text.length; i++) { h = ((h << 5) - h + text.charCodeAt(i)) | 0; }
  return "fallback_" + Math.abs(h).toString(16);
}

function genVerifyCode() { return String(Math.floor(100000 + Math.random() * 900000)); }

function sendVerificationEmail(user, code) {
  const dict = tr();
  const devBox = document.getElementById("verifyDevCode");
  if (EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && window.emailjs) {
    window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
      to_email: user.email, to_name: user.fullName, verify_code: code,
    }, EMAILJS_CONFIG.publicKey).catch(() => {
      devBox.classList.remove("hidden");
      devBox.textContent = dict.auth_email_failed(code);
    });
    devBox.classList.add("hidden");
  } else {
    devBox.classList.remove("hidden");
    devBox.textContent = dict.auth_dev_preview(code);
  }
}

function showAuthError(elId, msg) {
  const el = document.getElementById(elId);
  el.textContent = msg;
  el.classList.remove("hidden");
}
function clearAuthErrors() {
  ["loginError", "registerError", "verifyError"].forEach(id => document.getElementById(id).classList.add("hidden"));
}

function setAuthTab(tab) {
  clearAuthErrors();
  document.querySelectorAll(".auth-tab").forEach(b => b.classList.toggle("active", b.dataset.authTab === tab));
  document.getElementById("loginForm").classList.toggle("hidden", tab !== "login");
  document.getElementById("registerForm").classList.toggle("hidden", tab !== "register");
  document.getElementById("verifyForm").classList.add("hidden");
}

function showVerifyScreen(user) {
  clearAuthErrors();
  pendingVerifyUserId = user.id;
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("verifyForm").classList.remove("hidden");
  document.getElementById("verifyDesc").textContent = tr().auth_verify_desc(user.email);
  document.getElementById("verifyDevCode").classList.add("hidden");
  document.getElementById("verifyCode").value = "";
}

function closeDrawer() {
  document.getElementById("sidebar").classList.remove("drawer-open");
  document.getElementById("sidebarBackdrop").classList.remove("visible");
  document.getElementById("hamburgerBtn").classList.remove("active");
}
function toggleDrawer() {
  const open = document.getElementById("sidebar").classList.toggle("drawer-open");
  document.getElementById("sidebarBackdrop").classList.toggle("visible", open);
  document.getElementById("hamburgerBtn").classList.toggle("active", open);
}

function bootApp(user) {
  currentUser = user;
  try { localStorage.setItem(SESSION_KEY, user.id); } catch (e) { }

  document.getElementById("authScreen").classList.add("hidden");
  document.getElementById("appRoot").classList.remove("hidden");

  try {
    const legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
    const alreadyHasOwnData = localStorage.getItem(dataKeyForUser(user.id));
    if (legacy && !alreadyHasOwnData) {
      localStorage.setItem(dataKeyForUser(user.id), legacy);
      localStorage.removeItem(STORAGE_KEY_LEGACY);
    }
  } catch (e) { }

  state = loadState();
  uiLang = state.lang;
  document.getElementById("userChip").textContent = (user.fullName || user.email).charAt(0).toUpperCase();
  document.getElementById("userCardName").textContent = user.fullName || user.email;
  applyI18n();
  applySidebarState();
  setView("overview");
  renderEverything();
  applyCatFormAutoSuggest();
}

function logout() {
  try { localStorage.removeItem(SESSION_KEY); } catch (e) { }
  currentUser = null;
  state = null;
  closeDrawer();
  document.getElementById("appRoot").classList.add("hidden");
  document.getElementById("authScreen").classList.remove("hidden");
  document.getElementById("loginForm").reset();
  setAuthTab("login");
}

function tryResumeSession() {
  let sessionId = null;
  try { sessionId = localStorage.getItem(SESSION_KEY); } catch (e) { }
  if (!sessionId) return false;
  const users = loadUsers();
  const user = users[sessionId];
  if (!user || !user.verified) return false;
  bootApp(user);
  return true;
}

function initAuthUI() {
  document.querySelectorAll(".auth-tab").forEach(b => b.addEventListener("click", () => setAuthTab(b.dataset.authTab)));

  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    clearAuthErrors();
    const dict = tr();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const user = findUserByEmail(email);
    if (!user) { showAuthError("loginError", dict.auth_err_not_found); return; }
    const hash = await hashText(password);
    if (hash !== user.passwordHash) { showAuthError("loginError", dict.auth_err_wrong_password); return; }
    if (!user.verified) {
      const code = genVerifyCode();
      user.verifyCode = code;
      user.verifyCodeExpires = Date.now() + 15 * 60 * 1000;
      const users = loadUsers(); users[user.id] = user; saveUsers(users);
      sendVerificationEmail(user, code);
      showVerifyScreen(user);
      return;
    }
    document.getElementById("loginForm").reset();
    bootApp(user);
  });

  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    clearAuthErrors();
    const dict = tr();
    const fullName = document.getElementById("regFullName").value.trim();
    const birthDate = document.getElementById("regBirthDate").value;
    const birthPlace = document.getElementById("regBirthPlace").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;

    if (findUserByEmail(email)) { showAuthError("registerError", dict.auth_err_email_taken); return; }
    if (password.length < 6) { showAuthError("registerError", dict.auth_err_password_short); return; }

    const id = "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const passwordHash = await hashText(password);
    const code = genVerifyCode();
    const user = {
      id, email, fullName, birthDate, birthPlace, passwordHash,
      verified: false, verifyCode: code, verifyCodeExpires: Date.now() + 15 * 60 * 1000,
      createdAt: new Date().toISOString(),
    };
    const users = loadUsers(); users[id] = user; saveUsers(users);
    sendVerificationEmail(user, code);
    document.getElementById("registerForm").reset();
    showVerifyScreen(user);
  });

  document.getElementById("verifyForm").addEventListener("submit", (e) => {
    e.preventDefault();
    clearAuthErrors();
    const dict = tr();
    const users = loadUsers();
    const user = users[pendingVerifyUserId];
    if (!user) { showAuthError("verifyError", dict.auth_err_generic); return; }
    const entered = document.getElementById("verifyCode").value.trim();
    if (Date.now() > user.verifyCodeExpires) { showAuthError("verifyError", dict.auth_err_code_expired); return; }
    if (entered !== user.verifyCode) { showAuthError("verifyError", dict.auth_err_code_wrong); return; }
    user.verified = true;
    delete user.verifyCode;
    delete user.verifyCodeExpires;
    users[user.id] = user;
    saveUsers(users);
    document.getElementById("verifyForm").reset();
    bootApp(user);
  });

  document.getElementById("resendCodeBtn").addEventListener("click", () => {
    const users = loadUsers();
    const user = users[pendingVerifyUserId];
    if (!user) return;
    const code = genVerifyCode();
    user.verifyCode = code;
    user.verifyCodeExpires = Date.now() + 15 * 60 * 1000;
    users[user.id] = user;
    saveUsers(users);
    sendVerificationEmail(user, code);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initAuthUI();
  init();
  const resumed = tryResumeSession();
  if (!resumed) {
    document.getElementById("appRoot").classList.add("hidden");
    document.getElementById("authScreen").classList.remove("hidden");
  }
  document.getElementById("logoutBtn").addEventListener("click", logout);
});