
import { createClient } from '@supabase/supabase-js';

// Set up Supabase with default values for development
// These values will be overridden by environment variables when provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
