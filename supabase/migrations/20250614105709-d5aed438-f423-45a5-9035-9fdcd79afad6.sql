
-- Grant INSERT to all potential owners (for redundancy)
GRANT INSERT ON public.profiles TO postgres;
GRANT INSERT ON public.profiles TO supabase_admin;
GRANT INSERT ON public.profiles TO supabase_auth_admin;

-- Ensure handle_new_user is SECURITY DEFINER owned by postgres
ALTER FUNCTION public.handle_new_user() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_auth_admin;

-- Grant usage and select for all
GRANT USAGE ON SCHEMA public TO authenticator, supabase_auth_admin, supabase_admin;
GRANT SELECT ON public.profiles TO authenticator, supabase_auth_admin, supabase_admin;
