import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/lib/supabaseClient";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignup = async () => {
    if (!agree) return alert("You must agree to the terms to continue.");
    if (password !== confirmPassword) return alert("Passwords do not match.");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        },
      },
    });

    if (error) {
      alert("Signup failed: " + error.message);
    } else {
      alert("Signup successful! Please check your email to confirm your account.");
      // TODO: Redirect to login or dashboard
    }
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium leading-none">
                  First name
                </label>
                <Input
                  id="first-name"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium leading-none">
                  Last name
                </label>
                <Input
                  id="last-name"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium leading-none">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium leading-none">
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agree} onCheckedChange={() => setAgree(!agree)} />
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
            <Button className="w-full" onClick={handleSignup}>
              Create Account
            </Button>
          </div>
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
