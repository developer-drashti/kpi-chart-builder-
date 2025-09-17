import fs from "fs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import csvParser from "csv-parser";

const dbFile = "./db/database.sqlite";
const csvFile = "./data/data.csv";

const ROW_LIMIT = 10000; // ✅ limit seeding rows

async function seed() {
  const db = await open({
    filename: dbFile,
    driver: sqlite3.Database,
  });

  // Drop old table if exists
  await db.exec(`DROP TABLE IF EXISTS detections;`);

  // Create table
  await db.exec(`
    CREATE TABLE detections (
      type TEXT,
      x REAL,
      y REAL,
      id TEXT,
      speed REAL,
      heading REAL,
      area REAL,
      vest TEXT,
      with_object TEXT,
      timestamp TEXT
    );
  `);

  // Indexes for performance
  await db.exec(`CREATE INDEX idx_type ON detections(type);`);
  await db.exec(`CREATE INDEX idx_area ON detections(area);`);
  await db.exec(`CREATE INDEX idx_vest ON detections(vest);`);
  await db.exec(`CREATE INDEX idx_timestamp ON detections(timestamp);`);

  const insertStmt = await db.prepare(`
    INSERT INTO detections (type, x, y, id, speed, heading, area, vest, with_object, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let rowCount = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFile)
      .pipe(csvParser())
      .on("data", async (row) => {
        if (rowCount >= ROW_LIMIT) return; // ✅ stop at 20k
        try {
          await insertStmt.run([
            row.type,
            row.x,
            row.y,
            row.id,
            row.speed,
            row.heading,
            row.area,
            row.vest,
            row.with_object,
            row.timestamp,
          ]);
          rowCount++;
        } catch (err) {
          console.error("Insert error:", err.message);
        }
      })
      .on("end", async () => {
        await insertStmt.finalize();
        console.log(`✅ Seed complete. Inserted ${rowCount} rows.`);
        resolve();
      })
      .on("error", reject);
  });
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
});
