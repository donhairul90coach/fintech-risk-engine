// Layer 2: Core Banking Risk & Compliance Assessment Server
function executeFinancialCoreBanking() {
    let income = parseFloat(document.getElementById('income').value);
    let debt = parseFloat(document.getElementById('debt').value);
    let employment = document.getElementById('employment').value;
    let request = parseFloat(document.getElementById('request').value);

    let dti = (debt / income) * 100;
    let status = "APPROVED";
    let reason = "Compliance standards met.";

    // NEW FILTER STEP 2: Had Minimum Pinjaman & Penapisan ROI Kewangan
    // Mana-mana permohonan di bawah RM1,000 dianggap sebagai sifar ROI atau cubaan troll
    if (request < 1000) {
        status = "REJECTED";
        reason = `Negative ROI Trigger: Requested limit (RM ${request}) is below the institutional floor of RM 1,000. System terminated to prevent database bloat.`;
        
        // Paparkan amaran di skrin dan kemas kini log telemetry
        displayFinalDecision(status, reason);
        logs.push({ income, debt, dti: dti.toFixed(2), employment, request, status });
        console.warn("System Audit Alert: Low-yield application auto-rejected at core level.");
        return; // Hentikan proses serta-merta, jangan teruskan pengiraan lain!
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

    // Panggil fungsi untuk paparkan keputusan dan simpan telemetry log
    displayFinalDecision(status, reason);
    logs.push({ income, debt, dti: dti.toFixed(2), employment, request, status });
    console.log("Core Telemetry Updated: Data successfully piped for Looker Studio ingestion.");
}

// Fungsi pembantu untuk menguruskan paparan kosmetik UI
function displayFinalDecision(status, reason) {
    let resDiv = document.getElementById('result');
    resDiv.innerText = `Decision: ${status}\nDetails: ${reason}`;
    
    if (status === "REJECTED") {
        resDiv.style.background = "#f8d7da"; // Merah jambu soft untuk keputusan reject biasa/ROI
    } else if (status.includes("AUDIT")) {
        resDiv.style.background = "#fff3cd"; // Kuning soft untuk manual audit
    } else {
        resDiv.style.background = "#d4edda"; // Hijau soft untuk kelulusan
    }
}
