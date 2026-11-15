import { Pool } from "pg";
import ENV from "#config/env.js";

const db = new Pool({
   host: ENV.DB_HOST,
   port: Number(ENV.DB_PORT),
   user: ENV.DB_USER,
   password: ENV.DB_PASSWORD,
   database: ENV.DB_NAME,
   ssl: {
      rejectUnauthorized: false,
   },
   max: 10,
   idleTimeoutMillis: 30000,
   connectionTimeoutMillis: 10000,
});

db.on("error", (error) => {
   console.error("PostgreSQL pool error:", error);
});

export default db;
