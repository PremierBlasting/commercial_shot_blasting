import mysql from 'mysql2/promise';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) { console.error('DATABASE_URL not set'); process.exit(1); }

const conn = await mysql.createConnection(dbUrl);
await conn.query(`
  CREATE TABLE IF NOT EXISTS service_area_content (
    id int AUTO_INCREMENT NOT NULL,
    slug varchar(255) NOT NULL,
    customContent text NOT NULL,
    lastRefreshed timestamp NOT NULL DEFAULT (now()),
    createdAt timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT service_area_content_id PRIMARY KEY(id),
    CONSTRAINT service_area_content_slug_unique UNIQUE(slug)
  )
`);
console.log('Table created successfully');
await conn.end();
