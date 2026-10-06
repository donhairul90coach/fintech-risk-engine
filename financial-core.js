// Layer 2: Core Banking Risk & Compliance Assessment Server
function executeFinancialCoreBanking() {
    let income = parseFloat(document.getElementById('income').value);
    let debt = parseFloat(document.getElementById('debt').value);
    let employment = document.getElementById('employment').value;
    let request = parseFloat(document.getElementById('request').value);

    let dti = (debt / income) * 100;
    let status = "APPROVED";
    let reason = "Compliance standards met.";

    // Peraturan Had Kelayakan Kewangan (Business Rules Engine)
    if (dti > 45) {
        status = "REJECTED";
        reason = "High Credit Risk: Debt-to-Income exceeds 45%.";
    } else if (employment === "FREELANCE" && dti > 30) {
        status = "FLAGGED FOR MANUAL AUDIT";
        reason = "Variable income deviation detected.";
    }

    // Peraturan Had Maksima 3 Kali Gaji
    if (request > (income * 3) && status === "APPROVED") {
        status = "LIMIT CAP APPLIED";
        reason = `Requested limit adjusted to maximum threshold: RM ${income * 3}`;
    }

    // Paparkan Hasil Kelulusan Akhir Bank
    let resDiv = document.getElementById('result');
    resDiv.innerText = `Decision: ${status}\nDetails: ${reason}`;
    resDiv.style.background = status === "REJECTED" ? "#f8d7da" : "#d4edda";

    // Peta log masuk data telemetry untuk Looker Studio
    logs.push({ income, debt, dti: dti.toFixed(2), employment, request, status });
    console.log("📊 Core Telemetry Updated: Data successfully piped for Looker Studio ingestion.");
}
