require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const db = require('./database');

const app = express();
app.use(express.json());

// Mengarahkan server untuk membaca fail frontend dari folder public
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

// 🛡️ KAWALAN KESELAMATAN API PERIMETER: Server-Side Ingress Rate Limiting (Token Bucket)
const ingressRateLimiter = rateLimit({
    windowMs: 2000, // Tingkap beza masa 2 saat
    max: 1, // Maksimum 1 request sahaja bagi setiap alamat IP dalam tingkap masa
    message: {
        status: "SECURITY LOCKEDOUT",
        reason: "Micro-transaction flooding intercepted at API Gateway perimeter."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Pembantu Memuatkan Peraturan Polisi Kewangan secara Dinamik dari JSON
function loadUnderwritingRules() {
    const rawData = fs.readFileSync(path.resolve(__dirname, 'rules-config.json'));
    return JSON.parse(rawData);
}


// ⚙️ ROUTE PENGEPAM DATA & ENJIN PEMATUHAN RISIKO (COMPLIANCE ENGINE)
app.post('/api/v1/risk-assessment', ingressRateLimiter, (req, res) => {
    try {
        const { income, debt, employment, request } = req.body;
        
        // Sanitasi dan tukar data input menjadi nombor perpuluhan secara selamat
        const parsedIncome = parseFloat(income);
        const parsedDebt = parseFloat(debt);
        const parsedRequest = parseFloat(request);

        if (isNaN(parsedIncome) || isNaN(parsedDebt) || isNaN(parsedRequest) || !employment) {
            return res.status(400).json({ status: "MALFORMED_INPUT", reason: "Invalid data types passed to endpoint." });
        }

        // Memuatkan parameter buku peraturan perbankan dari fail rules-config.json
        const rules = loadUnderwritingRules();
        const dti = (parsedDebt / parsedIncome) * 100;
        
        let decisionStatus = "APPROVED";
        let reason = "Compliance standards fully met.";

        // 1. Penilaian Perlindungan Margin Operasi (Cost Optimization Floor)
        if (parsedRequest < rules.MIN_CREDIT_FLOOR_MYR) {
            decisionStatus = "REJECTED";
            reason = `Negative ROI Trigger: Requested exposure below RM ${rules.MIN_CREDIT_FLOOR_MYR} institutional operational floor.`;
        } 
        // 2. Penilaian Polisi Had Had Risiko Kredit (DTI Rules)
        else if (dti > rules.MAX_GENERAL_DTI_PERCENT) {
            decisionStatus = "REJECTED";
            reason = `Credit Policy Ceilings Exceeded: Overall Debt-to-Income ratio at ${dti.toFixed(2)}% violates the maximum ${rules.MAX_GENERAL_DTI_PERCENT}% risk cap.`;
        } else if (employment === "FREELANCE" && dti > rules.MAX_FREELANCE_DTI_PERCENT) {
            decisionStatus = "FLAGGED FOR MANUAL AUDIT";
            reason = `Variable Income Deviation: Freelance profile DTI ratio at ${dti.toFixed(2)}% exceeds the ${rules.MAX_FREELANCE_DTI_PERCENT}% underwriting risk cap.`;
        } 
        // 3. Kawalan Maksimum Pendedahan Modal (Capital Cap Management)
        else if (parsedRequest > (parsedIncome * rules.MAX_INCOME_MULTIPLIER_CAP)) {
            decisionStatus = "LIMIT CAP APPLIED";
            reason = `Risk Mitigation Adjustment: Total capital exposure restricted to maximum threshold of RM ${parsedIncome * rules.MAX_INCOME_MULTIPLIER_CAP}.`;
        }


        // 💾 LAPISAN DATA PERSISTENCE: Memasukkan Data Menggunakan Parameterized SQL (Secure Ingestion)
        const sql = `INSERT INTO transaction_ledger (income, debt, dti, employment_status, requested_limit, decision_status, reason) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [parsedIncome, parsedDebt, dti.toFixed(2), employment, parsedRequest, decisionStatus, reason];

        db.run(sql, params, function (err) {
            if (err) {
                console.error('🔴 Kegagalan Log Transaksi SQL:', err.message);
                return res.status(500).json({ status: "PERSISTENCE_FAULT", reason: "Internal ledger insertion exception encountered." });
            }
            
            console.log(`🟢 Sistem Diaudit: Rekod Transaksi berjaya dikomit secara berturutan pada indeks baris SQL ${this.lastID}.`);
            return res.status(200).json({ status: decisionStatus, reason: reason });
        });

    } catch (error) {
        console.error('🔴 Pengecualian Kritikal Sistem Enjin:', error.message);
        return res.status(500).json({ status: "CORE_SERVER_ERROR", reason: "Fatal runtime execution thread collapse intercepted." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server Pengunderaitan Enterprise Berjalan pada Port Selamat: ${PORT}`);
});
