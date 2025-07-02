import { createClient } from '@supabase/supabase-js';

// PUBLIC_INTERFACE
// Create and export the Supabase client for use throughout the app.
// Uses the credentials from .env if available, or else fallback to in-file constants.

// For security and best practices, in a real app, use .env files for keys, never hardcode in frontend!
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://qlliwzcbmortndabvfda.supabase.co';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbGl3emNibW9ydG5kYWJ2ZmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NzA1OTYsImV4cCI6MjA2NzA0NjU5Nn0.RH2HV9h05iO2uZ2eGrN_MN4QEMpXnhMFcAmNaF-KYYs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
