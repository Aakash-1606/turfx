import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export const RoleRedirect = () => {
  const { user, loading } = useAuth();
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    async function fetchRole() {
      setChecking(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || !data?.role) {
        console.error("Failed to fetch role or role is missing:", error);
        navigate("/login");
        return;
      }

      switch (data.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "turf_owner":
          navigate("/owner/dashboard");
          break;
        case "customer":
          navigate("/customer/home");
          break;
        default:
          console.warn("Unknown role:", data.role);
          navigate("/login");
          break;
      }

      setChecking(false);
    }

    fetchRole();
  }, [user, loading, navigate]);

  if (loading || checking) {
    return <div className="p-4 text-muted text-center">Checking access...</div>;
  }

  return null;
};
