import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

const result = config({ path: '.env' });

if (result.error) {
  console.error('Failed to load .env file:', result.error);
} else {
  console.log('Loaded .env variables:', result.parsed);
}

console.log('DATABASE_URL:', process.env.DATABASE_URL);

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: result?.parsed?.DATEBASE_URL!,
  },
});
