
import { supabase } from '../supabaseClient';

// Create a new booking
export const createBooking = async (bookingData) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select();
  
  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
  
  return data;
};

// Get bookings for a user
export const getUserBookings = async (userId) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, turfs(*)')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
  
  return data;
};

// Get bookings for a turf
export const getTurfBookings = async (turfId) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, user:user_id(email)')
    .eq('turf_id', turfId);
  
  if (error) {
    console.error('Error fetching turf bookings:', error);
    throw error;
  }
  
  return data;
};

// Cancel a booking
export const cancelBooking = async (bookingId) => {
  const { data, error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);
  
  if (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
  
  return data;
};
