
import { supabase } from '@/lib/supabaseClient';

export interface Booking {
  id: string;
  user_id: string;
  turf_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface BookingWithTurf extends Booking {
  turf: {
    name: string;
    location: string;
    sport: string;
    image?: string;
  };
}

// Create a new booking
export const createBooking = async (bookingData: {
  turf_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  total_price: number;
}): Promise<Booking> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to create a booking');
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      ...bookingData,
      user_id: user.id,
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
  
  return data;
};

// Get user's bookings
export const getUserBookings = async (): Promise<BookingWithTurf[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to view bookings');
  }

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      turf:turfs (
        name,
        location,
        sport,
        image
      )
    `)
    .eq('user_id', user.id)
    .order('booking_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
  
  return data || [];
};

// Check availability for a time slot
export const checkAvailability = async (
  turfId: string,
  date: string,
  startTime: string,
  endTime: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('turf_id', turfId)
    .eq('booking_date', date)
    .neq('status', 'cancelled')
    .or(`and(start_time.lte.${endTime},end_time.gte.${startTime})`);
  
  if (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
  
  return data.length === 0;
};

// Update booking status
export const updateBookingStatus = async (
  bookingId: string,
  status: 'pending' | 'confirmed' | 'cancelled'
): Promise<Booking> => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', bookingId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
  
  return data;
};
