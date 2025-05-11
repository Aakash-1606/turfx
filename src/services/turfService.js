
import { supabase } from '../supabaseClient';

// Get all turfs
export const getAllTurfs = async () => {
  const { data, error } = await supabase
    .from('turfs')
    .select('*');
  
  if (error) {
    console.error('Error fetching turfs:', error);
    throw error;
  }
  
  return data;
};

// Get a single turf by ID
export const getTurfById = async (id) => {
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
export const addTurf = async (turfData) => {
  const { data, error } = await supabase
    .from('turfs')
    .insert([turfData])
    .select();
  
  if (error) {
    console.error('Error adding turf:', error);
    throw error;
  }
  
  return data;
};

// Update a turf
export const updateTurf = async (id, turfData) => {
  const { data, error } = await supabase
    .from('turfs')
    .update(turfData)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating turf:', error);
    throw error;
  }
  
  return data;
};
