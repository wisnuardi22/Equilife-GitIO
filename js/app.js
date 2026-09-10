/* ==========================================================================
   Equilife — application logic (Permanent Multi-User & Monthly Budget Filter)
   ========================================================================== */

const T = {
  ID: {
    tagline: "Pencatatan Keuangan Pribadi",
    nav_overview: "Overview", nav_transaksi: "Transaksi", nav_anggaran: "Anggaran", nav_analisis: "Analisis",
    page_sub_overview: "Ringkasan saldo, liability, dan aktivitas keuangan kamu",
    page_sub_transaksi: "Kelola transaksi, utang, investasi, dan kategori",
    page_sub_anggaran: "Atur target dan pantau realisasi anggaran bulanan",
    page_sub_analisis: "Pahami pola pengeluaran dan kesehatan keuangan kamu",
    total_balance: "TOTAL SALDO REKENING",
    hide_balance: "Sembunyikan", show_balance: "Tampilkan",
    add_account: "+ Tambah rekening baru",
    acc_name: "Nama Rekening / Dompet Baru",
    initial_bal: "Saldo Awal (Rp)",
    save: "Simpan", cancel: "Batal", other: "Lainnya",
    income_month: "PEMASUKAN", expense_month: "PENGELUARAN", surplus_month: "SISA / SURPLUS",
    recent_tx: "Transaksi Terakhir", see_all: "Lihat semua →",
    add_tx_title: "Tambah Transaksi", add_tx_desc: "Catat pemasukan, pengeluaran, atau transfer",
    expense: "Pengeluaran", income: "Pemasukan", transfer: "Transfer",
    date: "Tanggal", acc_from: "Sumber Rekening", acc_to: "Rekening Tujuan",
    from_acc: "Dari Rekening", to_acc: "Ke Rekening",
    category: "Kategori Pos Pengeluaran",
    amount: "Nominal Transaksi (Rp)", notes: "Keterangan",
    tx_history: "Riwayat Transaksi",
    tx_count: (n) => `${n} transaksi`,
    sec_tx: "Transaksi", sec_debt: "Utang & Cicilan", sec_invest: "Investasi", sec_category: "Kelola Kategori",
    setting_title: "Target Anggaran & Perhitungan Otomatis",
    setting_desc: "Ubah nominal (Rp) atau persentase (%) untuk bulan terpilih.",
    code: "Kode", target_rp: "Target (Rp)", target_pct: "Target (%)",
    total_all: "TOTAL KESELURUHAN", save_setting: "Simpan Perubahan Target Bulan Ini",
    budget_vs_act: "Monitoring Anggaran", budget_vs_act_desc: "Budget vs Realisasi bulan",
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
    no_tx: "Belum ada transaksi.",
    no_data_chart: "Belum ada data untuk ditampilkan.",
    income_info: (v) => `Total pemasukan bulan ini: <strong>${v}</strong>`,
    no_income_warn: "Belum ada pemasukan tercatat pada bulan ini.",
    total_ok: "Total alokasi persentase sudah 100% — sempurna.",
    total_warn: (p) => `Total alokasi persentase saat ini ${p}% — idealnya mencapai 100%.`,
    reset_data: "Reset data akun",
    reset_confirm: "Ini akan menghapus seluruh data pada akun ini secara permanen. Lanjutkan?",
    delete_confirm: "Hapus transaksi ini? Saldo rekening akan dikembalikan.",
    delete_debt_confirm: "Hapus data utang ini?",
    delete_cat_confirm: "Hapus kategori ini?",
    saved_ok: "Tersimpan ✓",
    konsumtif: "Konsumtif", nonkonsumtif: "Non-Konsumtif",
    liability_title: "Liability (Utang)", liability_desc: "Ringkasan pinjaman dan bunga berjalan",
    liab_total_loan: "Total Pokok Pinjaman Aktif", liab_total_interest: "Total Bunga Berjalan",
    no_debt: "Tidak ada utang aktif pada periode ini.",
    debt_form_title: "Tambah Utang / Pinjaman", debt_form_desc: "Kewajiban, admin, dan bunga terhitung otomatis",
    debt_source: "Utang Dimana", debt_start: "Tanggal Mulai",
    debt_kewajiban: "Kewajiban (Pokok Pinjaman Awal)", debt_admin: "Admin (Biaya Admin)",
    debt_diterima: "Utang yang Diterima", debt_jangka: "Jangka Waktu (Bulan)",
    debt_tagihan: "Tagihan per Bulan", debt_bunga_nominal: "Total Nominal Bunga (otomatis)",
    debt_bunga_persen: "Persentase Bunga Total (otomatis)", debt_save: "Simpan Utang",
    debt_list_title: "Daftar Utang", debt_count: (n) => `${n} utang tercatat`,
    debt_aktif: "Aktif", debt_lunas: "Lunas", mark_paid: "Tandai Lunas", mark_active: "Tandai Aktif",
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
    cat_title: "Kelola Kategori / Akun", cat_desc: "Ketik nama akun — sistem menyarankan jenis dan kode otomatis.",
    cat_name: "Nama Akun / Kategori", cat_jenis: "Jenis (saran otomatis)", cat_code: "Kode (saran otomatis)",
    cat_konsumtif_type: "Tipe (khusus Beban)", cat_add: "Tambah Kategori", cat_update: "Simpan Perubahan",
    cat_list_title: "Daftar Kategori / Akun",
    jenis_harta: "Harta", jenis_utang: "Utang", jenis_modal: "Modal", jenis_pendapatan: "Pendapatan", jenis_beban: "Beban",
    edit: "Edit", delete: "Hapus",
    cat_name_required: "Nama kategori tidak boleh kosong.",
    cat_code_exists: "Kode ini sudah dipakai kategori lain.",
    extra_indicators_title: "Indikator Kesehatan Keuangan",
    extra_indicators_desc: "Kemampuan bayar utang dan alokasi investasi",
    dsr_title: "Rasio Cicilan terhadap Pemasukan (DSR)",
    dsr_note: "Total tagihan bulanan utang aktif dibagi rata-rata pemasukan bulanan.",
    dsr_sehat: "Sehat", dsr_waspada: "Waspada", dsr_berisiko: "Berisiko",
    invest_realized_title: "Laba/Rugi Investasi Terealisasi",
    invest_realized_note: "Total selisih nominal diterima dan modal.",
    invest_ratio_title: "Porsi Investasi dari Total Aset",
    invest_ratio_note: "Total modal investasi aktif dibanding total aset.",
    invest_low: "Rendah", invest_moderate: "Moderat", invest_aggressive: "Agresif",
    pay_method: "Metode Pembayaran",
    pay_method_acc: "Rekening / Dompet",
    pay_method_paylater: "Paylater (Hubungkan ke Utang)",
    tx_debt_link: "Pilih Akun Utang / Paylater",
    auth_login_tab: "Masuk", auth_register_tab: "Daftar",
    auth_email: "Email", auth_password: "Kata Sandi", auth_login_btn: "Masuk",
    auth_fullname: "Nama Lengkap", auth_birthdate: "Tanggal Lahir", auth_birthplace: "Kota Kelahiran",
    auth_password_hint: "Minimal 6 karakter", auth_register_btn: "Daftar",
    auth_verify_code: "Kode Verifikasi (6 digit)", auth_verify_btn: "Verifikasi & Masuk",
    auth_resend: "Kirim ulang kode", auth_disclaimer: "Data disimpan aman secara permanen per akun.",
    logout: "Keluar", export_excel: "⬇ Export Excel", export_json: "⬇ Export JSON"
  },
  EN: {
    tagline: "Personal Financial Records",
    nav_overview: "Overview", nav_transaksi: "Transactions", nav_anggaran: "Budget", nav_analisis: "Analysis",
    page_sub_overview: "A summary of balances, liabilities, and recent activity",
    page_sub_transaksi: "Manage transactions, debt, investments, and categories",
    page_sub_anggaran: "Set targets and monitor monthly budget realization",
    page_sub_analisis: "Understand your spending pattern and financial health",
    total_balance: "TOTAL ACCOUNT BALANCE",
    hide_balance: "Hide", show_balance: "Show",
    add_account: "+ Add new account",
    acc_name: "New Account / Wallet Name",
    initial_bal: "Initial Balance (Rp)",
    save: "Save", cancel: "Cancel", other: "Other",
    income_month: "INCOME", expense_month: "EXPENSE", surplus_month: "REMAINING / SURPLUS",
    recent_tx: "Recent Transactions", see_all: "See all →",
    add_tx_title: "Add Transaction", add_tx_desc: "Record income, expense, or a transfer",
    expense: "Expense", income: "Income", transfer: "Transfer",
    date: "Date", acc_from: "Source Account", acc_to: "Destination Account",
    from_acc: "From Account", to_acc: "To Account",
    category: "Expense Category",
    amount: "Transaction Amount (Rp)", notes: "Notes",
    tx_history: "Transaction History",
    tx_count: (n) => `${n} transactions`,
    sec_tx: "Transactions", sec_debt: "Debt & Loans", sec_invest: "Investments", sec_category: "Manage Categories",
    setting_title: "Budget Target & Live Calculation",
    setting_desc: "Change the amount (Rp) or percentage (%) for selected month.",
    code: "Code", target_rp: "Target (Rp)", target_pct: "Target (%)",
    total_all: "OVERALL TOTAL", save_setting: "Save Monthly Target Changes",
    budget_vs_act: "Budget Monitoring", budget_vs_act_desc: "Budget vs actual for month",
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
    no_tx: "No transactions yet.",
    no_data_chart: "Nothing to display yet.",
    income_info: (v) => `Total recorded income this month: <strong>${v}</strong>`,
    no_income_warn: "No income recorded for this month.",
    total_ok: "Total allocation is 100% — perfect.",
    total_warn: (p) => `Current allocation total is ${p}% — ideally it should reach 100%.`,
    reset_data: "Reset account data",
    reset_confirm: "This will erase all data on this account permanently. Continue?",
    delete_confirm: "Delete this transaction? The account balance will be restored.",
    delete_debt_confirm: "Delete this debt record?",
    delete_cat_confirm: "Delete this category?",
    saved_ok: "Saved ✓",
    konsumtif: "Lifestyle", nonkonsumtif: "Essential",
    liability_title: "Liability (Debt)", liability_desc: "A summary of running loans and interest",
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
    cat_title: "Manage Categories / Accounts", cat_desc: "Type an account name — the system suggests a type and code automatically.",
    cat_name: "Account / Category Name", cat_jenis: "Type (auto-suggested)", cat_code: "Code (auto-suggested)",
    cat_konsumtif_type: "Type (Expense only)", cat_add: "Add Category", cat_update: "Save Changes",
    cat_list_title: "Category / Account List",
    jenis_harta: "Asset", jenis_utang: "Liability", jenis_modal: "Equity", jenis_pendapatan: "Income", jenis_beban: "Expense",
    edit: "Edit", delete: "Delete",
    cat_name_required: "Category name cannot be empty.",
    cat_code_exists: "This code is already used by another category.",
    extra_indicators_title: "Financial Health Indicators",
    extra_indicators_desc: "Debt repayment capacity and investment allocation",
    dsr_title: "Debt Service Ratio (DSR)",
    dsr_note: "Total monthly installments divided by average monthly income.",
    dsr_sehat: "Healthy", dsr_waspada: "Caution", dsr_berisiko: "Risky",
    invest_realized_title: "Realized Investment Profit/Loss",
    invest_realized_note: "Total difference between amount received and cost.",
    invest_ratio_title: "Investment Share of Total Assets",
    invest_ratio_note: "Total active investment cost compared to total assets.",
    invest_low: "Low", invest_moderate: "Moderate", invest_aggressive: "Aggressive",
    pay_method: "Payment Method",
    pay_method_acc: "Account / Wallet",
    pay_method_paylater: "Paylater (Link to Debt)",
    tx_debt_link: "Select Debt / Paylater Account",
    auth_login_tab: "Login", auth_register_tab: "Register",
    auth_email: "Email", auth_password: "Password", auth_login_btn: "Login",
    auth_fullname: "Full Name", auth_birthdate: "Birth Date", auth_birthplace: "Birth Place",
    auth_password_hint: "At least 6 characters", auth_register_btn: "Register",
    auth_verify_code: "Verification Code (6 digits)", auth_verify_btn: "Verify & Login",
    auth_resend: "Resend code", auth_disclaimer: "Data is permanently stored per user account.",
    logout: "Logout", export_excel: "⬇ Export Excel", export_json: "⬇ Export JSON"
  }
};

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

let state = null;
let draftBudget = null;
let currentView = "overview";
let currentTxSection = "tx";

function getActiveStorageKey() {
  const loggedEmail = localStorage.getItem("equilife_logged_in_email") || "default_user";
  return `equilife_perm_data_${loggedEmail}`;
}

function buildSeedState() {
  const accounts = [
    { id: "ACC-01", name: "Bank BRI", initial: 0, balance: 0 },
    { id: "ACC-02", name: "Bank Mandiri", initial: 0, balance: 0 },
    { id: "ACC-03", name: "ShopeePay", initial: 0, balance: 0 },
    { id: "ACC-04", name: "GoPay", initial: 0, balance: 0 },
    { id: "ACC-05", name: "Bank Jago", initial: 0, balance: 0 },
  ];

  const defaultCategories = [
    { code: "5101", name: "Zakat & Sedekah", type: "Non-Konsumtif" },
    { code: "5102", name: "Transfer Orang Tua", type: "Non-Konsumtif" },
    { code: "5103", name: "Sewa Kost", type: "Non-Konsumtif" },
    { code: "5104", name: "Bayar Utang / Cicilan", type: "Non-Konsumtif" },
    { code: "5105", name: "Beban Pasangan / Pacar", type: "Konsumtif" },
    { code: "5106", name: "Beban Hiburan & Rekreasi", type: "Konsumtif" },
    { code: "5107", name: "Makan & Minum Harian", type: "Konsumtif" },
    { code: "5108", name: "Utilitas (Listrik/Internet)", type: "Non-Konsumtif" },
    { code: "5109", name: "Transportasi & Bensin", type: "Non-Konsumtif" },
    { code: "1201", name: "Tabungan / Investasi", type: "Non-Konsumtif" },
  ];

  return {
    lang: "ID",
    showBalance: true,
    sidebarCollapsed: false,
    currentUser: localStorage.getItem("equilife_logged_in_user") || "Pengguna",
    accounts, 
    categories: defaultCategories,
    monthlyBudgets: {}, // Format: { "YYYY-MM": [ {code, targetPercent, targetBudget} ] }
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

function migrateState(s) {
  if (s.sidebarCollapsed === undefined) s.sidebarCollapsed = false;
  if (!s.debts) s.debts = [];
  if (!s.investments) s.investments = [];
  if (!s.chartOfAccounts) s.chartOfAccounts = [];
  if (!s.monthlyBudgets) s.monthlyBudgets = {};
  if (!s.categories && s.budget) s.categories = s.budget;
  if (!s.categories) s.categories = [];
  
  if (s.transactions) {
    s.transactions.forEach(t => {
      if (!t.payMethod) t.payMethod = "account";
      if (!t.debtId) t.debtId = null;
    });
  }
  return s;
}

function loadState() {
  const storageKey = getActiveStorageKey();
  try {
    const raw = localStorage.getItem(storageKey) || localStorage.getItem("equilife_data_v3");
    if (raw) {
      const parsed = migrateState(JSON.parse(raw));
      return parsed;
    }
  } catch (e) { /* ignore */ }
  const seeded = buildSeedState();
  persist(seeded);
  return seeded;
}

function persist(s) {
  try { localStorage.setItem(getActiveStorageKey(), JSON.stringify(s)); } catch (e) { /* ignore */ }
}
function saveState() { persist(state); }

function findAccount(s, name) { return s.accounts.find(a => a.name === name); }

function applyTxEffect(s, tx, sign) {
  const amt = tx.amount * sign;
  if (tx.type === "Pengeluaran") {
    if (tx.payMethod === "paylater" && tx.debtId) {
      const debt = s.debts.find(d => d.id === tx.debtId);
      if (debt) {
        debt.kewajiban += amt;
      }
    } else {
      const a = findAccount(s, tx.accountFrom); 
      if (a) a.balance -= amt;
    }
  } else if (tx.type === "Pemasukan") {
    const a = findAccount(s, tx.accountTo); 
    if (a) a.balance += amt;
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

function tr() { return T[state.lang]; }

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
  document.getElementById("langToggle").textContent = state.lang === "ID" ? "ID / EN" : "EN / ID";
  updateBalanceToggleLabel();
  updatePageHeader();
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
  if (name === "debt") renderDebtSection();
  if (name === "invest") renderInvestSection();
  if (name === "category") renderCategorySection();
}

/* OVERVIEW & TRANSACTIONS */
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

function populateOverviewFilters() {
  const mSel = document.getElementById("ovMonth");
  const ySel = document.getElementById("ovYear");
  if (!mSel.dataset.bound) {
    const monthNamesID = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const monthNamesEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const names = state.lang === "ID" ? monthNamesID : monthNamesEN;
    const now = new Date();
    mSel.innerHTML = names.map((n, i) => `<option value="${i + 1}">${n}</option>`).join("");
    mSel.value = now.getMonth() + 1;
    const years = new Set([now.getFullYear()]);
    state.transactions.forEach(t => years.add(parseISO(t.date).getFullYear()));
    ySel.innerHTML = [...years].sort((a, b) => a - b).map(y => `<option value="${y}">${y}</option>`).join("");
    ySel.value = now.getFullYear();
    mSel.dataset.bound = "1";
    mSel.addEventListener("change", renderOverview);
    ySel.addEventListener("change", renderOverview);
  }
}

function renderOverview() {
  const dict = tr();
  populateOverviewFilters();
  
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
    invGroups.length ? dict.invest_summary(invGroups.length, fmtRp(investTotal)) : "";

  const selMonth = Number(document.getElementById("ovMonth").value) || (new Date().getMonth() + 1);
  const selYear = Number(document.getElementById("ovYear").value) || new Date().getFullYear();

  const periodTx = state.transactions.filter(t => {
    const d = parseISO(t.date);
    return d.getFullYear() === selYear && (d.getMonth() + 1) === selMonth;
  });
  const income = periodTx.filter(t => t.type === "Pemasukan").reduce((s, t) => s + t.amount, 0);
  const expense = periodTx.filter(t => t.type === "Pengeluaran").reduce((s, t) => s + t.amount, 0);
  document.getElementById("sumIncome").textContent = fmtRp(income);
  document.getElementById("sumExpense").textContent = fmtRp(expense);
  document.getElementById("sumSurplus").textContent = fmtRp(income - expense);

  renderLiabilityPanel();

  const recent = [...state.transactions].sort(sortTxDesc).slice(0, 5);
  const list = document.getElementById("recentTxList");
  list.innerHTML = "";
  if (recent.length === 0) {
    list.innerHTML = `<p class="muted small">${dict.no_tx}</p>`;
  } else {
    recent.forEach(tx => list.appendChild(renderTxRow(tx, false)));
  }
}

function debtStatus(debt) {
  if (debt.manualStatus) return debt.manualStatus;
  const end = addMonthsToISO(debt.startDate, debt.jangkaWaktu);
  return todayISO() <= end ? "Aktif" : "Lunas";
}

function populateMonthYearSelect(monthSel, yearSel) {
  const monthNamesID = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const monthNamesEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const names = state.lang === "ID" ? monthNamesID : monthNamesEN;
  const now = new Date();
  const prevMonth = monthSel.value ? Number(monthSel.value) : now.getMonth() + 1;
  const prevYear = yearSel.value ? Number(yearSel.value) : now.getFullYear();
  monthSel.innerHTML = names.map((n, i) => `<option value="${i + 1}">${n}</option>`).join("");
  monthSel.value = prevMonth;
  const years = new Set([now.getFullYear()]);
  state.debts.forEach(d => years.add(parseISO(d.startDate).getFullYear()));
  const yearList = [...years].sort((a, b) => a - b);
  yearSel.innerHTML = yearList.map(y => `<option value="${y}">${y}</option>`).join("");
  yearSel.value = prevYear;
}

function renderLiabilityPanel() {
  const dict = tr();
  const sourceSel = document.getElementById("liabSource");
  const monthSel = document.getElementById("liabMonth");
  const yearSel = document.getElementById("liabYear");

  if (!monthSel.dataset.bound) {
    populateMonthYearSelect(monthSel, yearSel);
    monthSel.dataset.bound = "1";
  }

  const sources = ["Semua", ...new Set(state.debts.map(d => d.source))];
  const curSource = sourceSel.value || "Semua";
  sourceSel.innerHTML = sources.map(s => `<option value="${s}">${s === "Semua" ? (state.lang === 'ID' ? 'Semua Sumber' : 'All Sources') : s}</option>`).join("");
  sourceSel.value = curSource;

  if (!sourceSel.dataset.bound) {
    sourceSel.addEventListener("change", renderLiabilityPanel);
    monthSel.addEventListener("change", renderLiabilityPanel);
    yearSel.addEventListener("change", renderLiabilityPanel);
    sourceSel.dataset.bound = "1";
  }

  const month = Number(monthSel.value) || (new Date().getMonth() + 1);
  const year = Number(yearSel.value) || new Date().getFullYear();
  const periodStart = `${year}-${String(month).padStart(2, "0")}-01`;

  let debtsInPeriod = state.debts.filter(d => {
    const end = addMonthsToISO(d.startDate, d.jangkaWaktu);
    return d.startDate <= periodStart && periodStart <= end;
  });

  if (sourceSel.value && sourceSel.value !== "Semua") {
    debtsInPeriod = debtsInPeriod.filter(d => d.source === sourceSel.value);
  }

  const totalLoan = debtsInPeriod.reduce((s, d) => s + d.kewajiban, 0);
  const totalInterest = debtsInPeriod.reduce((s, d) => s + d.totalBunga, 0);

  document.getElementById("liabSummaryGrid").innerHTML = `
    <div class="summary-card">
      <div class="eyebrow">${dict.liab_total_loan}</div>
      <div class="summary-value negative">${fmtRp(totalLoan)}</div>
    </div>
    <div class="summary-card">
      <div class="eyebrow">${dict.liab_total_interest}</div>
      <div class="summary-value" style="color:var(--warning)">${fmtRp(totalInterest)}</div>
    </div>`;

  const list = document.getElementById("liabList");
  list.innerHTML = "";
  if (debtsInPeriod.length === 0) {
    list.innerHTML = `<p class="muted small">${dict.no_debt}</p>`;
  } else {
    debtsInPeriod.forEach(d => {
      const status = debtStatus(d);
      const row = document.createElement("div");
      row.className = "tx-row";
      row.innerHTML = `
        <div class="tx-left">
          <span class="tx-dot out"></span>
          <div class="tx-info">
            <div class="tx-title">${escapeHtml(d.source)} ${d.notes ? "· " + escapeHtml(d.notes) : ""}</div>
            <div class="tx-meta">${dict.debt_tagihan}: ${fmtRp(d.tagihanPerBulan)}/bln · ${d.jangkaWaktu} bln</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="tx-amount out">${fmtRp(d.kewajiban)}</span>
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
  if (tx.type === "Pemasukan") {
    acc = tx.accountTo;
  } else if (tx.type === "Pengeluaran") {
    acc = tx.payMethod === "paylater" ? `Paylater (${tx.debtSource || 'Utang'})` : tx.accountFrom;
  } else {
    acc = `${tx.accountFrom} → ${tx.accountTo}`;
  }

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
  const accFrom = document.getElementById("txAccFrom");
  const accTo = document.getElementById("txAccTo");
  const cat = document.getElementById("txCategory");
  const debtLink = document.getElementById("txDebtLink");

  [accFrom, accTo].forEach(sel => {
    const prev = sel.value;
    sel.innerHTML = state.accounts.map(a => `<option value="${escapeHtml(a.name)}">${escapeHtml(a.name)}</option>`).join("");
    if (prev) sel.value = prev;
  });
  if (accTo.selectedIndex === 0 && state.accounts.length > 1) accTo.selectedIndex = 1;
  cat.innerHTML = state.categories.map(b => `<option value="${b.code}">${b.code} — ${escapeHtml(b.name)}</option>`).join("");

  const activeDebts = state.debts.filter(d => debtStatus(d) === "Aktif");
  debtLink.innerHTML = activeDebts.length 
    ? activeDebts.map(d => `<option value="${d.id}">${escapeHtml(d.source)} — ${escapeHtml(d.notes || 'Utang Aktif')} (${fmtRp(d.kewajiban)})</option>`).join("")
    : `<option value="">(Tidak ada utang aktif)</option>`;
}

function applyTxTypeUI() {
  const dict = tr();
  document.querySelectorAll("#txTypeGroup .pill").forEach(p => p.classList.toggle("active", p.dataset.type === txType));
  
  const fieldAccFrom = document.getElementById("fieldAccFrom");
  const fieldAccTo = document.getElementById("fieldAccTo");
  const fieldCategory = document.getElementById("fieldCategory");
  const fieldPayMethod = document.getElementById("fieldPayMethod");
  const fieldDebtLink = document.getElementById("fieldDebtLink");

  fieldAccFrom.classList.remove("hidden");
  fieldAccTo.classList.add("hidden");
  fieldCategory.classList.add("hidden");
  fieldPayMethod.classList.add("hidden");
  fieldDebtLink.classList.add("hidden");

  if (txType === "Pengeluaran") {
    fieldCategory.classList.remove("hidden");
    fieldPayMethod.classList.remove("hidden");
    const payMethod = document.getElementById("txPayMethod").value;
    if (payMethod === "paylater") {
      fieldAccFrom.classList.add("hidden");
      fieldDebtLink.classList.remove("hidden");
    }
  } else if (txType === "Pemasukan") {
    fieldAccFrom.classList.add("hidden"); 
    fieldAccTo.classList.remove("hidden");
  } else {
    fieldAccTo.classList.remove("hidden");
  }
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

/* DEBT & INVESTMENTS */
function calcDebtInterest(kewajiban, tagihanPerBulan, jangkaWaktu) {
  const totalBunga = (tagihanPerBulan * jangkaWaktu) - kewajiban;
  const persenBunga = kewajiban > 0 ? (totalBunga / kewajiban) * 100 : 0;
  return { totalBunga, persenBunga };
}
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
    const row = document.createElement("div");
    row.className = "tx-row";
    row.innerHTML = `
      <div class="tx-left">
        <span class="tx-dot out"></span>
        <div class="tx-info">
          <div class="tx-title">${escapeHtml(d.source)} ${d.notes ? "· " + escapeHtml(d.notes) : ""}</div>
          <div class="tx-meta">${fmtDateDisplay(d.startDate)} · ${fmtRp(d.tagihanPerBulan)}/bln · ${d.jangkaWaktu}bln</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="tx-amount out">${fmtRp(d.kewajiban)}</span>
        <span class="status-tag ${status === 'Aktif' ? 'aktif' : 'lunas'}">${status === 'Aktif' ? dict.debt_aktif : dict.debt_lunas}</span>
        <span class="tx-actions">
          <button class="icon-btn toggle-debt-status" data-id="${d.id}">${status === 'Aktif' ? '✓' : '↺'}</button>
          <button class="icon-btn danger del-debt" data-id="${d.id}">✕</button>
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
  }));
  list.querySelectorAll(".del-debt").forEach(b => b.addEventListener("click", () => {
    if (confirm(dict.delete_debt_confirm)) {
      state.debts = state.debts.filter(d => d.id !== b.dataset.id);
      saveState();
      renderDebtSection();
      renderOverview();
    }
  }));
}

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
      rightHtml = `<span class="pl-value ${profit ? 'profit' : 'loss'}" style="font-weight:600;">${profit ? '+' : ''}${fmtRp(inv.profitLoss)}</span><span class="status-tag terjual">Terjual</span>`;
    } else {
      rightHtml = `<span class="tx-amount out">${fmtRp(inv.modal)}</span><span class="status-tag aktif">Aktif</span>`;
    }
    row.innerHTML = `
      <div class="tx-left">
        <span class="tx-dot ${inv.status === 'Terjual' ? (inv.profitLoss >= 0 ? 'in' : 'out') : 'transfer'}"></span>
        <div class="tx-info">
          <div class="tx-title">${escapeHtml(inv.kode)} <span class="muted small">(${escapeHtml(inv.jenis)})</span></div>
          <div class="tx-meta">${fmtDateDisplay(inv.tanggalBeli)} · ${fmtRp(inv.modal)}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        ${rightHtml}
        <span class="tx-actions"><button class="icon-btn danger del-invest" data-id="${inv.id}">✕</button></span>
      </div>`;
    list.appendChild(row);
  });
  list.querySelectorAll(".del-invest").forEach(b => b.addEventListener("click", () => {
    if (confirm(dict.delete_confirm)) {
      state.investments = state.investments.filter(i => i.id !== b.dataset.id);
      saveState();
      renderInvestSection();
      renderOverview();
    }
  }));
}

let catManualOverride = false;
let editingCatCode = null;
function nextCategoryCode(jenis) {
  const p = JENIS_PREFIX[jenis];
  const existing = [...state.categories.map(b => b.code), ...state.chartOfAccounts.map(c => c.code)].filter(c => c && c.startsWith(p)).map(c => parseInt(c, 10)).filter(n => !isNaN(n));
  const base = parseInt(p + "000", 10);
  const maxN = existing.length ? Math.max(...existing, base) : base;
  return String(maxN + 1);
}
function applyCatFormAutoSuggest() {
  if (catManualOverride) return;
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
  const bebanRows = state.categories.map(b => ({ code: b.code, name: b.name, jenis: "Beban", konsumtif: b.type, source: "budget" }));
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
        <button class="icon-btn edit-cat" data-code="${r.code}" data-source="${r.source}">✎</button>
        <button class="icon-btn danger del-cat" data-code="${r.code}" data-source="${r.source}">✕</button>
      </td>`;
    tbody.appendChild(tr_);
  });
  tbody.querySelectorAll(".edit-cat").forEach(b => b.addEventListener("click", () => startEditCategory(b.dataset.code, b.dataset.source)));
  tbody.querySelectorAll(".del-cat").forEach(b => b.addEventListener("click", () => deleteCategory(b.dataset.code, b.dataset.source)));
}
function startEditCategory(code, source) {
  catManualOverride = true;
  editingCatCode = code;
  document.getElementById("catCancelEdit").classList.remove("hidden");
  document.getElementById("catSubmitBtn").textContent = tr().cat_update;
  if (source === "budget") {
    const row = state.categories.find(b => b.code === code);
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
  if (source === "budget") state.categories = state.categories.filter(b => b.code !== code);
  else state.chartOfAccounts = state.chartOfAccounts.filter(c => c.code !== code);
  saveState();
  draftBudget = null;
  renderCategorySection();
  renderEverything();
}

/* MONTHLY BUDGET & FILTER LOGIC */
function populateBudgetMonthYear() {
  const mSel = document.getElementById("bgMonth");
  const ySel = document.getElementById("bgYear");
  if (!mSel.dataset.bound) {
    const monthNamesID = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const monthNamesEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const names = state.lang === "ID" ? monthNamesID : monthNamesEN;
    const now = new Date();
    mSel.innerHTML = names.map((n, i) => `<option value="${i + 1}">${n}</option>`).join("");
    mSel.value = now.getMonth() + 1;
    const years = new Set([now.getFullYear()]);
    state.transactions.forEach(t => years.add(parseISO(t.date).getFullYear()));
    ySel.innerHTML = [...years].sort((a, b) => a - b).map(y => `<option value="${y}">${y}</option>`).join("");
    ySel.value = now.getFullYear();
    mSel.dataset.bound = "1";
    mSel.addEventListener("change", renderAnggaran);
    ySel.addEventListener("change", renderAnggaran);
  }
}

function getSelectedBudgetPeriodKey() {
  const m = String(document.getElementById("bgMonth").value || (new Date().getMonth() + 1)).padStart(2, "0");
  const y = String(document.getElementById("bgYear").value || new Date().getFullYear());
  return `${y}-${m}`;
}

function getActiveMonthBudgetList() {
  const periodKey = getSelectedBudgetPeriodKey();
  if (!state.monthlyBudgets[periodKey]) {
    // Inisialisasi default dari master categories jika belum ada untuk bulan tersebut
    state.monthlyBudgets[periodKey] = state.categories.map(c => ({
      code: c.code,
      name: c.name,
      type: c.type,
      targetPercent: 0,
      targetBudget: 0
    }));
  }
  return state.monthlyBudgets[periodKey];
}

function totalIncomeForMonth(year, month) {
  return state.transactions
    .filter(t => {
      const d = parseISO(t.date);
      return t.type === "Pemasukan" && d.getFullYear() === year && (d.getMonth() + 1) === month;
    })
    .reduce((s, t) => s + t.amount, 0);
}

function ensureDraftBudget() {
  const currentList = getActiveMonthBudgetList();
  if (!draftBudget) {
    draftBudget = JSON.parse(JSON.stringify(currentList));
  }
}

function renderBudgetSettings() {
  const dict = tr();
  populateBudgetMonthYear();
  ensureDraftBudget();

  const month = Number(document.getElementById("bgMonth").value);
  const year = Number(document.getElementById("bgYear").value);
  const income = totalIncomeForMonth(year, month);

  const infoBox = document.getElementById("incomeInfo");
  if (income > 0) {
    infoBox.className = "callout ok";
    infoBox.innerHTML = dict.income_info(fmtRp(income));
  } else {
    infoBox.className = "callout warn";
    infoBox.textContent = dict.no_income_warn;
  }

  const rowsWrap = document.getElementById("budgetSettingRows");
  rowsWrap.innerHTML = "";

  draftBudget.forEach((row, idx) => {
    const rowEl = document.createElement("div");
    rowEl.className = "budget-grid budget-row";
    rowEl.innerHTML = `
      <span class="cat-code">${row.code}</span>
      <span class="cat-name">${escapeHtml(row.name)}</span>
      <input type="text" inputmode="numeric" id="rp-${idx}" value="${Math.round(row.targetBudget || 0).toLocaleString('id-ID')}">
      <input type="number" min="0" step="0.1" id="pct-${idx}" value="${(row.targetPercent || 0).toFixed(2)}">
    `;
    rowsWrap.appendChild(rowEl);

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
  });

  updateBudgetTotals();
}

function updateBudgetTotals() {
  const dict = tr();
  const totalRp = draftBudget.reduce((s, r) => s + (r.targetBudget || 0), 0);
  const totalPct = draftBudget.reduce((s, r) => s + (r.targetPercent || 0), 0);
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
  const month = Number(document.getElementById("bgMonth").value);
  const year = Number(document.getElementById("bgYear").value);

  document.getElementById("budgetVsActSubtitle").textContent = `${dict.budget_vs_act_desc} ${month}/${year}`;

  const spentByCategory = {};
  state.transactions.filter(t => {
    const d = parseISO(t.date);
    return t.type === "Pengeluaran" && d.getFullYear() === year && (d.getMonth() + 1) === month;
  }).forEach(t => {
    spentByCategory[t.categoryCode] = (spentByCategory[t.categoryCode] || 0) + t.amount;
  });

  const activeBudgetList = getActiveMonthBudgetList();
  const tbody = document.getElementById("budgetTableBody");
  tbody.innerHTML = "";

  activeBudgetList.forEach(row => {
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

  return { spentByCategory, activeBudgetList };
}

function renderBudgetChart(spentByCategory, activeBudgetList) {
  const chart = document.getElementById("budgetChart");
  chart.innerHTML = "";

  const maxVal = niceCeil(Math.max(...activeBudgetList.map(r => Math.max(r.targetBudget, spentByCategory[r.code] || 0)), 1));
  const gridWrap = document.createElement("div");
  gridWrap.className = "gridlines";
  for (let i = 0; i <= 4; i++) {
    const v = (maxVal / 4) * i;
    const line = document.createElement("div");
    line.className = "gridline";
    line.style.bottom = `${(v / maxVal) * 100}%`;
    line.innerHTML = `<span>${abbrRp(v)}</span>`;
    gridWrap.appendChild(line);
  }
  chart.appendChild(gridWrap);

  activeBudgetList.forEach(row => {
    const actual = spentByCategory[row.code] || 0;
    const col = document.createElement("div");
    col.className = "chart-col";
    const tH = maxVal > 0 ? (row.targetBudget / maxVal) * 100 : 0;
    const aH = maxVal > 0 ? (actual / maxVal) * 100 : 0;
    col.innerHTML = `
      <div class="chart-bars">
        <div class="chart-bar target" style="height:${tH}%"></div>
        <div class="chart-bar actual" style="height:${aH}%"></div>
      </div>
      <div class="chart-col-label">${row.code}</div>
    `;
    chart.appendChild(col);
  });
}

function renderAnggaran() {
  renderBudgetSettings();
  const { spentByCategory, activeBudgetList } = renderBudgetMonitoring();
  renderBudgetChart(spentByCategory, activeBudgetList);
}

let period = "monthly";
let selectedWeek = null;
function populateAnalysisMonthYear() {
  const mSel = document.getElementById("anMonth");
  const ySel = document.getElementById("anYear");
  if (!mSel.dataset.bound) {
    const monthNamesID = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const monthNamesEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const names = state.lang === "ID" ? monthNamesID : monthNamesEN;
    const now = new Date();
    mSel.innerHTML = names.map((n, i) => `<option value="${i + 1}">${n}</option>`).join("");
    mSel.value = now.getMonth() + 1;
    const years = new Set([now.getFullYear()]);
    state.transactions.forEach(t => years.add(parseISO(t.date).getFullYear()));
    ySel.innerHTML = [...years].sort((a, b) => a - b).map(y => `<option value="${y}">${y}</option>`).join("");
    ySel.value = now.getFullYear();
    mSel.dataset.bound = "1";
    mSel.addEventListener("change", renderAnalisis);
    ySel.addEventListener("change", renderAnalisis);
  }
}
function renderAnalisis() {
  const dict = tr();
  populateAnalysisMonthYear();
  const weeks = [...new Set(state.transactions.map(t => isoWeek(t.date)))].sort((a, b) => a - b);
  const weekSelect = document.getElementById("weekSelect");
  if (period === "weekly") {
    weekSelect.classList.remove("hidden");
    weekSelect.innerHTML = weeks.map(w => `<option value="${w}">${dict.week_label}${w}</option>`).join("");
    if (selectedWeek === null || !weeks.includes(selectedWeek)) selectedWeek = weeks[weeks.length - 1] || null;
    if (selectedWeek !== null) weekSelect.value = selectedWeek;
  } else {
    weekSelect.classList.add("hidden");
  }
  const anMonth = Number(document.getElementById("anMonth").value) || (new Date().getMonth() + 1);
  const anYear = Number(document.getElementById("anYear").value) || new Date().getFullYear();

  let dashTx = state.transactions.filter(t => {
    const d = parseISO(t.date);
    return d.getFullYear() === anYear && (d.getMonth() + 1) === anMonth && t.type === "Pengeluaran";
  });
  if (period === "weekly" && selectedWeek !== null) {
    dashTx = dashTx.filter(t => isoWeek(t.date) === selectedWeek);
  }
  const spentByCategory = {};
  dashTx.forEach(t => { spentByCategory[t.categoryCode] = (spentByCategory[t.categoryCode] || 0) + t.amount; });

  const activeBudgetList = getActiveMonthBudgetList();
  const konsumtifAmt = activeBudgetList.filter(b => b.type === "Konsumtif").reduce((s, b) => s + (spentByCategory[b.code] || 0), 0);
  const nonKonsumtifAmt = activeBudgetList.filter(b => b.type === "Non-Konsumtif").reduce((s, b) => s + (spentByCategory[b.code] || 0), 0);
  
  const periodIncomeTx = state.transactions.filter(t => {
    const d = parseISO(t.date);
    return d.getFullYear() === anYear && (d.getMonth() + 1) === anMonth && t.type === "Pemasukan";
  });
  const totalIncome = periodIncomeTx.reduce((s, t) => s + t.amount, 0);
  const ratio = totalIncome > 0 ? (konsumtifAmt / totalIncome) * 100 : 0;

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
      <div class="donut-legend-item"><span class="lbl"><span class="legend-dot" style="background:var(--consumptive)"></span>${dict.konsumtif}</span><span class="val">${fmtRp(konsumtifAmt)}</span></div>
      <div class="donut-legend-item"><span class="lbl"><span class="legend-dot" style="background:var(--non-consumptive)"></span>${dict.nonkonsumtif}</span><span class="val">${fmtRp(nonKonsumtifAmt)}</span></div>`;
  }

  document.getElementById("lifestylePct").textContent = ratio.toFixed(1) + "%";
  document.getElementById("lifestyleBar").style.width = Math.min(ratio, 100) + "%";
  const statusEl = document.getElementById("lifestyleStatus");
  let tier, cls;
  if (ratio < 20) { tier = dict.status_wise; cls = "ok"; }
  else if (ratio <= 35) { tier = dict.status_warning; cls = "warn"; }
  else { tier = dict.status_high; cls = "bad"; }
  statusEl.className = `status-pill ${cls}`;
  statusEl.textContent = tier;

  document.getElementById("lifestyleBreakdown").innerHTML = `
    <div class="kv-row"><span class="k">${dict.total_income_lbl}</span><span class="v">${fmtRp(totalIncome)}</span></div>
    <div class="kv-row"><span class="k">${dict.total_expense_lbl}</span><span class="v">${fmtRp(grandTotal)}</span></div>
    <div class="kv-row"><span class="k">${dict.konsumtif_expense_lbl}</span><span class="v">${fmtRp(konsumtifAmt)}</span></div>`;

  const rows = activeBudgetList.map(b => ({ ...b, actual: spentByCategory[b.code] || 0 })).filter(b => b.actual > 0).sort((a, b) => b.actual - a.actual);
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
        <div class="rank-top"><span class="rank-name"><span class="rank-badge ${letter}">${letter}</span>${escapeHtml(r.name)}</span><span class="rank-amount">${fmtRp(r.actual)}</span></div>
        <div class="rank-track"><div class="rank-fill ${letter}" style="width:${pct}%"></div></div>`;
      rankWrap.appendChild(el);
    });
  }
}

/* EXPORT & AUTH */
function exportToExcel() {
  if (typeof XLSX === "undefined") { alert("Library export Excel belum termuat."); return; }
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(state.accounts), "accounts");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(state.transactions), "transactions");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(state.categories), "budget_categories");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(state.debts), "debts");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(state.investments), "investments");
  XLSX.writeFile(wb, `equilife-export-${todayISO()}.xlsx`);
}
function exportToJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const dl = document.createElement('a');
  dl.setAttribute("href", dataStr);
  dl.setAttribute("download", `equilife_sync_${todayISO()}.json`);
  document.body.appendChild(dl);
  dl.click();
  dl.remove();
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

/* AUTHENTICATION LOGIC (Robust Mobile Fix) */
function getRegisteredUsers() {
  try { return JSON.parse(localStorage.getItem("equilife_users")) || []; } catch (e) { return []; }
}
function saveRegisteredUsers(users) {
  localStorage.setItem("equilife_users", JSON.stringify(users));
}

function initAuth() {
  const authScreen = document.getElementById("authScreen");
  const appRoot = document.getElementById("appRoot");

  const activeEmail = localStorage.getItem("equilife_logged_in_email");
  const activeUser = localStorage.getItem("equilife_logged_in_user");

  if (activeEmail && activeUser) {
    authScreen.classList.add("hidden");
    appRoot.classList.remove("hidden");
    document.getElementById("userCardName").textContent = activeUser;
    document.getElementById("userChip").textContent = activeUser.charAt(0).toUpperCase();
    startApp();
    return;
  }

  authScreen.classList.remove("hidden");
  appRoot.classList.add("hidden");

  document.querySelectorAll(".auth-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.authTab;
      document.getElementById("loginForm").classList.toggle("hidden", target !== "login");
      document.getElementById("registerForm").classList.toggle("hidden", target !== "register");
      document.getElementById("verifyForm").classList.add("hidden");
    });
  });

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const pass = document.getElementById("loginPassword").value;
    const errEl = document.getElementById("loginError");

    const users = getRegisteredUsers();
    const found = users.find(u => u.email.toLowerCase() === email && u.password === pass);

    if (found) {
      if (!found.verified) {
        errEl.textContent = "Akun belum diverifikasi.";
        errEl.classList.remove("hidden");
        return;
      }
      localStorage.setItem("equilife_logged_in_email", found.email);
      localStorage.setItem("equilife_logged_in_user", found.fullName);

      authScreen.classList.add("hidden");
      appRoot.classList.remove("hidden");
      document.getElementById("userCardName").textContent = found.fullName;
      document.getElementById("userChip").textContent = found.fullName.charAt(0).toUpperCase();
      startApp();
    } else {
      errEl.textContent = "Email atau kata sandi salah.";
      errEl.classList.remove("hidden");
    }
  });

  let pendingUser = null;
  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("regFullName").value.trim();
    const birthDate = document.getElementById("regBirthDate").value;
    const birthPlace = document.getElementById("regBirthPlace").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const errEl = document.getElementById("registerError");

    const users = getRegisteredUsers();
    if (users.some(u => u.email.toLowerCase() === email)) {
      errEl.textContent = "Email sudah terdaftar.";
      errEl.classList.remove("hidden");
      return;
    }

    const verificationCode = String(Math.floor(100000 + Math.random() * 900000));
    pendingUser = { fullName, birthDate, birthPlace, email, password, verificationCode, verified: false };

    document.getElementById("registerForm").classList.add("hidden");
    const verifyForm = document.getElementById("verifyForm");
    verifyForm.classList.remove("hidden");
    document.getElementById("verifyDesc").textContent = `Kode verifikasi dikirim ke ${email}.`;
    const devCodeBox = document.getElementById("verifyDevCode");
    devCodeBox.classList.remove("hidden");
    devCodeBox.innerHTML = `Kode verifikasi Anda (Dev Mode): <strong>${verificationCode}</strong>`;
  });

  document.getElementById("verifyForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = document.getElementById("verifyCode").value.trim();
    const errEl = document.getElementById("verifyError");

    if (pendingUser && code === pendingUser.verificationCode) {
      pendingUser.verified = true;
      const users = getRegisteredUsers();
      users.push(pendingUser);
      saveRegisteredUsers(users);

      localStorage.setItem("equilife_logged_in_email", pendingUser.email);
      localStorage.setItem("equilife_logged_in_user", pendingUser.fullName);

      document.getElementById("authScreen").classList.add("hidden");
      document.getElementById("appRoot").classList.remove("hidden");
      document.getElementById("userCardName").textContent = pendingUser.fullName;
      document.getElementById("userChip").textContent = pendingUser.fullName.charAt(0).toUpperCase();
      startApp();
    } else {
      errEl.textContent = "Kode verifikasi salah.";
      errEl.classList.remove("hidden");
    }
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("equilife_logged_in_email");
      localStorage.removeItem("equilife_logged_in_user");
      window.location.reload();
    });
  }
}

function startApp() {
  state = loadState();
  applyI18n();
  applySidebarState();
  setView("overview");
  renderEverything();

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

  document.querySelectorAll(".nav-item").forEach(btn => btn.addEventListener("click", () => setView(btn.dataset.view)));
  document.querySelectorAll("[data-goto]").forEach(btn => btn.addEventListener("click", () => setView(btn.dataset.goto)));

  document.getElementById("sidebarToggle").addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    saveState();
    applySidebarState();
  });

  document.getElementById("langToggle").addEventListener("click", () => {
    state.lang = state.lang === "ID" ? "EN" : "ID";
    saveState();
    applyI18n();
    renderEverything();
  });

  document.getElementById("exportExcelBtn").addEventListener("click", exportToExcel);
  document.getElementById("exportJsonBtn").addEventListener("click", exportToJson);

  document.getElementById("resetDataBtn").addEventListener("click", () => {
    if (confirm(tr().reset_confirm)) {
      localStorage.removeItem(getActiveStorageKey());
      draftBudget = null;
      state = loadState();
      applyI18n();
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

  document.querySelectorAll("#txSectionGroup .pill").forEach(p => p.addEventListener("click", () => setTxSection(p.dataset.section)));
  document.querySelectorAll("#txTypeGroup .pill").forEach(p => p.addEventListener("click", () => { txType = p.dataset.type; applyTxTypeUI(); }));
  document.getElementById("txPayMethod").addEventListener("change", applyTxTypeUI);

  const txAmount = document.getElementById("txAmount");
  const txAmountHint = document.getElementById("txAmountHint");
  txAmount.addEventListener("rupiahchange", () => { txAmountHint.textContent = fmtRp(rawNumber(txAmount)); });

  document.getElementById("txForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("txDate").value || todayISO();
    const amount = rawNumber(txAmount);
    const notes = document.getElementById("txNotes").value.trim();
    const accFrom = document.getElementById("txAccFrom").value;
    const accTo = document.getElementById("txAccTo").value;
    const category = document.getElementById("txCategory").value;
    const payMethod = document.getElementById("txPayMethod").value;
    const debtId = document.getElementById("txDebtLink").value;

    let debtSourceLabel = "";
    if (txType === "Pengeluaran" && payMethod === "paylater" && debtId) {
      const d = state.debts.find(x => x.id === debtId);
      if (d) debtSourceLabel = d.source;
    }

    const tx = {
      date, 
      type: txType,
      payMethod: txType === "Pengeluaran" ? payMethod : "account",
      debtId: debtId || null,
      debtSource: debtSourceLabel,
      accountFrom: txType === "Pemasukan" ? "-" : (payMethod === "paylater" ? "-" : accFrom),
      accountTo: txType === "Pengeluaran" ? "-" : accTo,
      categoryCode: txType === "Pengeluaran" ? category : "-",
      amount, 
      notes,
    };
    addTransaction(tx);
    document.getElementById("txNotes").value = "";
    renderEverything();
    flash(e.target.querySelector("button[type=submit]"), tr().saved_ok);
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
    if (willOpen) { draftBudget = null; ensureDraftBudget(); renderBudgetSettings(); }
  });
  document.getElementById("saveBudgetBtn").addEventListener("click", () => {
    ensureDraftBudget();
    const periodKey = getSelectedBudgetPeriodKey();
    state.monthlyBudgets[periodKey] = JSON.parse(JSON.stringify(draftBudget));
    saveState();
    renderAnggaran();
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

    const codeTaken = [...state.categories.map(b => b.code), ...state.chartOfAccounts.map(c => c.code)]
      .some(c => c === code && c !== editingCatCode);
    if (codeTaken) { alert(dict.cat_code_exists); return; }

    if (editingCatCode !== null) {
      state.categories = state.categories.filter(b => b.code !== editingCatCode);
      state.chartOfAccounts = state.chartOfAccounts.filter(c => c.code !== editingCatCode);
    }

    if (jenis === "Beban") {
      const konsumtif = document.getElementById("catKonsumtif").value;
      state.categories.push({ code, name, type: konsumtif });
      // Update juga ke seluruh monthlyBudgets yang ada agar kategori baru muncul
      Object.keys(state.monthlyBudgets).forEach(k => {
        if (!state.monthlyBudgets[k].some(item => item.code === code)) {
          state.monthlyBudgets[k].push({ code, name, type: konsumtif, targetPercent: 0, targetBudget: 0 });
        }
      });
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

document.addEventListener("DOMContentLoaded", initAuth);