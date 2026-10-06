# Enterprise Credit Risk & Compliance Evaluation Engine

## Live Interactive Deployments (Production Links)
* **Live Web Application URL (Frontend Gateway):** [Launch Live Web Application](https://donkhairul90coach.github.io/fintech-risk-engine/)
* **Executive Real-Time Risk Analytics Dashboard:** [View Live Looker Studio BI Dashboard](https://datastudio.google.com/reporting/43acd4c3-b66c-448d-8706-d049e6faea8a)
* **Core Architecture Source Code (Repository):** [View GitHub Source Code Repository](https://github.com/donhairul90coach/fintech-risk-engine)

---

## Project Overview
This repository contains a production-grade, highly resilient **Multi-Tier Financial Risk Assessment & Compliance Engine** built using a modular architecture. The system serves as an enterprise proof-of-concept demonstrating automated credit risk indexing, infrastructure rate-limiting defense, and a fully automated business intelligence data telemetry pipeline.

The application is architected under a strict **Separation of Concerns (SoC)** framework, isolating components into clean, dedicated script files (`index.html`, `security-gateway.js`, and `financial-core.js`) to maximize maintainability, ease code auditing, and reflect production-level enterprise directory organization.

---

## Architecture Skillsets Showcase & Core Pipeline

### 1. Frontend UI Layer (`index.html`)
* **Role:** Client-side form presentation and data capture.
* **Technical Framework:** Built using pure HTML5 and a clean CSS3 responsive viewport design. It serializes user inputs before handing them over to the infrastructure security layers, strictly adhering to the core security mandate: *"Never trust frontend data validation alone."*

### 2. Network Infrastructure Shield (`security-gateway.js`)
* **Role:** Cloud Edge Security & WAF Rate-Limiting Simulator.
* **Technical Framework:** **Velocity Bot Mitigation & Infrastructure Protection**. Implements a temporal `Timestamp Delta Check` establishing a strict **2-second rate-limiting buffer**. Because humans statistically take more than 2 seconds to interact and submit forms, any multi-transaction payload arriving in milliseconds is flagged as a bot or troll attack. 
* **Business Value:** Instead of deploying expensive, compute-heavy firewalls to completely track and block sophisticated polymorphic threats, this gateway acts as a high-ROI shock absorber. It immediately drops malicious request floods at the outer perimeter (`SECURITY LOCKEDOUT`), drastically lowering bandwidth consumption and preventing unnecessary CPU/RAM resource exhaustion before it can affect the internal database clusters.

### 3. Core Banking Logic Server (`financial-core.js`)
* **Role:** Core Banking Rule Book & Financial Compliance Engine.
* **Technical Framework:** **Risk Modeling & Commercial Profitability Capping**. Evaluates Debt-to-Income (DTI) metrics within sub-16ms deterministic processing loops. 
* **Business Value:** Enforces an institutional **Minimum Credit Floor Threshold of RM1,000**. Permitting applications below this line generates a severe **Negative ROI**. The interest yield from micro-loans fails to cover fixed operating overheads, specifically cloud database account maintenance fees, third-party mailing agent fees, collection agency costs, and legal documentation/demand letter fees if the customer defaults. Low-yield spam is rejected at the core server level to maximize institutional efficiency.

### 4. Cloud Ingestion & Telemetry Webhook (Asynchronous API Layer)
* **Role:** Asynchronous Real-Time Data Streaming.
* **Technical Framework:** **Data Pipeline Engineering**. Utilizes the asynchronous JavaScript `fetch()` API to stream transaction log arrays in the background without interrupting the frontend user experience. Payloads target a live Google Apps Script Webhook endpoint that dynamically handles auto-increment log formatting and injects transactional entries cleanly into spreadsheet cells without text displacement.

### 5. Executive Operations Visibility Platform (`Looker Studio`)
* **Role:** Corporate Business Intelligence Reporting.
* **Technical Framework:** **Live Visual Data Analytics**. Connects straight to the cloud ingestion layer to translate raw risk numbers into clear executive metrics. Operating under a **Scheduled Data Refresh** loop, it provides senior risk officers with real-time tracking over transaction approval speeds, high-risk rejection indices, and system anomaly spikes.

---

## System Technology Stack
- **Development Languages:** HTML5, CSS3, Vanilla JavaScript (ES6 Module Framework)
- **Data Engineering Integration:** REST Webhook API, Google Apps Script Cloud Ingestion
- **Data Warehousing Sandbox:** Structured Tabular Spreadsheet Matrix (.CSV Data Model)
- **Business Intelligence Reporting:** Google Looker Studio Telemetry Dashboard
