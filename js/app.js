/* ==========================================================================
   Equilife — application logic
   Static, client-side. Data persists in the browser via localStorage.
   ========================================================================== */

const STORAGE_KEY_LEGACY = "equilife_data_v3"; /* pre-login single-user data, offered for migration on first login */

/* ---------------------------------------------------------------------- */
/* i18n                                                                   */
/* ---------------------------------------------------------------------- */
const T = {
  ID: {
    tagline: "Pencatatan Keuangan Pribadi",
    nav_overview: "Overview", nav_transaksi: "Transaksi", nav_anggaran: "Anggaran", nav_analisis: "Analisis",
    page_sub_overview: "Ringkasan saldo, liability, dan aktivitas keuangan kamu",
    page_sub_transaksi: "Kelola transaksi, utang, investasi, dan kategori",
    page_sub_anggaran: "Atur target dan pantau realisasi anggaran",
    page_sub_analisis: "Pahami pola pengeluaran dan kesehatan keuangan kamu",
    total_balance: "TOTAL SALDO REKENING",
    hide_balance: "Sembunyikan Info", show_balance: "Tampilkan Info",
    add_account: "+ Tambah rekening baru",
    acc_name: "Nama Rekening / Dompet Baru",
    initial_bal: "Saldo Awal (Rp)",
    save: "Simpan", cancel: "Batal", other: "Lainnya",
    income_month: "PEMASUKAN", expense_month: "PENGELUARAN", surplus_month: "SISA / SURPLUS",
    this_month: "Bulan ini",
    recent_tx: "Transaksi Terakhir", see_all: "Lihat semua →",
    add_tx_title: "Tambah Transaksi", add_tx_desc: "Catat pemasukan, pengeluaran, atau transfer",
    expense: "Pengeluaran", income: "Pemasukan", transfer: "Transfer",
    date: "Tanggal", acc_from: "Sumber Rekening", acc_to: "Rekening Tujuan",
    from_acc: "Dari Rekening", to_acc: "Ke Rekening",
    income_source: "Sumber Pemasukan",
    income_src_salary: "Gaji Bulanan", income_src_side: "Side Income", income_src_other: "Penghasilan Lainnya",
    per_month: "/bln", months_unit: "bln", debt_bunga_persen_short: "bunga",
    category: "Kategori Pos Pengeluaran",
    amount: "Nominal Transaksi (Rp)", notes: "Keterangan",
    tx_history: "Riwayat Transaksi",
    tx_count: (n) => `${n} transaksi`,
    sec_tx: "Transaksi", sec_debt: "Utang & Cicilan", sec_invest: "Investasi", sec_category: "Kelola Kategori",
    setting_title: "Target Anggaran & Perhitungan Otomatis",
    setting_desc: "Ubah nominal (Rp) atau persentase (%) — kolom satunya akan terhitung otomatis.",
    code: "Kode", target_rp: "Target (Rp)", target_pct: "Target (%)",
    total_all: "TOTAL KESELURUHAN", save_setting: "Simpan Perubahan Target",
    budget_vs_act: "Monitoring Anggaran", budget_vs_act_desc: "Budget vs Realisasi (seluruh transaksi)",
    category_col: "Kategori", type_col: "Tipe", target: "Target", actual: "Realisasi", remaining: "Sisa", status: "Status",
    status_ok: "Terpenuhi", status_over: "Melampaui Batas",
    chart_title: "Visualisasi Budget vs Realisasi",
    monthly: "Bulanan", weekly: "Mingguan", week_label: "Minggu ke-",
    donut_title: "Konsumtif vs Non-Konsumtif",
    lifestyle_ratio: "Indikator Tingkat Konsumtif", from_income: "dari total pemasukan",
    status_wise: "Proporsional", status_warning: "Perlu Perhatian", status_high: "Tingkat Konsumtif Tinggi",
    total_income_lbl: "Total Pemasukan", total_expense_lbl: "Total Pengeluaran", konsumtif_expense_lbl: "Pengeluaran Konsumtif",
    category_detail: "Rincian per Kategori",
    correct_title: "Koreksi Transaksi", save_changes: "Simpan Perubahan",
    no_tx: "Belum ada transaksi. Tambahkan transaksi pertamamu di menu Transaksi.",
    no_data_chart: "Belum ada data untuk ditampilkan.",
    income_info: (v) => `Total pemasukan tercatat: <strong>${v}</strong>`,
    no_income_warn: "Belum ada pemasukan tercatat. Tambahkan transaksi pemasukan agar target dapat dihitung otomatis.",
    salary_info: (v, m) => `Anggaran ini dihitung dari <strong>Gaji Bulanan${m ? " " + m : ""}: ${v}</strong> — Side Income dan Penghasilan Lainnya tidak dihitung sebagai dasar target anggaran.`,
    no_salary_warn: "Belum ada transaksi Pemasukan dengan sumber \"Gaji Bulanan\". Tambahkan dulu agar target anggaran dapat dihitung otomatis.",
    total_ok: "Total alokasi persentase sudah 100% — sempurna.",
    total_warn: (p) => `Total alokasi persentase saat ini ${p}% — idealnya mencapai 100%.`,
    reset_data: "Reset data contoh",
    export_lib_missing: "Library export Excel belum termuat. Cek koneksi internet lalu coba lagi.",
    reset_confirm: "Ini akan menghapus seluruh data dan mengembalikan data kosong. Lanjutkan?",
    delete_confirm: "Hapus transaksi ini? Saldo rekening akan dikembalikan.",
    delete_debt_confirm: "Hapus data utang ini?",
    delete_cat_confirm: "Hapus kategori ini? Data realisasi lama tetap tersimpan namun tidak akan tampil di anggaran.",
    saved_ok: "Tersimpan ✓",
    konsumtif: "Konsumtif", nonkonsumtif: "Non-Konsumtif",
    /* liability */
    liability_title: "Liability (Utang)", liability_desc: "Ringkasan pinjaman dan bunga berjalan",
    cashflow_title: "ARUS KAS", all_sources: "Semua Sumber",
    liab_total_loan: "Total Pokok Pinjaman Aktif", liab_total_interest: "Total Bunga Berjalan",
    no_debt: "Tidak ada utang aktif pada periode ini.",
    /* debt form */
    debt_form_title: "Tambah Utang / Pinjaman", debt_form_desc: "Kewajiban, admin, dan bunga terhitung otomatis",
    debt_source: "Utang Dimana", debt_start: "Tanggal Mulai",
    debt_kewajiban: "Kewajiban (Pokok Pinjaman Awal)", debt_admin: "Admin (Biaya Admin)",
    debt_diterima: "Utang yang Diterima", debt_jangka: "Jangka Waktu (Bulan)",
    debt_tagihan: "Tagihan per Bulan", debt_bunga_nominal: "Total Nominal Bunga (otomatis)",
    debt_bunga_persen: "Persentase Bunga Total (otomatis)", debt_save: "Simpan Utang",
    debt_list_title: "Daftar Utang", debt_count: (n) => `${n} utang tercatat`,
    debt_aktif: "Aktif", debt_lunas: "Lunas", mark_paid: "Tandai Lunas", mark_active: "Tandai Aktif",
    tx_debt_link: "Bayar Utang Mana", debt_no_link: "- (Tidak terkait utang tertentu)",
    debt_remaining_short: "Sisa", debt_progress: (paid, total) => `Terbayar ${paid} dari ${total}`,
    /* investment */
    invest_form_title: "Investasi", invest_form_desc: "Catat pembelian dan penjualan aset investasi",
    invest_buy: "Beli", invest_sell: "Jual",
    invest_jenis: "Jenis Investasi", invest_kode: "Kode / Nama Investasi",
    invest_pilih_lot: "Pilih Posisi Aktif", invest_nominal: "Nominal Investasi (Rp)",
    invest_terima: "Nominal Diterima (Rp)",
    invest_saham: "Saham", invest_crypto: "Crypto", invest_obligasi: "Obligasi",
    invest_emas: "Emas", invest_reksadana: "Reksa Dana",
    invest_list_title: "Posisi Investasi", invest_active: "Investasi Aktif", invest_none_active: "Tidak ada posisi aktif untuk dijual.",
    no_invest: "Belum ada data investasi.",
    invest_summary: (n, v) => `${n} posisi aktif · total modal ${v}`,
    /* category manager */
    cat_title: "Kelola Kategori / Akun", cat_desc: "Ketik nama akun — sistem menyarankan jenis dan kode otomatis (Harta/Utang/Modal/Pendapatan/Beban). Kategori berjenis Beban langsung tersedia di menu Anggaran.",
    cat_name: "Nama Akun / Kategori", cat_jenis: "Jenis (saran otomatis)", cat_code: "Kode (saran otomatis)",
    cat_konsumtif_type: "Tipe (khusus Beban)", cat_add: "Tambah Kategori", cat_update: "Simpan Perubahan",
    cat_list_title: "Daftar Kategori / Akun",
    jenis_harta: "Harta", jenis_utang: "Utang", jenis_modal: "Modal", jenis_pendapatan: "Pendapatan", jenis_beban: "Beban",
    edit: "Edit", delete: "Hapus",
    cat_name_required: "Nama kategori tidak boleh kosong.",
    cat_code_exists: "Kode ini sudah dipakai kategori lain, silakan ubah kodenya.",
    /* analysis extra indicators */
    extra_indicators_title: "Indikator Kesehatan Keuangan",
    extra_indicators_desc: "Kemampuan bayar utang dan alokasi investasi (acuan umum, bukan saran keuangan personal)",
    dsr_title: "Rasio Cicilan terhadap Pemasukan (DSR)",
    dsr_note: "Total tagihan bulanan utang aktif dibagi rata-rata pemasukan bulanan. Acuan umum: <30% sehat, 30–50% waspada, >50% berisiko.",
    dsr_sehat: "Sehat", dsr_waspada: "Waspada", dsr_berisiko: "Berisiko",
    invest_realized_title: "Laba/Rugi Investasi Terealisasi",
    invest_realized_note: "Total selisih nominal diterima dan modal dari seluruh posisi yang sudah dijual.",
    invest_ratio_title: "Porsi Investasi dari Total Aset",
    invest_ratio_note: "Total modal investasi aktif dibanding total aset (saldo rekening + investasi aktif). Acuan umum, bukan target baku.",
    invest_low: "Rendah", invest_moderate: "Moderat", invest_aggressive: "Agresif",
    nav_section_menu: "MENU", logout: "Keluar", export_excel: "⬇ Export Excel", export_json: "⬇ Export JSON",
    auth_login_tab: "Masuk", auth_register_tab: "Daftar",
    auth_email: "Email", auth_password: "Kata Sandi", auth_login_btn: "Masuk",
    auth_fullname: "Nama Lengkap", auth_birthdate: "Tanggal Lahir", auth_birthplace: "Kota Kelahiran",
    auth_password_hint: "Minimal 6 karakter", auth_register_btn: "Daftar",
    auth_verify_code: "Kode Verifikasi (6 digit)", auth_verify_btn: "Verifikasi & Masuk", auth_resend: "Kirim ulang kode",
    auth_disclaimer: "Situs ini statis (GitHub Pages) — akun dan data disimpan di localStorage browser ini, bukan di server. Jangan gunakan kata sandi yang juga kamu pakai di layanan lain.",
    auth_verify_desc: (email) => `Kami mengirim kode 6 digit ke <strong>${email}</strong>. Masukkan kodenya untuk menyelesaikan verifikasi.`,
    auth_dev_preview: (code) => `Mode pratinjau (belum ada layanan email terhubung): kode verifikasi kamu adalah ${code}`,
    auth_email_failed: (code) => `Pengiriman email gagal. Kode verifikasi kamu: ${code}`,
    auth_err_not_found: "Email belum terdaftar. Silakan daftar dulu.",
    auth_err_wrong_password: "Kata sandi salah.",
    auth_err_email_taken: "Email ini sudah terdaftar. Silakan masuk.",
    auth_err_password_short: "Kata sandi minimal 6 karakter.",
    auth_err_code_expired: "Kode verifikasi sudah kedaluwarsa. Klik \"Kirim ulang kode\".",
    auth_err_code_wrong: "Kode verifikasi salah.",
    auth_err_generic: "Terjadi kesalahan. Silakan coba lagi.",
  },
  EN: {
    tagline: "Personal Financial Records",
    nav_overview: "Overview", nav_transaksi: "Transactions", nav_anggaran: "Budget", nav_analisis: "Analysis",
    page_sub_overview: "A summary of balances, liabilities, and recent activity",
    page_sub_transaksi: "Manage transactions, debt, investments, and categories",
    page_sub_anggaran: "Set targets and monitor budget realization",
    page_sub_analisis: "Understand your spending pattern and financial health",
    total_balance: "TOTAL ACCOUNT BALANCE",
    hide_balance: "Hide Info", show_balance: "Show Info",
    add_account: "+ Add new account",
    acc_name: "New Account / Wallet Name",
    initial_bal: "Initial Balance (Rp)",
    save: "Save", cancel: "Cancel", other: "Other",
    income_month: "INCOME", expense_month: "EXPENSE", surplus_month: "REMAINING / SURPLUS",
    this_month: "This month",
    recent_tx: "Recent Transactions", see_all: "See all →",
    add_tx_title: "Add Transaction", add_tx_desc: "Record income, expense, or a transfer",
    expense: "Expense", income: "Income", transfer: "Transfer",
    date: "Date", acc_from: "Source Account", acc_to: "Destination Account",
    from_acc: "From Account", to_acc: "To Account",
    income_source: "Income Source",
    income_src_salary: "Monthly Salary", income_src_side: "Side Income", income_src_other: "Other Income",
    per_month: "/mo", months_unit: "mo", debt_bunga_persen_short: "interest",
    category: "Expense Category",
    amount: "Transaction Amount (Rp)", notes: "Notes",
    tx_history: "Transaction History",
    tx_count: (n) => `${n} transactions`,
    sec_tx: "Transactions", sec_debt: "Debt & Loans", sec_invest: "Investments", sec_category: "Manage Categories",
    setting_title: "Budget Target & Live Calculation",
    setting_desc: "Change the amount (Rp) or percentage (%) — the other field updates automatically.",
    code: "Code", target_rp: "Target (Rp)", target_pct: "Target (%)",
    total_all: "OVERALL TOTAL", save_setting: "Save Target Changes",
    budget_vs_act: "Budget Monitoring", budget_vs_act_desc: "Budget vs actual (all transactions)",
    category_col: "Category", type_col: "Type", target: "Target", actual: "Actual", remaining: "Remaining", status: "Status",
    status_ok: "On Track", status_over: "Exceeded",
    chart_title: "Budget vs Actual Visualization",
    monthly: "Monthly", weekly: "Weekly", week_label: "Week ",
    donut_title: "Lifestyle vs Essential Spending",
    lifestyle_ratio: "Lifestyle Consumption Indicator", from_income: "of total income",
    status_wise: "Proportional", status_warning: "Needs Attention", status_high: "High Consumption",
    total_income_lbl: "Total Income", total_expense_lbl: "Total Expense", konsumtif_expense_lbl: "Lifestyle Spending",
    category_detail: "Category Breakdown",
    correct_title: "Correct Transaction", save_changes: "Save Changes",
    no_tx: "No transactions yet. Add your first one in the Transactions menu.",
    no_data_chart: "Nothing to display yet.",
    income_info: (v) => `Total recorded income: <strong>${v}</strong>`,
    no_income_warn: "No income recorded yet. Add an income transaction so targets can be calculated automatically.",
    salary_info: (v, m) => `This budget is calculated from <strong>Monthly Salary${m ? " " + m : ""}: ${v}</strong> — Side Income and Other Income are not counted toward the budget target basis.`,
    no_salary_warn: "No income transaction with source \"Monthly Salary\" yet. Add one so budget targets can be calculated automatically.",
    total_ok: "Total allocation is 100% — perfect.",
    total_warn: (p) => `Current allocation total is ${p}% — ideally it should reach 100%.`,
    reset_data: "Reset sample data",
    export_lib_missing: "The Excel export library hasn't loaded. Check your internet connection and try again.",
    reset_confirm: "This will erase all data and restore the sample data. Continue?",
    delete_confirm: "Delete this transaction? The account balance will be restored.",
    delete_debt_confirm: "Delete this debt record?",
    delete_cat_confirm: "Delete this category? Past realized data stays but won't show in the budget anymore.",
    saved_ok: "Saved ✓",
    konsumtif: "Lifestyle", nonkonsumtif: "Essential",
    liability_title: "Liability (Debt)", liability_desc: "A summary of running loans and interest",
    cashflow_title: "CASH FLOW", all_sources: "All Sources",
    liab_total_loan: "Total Active Loan Principal", liab_total_interest: "Total Running Interest",
    no_debt: "No active debt in this period.",
    debt_form_title: "Add Debt / Loan", debt_form_desc: "Obligation, admin fee, and interest calculated automatically",
    debt_source: "Debt Source", debt_start: "Start Date",
    debt_kewajiban: "Obligation (Original Principal)", debt_admin: "Admin Fee",
    debt_diterima: "Amount Received", debt_jangka: "Term (Months)",
    debt_tagihan: "Monthly Installment", debt_bunga_nominal: "Total Interest Amount (auto)",
    debt_bunga_persen: "Total Interest Percentage (auto)", debt_save: "Save Debt",
    debt_list_title: "Debt List", debt_count: (n) => `${n} debts recorded`,
    debt_aktif: "Active", debt_lunas: "Paid Off", mark_paid: "Mark Paid Off", mark_active: "Mark Active",
    tx_debt_link: "Paying Off Which Debt", debt_no_link: "- (Not linked to a specific debt)",
    debt_remaining_short: "Remaining", debt_progress: (paid, total) => `Paid ${paid} of ${total}`,
    invest_form_title: "Investments", invest_form_desc: "Record purchases and sales of investment assets",
    invest_buy: "Buy", invest_sell: "Sell",
    invest_jenis: "Investment Type", invest_kode: "Code / Name",
    invest_pilih_lot: "Select Active Position", invest_nominal: "Investment Amount (Rp)",
    invest_terima: "Amount Received (Rp)",
    invest_saham: "Stocks", invest_crypto: "Crypto", invest_obligasi: "Bonds",
    invest_emas: "Gold", invest_reksadana: "Mutual Fund",
    invest_list_title: "Investment Positions", invest_active: "Active Investments", invest_none_active: "No active position to sell.",
    no_invest: "No investment data yet.",
    invest_summary: (n, v) => `${n} active positions · total cost ${v}`,
    cat_title: "Manage Categories / Accounts", cat_desc: "Type an account name — the system suggests a type and code automatically (Asset/Liability/Equity/Income/Expense). Expense-type entries are immediately available in the Budget menu.",
    cat_name: "Account / Category Name", cat_jenis: "Type (auto-suggested)", cat_code: "Code (auto-suggested)",
    cat_konsumtif_type: "Type (Expense only)", cat_add: "Add Category", cat_update: "Save Changes",
    cat_list_title: "Category / Account List",
    jenis_harta: "Asset", jenis_utang: "Liability", jenis_modal: "Equity", jenis_pendapatan: "Income", jenis_beban: "Expense",
    edit: "Edit", delete: "Delete",
    cat_name_required: "Category name cannot be empty.",
    cat_code_exists: "This code is already used by another category, please change it.",
    extra_indicators_title: "Financial Health Indicators",
    extra_indicators_desc: "Debt repayment capacity and investment allocation (general reference, not personal financial advice)",
    dsr_title: "Debt Service Ratio (DSR)",
    dsr_note: "Total monthly installments of active debt divided by average monthly income. General reference: <30% healthy, 30–50% caution, >50% risky.",
    dsr_sehat: "Healthy", dsr_waspada: "Caution", dsr_berisiko: "Risky",
    invest_realized_title: "Realized Investment Profit/Loss",
    invest_realized_note: "Total difference between amount received and cost across all sold positions.",
    invest_ratio_title: "Investment Share of Total Assets",
    invest_ratio_note: "Total active investment cost compared to total assets (account balances + active investments). General reference, not a strict target.",
    invest_low: "Low", invest_moderate: "Moderate", invest_aggressive: "Aggressive",
    nav_section_menu: "MENU", logout: "Log Out", export_excel: "⬇ Export Excel", export_json: "⬇ Export JSON",
    auth_login_tab: "Log In", auth_register_tab: "Sign Up",
    auth_email: "Email", auth_password: "Password", auth_login_btn: "Log In",
    auth_fullname: "Full Name", auth_birthdate: "Date of Birth", auth_birthplace: "City of Birth",
    auth_password_hint: "At least 6 characters", auth_register_btn: "Sign Up",
    auth_verify_code: "Verification Code (6 digits)", auth_verify_btn: "Verify & Log In", auth_resend: "Resend code",
    auth_disclaimer: "This is a static site (GitHub Pages) — accounts and data are stored in this browser's localStorage, not on a server. Don't reuse a password from another service.",
    auth_verify_desc: (email) => `We sent a 6-digit code to <strong>${email}</strong>. Enter it to finish verifying.`,
    auth_dev_preview: (code) => `Preview mode (no email service connected yet): your verification code is ${code}`,
    auth_email_failed: (code) => `Email sending failed. Your verification code: ${code}`,
    auth_err_not_found: "Email not registered yet. Please sign up first.",
    auth_err_wrong_password: "Incorrect password.",
    auth_err_email_taken: "This email is already registered. Please log in.",
    auth_err_password_short: "Password must be at least 6 characters.",
    auth_err_code_expired: "Verification code expired. Click \"Resend code\".",
    auth_err_code_wrong: "Incorrect verification code.",
    auth_err_generic: "Something went wrong. Please try again.",
  }
};

/* ---------------------------------------------------------------------- */
/* Chart-of-accounts auto-suggestion rules                                */
/* ---------------------------------------------------------------------- */
const COA_RULES = [
  { jenis: "Utang", prefix: "2", keywords: ["utang", "hutang", "pinjam", "kredit", "cicilan", "paylater", "pay later", "spinjam", "kta", "kartu kredit", "kpr", "debt", "loan"] },
  { jenis: "Modal", prefix: "3", keywords: ["modal", "ekuitas", "equity", "saldo awal"] },
  { jenis: "Pendapatan", prefix: "4", keywords: ["gaji", "pendapatan", "bonus", "komisi", "honor", "thr", "freelance", "income", "salary"] },
  { jenis: "Harta", prefix: "1", keywords: ["bank", "tabungan", "kas", "dompet", "emas", "saham", "investasi", "crypto", "reksadana", "obligasi", "deposito", "giro", "piutang", "asset", "wallet"] },
];
function suggestJenis(name) {
  const s = (name || "").toLowerCase();
  for (const rule of COA_RULES) { if (rule.keywords.some(k => s.includes(k))) return rule.jenis; }
  return "Beban";
}
const JENIS_PREFIX = { Harta: "1", Utang: "2", Modal: "3", Pendapatan: "4", Beban: "5" };

/* ---------------------------------------------------------------------- */
/* State + storage                                                        */
/* ---------------------------------------------------------------------- */
let state = null;
let draftBudget = null;
let currentView = "overview";
let currentTxSection = "tx";

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
    { code: "5104", name: "Bayar Utang / Cicilan", type: "Non-Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5105", name: "Beban Pasangan / Pacar", type: "Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5106", name: "Beban Hiburan & Rekreasi", type: "Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5107", name: "Makan & Minum Harian", type: "Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5108", name: "Utilitas (Listrik/Internet)", type: "Non-Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "5109", name: "Transportasi & Bensin", type: "Non-Konsumtif", targetPercent: 0, targetBudget: 0 },
    { code: "1201", name: "Tabungan / Investasi", type: "Non-Konsumtif", targetPercent: 0, targetBudget: 0 },
  ];

  const s = {
    lang: "ID",
    showBalance: true,
    sidebarCollapsed: false,
    accounts,
    budget,
    transactions: [],
    debts: [],
    investments: [],
    chartOfAccounts: [],
    txCounter: 0,
    accCounter: accounts.length,
    debtCounter: 0,
    investCounter: 0,
  };

  return s;
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
  if (s.debtCounter === undefined) s.debtCounter = s.debts.length;
  if (s.investCounter === undefined) s.investCounter = s.investments.length;
  return s;
}

/* Data is namespaced per logged-in user id, so each account's financial
   data lives under its own localStorage key and is invisible to anyone
   who logs in as a different user on the same browser. */
function dataKeyForUser(userId) { return `equilife_data_v3__${userId}`; }

function loadState() {
  try {
    const raw = localStorage.getItem(dataKeyForUser(currentUser.id));
    if (raw) return migrateState(JSON.parse(raw));
  } catch (e) { /* ignore corrupt storage */ }
  const seeded = buildSeedState();
  persist(seeded);
  return seeded;
}

function persist(s) {
  if (!currentUser) return;
  try { localStorage.setItem(dataKeyForUser(currentUser.id), JSON.stringify(s)); } catch (e) { /* storage unavailable */ }
}
function saveState() { persist(state); }

/* ---------------------------------------------------------------------- */
/* Balance logic                                                          */
/* ---------------------------------------------------------------------- */
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

/* ---------------------------------------------------------------------- */
/* Utilities                                                              */
/* ---------------------------------------------------------------------- */
let uiLang = "ID"; /* language selector must work before login, when `state` doesn't exist yet */
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

/* ---------------------------------------------------------------------- */
/* i18n application                                                       */
/* ---------------------------------------------------------------------- */
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

/* ---------------------------------------------------------------------- */
/* Navigation                                                             */
/* ---------------------------------------------------------------------- */
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

/* ---------------------------------------------------------------------- */
/* OVERVIEW                                                               */
/* ---------------------------------------------------------------------- */
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

  /* cashflow month/year filter */
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

const DEBT_CATEGORY_CODE = "5104"; /* "Bayar Utang / Cicilan" — the expense category that can be linked to a specific debt */
function totalToRepayForDebt(debt) { return debt.tagihanPerBulan * debt.jangkaWaktu; }
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

  /* broad, generous year range: several years back/forward from today, plus
     any actual data years so old records are always reachable */
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
  populateLiabSourceSelect(sourceSel); /* refresh options in case sources changed, keeps selection if still valid */
  const month = Number(monthSel.value) || (new Date().getMonth() + 1);
  const year = Number(yearSel.value) || new Date().getFullYear();
  const periodStart = `${year}-${String(month).padStart(2, "0")}-01`;
  const sourceFilter = sourceSel.value || "__all";

  const periodEndExclusive = addMonthsToISO(periodStart, 1); /* first day of the following month */
  const debtsInPeriod = state.debts.filter(d => {
    const end = addMonthsToISO(d.startDate, d.jangkaWaktu);
    /* overlap check: the loan's active range [startDate, end] intersects
       the selected month's range [periodStart, periodEndExclusive) —
       previously this required startDate to fall on/before the 1st of the
       month, which wrongly hid loans that started mid-month from their
       own starting month. */
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
  else if (tx.type === "Pemasukan") acc = `${incomeSourceLabel(tx.incomeSource)} → ${tx.accountTo}`;
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

function incomeSourceLabel(src) {
  const dict = tr();
  if (src === "Gaji Bulanan") return dict.income_src_salary;
  if (src === "Side Income") return dict.income_src_side;
  if (src === "Penghasilan Lainnya") return dict.income_src_other;
  return src || dict.income_src_other;
}

/* ---------------------------------------------------------------------- */
/* TRANSAKSI                                                              */
/* ---------------------------------------------------------------------- */
let txType = "Pengeluaran";

function renderTxFormOptions() {
  const dict = tr();
  const accFrom = document.getElementById("txAccFrom");
  const accTo = document.getElementById("txAccTo");
  const cat = document.getElementById("txCategory");
  [accFrom, accTo].forEach(sel => {
    const prev = sel.value;
    sel.innerHTML = state.accounts.map(a => `<option value="${escapeHtml(a.name)}">${escapeHtml(a.name)}</option>`).join("");
    if (prev) sel.value = prev;
  });
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
}

function updateDebtLinkVisibility() {
  const fieldDebtLink = document.getElementById("fieldDebtLink");
  const cat = document.getElementById("txCategory").value;
  const show = txType === "Pengeluaran" && cat === DEBT_CATEGORY_CODE;
  fieldDebtLink.classList.toggle("hidden", !show);
}

function applyTxTypeUI() {
  const dict = tr();
  document.querySelectorAll("#txTypeGroup .pill").forEach(p => p.classList.toggle("active", p.dataset.type === txType));
  const fieldAccTo = document.getElementById("fieldAccTo");
  const fieldCategory = document.getElementById("fieldCategory");
  const fieldIncomeSource = document.getElementById("fieldIncomeSource");
  const labelAccFrom = document.getElementById("labelAccFrom");
  const labelAccTo = document.getElementById("labelAccTo");

  if (txType === "Pengeluaran") {
    fieldAccTo.classList.add("hidden");
    fieldIncomeSource.classList.add("hidden");
    fieldCategory.classList.remove("hidden");
    labelAccFrom.textContent = dict.acc_from;
  } else if (txType === "Pemasukan") {
    fieldAccTo.classList.remove("hidden");
    fieldIncomeSource.classList.remove("hidden");
    fieldCategory.classList.add("hidden");
    labelAccFrom.textContent = dict.acc_from;
    labelAccTo.textContent = dict.acc_to;
  } else {
    fieldAccTo.classList.remove("hidden");
    fieldIncomeSource.classList.add("hidden");
    fieldCategory.classList.add("hidden");
    labelAccFrom.textContent = dict.from_acc;
    labelAccTo.textContent = dict.to_acc;
  }
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

/* ---------------------------------------------------------------------- */
/* DEBT / LOANS                                                           */
/* ---------------------------------------------------------------------- */
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
    const paid = totalPaidForDebt(d.id);
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

/* ---------------------------------------------------------------------- */
/* INVESTMENTS                                                            */
/* ---------------------------------------------------------------------- */
let investType = "beli";

function activeInvestmentLots() { return state.investments.filter(i => i.status === "Aktif"); }

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

/* ---------------------------------------------------------------------- */
/* CATEGORY / CHART OF ACCOUNTS                                           */
/* ---------------------------------------------------------------------- */
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

  const jenisLabel = { Harta: dict.jenis_harta, Utang: dict.jenis_utang, Modal: dict.jenis_modal, Pendapatan: dict.jenis_pendapatan, Beban: dict.jenis_beban };
  const jenisTagClass = { Harta: "harta", Utang: "utang", Modal: "modal", Pendapatan: "pendapatan", Beban: "nonkonsumtif" };

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
function totalIncomeAllTime() {
  return state.transactions.filter(t => t.type === "Pemasukan").reduce((s, t) => s + t.amount, 0);
}

/* Budget targets are based on monthly salary only (Gaji Bulanan), not side
   income or other income sources. Uses this calendar month's salary if any
   has been logged, otherwise falls back to the most recent month that has
   a salary entry, so budgeting keeps working even before this month's
   payday is recorded. */
function monthlySalaryBasis() {
  const gajiTx = state.transactions.filter(t => t.type === "Pemasukan" && t.incomeSource === "Gaji Bulanan");
  if (gajiTx.length === 0) return { amount: 0, monthKey: null };
  const byMonth = {};
  gajiTx.forEach(t => { const k = t.date.slice(0, 7); byMonth[k] = (byMonth[k] || 0) + t.amount; });
  const thisMonthKey = todayISO().slice(0, 7);
  if (byMonth[thisMonthKey] !== undefined) return { amount: byMonth[thisMonthKey], monthKey: thisMonthKey };
  const latestKey = Object.keys(byMonth).sort().pop();
  return { amount: byMonth[latestKey], monthKey: latestKey };
}

function ensureDraftBudget() {
  if (!draftBudget || draftBudget.length !== state.budget.length) {
    draftBudget = JSON.parse(JSON.stringify(state.budget));
  }
}

function renderBudgetSettings() {
  const dict = tr();
  ensureDraftBudget();
  const salary = monthlySalaryBasis();
  const income = salary.amount;

  const infoBox = document.getElementById("incomeInfo");
  if (income > 0) {
    infoBox.className = "callout ok";
    infoBox.innerHTML = dict.salary_info(fmtRp(income), salary.monthKey ? monthLabelFromKey(salary.monthKey) : "");
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
  state.transactions.filter(t => t.type === "Pengeluaran").forEach(t => {
    spentByCategory[t.categoryCode] = (spentByCategory[t.categoryCode] || 0) + t.amount;
  });

  const salary = monthlySalaryBasis();
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
  state.budget.forEach(row => {
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

  return spentByCategory;
}

function renderBudgetChart(spentByCategory) {
  const chart = document.getElementById("budgetChart");
  chart.innerHTML = "";

  const maxVal = niceCeil(Math.max(...state.budget.map(r => Math.max(r.targetBudget, spentByCategory[r.code] || 0)), 1));
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

  state.budget.forEach(row => {
    const actual = spentByCategory[row.code] || 0;
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
  renderBudgetSettings();
  const spent = renderBudgetMonitoring();
  renderBudgetChart(spent);
}

/* ---------------------------------------------------------------------- */
/* ANALISIS                                                               */
/* ---------------------------------------------------------------------- */
let period = "monthly";
let selectedWeek = null; /* 1-4, week-of-month bucket, only used when period === "weekly" */

/* Splits a month into 4 fixed buckets: 1-7, 8-14, 15-21, 22-end. Simple and
   predictable, avoids a ragged 5th week at month boundaries. */
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

  /* Both Bulanan and Mingguan are scoped to the chosen month/year; Mingguan
     additionally narrows down to one week-of-month bucket within it. */
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

  /* Income for the ratio/breakdown is scoped to the selected month too, so
     the percentage reflects the period being viewed. The DSR indicator
     further down still uses all-time income (see renderExtraIndicators),
     since debt capacity shouldn't reset every time you change this filter. */
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

  renderExtraIndicators(totalIncomeAllTime());
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

/* ---------------------------------------------------------------------- */
/* Excel export                                                           */
/* ---------------------------------------------------------------------- */
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

/* JSON export: same tables as Excel, but a format that's trivial for a
   Node/Python script to read and push straight into MySQL — see the
   sync-to-mysql.py sample in the README. Excel export above is kept as-is
   for people who just want to open/inspect the data by hand. */
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

  document.getElementById("txForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("txDate").value || todayISO();
    const amount = rawNumber(txAmount);
    const notes = document.getElementById("txNotes").value.trim();
    const accFrom = document.getElementById("txAccFrom").value;
    const accTo = document.getElementById("txAccTo").value;
    const category = document.getElementById("txCategory").value;
    const incomeSource = document.getElementById("txIncomeSource").value;
    const debtLinkId = document.getElementById("txDebtLink").value;

    const tx = {
      date, type: txType,
      accountFrom: txType === "Pemasukan" ? "-" : accFrom,
      accountTo: txType === "Pengeluaran" ? "-" : accTo,
      categoryCode: txType === "Pengeluaran" ? category : "-",
      incomeSource: txType === "Pemasukan" ? incomeSource : "-",
      debtId: (txType === "Pengeluaran" && category === DEBT_CATEGORY_CODE && debtLinkId) ? debtLinkId : null,
      amount, notes,
    };
    addTransaction(tx);
    document.getElementById("txNotes").value = "";
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
    ensureDraftBudget();
    state.budget = JSON.parse(JSON.stringify(draftBudget));
    saveState();
    const spent = renderBudgetMonitoring();
    renderBudgetChart(spent);
    renderTxFormOptions();
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
   AUTH — registration, login, email verification, session, per-user data
   isolation. Everything is client-side (this is a static site with no
   backend), so accounts live in localStorage on this browser/device only.
   See the README for the honest security caveats and the optional EmailJS
   setup for sending a real verification email.
   ========================================================================== */
const USERS_KEY = "equilife_users_v1";
const SESSION_KEY = "equilife_session_v1";

/* Fill these in with your own EmailJS account (emailjs.com, free tier)
   to send a real verification email. Leave empty to fall back to an
   on-screen "preview" of the code — the app still works fully either way. */
const EMAILJS_CONFIG = { publicKey: "", serviceId: "", templateId: "" };

let currentUser = null; /* { id, email, fullName, birthDate, birthPlace, passwordHash, verified, verifyCode, verifyCodeExpires, createdAt } */
let pendingVerifyUserId = null;

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch (e) { return {}; }
}
function saveUsers(users) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch (e) { /* storage unavailable */ }
}
function findUserByEmail(email) {
  const users = loadUsers();
  return Object.values(users).find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

/* SHA-256 via Web Crypto when available (any HTTPS site, incl. GitHub
   Pages); falls back to a simple non-cryptographic hash for local file://
   previews where crypto.subtle may be unavailable, so the app still runs. */
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
    /* No email service configured: static sites can't send real email on
       their own, so show the code directly as a clearly-labelled preview. */
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
  try { localStorage.setItem(SESSION_KEY, user.id); } catch (e) { /* ignore */ }

  document.getElementById("authScreen").classList.add("hidden");
  document.getElementById("appRoot").classList.remove("hidden");

  /* one-time convenience: if this browser has old pre-login data sitting
     under the legacy single-user key, offer it to the very first user who
     logs in on this device instead of silently discarding it. */
  try {
    const legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
    const alreadyHasOwnData = localStorage.getItem(dataKeyForUser(user.id));
    if (legacy && !alreadyHasOwnData) {
      localStorage.setItem(dataKeyForUser(user.id), legacy);
      localStorage.removeItem(STORAGE_KEY_LEGACY);
    }
  } catch (e) { /* ignore */ }

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
  try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
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
  try { sessionId = localStorage.getItem(SESSION_KEY); } catch (e) { /* ignore */ }
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
    const email = document.getElementById("loginEmail").value.trim();
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
    const email = document.getElementById("regEmail").value.trim();
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
