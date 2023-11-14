import dotenv from "dotenv";
import pgPromise from "pg-promise";

dotenv.config();

if (!process.env.DB_URL) {
  console.error("Missing database configuration");
  process.exit(1);
}

const pgp = pgPromise();

const db = pgp(process.env.DB_URL);

export default db;
