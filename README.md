# Enterprise Credit Risk & Compliance Evaluation Engine
### Decoupled Full-Stack Architecture & Secure Backend API Prototype


## Live Interactive Deployments
* **Live Automated Interface Ingress (Frontend Gateway):** [Launch Live Web Application](https://donhairul90coach.github.io/fintech-risk-engine/)
* **Core Architecture Source Code (Repository):** [View GitHub Source Code Repository](https://github.com/donhairul90coach/fintech-risk-engine)

---

## Executive Project Overview
This repository serves as a functional enterprise proof-of-concept for an automated credit risk underwriting engine and ingress policy pipeline. Designed to model deterministic high-volume financial applications, the system features a decoupled, multi-tier architecture executing strict data persistence integrity, perimeter network defense, environment isolation, and advanced fault-handling boundaries.

Initially designed as a rapid, low-overhead browser framework to evaluate algorithmic compliance patterns, the entire core infrastructure has been refactored into a high-security server model to eliminate client-side manipulation vulnerabilities and database write concurrency constraints.

---

## System Architecture & Logic Pipeline

### 1. Frontend UI Layer (`public/index.html`)
* **Functional Role:** Client-side form presentation and data capture.
* **Technical Scope:** Engineered using lightweight HTML5 and a responsive CSS3 viewport configuration. It serializes user input parameters prior to transmission to downstream backend layers, strictly adhering to the enterprise security mandate: "Never trust frontend data validation alone."

### 2. Ingress Network Security Tier (`server.js` via Express-Rate-Limit)
* **Functional Role:** Server-side request throttling and defensive bot mitigation.
* **Technical Implementation:** Deploys an isolated middleware pipeline enforcing a strict 2000ms velocity checking loop mapped against inbound user client IP addresses. High-frequency request patterns or automated scripts are intercepted at the server perimeter before executing downstream computing assets.
* **Impact:** Prevents malicious micro-transaction flooding attacks, safeguarding application compute resources from automated processing degradation.

### 3. Decoupled Compliance Configuration (`rules-config.json`)
* **Functional Role:** Dynamic operational policy framework.
* **Technical Implementation:** Completely decouples corporate underwriting guidelines from the execution runtime. Variables such as Debt-to-Income (DTI) caps, exposure limits, and minimum underwriting floors are stored dynamically within a centralized JSON schema.
* **Impact:** Delivers agile business rule modifications. Risk officers can adjust financial risk thresholds instantly without modifying or redeploying the underlying server source code.

### 4. Automated Underwriting Core (`server.js`)
* **Functional Role:** Financial risk appraisal and programmatic underwriting compliance.
* **Technical Implementation:** Evaluates serialized user transaction telemetry inside low-latency, non-blocking synchronous execution blocks processing in under 1 millisecond. Executes standard financial logic checks:
  * **Debt-to-Income Ceilings:** Automatically calculates real-time DTI limits, enforcing a definitive rejection boundary at greater than 45% and flagging high-risk variable profiles (Freelance status greater than 30% DTI) for human audit trails.
  * **Capital Exposure Mitigation:** Programmatically curtails capital assignment boundaries to a maximum threshold of 3x the applicant's validated monthly revenue.

### 5. Commercial Profitability & Margin Protection Logic
* **Business Value Execution:** Enforces an institutional Minimum Credit Floor Threshold of RM 1,000 to eliminate negative-margin transaction processing. 
* **Cost Amortization Rationale:** Processing micro-loans below this operational floor triggers a negative Return on Investment (ROI). The projected interest yield fails to clear fixed operational overheads, including backend database read/write operations, automated electronic notifications, downstream collection agency retainers, and legal/documentation expenses incurred during credit default anomalies. Filtering low-margin submissions at the ingress perimeter maximizes overall corporate processing efficiency.

### 6. Relational Transaction Storage (`database.js` via SQLite)
* **Functional Role:** Secure transactional ledger persistence.
* **Technical Implementation:** Utilizes a fully normalized, relational SQL ledger table (`transaction_ledger`). The insertion module relies on secure Parameterized Queries (`INSERT INTO ... VALUES (?, ?, ?)`) mapping data sequentially via auto-incremented primary key allocations.
* **Impact:** Fundamentally neutralizes SQL Injection (SQLi) attack vectors, guarantees data persistence integrity under concurrent request loads, and archives structured operational audit logs cleanly.

---

## Technical Stack & Infrastructure Registry
* **Backend Processing Runtime:** Node.js (V8 Execution Environment)
* **API Gateway & Routing Tier:** Express.js Web Framework
* **Security & Ingress Throttling:** Express-Rate-Limit (Token-Bucket Array)
* **Persistence Layer:** Relational Storage Matrix (SQLite Engine)
* **Configuration Layer:** Decoupled Polymorphic Policy Variables (JSON Framework)
* **Environment Isolation:** Dotenv Environment Obfuscation Tier (`.env`)

