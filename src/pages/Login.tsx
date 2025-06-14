import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { handleError, validateInput } from "@/lib/errorHandler";
import { loginSchema, LoginFormData } from "@/lib/validationSchemas";
import { toast } from "sonner";
import { NoAccountDialog } from "@/components/NoAccountDialog";
import { supabase } from "@/lib/supabaseClient";
import { useCallback } from "react";

const INVALID_CREDENTIALS_MSG = 'Invalid login credentials';
const EMAIL_NOT_CONFIRMED_MSG = 'Email not confirmed';

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [noAccountOpen, setNoAccountOpen] = useState(false);
  const [notFoundEmail, setNotFoundEmail] = useState("");

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

    // Helper to check if email exists in profiles table
    const checkUserExists = useCallback(async (email: string): Promise<boolean> => {
      const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .limit(1)
        .maybeSingle();
      return !!data;
    }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = validateInput(formData, loginSchema);
      
      const { error } = await signIn(validatedData.email, validatedData.password);

      if (error) {
        if (error.message.includes(INVALID_CREDENTIALS_MSG)) {
          // Check if user exists
          const exists = await checkUserExists(validatedData.email);
          if (!exists) {
            setNotFoundEmail(validatedData.email);
            setNoAccountOpen(true);
          } else {
            toast.error('Invalid email or password');
          }
        } else if (error.message.includes(EMAIL_NOT_CONFIRMED_MSG)) {
          toast.error('Please confirm your email before signing in');
        } else {
          handleError(error, 'Login failed');
        }
      } else {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      }
    } catch (error) {
      handleError(error, 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Layout>
        <div className="container flex items-center justify-center py-16">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="mt-2 text-muted-foreground">
                Enter your credentials to sign in to your account
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </Layout>
      <NoAccountDialog
        open={noAccountOpen}
        onOpenChange={setNoAccountOpen}
        email={notFoundEmail}
      />
    </>
  );
}
