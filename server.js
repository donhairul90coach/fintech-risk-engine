require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const db = require('./database');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

// Security Ingress Rate Limiter
const ingressRateLimiter = rateLimit({
    windowMs: 2000,
    max: 1,
    message: {
        status: "SECURITY LOCKEDOUT",
        reason: "Micro-transaction flooding intercepted at API Gateway perimeter."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

function loadUnderwritingRules() {
    const rawData = fs.readFileSync(path.resolve(__dirname, 'rules-config.json'));
    return JSON.parse(rawData);
}

// Ingestion Core Endpoint
app.post('/api/v1/risk-assessment', ingressRateLimiter, (req, res) => {
    try {
        const { income, debt, employment, request } = req.body;
        const parsedIncome = parseFloat(income);
        const parsedDebt = parseFloat(debt);
        const parsedRequest = parseFloat(request);

        if (isNaN(parsedIncome) || isNaN(parsedDebt) || isNaN(parsedRequest) || !employment) {
            return res.status(400).json({ status: "MALFORMED_INPUT", reason: "Invalid data types passed to endpoint." });
        }

        const rules = loadUnderwritingRules();
        const dti = (parsedDebt / parsedIncome) * 100;
        
        let decisionStatus = "APPROVED";
        let reason = "Compliance standards fully met.";

        if (parsedRequest < rules.MIN_CREDIT_FLOOR_MYR) {
            decisionStatus = "REJECTED";
            reason = `Negative ROI Trigger: Requested exposure below RM ${rules.MIN_CREDIT_FLOOR_MYR} institutional operational floor.`;
        } else if (dti > rules.MAX_GENERAL_DTI_PERCENT) {
            decisionStatus = "REJECTED";
            reason = `Credit Policy Ceilings Exceeded: Overall Debt-to-Income ratio at ${dti.toFixed(2)}% violates the maximum ${rules.MAX_GENERAL_DTI_PERCENT}% risk cap.`;
        } else if (employment === "FREELANCE" && dti > rules.MAX_FREELANCE_DTI_PERCENT) {
            decisionStatus = "FLAGGED FOR MANUAL AUDIT";
            reason = `Variable Income Deviation: Freelance profile DTI ratio at ${dti.toFixed(2)}% exceeds the ${rules.MAX_FREELANCE_DTI_PERCENT}% underwriting risk cap.`;
        } else if (parsedRequest > (parsedIncome * rules.MAX_INCOME_MULTIPLIER_CAP)) {
            decisionStatus = "LIMIT CAP APPLIED";
            reason = `Risk Mitigation Adjustment: Total capital exposure restricted to maximum threshold of RM ${parsedIncome * rules.MAX_INCOME_MULTIPLIER_CAP}.`;
        }

        const sql = `INSERT INTO transaction_ledger (income, debt, dti, employment_status, requested_limit, decision_status, reason) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [parsedIncome, parsedDebt, dti.toFixed(2), employment, parsedRequest, decisionStatus, reason];

        db.run(sql, params, function (err) {
            if (err) {
                console.error('🔴 Transaction Log Fault:', err.message);
                return res.status(500).json({ status: "PERSISTENCE_FAULT", reason: "Internal ledger insertion exception encountered." });
            }
            console.log(`🟢 System Audited: Transaction committed to row index ${this.lastID}.`);
            return res.status(200).json({ status: decisionStatus, reason: reason });
        });

    } catch (error) {
        console.error('🔴 Critical Engine System Exception:', error.message);
        return res.status(500).json({ status: "CORE_SERVER_ERROR", reason: "Fatal runtime execution thread collapse intercepted." });
    }
});
// 📊 PRIVATE ANALYTICS DATA INGESTION FOR EXECUTIVE DASHBOARD
app.get('/api/v1/analytics-summary', (req, res) => {
    const sql = `
        SELECT 
            COUNT(CASE WHEN decision_status = 'APPROVED' THEN 1 END) as approved,
            COUNT(CASE WHEN decision_status = 'REJECTED' THEN 1 END) as rejected,
            COUNT(CASE WHEN decision_status = 'LIMIT CAP APPLIED' THEN 1 END) as capApplied,
            COUNT(CASE WHEN decision_status = 'FLAGGED FOR MANUAL AUDIT' THEN 1 END) as audit
        FROM transaction_ledger
    `;

    db.get(sql, [], (err, row) => {
        if (err) {
            console.error('🔴 SQL Aggregate Fetch Fault:', err.message);
            return res.status(500).json({ approved: 0, rejected: 0, capApplied: 0, audit: 0 });
        }
        
        res.json({
            approved: row ? (parseInt(row.approved) || 0) : 0,
            rejected: row ? (parseInt(row.rejected) || 0) : 0,
            capApplied: row ? (parseInt(row.capApplied) || 0) : 0,
            audit: row ? (parseInt(row.audit) || 0) : 0
        });
    });
});


app.listen(PORT, () => {
    console.log(`🚀 Server Pengunderaitan Enterprise Berjalan pada Port Selamat: ${PORT}`);
});
