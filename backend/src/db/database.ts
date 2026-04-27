import { createClient } from '@supabase/supabase-js';
import postgres from 'postgres';

// Env is loaded from backend/.env (local `npm run dev`) or Docker `env_file: ./backend/.env`.

// ── Supabase REST client ─────────────────────────────────────────
const supabaseUrl = process.env.SUPABASE_URL?.trim();
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY?.trim();
const supabasePublishableKey =
  process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ?? process.env.SUPABASE_ANON_KEY?.trim();
const supabaseApiKey = supabaseSecretKey || supabasePublishableKey;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not set');
}

if (!supabaseApiKey) {
  throw new Error(
    'SUPABASE_SECRET_KEY or SUPABASE_PUBLISHABLE_KEY/SUPABASE_ANON_KEY is not set',
  );
}

function looksLikeStorageSecretKey(v: string): boolean {
  // The local `supabase start` output prints an S3 "Secret Key" that is a long hex string.
  // People frequently paste that into SUPABASE_SECRET_KEY by accident.
  return /^[a-f0-9]{64,}$/i.test(v.trim()) && !v.trim().startsWith('sb_secret_');
}

if (supabaseSecretKey && looksLikeStorageSecretKey(supabaseSecretKey)) {
  throw new Error(
    [
      'SUPABASE_SECRET_KEY looks like the Storage (S3) Secret Key (hex).',
      'Use the value from `supabase start` under "Authentication Keys → Secret" (starts with `sb_secret_`).',
    ].join(' '),
  );
}

export const supabase = createClient(supabaseUrl, supabaseApiKey);

// ── Direct Postgres connection (via postgres.js) ─────────────────
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

export const sql = postgres(connectionString);
