/**
 * Database connection and configuration
 * Supports SQLite (development) and PostgreSQL (Neon/PlanetScale for production)
 */

import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

// For production, switch to PostgreSQL
// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';

let db: ReturnType<typeof drizzle>;

export function getDb() {
	if (!db) {
		// Development: SQLite
		const dbPath = process.env.DATABASE_URL || './local.db';
		const sqlite = new Database(dbPath);
		db = drizzle(sqlite, { schema });

		// Production: PostgreSQL (uncomment when ready)
		// const connectionString = process.env.DATABASE_URL;
		// if (!connectionString) {
		//   throw new Error('DATABASE_URL is required for production');
		// }
		// const client = postgres(connectionString);
		// db = drizzle(client, { schema });
	}

	return db;
}

export { schema };

