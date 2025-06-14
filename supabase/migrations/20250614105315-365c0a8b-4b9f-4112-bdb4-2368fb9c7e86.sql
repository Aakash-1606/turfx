
-- Drop the existing RLS policy for inserting profiles, if it exists
DROP POLICY IF EXISTS "Users can insert their profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow all inserts for now" ON public.profiles; -- Cleanup from previous thinking

-- Recreate a more specific RLS policy for inserting profiles that should work with the trigger
-- This policy ensures that the 'id' of the profile being inserted matches the current authenticated user's ID.
-- In the context of the handle_new_user trigger, auth.uid() is the ID of the new user.
CREATE POLICY "Users can insert their own profile via trigger" ON public.profiles
  FOR INSERT
  WITH CHECK (id = auth.uid());

-- Explicitly grant INSERT on public.profiles to postgres (owner role, should be redundant but for safety)
GRANT INSERT ON TABLE public.profiles TO postgres;

-- Explicitly grant EXECUTE on the trigger function to postgres (owner role, should be redundant)
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres;

-- Grant USAGE on the public schema to the authenticator role (used by RLS)
GRANT USAGE ON SCHEMA public TO authenticator;

-- Grant SELECT on public.profiles to authenticator (RLS check expressions might perform reads)
GRANT SELECT ON TABLE public.profiles TO authenticator;

-- Ensure the supabase_auth_admin role (involved in auth operations) can execute the trigger function
-- This role triggers the operation on auth.users
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_auth_admin;
