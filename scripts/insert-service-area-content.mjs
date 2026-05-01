/**
 * Inserts fresh service area content directly into the database.
 * Run with: node scripts/insert-service-area-content.mjs
 */
import mysql from "mysql2/promise";
import { readFileSync } from "fs";

const data = JSON.parse(readFileSync("/home/ubuntu/service_area_content_refresh.json", "utf8"));

const conn = await mysql.createConnection(process.env.DATABASE_URL);

let success = 0;
let fail = 0;

for (const item of data.results) {
  const { slug, html_content } = item.output;
  if (!slug || !html_content) { fail++; continue; }
  try {
    await conn.execute(
      `INSERT INTO service_area_content (slug, customContent, lastRefreshed)
       VALUES (?, ?, NOW())
       ON DUPLICATE KEY UPDATE customContent = VALUES(customContent), lastRefreshed = NOW()`,
      [slug, html_content]
    );
    console.log(`✓ ${slug}`);
    success++;
  } catch (err) {
    console.error(`✗ ${slug}: ${err.message}`);
    fail++;
  }
}

await conn.end();
console.log(`\nDone: ${success} inserted, ${fail} failed`);
