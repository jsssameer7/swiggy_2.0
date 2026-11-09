import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://iqqhfimlenfnphdsewaj.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_QNPgo1SsS7PQ1Cl-xHijFQ_6ngK9TkA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false
  }
});

export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    if (error) {
      if (error.code === 'PGRST205' || error.message?.includes('Could not find the table')) {
        return {
          connected: true,
          tablesCreated: false,
          url: SUPABASE_URL,
          message: "Connected to Supabase project! PostgreSQL tables ready to initialize (Schema SQL provided in app)."
        };
      }
      return {
        connected: false,
        tablesCreated: false,
        url: SUPABASE_URL,
        message: error.message
      };
    }
    return {
      connected: true,
      tablesCreated: true,
      url: SUPABASE_URL,
      message: "Connected to Supabase with live tables active!"
    };
  } catch (err) {
    return {
      connected: false,
      tablesCreated: false,
      url: SUPABASE_URL,
      message: err.message
    };
  }
}
