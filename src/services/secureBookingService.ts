
import { supabase } from '@/lib/supabaseClient';
import { bookingSchema } from '@/lib/validationSchemas';

export const createSecureBooking = async (bookingData: any) => {
  // Validate input
  const validatedData = bookingSchema.parse(bookingData);
  
  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('Authentication required');
  }

  // Create booking with user ID
  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      ...validatedData,
      user_id: user.id,
    }])
    .select();
  
  if (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking');
  }
  
  return data;
};

export const getUserSecureBookings = async () => {
  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('Authentication required');
  }

  // Fetch only user's bookings
  const { data, error } = await supabase
    .from('bookings')
    .select('*, turfs(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching user bookings:', error);
    throw new Error('Failed to fetch bookings');
  }
  
  return data;
};

export const cancelSecureBooking = async (bookingId: string) => {
  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('Authentication required');
  }

  // Verify booking ownership before deletion
  const { data: booking, error: fetchError } = await supabase
    .from('bookings')
    .select('user_id')
    .eq('id', bookingId)
    .single();

  if (fetchError || !booking) {
    throw new Error('Booking not found');
  }

  if (booking.user_id !== user.id) {
    throw new Error('Unauthorized: You can only cancel your own bookings');
  }

  // Delete the booking
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId)
    .eq('user_id', user.id); // Double check ownership

  if (error) {
    console.error('Error cancelling booking:', error);
    throw new Error('Failed to cancel booking');
  }
};
