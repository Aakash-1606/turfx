import { supabase } from '@/lib/supabaseClient';
import { Turf } from './turfService';

export interface CreateTurfOwnerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AdminTurfData extends Omit<Turf, 'id' | 'created_at' | 'updated_at'> {
  ownerEmail?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  ownerPhone?: string;
}

// Create new turf owner account with improved error handling
export const createTurfOwnerAccount = async (ownerData: CreateTurfOwnerData): Promise<string> => {
  console.log('Creating turf owner account:', ownerData.email);
  
  try {
    // First, check if we have admin privileges by checking current user role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Authentication required');
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      throw new Error('Admin privileges required to create user accounts');
    }

    // Create auth user with metadata that will be used by the trigger
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: ownerData.email,
      password: ownerData.password,
      options: {
        data: {
          first_name: ownerData.firstName,
          last_name: ownerData.lastName,
          phone: ownerData.phone || '',
          role: 'turf_owner'
        }
      }
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      throw new Error(`Failed to create user account: ${authError.message}`);
    }

    if (!authData.user) {
      throw new Error('Failed to create user account');
    }

    // The database trigger should now handle profile creation automatically
    // Wait a moment for the trigger to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verify profile was created
    const { data: profile: userProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('id', authData.user.id)
      .single();

    if (profileCheckError || !userProfile) {
      console.error('Profile verification failed:', profileCheckError);
      throw new Error('User account created but profile setup failed');
    }

    console.log('Turf owner account created successfully:', authData.user.id);
    return authData.user.id;
  } catch (error: any) {
    console.error('Error in createTurfOwnerAccount:', error);
    throw error;
  }
};

// Admin function to add turf with new owner - simplified approach
export const adminAddTurfWithOwner = async (turfData: AdminTurfData): Promise<Turf> => {
  console.log('Admin adding turf with owner:', turfData);
  
  let ownerId: string;

  try {
    // If owner details are provided, create new owner account
    if (turfData.ownerEmail && turfData.ownerFirstName && turfData.ownerLastName) {
      ownerId = await createTurfOwnerAccount({
        email: turfData.ownerEmail,
        password: 'TempPassword123!', // Temporary password - owner should change it
        firstName: turfData.ownerFirstName,
        lastName: turfData.ownerLastName,
        phone: turfData.ownerPhone
      });
    } else {
      // Use current admin as owner (fallback)
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Must be authenticated to add turf');
      }
      ownerId = user.id;
    }

    // Create the turf with improved error handling
    const { data, error } = await supabase
      .from('turfs')
      .insert([{
        name: turfData.name,
        location: turfData.location,
        sport: turfData.sport,
        price: turfData.price,
        price_per_hour: turfData.price_per_hour,
        capacity: turfData.capacity,
        description: turfData.description,
        image: turfData.image,
        amenities: turfData.amenities,
        rating: turfData.rating || 4.0,
        owner_id: ownerId,
        is_active: true
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating turf:', error);
      throw new Error(`Failed to create turf: ${error.message}`);
    }

    console.log('Turf created successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Error in adminAddTurfWithOwner:', error);
    throw error;
  }
};

export const adminUpdateTurf = async (id: string, turfData: Partial<Omit<Turf, 'id' | 'created_at' | 'updated_at'>>): Promise<Turf> => {
  console.log('Admin updating turf:', id, turfData);
  
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
    throw new Error(`Failed to update turf: ${error.message}`);
  }

  console.log('Turf updated successfully:', data);
  return data;
};

export const adminGetAllTurfs = async (): Promise<Turf[]> => {
  const { data, error } = await supabase
    .from('turfs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all turfs:', error);
    throw error;
  }

  return data || [];
};

export const adminDeleteTurf = async (id: string): Promise<void> => {
  console.log('Admin deleting turf:', id);
  
  const { error } = await supabase
    .from('turfs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting turf:', error);
    throw new Error(`Failed to delete turf: ${error.message}`);
  }

  console.log('Turf deleted successfully');
};
