# Credit Risk Evaluation Engine & Web Application
A Full-Stack Node.js REST API & Application for Automated Credit Risk Assessment.

## Demo & Repository
- **Live Frontend Demo:** [Launch Application](https://donhairul90coach.github.io/fintech-risk-engine/)
- **GitHub Repository:** [View Source Code](https://github.com/donhairul90coach/fintech-risk-engine)

---

## Overview
This project is a full-stack RESTful web application built with **Node.js**, **Express**, **SQLite**, and **Chart.js**. It automates credit risk evaluation by calculating Debt-to-Income (DTI) ratios, enforcing business rule limits, and logging transaction decisions.

### System Evolution
Originally prototyped using cloud services (Google Sheets for data storage and Looker Studio for visual reporting), the core logic and persistence layers were refactored into a self-hosted **Node.js Express API** and **SQLite database** to enforce server-side validation, prevent unauthorized input tampering, and eliminate client-side limits.

---

## Architecture & Technical Features

### 1. Ingress Protection & Security Protocols (`server.js`)
- **2-Second Rate Limiting Window:** Configured `express-rate-limit` to restrict requests to a maximum of 1 request per 2 seconds (2000ms) per IP address. This defends the server perimeter against automated bots, micro-transaction flooding, and spam.
- **Server-Side Data Sanitization:** Validates all incoming payloads server-side (`parseFloat` and `NaN` checks) prior to processing to prevent invalid data execution.

### 2. Underwriting & Financial ROI Logic (`server.js` & `rules-config.json`)
- **Minimum RM 1,000 Credit Floor:** Rejects loan requests under RM 1,000. Processing micro-loans below this threshold results in negative ROI due to fixed server overhead and operational maintenance costs.
- **Automated DTI Calculation:** Calculates real-time DTI ratios. Requests exceeding 45% DTI are rejected, while freelance applicants with DTI > 30% are flagged for manual audit.
- **Capital Exposure Cap:** Limits total approved credit exposure to a maximum of 3x the applicant's verified monthly income.
- **Externalized Configuration:** Underwriting rules are stored in `rules-config.json`, allowing risk parameters to be updated dynamically without altering core application code.

### 3. Database Persistence & SQL Security (`database.js`)
- **Relational Ledger:** Stores transaction records in a SQLite database (`ledger.db`).
- **SQL Injection Prevention:** Uses parameterized SQL queries (`db.run(sql, params)`) to neutralize SQL Injection (SQLi) risks and preserve ledger integrity.

### 4. Interactive Frontend & Analytics (`public/`)
- **User Interface (`index.html`):** Form interface for entering income, existing debt, employment type, and requested limit.
- **Dashboard Telemetry (`dashboard.html`):** Visualizes approval distributions (Approved, Rejected, Limit Cap Applied, Manual Audit) using **Chart.js**, fetched directly from the `/api/v1/analytics-summary` endpoint.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime Environment** | Node.js (v18+) |
| **Web Framework** | Express.js (v5) |
| **Database** | SQLite3 |
| **Security & Middleware** | Express-Rate-Limit (2s Rule), Dotenv |
| **Frontend & Analytics** | HTML5, CSS3, JavaScript (Fetch API, Chart.js) |

---

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- npm (Node Package Manager).

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/donhairul90coach/fintech-risk-engine.git](https://github.com/donhairul90coach/fintech-risk-engine.git)
   cd fintech-risk-engine
2. **Install dependencies:**
   ```bash
   npm install
3. **Configure Environment Variables:** Create a .env file in the root directory:

   `PORT=3000`
5. **Run the server:**
   ```bash
   node server.js
6. **Access the application:**

   Open your browser and navigate to http://localhost:3000.
   
## API Reference
**1. Evaluate Risk Assessment**

- Endpoint: `POST /api/v1/risk-assessment`

- Headers: `Content-Type: application/json`

- Request Body:
```json

 {
  "income": 5000,
  "debt": 1200,
  "employment": "PERMANENT",
  "request": 10000
}
```
- Response (200 OK):
```json

{
  "status": "APPROVED",
  "reason": "Compliance standards fully met."
}
```

**2. Executive Analytics Summary**

- Endpoint: GET `/api/v1/analytics-summary`

- Response (200 OK):
```json
{
  "approved": 15,
  "rejected": 5,
  "capApplied": 3,
  "audit": 2
}
```
