import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { handleError, validateInput } from "@/lib/errorHandler";
import { signupSchema, SignupFormData } from "@/lib/validationSchemas";
import { toast } from "sonner";

export default function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agree) {
      toast.error("You must agree to the terms to continue.");
      return;
    }

    setLoading(true);

    try {
      // Validate input
      const validatedData = validateInput(formData, signupSchema);

      const { error } = await signUp(validatedData.email, validatedData.password, {
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        phone: validatedData.phone,
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists');
        } else {
          handleError(error, 'Signup failed');
        }
      } else {
        toast.success("Signup successful! Please check your email to confirm your account.");
        navigate("/login");
      }
    } catch (error) {
      handleError(error, 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="container flex items-center justify-center py-16">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="mt-2 text-muted-foreground">
              Sign up to start booking sports turfs
            </p>
          </div>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium leading-none">
                  First name
                </label>
                <Input
                  id="first-name"
                  placeholder=""
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium leading-none">
                  Last name
                </label>
                <Input
                  id="last-name"
                  placeholder=""
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder=""
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
              <label htmlFor="phone" className="text-sm font-medium leading-none">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder=""
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder=""
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium leading-none">
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder=""
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agree} 
                onCheckedChange={(checked) => setAgree(checked as boolean)} 
              />
              <label htmlFor="terms" className="text-sm font-medium leading-none">
                I agree to the{" "}
                <Link to="/terms" className="text-primary underline-offset-4 hover:underline">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary underline-offset-4 hover:underline">
                  privacy policy
                </Link>
              </label>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || !agree}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
