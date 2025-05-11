
import { supabase } from '../supabaseClient';

// Get user profile
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
  
  return data;
};

// Create or update user profile
export const upsertUserProfile = async (profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profileData)
    .select();
  
  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
  
  return data;
};
