import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Adjust path if needed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, // Ensure this route exists
    });

    if (error) {
      setMessage(error.message);
      setStatus("error");
    } else {
      setMessage("Password reset link sent! Check your email.");
      setStatus("success");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Reset Your Password</h2>

      {status !== "idle" && (
        <Alert variant={status === "success" ? "default" : "destructive"} className="mb-4">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handlePasswordReset} className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
