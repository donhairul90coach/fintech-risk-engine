// FUNGSI WEBHOOK UTAMA: TEMBUK DATA TERUS KE INTERNET SECARA LIVE
function sendDataToCloudLive(income, debt, dti, employment, request, status) {
    
    // 🔥 DAFI BERSIH: Dah ditutup dengan tanda "" yang betul dan huruf 'I' hantu di hujung dah dibuang!
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
