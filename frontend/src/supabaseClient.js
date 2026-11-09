import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://iqqhfimlenfnphdsewaj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_QNPgo1SsS7PQ1Cl-xHijFQ_6ngK9TkA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const SUPABASE_CONFIG = {
  url: SUPABASE_URL,
  key: SUPABASE_ANON_KEY
};
