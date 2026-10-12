# Credit Risk & Loan Evaluation Engine API
A Full-Stack Node.js Web Application & REST API for Automated Credit Risk Assessment.

## Demo & Repository
- **Live Frontend Demo:** [Launch Application](https://donhairul90coach.github.io/fintech-risk-engine/)
- **GitHub Repository:** [View Source Code](https://github.com/donhairul90coach/fintech-risk-engine)

---

## Overview
This project is a RESTful web application built with **Node.js**, **Express**, and **SQLite**. It simulates an automated credit risk evaluation system that calculates an applicant's Debt-to-Income (DTI) ratio, validates loan requests against business rules, and stores decision logs in a database.

Originally built as a client-side prototype, the core risk logic was refactored into a Node.js backend to ensure data integrity, prevent unauthorized input modification, and enforce server-side validation.

---

## System Architecture & Features

### 1. Frontend Interface (`public/index.html` & `public/dashboard.html`)
- Serves a clean input form for applicants to submit income, debt, employment status, and requested loan amounts.
- Includes an analytics dashboard that renders risk evaluation stats via Chart.js.
- Implements basic input capture before sending data via HTTP POST requests to the backend.

### 2. API Rate Limiting & Input Protection (`server.js`)
- Uses `express-rate-limit` middleware to prevent spam and brute-force submissions on API endpoints.
- Validates data types server-side (`parseFloat`, checking for `NaN` values) to prevent malformed payload execution.

### 3. Dynamic Business Rules Configuration (`rules-config.json`)
- Stores business constraints (minimum loan limits, maximum DTI percentages, and income multipliers) in an external JSON configuration file.
- Allows updates to risk rules without modifying or restarting application code.

### 4. Underwriting & Risk Assessment Engine (`server.js`)
Evaluates input parameters against configured risk logic:
* **Minimum Limit Check:** Rejects requests below RM 1,000 (minimum loan threshold).
* **DTI Calculation:** Rejects applications with DTI exceeding 45% (or flags DTI > 30% for freelance applicants for manual audit).
* **Credit Cap Enforcement:** Limits maximum credit approval to 3x the applicant's monthly income.

### 5. Database Persistence & SQL Injection Protection (`database.js`)
- Persists transaction history to a SQLite database (`ledger.db`).
- Uses **parameterized SQL queries** (`db.run(sql, params)`) to prevent SQL Injection (SQLi) vulnerabilities.
- Stores transaction timestamp, input data, calculated DTI, evaluation status, and audit reasons.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime Environment** | Node.js (v18+) |
| **Web Framework** | Express.js (v5) |
| **Database** | SQLite3 |
| **Security & Middleware** | Express-Rate-Limit, Dotenv |
| **Frontend** | HTML5, CSS3, JavaScript (Fetch API, Chart.js) |

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
