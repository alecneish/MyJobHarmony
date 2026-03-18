import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not set');
}

if (!supabaseSecretKey) {
  throw new Error('SUPABASE_SECRET_KEY is not set');
}

function looksLikeStorageSecretKey(v: string): boolean {
  // The local `supabase start` output prints an S3 "Secret Key" that is a long hex string.
  // People frequently paste that into SUPABASE_SECRET_KEY by accident.
  return /^[a-f0-9]{64,}$/i.test(v.trim()) && !v.trim().startsWith('sb_secret_');
}

if (looksLikeStorageSecretKey(supabaseSecretKey)) {
  throw new Error(
    [
      'SUPABASE_SECRET_KEY looks like the Storage (S3) Secret Key (hex).',
      'Use the value from `supabase start` under "Authentication Keys → Secret" (starts with `sb_secret_`).',
    ].join(' '),
  );
}

export const supabase = createClient(supabaseUrl, supabaseSecretKey);
