import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { config } from 'dotenv';

const result = config({ path: '.env' });

const sql = neon(result?.parsed?.DATEBASE_URL!);
const db = drizzle({ client: sql, schema });

export default db;
