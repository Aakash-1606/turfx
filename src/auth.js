
import { supabase } from './supabaseClient';

export const signUpUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
};

export const signInUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

export const logoutUser = async () => {
  await supabase.auth.signOut();
};

// Get current user
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  return data?.session?.user || null;
};
