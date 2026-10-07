const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Mengarahkan SQLite untuk mencipta fail pangkalan data local bernama ledger.db
const dbPath = path.resolve(__dirname, 'ledger.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) return console.error('🔴 Kegagalan Sambungan Database:', err.message);
    console.log('🟢 Lapisan Persistence SQL Aktif: Bersambung ke ledger.db');
});


// Melaksanakan query SQL untuk menetapkan struktur jadual log transaksi
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS transaction_ledger (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            income REAL NOT NULL,
            debt REAL NOT NULL,
            dti REAL NOT NULL,
            employment_status TEXT NOT NULL,
            requested_limit REAL NOT NULL,
            decision_status TEXT NOT NULL,
            reason TEXT NOT NULL
        )
    `);
});

module.exports = db;
