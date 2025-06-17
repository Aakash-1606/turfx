
import { supabase } from '@/integrations/supabase/client';

export interface Turf {
  id: string;
  owner_id: string;
  name: string;
  location: string;
  sport: string;
  price: number;
  price_per_hour: number;
  description?: string;
  image?: string;
  amenities: string[];
  capacity: number;
  rating: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

// Get all turfs with improved error handling and public access
export const getAllTurfs = async (): Promise<Turf[]> => {
  console.log('Fetching all turfs from database...');
  
  try {
    const { data, error } = await supabase
      .from('turfs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching turfs:', error);
      // Don't throw the error, return empty array to prevent page crashes
      console.log('Returning empty array due to fetch error');
      return [];
    }
    
    console.log(`Fetched ${data?.length || 0} turfs from database`);
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching turfs:', error);
    return []; // Return empty array instead of throwing
  }
};

// Get a single turf by ID with better error handling
export const getTurfById = async (id: string): Promise<Turf | null> => {
  console.log('Fetching turf by ID:', id);
  
  try {
    const { data, error } = await supabase
      .from('turfs')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle(); // Use maybeSingle instead of single to handle not found case
    
    if (error) {
      console.error('Error fetching turf:', error);
      return null;
    }
    
    console.log('Turf fetched:', data);
    return data;
  } catch (error) {
    console.error('Unexpected error fetching turf by ID:', error);
    return null;
  }
};

// Add a new turf (for turf owners) with improved error handling
export const addTurf = async (turfData: Omit<Turf, 'id' | 'owner_id' | 'created_at' | 'updated_at'>): Promise<Turf> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to add a turf');
    }

    console.log('Adding new turf for user:', user.id, turfData);

    const { data, error } = await supabase
      .from('turfs')
      .insert([{
        ...turfData,
        owner_id: user.id,
        is_active: true,
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding turf:', error);
      throw new Error(`Failed to add turf: ${error.message}`);
    }
    
    console.log('Turf added successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Error in addTurf:', error);
    throw error;
  }
};

// Update a turf
export const updateTurf = async (id: string, turfData: Partial<Omit<Turf, 'id' | 'owner_id' | 'created_at' | 'updated_at'>>): Promise<Turf> => {
  console.log('Updating turf:', id, turfData);
  
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
  
  console.log('Turf updated successfully:', data);
  return data;
};

// Delete a turf
export const deleteTurf = async (id: string): Promise<void> => {
  console.log('Deleting turf:', id);
  
  const { error } = await supabase
    .from('turfs')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting turf:', error);
    throw error;
  }
  
  console.log('Turf deleted successfully');
};

// Get turfs by owner with improved logging
export const getTurfsByOwner = async (ownerId: string): Promise<Turf[]> => {
  console.log('Fetching turfs for owner:', ownerId);
  
  const { data, error } = await supabase
    .from('turfs')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching owner turfs:', error);
    throw error;
  }
  
  console.log(`Fetched ${data?.length || 0} turfs for owner:`, ownerId);
  return data || [];
};
