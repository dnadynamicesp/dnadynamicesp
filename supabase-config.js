// DNA Dynamic Supabase public client configuration.
// This is the publishable/anon key. Never place a service-role or secret key here.
const SUPABASE_URL = "https://bettpzlolavfqewwpwyv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8EfDUE0j5cbIhNVP6kEHDQ_58MsmAWV";
window.dnaSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
