# KPI Dashboard - Frontend

This is the **React.js frontend** for the KPI Dashboard project.  
It provides an interactive UI for building and visualizing **Key Performance Indicators (KPIs)** from industrial detection data.

## 🚀 Features

- Built with **React.js** + **Material-UI (MUI)** for styled components.
- Users can:
  - Select a metric (count, unique IDs, rate/hour).
  - Choose a grouping (class, area, id, etc.).
  - Select chart type (**Bar, Line**).
  - Preview results instantly.
- Uses **Chart.js (react-chartjs-2)** for chart rendering.
- Communicates with the **backend API (Express + SQLite)**.

## 📂 Folder Structure

frontend/
├── public/ # Static assets
├── src/
│ ├── components/
│ │ ├── KPIForm.jsx # Form for selecting metrics and groupings
│ │ ├── KPIChart.jsx # Chart/Table renderer
│ ├── services/
│ │ └── api.js # API calls (fetchAggregate, etc.)
│ ├── App.jsx # Main entry component
│ ├── index.js # React root render
├── package.json
└── README.md

## 🛠️ Setup & Run

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Start the frontend

```bash
npm start
```

## 🔗 API Connection

The frontend communicates with the backend API running on `http://localhost:5000/api`.
Example endpoint:

```bash
http://localhost:5000/api/aggregate?metric=count&group_by=class
```

## 📊 Functionality Demo

- Select metric and group_by.
- Pick a chart type (Bar, Line, Area, Table).
- Click Submit → data loads from backend.
- Preview results interactively.

## 🔗 Upcoming Enhancements

- Add TypeScript for type safety.
- Save/share KPI presets.
- Filters (time range, speed thresholds, vest violations).
