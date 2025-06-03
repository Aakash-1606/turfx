
import { supabase } from '@/lib/supabaseClient';

export interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'customer' | 'turf_owner' | 'admin';
  created_at: string;
  updated_at: string;
}

// Get user profile
export const getUserProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return data;
};

// Create or update user profile
export const upsertUserProfile = async (profileData: Partial<Profile>): Promise<Profile> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      ...profileData,
      user_id: user.id,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error upserting profile:', error);
    throw error;
  }
  
  return data;
};

// Create initial profile after signup
export const createInitialProfile = async (userData: {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: 'customer' | 'turf_owner';
}): Promise<Profile> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert([{
      user_id: user.id,
      first_name: userData.firstName || '',
      last_name: userData.lastName || '',
      phone: '',
      role: userData.role || 'customer',
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
  
  return data;
};
