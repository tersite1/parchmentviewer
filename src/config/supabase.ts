import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://qkvvwkimzdztalstfgol.supabase.co';
const SUPABASE_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdnZ3a2ltemR6dGFsc3RmZ29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0ODMwNzMsImV4cCI6MjA5NDA1OTA3M30.qc4rlq7weETPbxrEuN_OBZZzE04evVf4Oe7Ev6smTdw';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
