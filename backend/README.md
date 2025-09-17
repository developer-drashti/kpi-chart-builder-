
---

# 📘 Backend README (`backend/README.md`)

```markdown
# ⚙️ KPI Dashboard - Backend

This is the **Express.js + SQLite backend** for the KPI Dashboard project.  
It ingests raw CSV detection data into SQLite and provides **REST APIs** for KPI aggregation.

---

## 🚀 Features

- Built with **Express.js** + **sqlite3**.
- Provides a clean REST API:
  - **Metrics**: `count`, `unique_ids`, `rate/hour`
  - **Grouping**: by `class`, `area`, `id`, etc.
- CSV seeding script to load sample industrial detection data.
- APIs consumed by the frontend React dashboard.

---

## 📂 Folder Structure
```
backend/
├── data/
│ └── data.csv # Raw detection CSV (seed input)
├── db/
│ └── database.sqlite # SQLite DB (created after seed)
├── seed.js # Seeder script (load CSV into DB)
├── server.js # Express server + API routes
├── package.json
└── README.md
```

---

## 🛠️ Setup & Run

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Seed database
```bash
npm run seed
```
- Loads data from `data/data.csv` into `detections` table.
- By default, seeds 10,000 rows (configurable in seed.js).

### 3. Start backend server
```bash
npm start
```
Backend runs by default at `http://localhost:5000`.


## 🔮 Upcoming Enhancements

- Filters: time range, vest violations, overspeed.