
import { useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabaseClient"
import { useNavigate } from "react-router-dom"

export const RoleRedirect = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return

    if (!user) {
      navigate("/login")
      return
    }

    async function fetchRole() {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (error || !data) {
        console.error("Failed to fetch role:", error)
        return
      }

      switch (data.role) {
        case "admin":
          navigate("/admin/dashboard")
          break
        case "turf_owner":
          navigate("/owner/dashboard")
          break
        case "customer":
        default:
          navigate("/customer/home")
          break
      }
    }

    fetchRole()
  }, [user, loading, navigate])

  return <div>Checking access...</div>
}
