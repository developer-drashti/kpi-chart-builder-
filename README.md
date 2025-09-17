# kpi-chart-builder

A full-stack **KPI Dashboard** built with **React.js (frontend)** and **Express + SQLite (backend)**.  
It allows users to generate **custom KPI visualizations** (bar/line/table) from detection data (CSV seeded).  

---

## 🚀 Features

- **Frontend (React + MUI + Chart.js)**
  - Styled KPI Form for selecting filters
  - Metrics supported:
    - `count`
    - `unique_ids`
    - `rate` (per hour)
  - Group by:
    - `type` (Class)
    - `area` (Zone)
    - `id`
    - `timestamp` (Time Bucket)
  - Multiple chart types:
    - Bar Chart
    - Line Chart
  - Dynamic filters:
    - Time range
    - Class (type)
    - Zones (areas)
    - Speed thresholds
    - Vest worn / not worn
    - Heading ranges

- **Backend (Express + SQLite3)**
  - Loads detection data from CSV (`data/data.csv`)
  - API endpoints:
    - `GET /api/aggregate` → Aggregated metrics with filters
  - Metrics supported:
    - Count
    - Unique IDs
    - Rate per hour
  - Seed script to insert CSV data into database

---

## 📂 Folder Structure

```
kpi-chart-builder/
│── backend/
│ ├── data/ # CSV dataset + SQLite database
│ ├── seed.js # Script to seed CSV into DB
│ ├── server.js # Express server
│ ├── db.js # SQLite connection
│ └── package.json
│
│── frontend/ # React app (MUI + Chart.js)
│ ├── src/
│ │ ├── api # API service calls
│ │ ├── App.jsx # Main entry
│ │ ├── components/ # UI components
│ │ │ ├── KPIForm.jsx
│ │ │ └── KPIChart.jsx
│ │ └── index.js
│ └── package.json
│
└── README.md # (this file)
```

---

## ⚙️ Setup & Run

### 1️⃣ Clone Repository
```sh
git clone <repo-url>
cd kpi-dashboard
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```

**Seed Database ((Default seeds 10,000 rows from data.csv))**
```sh
npm run seed
```

**Run Backend**
```sh
Run Backend
```

### 3️⃣ Frontend Setup
```sh
cd frontend
npm install
npm start
```


