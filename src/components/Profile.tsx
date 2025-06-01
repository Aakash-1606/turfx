import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Make sure your Supabase client is correctly set up
import { useAuth } from "@/contexts/AuthContext"; // Your AuthContext should provide the logged-in user

interface Profile {
  first_name: string;
  last_name: string;
  phone: string;
}

export default function Profile() {
  const { user } = useAuth(); // Get the logged-in user from context
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, phone")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch profile data");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!profile) return <p>No profile data available.</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
      <p><strong>First Name:</strong> {profile.first_name}</p>
      <p><strong>Last Name:</strong> {profile.last_name}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
    </div>
  );
}
