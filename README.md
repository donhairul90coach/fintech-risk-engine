# Enterprise Credit Risk & Compliance Evaluation Engine
### Architectural Proof-of-Concept & Serverless Ingestion Prototype

## Live Interactive Deployments (Production Links)
* **Live Web Application URL (Frontend Gateway):** [Launch Live Web Application](https://donhairul90coach.github.io/fintech-risk-engine/)
* **Executive Real-Time Risk Analytics Dashboard:** [View Live Looker Studio BI Dashboard](https://datastudio.google.com/reporting/43acd4c3-b66c-448d-8706-d049e6faea8a)
* **Core Architecture Source Code (Repository):** [View GitHub Source Code Repository](https://github.com/donhairul90coach/fintech-risk-engine)

---

## System Architecture & Logic Pipeline
### 1. Frontend UI Layer (`index.html`)
* **Role:** Client-side form presentation and data capture.
* **Technical Scope:** Engineered using lightweight HTML5 and a responsive CSS3 viewport configuration. It serializes user inputs prior to transmission to downstream layers, strictly adhering to the enterprise security mandate: *"Never trust frontend data validation alone."*

### 2. Request Rate Limiting Middleware (`security-gateway.js`)
* **Functional Role:** Client-side ingress throttling and bot mitigation.
* **Technical Implementation:** Implements a time-delta check (`Date.now()`) to enforce a minimum 2000ms velocity threshold between consecutive payload submissions.
* **Impact:** Prevents redundant processing overhead by blocking high-frequency simulated requests at the application boundary before routing data to the credit core.

### 3. Automated Underwriting Engine (`financial-core.js`)
* **Functional Role:** Policy enforcement engine for credit risk assessment and commercial margin compliance.
* **Technical Implementation:** Executes programmatic evaluation of risk metrics within sub-16ms deterministic processing loops. Enforces hard-coded conditional parameters to calculate Debt-to-Income (DTI) thresholds, filter variable income deviations (Freelance risk profiling), and restrict exposure caps to a maximum of 3x the monthly income.
* **Business Logic & Cost Optimization:** Enforces an institutional **Minimum Credit Floor Threshold of RM 1,000** to eliminate negative-margin transaction processing overhead. Permitting applications below this operational floor yields a negative Return on Investment (ROI), as the projected interest yield fails to clear fixed operational overheads. Specifically, low-yield submissions fail to amortize transactional cloud database read/write costs, automated compliance notifications, downstream collection agency overhead, and legal/documentation expenses incurred during loan defaults. Filtering these low-margin requests at the application boundary maximizes institutional processing efficiency.


### 4. Serverless Ingestion Webhook (`Google Apps Script`)
* **Functional Role:** Asynchronous operational data streaming and persistent ledger ingestion.
* **Technical Implementation:** Exposes an HTTP POST REST endpoint (`doPost`) that processes incoming JSON payloads via an asynchronous JavaScript Fetch API channel.
* **Impact:** Parses serialized payloads and writes them directly into an append-only transaction log ledger, auto-indexing entry records sequentially via `getLastRow()`.

### 5. Operations Telemetry Dashboard (`Looker Studio`)
* **Functional Role:** Business Intelligence reporting and risk distribution monitoring.
* **Technical Implementation:** Directly maps the transactional log ledger into visual analytical components using scheduled data refresh polling.
* **Impact:** Delivers immediate executive visibility into risk rejection ratios, volume distribution, and portfolio exposure metrics.

## Technical Stack & Infrastructure Registry

* **Core Interface & Scripting:** HTML5, CSS3, Vanilla JavaScript (ES6 Modular Architecture)
* **Integration Tier:** Asynchronous REST HTTP Webhook Pipeline
* **Serverless Backend Engine:** Google Apps Script Execution Environment
* **Persistence Layer:** Normalized Tabular Datastore (Google Sheets Ledger)
* **Business Intelligence Tier:** Google Looker Studio Operations Dashboard


