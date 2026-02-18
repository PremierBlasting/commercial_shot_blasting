import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env from the project
dotenv.config({ path: '/home/ubuntu/commercial_shot_blasting_manus/.env' });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('DATABASE_URL not found');
  process.exit(1);
}

console.log('Connecting to database...');

const connection = await mysql.createConnection(dbUrl + '&multipleStatements=true');

console.log('Connected! Reading SQL dump...');

const sqlContent = fs.readFileSync('/home/ubuntu/upload/database_export_2026-02-18.sql', 'utf8');

// Split into individual statements, handling multi-line statements
const statements = [];
let current = '';
for (const line of sqlContent.split('\n')) {
  const trimmed = line.trim();
  if (trimmed.startsWith('--') || !trimmed) continue;
  current += line + '\n';
  if (trimmed.endsWith(';')) {
    statements.push(current.trim());
    current = '';
  }
}

console.log(`Found ${statements.length} SQL statements to execute`);

let success = 0;
let errors = 0;

for (let i = 0; i < statements.length; i++) {
  const stmt = statements[i];
  const preview = stmt.substring(0, 80);
  try {
    await connection.execute(stmt);
    success++;
    console.log(`[${i+1}/${statements.length}] OK: ${preview}...`);
  } catch (err) {
    errors++;
    console.error(`[${i+1}/${statements.length}] ERROR: ${preview}...`);
    console.error(`  -> ${err.message}`);
  }
}

console.log(`\nDone! Success: ${success}, Errors: ${errors}`);

// Verify data
const [tables] = await connection.execute('SHOW TABLES');
console.log(`\nTables in database: ${tables.length}`);
for (const row of tables) {
  const tableName = Object.values(row)[0];
  const [countResult] = await connection.execute(`SELECT COUNT(*) as cnt FROM \`${tableName}\``);
  console.log(`  ${tableName}: ${countResult[0].cnt} rows`);
}

await connection.end();
