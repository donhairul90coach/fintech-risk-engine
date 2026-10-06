// Layer 2: Core Banking Risk & Compliance Assessment Server
function executeFinancialCoreBanking() {
    let income = parseFloat(document.getElementById('income').value);
    let debt = parseFloat(document.getElementById('debt').value);
    let employment = document.getElementById('employment').value;
    let request = parseFloat(document.getElementById('request').value);

    let dti = (debt / income) * 100;
    let status = "APPROVED";
    let reason = "Compliance standards met.";

    // 1. Penapis Had Minimum & ROI Kewangan
    if (request < 1000) {
        status = "REJECTED";
        reason = `Negative ROI Trigger: Requested limit (RM ${request}) is below the institutional floor of RM 1,000. System terminated to prevent database bloat.`;
        
        displayFinalDecision(status, reason);
        logs.push({ income, debt, dti: dti.toFixed(2), employment, request, status });
        
        // Tembak data ke Google Sheets live untuk kes reject ROI
        sendDataToCloudLive(income, debt, dti.toFixed(2), employment, request, status);
        return; 
    }

    // 2. Peraturan Had Kelayakan Kewangan Biasa
    if (dti > 45) {
        status = "REJECTED";
        reason = "High Credit Risk: Debt-to-Income exceeds 45%.";
    } else if (employment === "FREELANCE" && dti > 30) {
        status = "FLAGGED FOR MANUAL AUDIT";
        reason = "Variable income deviation detected.";
    }

    // 3. Peraturan Had Maksima 3 Kali Gaji
    if (request > (income * 3) && status === "APPROVED") {
        status = "LIMIT CAP APPLIED";
        reason = `Requested limit adjusted to maximum threshold: RM ${income * 3}`;
    }

    displayFinalDecision(status, reason);
    logs.push({ income, debt, dti: dti.toFixed(2), employment, request, status });
    
    // Tembak data ke Google Sheets live untuk kes Approved / Normal Reject
    sendDataToCloudLive(income, debt, dti.toFixed(2), employment, request, status);
    console.log("Core Telemetry Updated: Data successfully piped for Looker Studio ingestion.");
}

// Fungsi pembantu untuk menguruskan paparan kosmetik UI
function displayFinalDecision(status, reason) {
    let resDiv = document.getElementById('result');
    resDiv.innerText = `Decision: ${status}\nDetails: ${reason}`;
    
    if (status === "REJECTED") {
        resDiv.style.background = "#f8d7da"; 
    } else if (status.includes("AUDIT")) {
        resDiv.style.background = "#fff3cd"; 
    } else {
        resDiv.style.background = "#d4edda"; // Kotak hijau soft untuk kelulusan sukses!
    }
}

// 🔥 FUNGSI WEBHOOK UTAMA: BERSIH, TERASING, DAN URL DIKUNCI MATI PADA GOOGLE WEB APP
function sendDataToCloudLive(income, debt, dti, employment, request, status) {
    let webAppUrl = "https://script.google.com/macros/s/AKfycbyjDPc8LSGE3S7ROU6tUNU8SWq_c8Z6EhFOQCMsiBX9KMGQYvzIQBfKLaKaPAD2znoEYw/exec"; 

    let payload = {
        income: income,
        debt: debt,
        dti: dti,
        employment: employment,
        request: request,
        status: status
    };

    fetch(webAppUrl, {
        method: "POST",
        body: JSON.stringify(payload)
    })
    .then(response => console.log("🟢 Data Berjaya Tembak Ke Google Sheets Live!"))
    .catch(error => console.error("🔴 Gagal hantar data:", error));
}
