
import { supabase } from '@/lib/supabaseClient';
import { Booking, BookingWithTurf } from './bookingService';

// Confirm a booking after payment
export const confirmBooking = async (bookingId: string): Promise<Booking> => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ 
      status: 'confirmed',
      payment_status: 'paid',
      updated_at: new Date().toISOString() 
    })
    .eq('id', bookingId)
    .select()
    .single();
  
  if (error) {
    console.error('Error confirming booking:', error);
    throw error;
  }
  
  return data;
};

// Get upcoming bookings for a user
export const getUpcomingBookings = async (): Promise<BookingWithTurf[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated');
  }

  const today = new Date().toISOString().split('T')[0];
  
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
    .gte('booking_date', today)
    .in('status', ['confirmed', 'pending'])
    .order('booking_date', { ascending: true });
  
  if (error) {
    console.error('Error fetching upcoming bookings:', error);
    throw error;
  }
  
  return data || [];
};

// Cancel a booking
export const cancelBooking = async (bookingId: string): Promise<Booking> => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ 
      status: 'cancelled',
      updated_at: new Date().toISOString() 
    })
    .eq('id', bookingId)
    .select()
    .single();
  
  if (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
  
  return data;
};

// Check if user can cancel booking (must be at least 12 hours before)
export const canCancelBooking = (bookingDate: string, startTime: string): boolean => {
  const bookingDateTime = new Date(`${bookingDate}T${startTime}`);
  const now = new Date();
  const timeDiff = bookingDateTime.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 3600);
  
  return hoursDiff >= 12;
};
