# Enterprise Credit Risk & Compliance Evaluation Engine

## Live Interactive Deployments (Production Links)
* **Live Web Application URL (Frontend Gateway):** [Launch Live Web Application](https://donhairul90coach.github.io/fintech-risk-engine/)
* **Executive Real-Time Risk Analytics Dashboard:** [View Live Looker Studio BI Dashboard](https://datastudio.google.com/reporting/43acd4c3-b66c-448d-8706-d049e6faea8a)
* **Core Architecture Source Code (Repository):** [View GitHub Source Code Repository](https://github.com/donhairul90coach/fintech-risk-engine)

---

## System Architecture & Logic Pipeline

### 1. Request Rate Limiting Middleware (`security-gateway.js`)
* **Functional Role:** Client-side ingress throttling and bot mitigation.
* **Technical Implementation:** Implements a time-delta check (`Date.now()`) to enforce a minimum 2000ms velocity threshold between consecutive payload submissions.
* **Impact:** Prevents redundant processing overhead by blocking high-frequency simulated requests at the application boundary before routing data to the credit core.

### 2. Automated Underwriting Core (`financial-core.js`)
* **Functional Role:** Policy enforcement engine for credit risk and capital assignment compliance.
* **Technical Implementation:** Executes programmatic evaluation of incoming risk metrics via deterministic conditional paths:
  * **Margin Protection Floor:** Rejects requests below RM 1,000 to eliminate low-margin transaction processing overhead.
  * **Credit Risk Policy:** Calculates Debt-to-Income (DTI) percentage; enforces a hard ceiling rejection at >45% DTI and flags high-risk variable income profiles (Freelance status >30% DTI) for manual compliance audit.
  * **Exposure Control:** Applies a capital cap restricted to a maximum of 3x the declared monthly income.

### 3. Serverless Ingestion Webhook (`Google Apps Script`)
* **Functional Role:** Asynchronous operational data streaming and persistent ledger ingestion.
* **Technical Implementation:** Exposes an HTTP POST REST endpoint (`doPost`) that processes incoming JSON payloads via an asynchronous JavaScript Fetch API channel.
* **Impact:** Parses serialized payloads and writes them directly into an append-only transaction log ledger, auto-indexing entry records sequentially via `getLastRow()`.

### 4. Operations Telemetry Dashboard (`Looker Studio`)
* **Functional Role:** Business Intelligence reporting and risk distribution monitoring.
* **Technical Implementation:** Directly maps the transactional log ledger into visual analytical components using scheduled data refresh polling.
* **Impact:** Delivers immediate executive visibility into risk rejection ratios, volume distribution, and portfolio exposure metrics.

## Technical Stack & Infrastructure Registry

* **Core Interface & Scripting:** HTML5, CSS3, Vanilla JavaScript (ES6 Modular Architecture)
* **Integration Tier:** Asynchronous REST HTTP Webhook Pipeline
* **Serverless Backend Engine:** Google Apps Script Execution Environment
* **Persistence Layer:** Normalized Tabular Datastore (Google Sheets Ledger)
* **Business Intelligence Tier:** Google Looker Studio Operations Dashboard


