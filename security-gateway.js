// Layer 1: Cloud Architecture / Network Security Simulator
let lastSubmissionTime = 0;

function handleIncomingTraffic() {
    let currentTime = Date.now();
    let resDiv = document.getElementById('result');
    
    // Logik Replikasi AWS WAF / Cloudflare Rate Limiting
    if (lastSubmissionTime !== 0) {
        let timeDifference = currentTime - lastSubmissionTime;
        
        // Sekat jika jeda masa bawah 2 saat (Trafik Bot)
        if (timeDifference < 2000) {
            lastSubmissionTime = currentTime;
            
            resDiv.innerText = `Decision: SECURITY LOCKEDOUT\nDetails: Velocity Attack Intercepted at Network Layer! Interval: ${timeDifference}ms. Infrastructure protected.`;
            resDiv.style.background = "#ff9999";
            
            console.error(`WAF Shield Alert: Micro-transaction flooding intercepted. Execution aborted before touching Core Banking Server.`);
            return; // Sekat terus! Data takkan sampai ke core banking
        }
    }
    
    lastSubmissionTime = currentTime;
    console.log("Network Layer Clean: Routing payload to Financial Core Banking Server...");
    
    // Jika trafik bersih dari bot, hantar data ke server pemprosesan kewangan
    executeFinancialCoreBanking();
}
