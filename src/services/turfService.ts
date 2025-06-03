
import { supabase } from '@/lib/supabaseClient';

export interface Turf {
  id: string;
  owner_id: string;
  name: string;
  location: string;
  sport: string;
  price: number;
  description?: string;
  image?: string;
  amenities: string[];
  rating: number;
  created_at: string;
  updated_at: string;
}

// Get all turfs
export const getAllTurfs = async (): Promise<Turf[]> => {
  const { data, error } = await supabase
    .from('turfs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching turfs:', error);
    throw error;
  }
  
  return data || [];
};

// Get a single turf by ID
export const getTurfById = async (id: string): Promise<Turf | null> => {
  const { data, error } = await supabase
    .from('turfs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching turf:', error);
    throw error;
  }
  
  return data;
};

// Add a new turf (for turf owners)
export const addTurf = async (turfData: Omit<Turf, 'id' | 'owner_id' | 'created_at' | 'updated_at'>): Promise<Turf> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to add a turf');
  }

  const { data, error } = await supabase
    .from('turfs')
    .insert([{
      ...turfData,
      owner_id: user.id,
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding turf:', error);
    throw error;
  }
  
  return data;
};

// Update a turf
export const updateTurf = async (id: string, turfData: Partial<Omit<Turf, 'id' | 'owner_id' | 'created_at' | 'updated_at'>>): Promise<Turf> => {
  const { data, error } = await supabase
    .from('turfs')
    .update({
      ...turfData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating turf:', error);
    throw error;
  }
  
  return data;
};

// Delete a turf
export const deleteTurf = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('turfs')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting turf:', error);
    throw error;
  }
};

// Get turfs by owner
export const getTurfsByOwner = async (ownerId: string): Promise<Turf[]> => {
  const { data, error } = await supabase
    .from('turfs')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching owner turfs:', error);
    throw error;
  }
  
  return data || [];
};
