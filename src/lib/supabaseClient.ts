// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avsdrcsjqoqcdmketnze.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2c2RyY3NqcW9xY2Rta2V0bnplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2ODY3NTMsImV4cCI6MjA2MjI2Mjc1M30.c9fKR2-iWVYPbiEmDldFthMbIvQkfa1dZx9n21gH_08';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
