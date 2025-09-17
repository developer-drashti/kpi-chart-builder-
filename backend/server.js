import express from "express";
import sqlite3 from "sqlite3";
import path from "path";

const app = express();
const PORT = 5000;

// Connect to DB
const dbFile = path.join(process.cwd(), "data", "kpi.db");
const db = new sqlite3.Database(dbFile);

// Simple test route
app.get("/", (req, res) => {
  res.send("✅ KPI Backend running with sqlite3");
});

// Aggregate API
app.get("/api/aggregate", async (req, res) => {
  try {
    const {
      metric = "count",
      group_by = "type",
      start_time,
      end_time,
      types,
      areas,
      min_speed,
      max_speed,
      vest,
      min_heading,
      max_heading,
    } = req.query;

    // WHERE clauses
    const conditions = [];
    const params = [];

    if (start_time && end_time) {
      conditions.push("timestamp BETWEEN ? AND ?");
      params.push(start_time, end_time);
    }

    if (types) {
      const arr = types.split(",");
      conditions.push(`type IN (${arr.map(() => "?").join(",")})`);
      params.push(...arr);
    }

    if (areas) {
      const arr = areas.split(",");
      conditions.push(`area IN (${arr.map(() => "?").join(",")})`);
      params.push(...arr);
    }

    if (min_speed && max_speed) {
      conditions.push("speed BETWEEN ? AND ?");
      params.push(min_speed, max_speed);
    }

    if (vest === "1" || vest === "0") {
      conditions.push("vest = ?");
      params.push(vest);
    }

    if (min_heading && max_heading) {
      conditions.push("heading BETWEEN ? AND ?");
      params.push(min_heading, max_heading);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    let sql;
    switch (metric) {
      case "count":
        sql = `SELECT ${group_by}, COUNT(*) AS count 
               FROM detections ${whereClause} 
               GROUP BY ${group_by} ORDER BY count DESC;`;
        break;
      case "unique_ids":
        sql = `SELECT ${group_by}, COUNT(DISTINCT id) AS unique_ids 
               FROM detections ${whereClause} 
               GROUP BY ${group_by} ORDER BY unique_ids DESC;`;
        break;
      case "rate":
        sql = `SELECT ${group_by}, COUNT(*) * 1.0 / 
                  ((julianday(MAX(timestamp)) - julianday(MIN(timestamp))) * 24.0) AS rate 
               FROM detections ${whereClause} 
               GROUP BY ${group_by} ORDER BY rate DESC;`;
        break;
      default:
        return res.status(400).json({ error: "Unsupported metric" });
    }

    const rows = await new Promise((resolve, reject) => {
      db.all(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    res.json(rows || []);
  } catch (err) {
    console.error("Aggregate query error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
