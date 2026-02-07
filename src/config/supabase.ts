import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://ztkvtcdhagynxledojov.supabase.co';
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY || 'sb_publishable_fauakxUGg_R0cWqu_Cds7A_751bEVvf';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
