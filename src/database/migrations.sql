
-- Create turfs table
CREATE TABLE IF NOT EXISTS public.turfs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  sport TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image TEXT,
  amenities TEXT[] DEFAULT '{}',
  rating DECIMAL(3,2) DEFAULT 4.5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  turf_id UUID REFERENCES public.turfs(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  payment_status TEXT DEFAULT 'paid' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fix profiles table if it doesn't exist or has issues
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'turf_owner', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.turfs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to prevent conflicts
DROP POLICY IF EXISTS "Users can view all turfs" ON public.turfs;
DROP POLICY IF EXISTS "Owners can manage their turfs" ON public.turfs;
DROP POLICY IF EXISTS "Users can view their bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their profile" ON public.profiles;

-- Turfs policies
CREATE POLICY "Users can view all turfs" ON public.turfs
  FOR SELECT USING (true);

CREATE POLICY "Owners can manage their turfs" ON public.turfs
  FOR ALL USING (auth.uid() = owner_id);

-- Bookings policies
CREATE POLICY "Users can view their bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Profiles policies
CREATE POLICY "Users can view their profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR auth.uid() = user_id);

CREATE POLICY "Users can update their profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id OR auth.uid() = user_id);

CREATE POLICY "Users can insert their profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id OR auth.uid() = user_id);

-- Insert sample turfs data
INSERT INTO public.turfs (name, location, sport, price, description, image, amenities, owner_id) VALUES
('Green Valley Football Turf', 'Mahavishnu Nagar, Mortandi', 'Football', 500.00, 'A premium football turf with well-maintained grass and excellent facilities.', '/placeholder.svg', ARRAY['Parking', 'Changing Rooms', 'Floodlights', 'Water'], '00000000-0000-0000-0000-000000000000'),
('Elite Cricket Ground', 'Anna Nagar, Pondicherry', 'Cricket', 800.00, 'Professional cricket ground with proper pitch and boundary markings.', '/placeholder.svg', ARRAY['Parking', 'Changing Rooms', 'Floodlights', 'Scoreboard'], '00000000-0000-0000-0000-000000000000'),
('Basketball Arena', 'Lawspet, Pondicherry', 'Basketball', 300.00, 'Indoor basketball court with wooden flooring and proper lighting.', '/placeholder.svg', ARRAY['Parking', 'AC', 'Changing Rooms', 'Water'], '00000000-0000-0000-0000-000000000000'),
('Tennis Club', 'White Town, Pondicherry', 'Tennis', 400.00, 'Professional tennis court with synthetic surface and net.', '/placeholder.svg', ARRAY['Parking', 'Changing Rooms', 'Equipment Rental'], '00000000-0000-0000-0000-000000000000')
ON CONFLICT DO NOTHING;

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
