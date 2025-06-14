
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Privacy() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">🔒 TurfX – Privacy Policy</h1>
        <p className="mb-8 text-muted-foreground">
          At <strong>TurfX</strong>, your privacy is important to us. This Privacy Policy outlines how we collect, use, store, and protect your information when you use our platform.
        </p>

        <div className="prose max-w-none text-sm space-y-5 text-foreground">
          <h2 className="font-bold text-lg">1. Information We Collect</h2>
          <h3 className="font-semibold mt-3">🧑 Personal Information</h3>
          <ul className="list-disc ml-6">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Profile photo (optional)</li>
            <li>Payment information (processed via secure third-party gateways)</li>
          </ul>
          <h3 className="font-semibold mt-3">📍 Usage Data</h3>
          <ul className="list-disc ml-6">
            <li>IP address</li>
            <li>Browser type and device info</li>
            <li>Date and time of access</li>
            <li>Pages visited and actions taken</li>
          </ul>
          <h2 className="font-bold text-lg">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6">
            <li>Create and manage your TurfX account</li>
            <li>Enable turf browsing and booking</li>
            <li>Send booking confirmations and updates</li>
            <li>Improve our platform’s functionality and performance</li>
            <li>Prevent fraud and ensure platform security</li>
            <li>Communicate promotional offers (with your consent)</li>
          </ul>
          <h2 className="font-bold text-lg">3. Who We Share It With</h2>
          <p>
            We <strong>do not sell</strong> your personal data. We only share it with:
          </p>
          <ul className="list-disc ml-6">
            <li>Turf owners (for managing your booking)</li>
            <li>Payment gateways (e.g., Razorpay, Stripe)</li>
            <li>Analytics providers (e.g., Google Analytics)</li>
            <li>Legal authorities (only if required by law)</li>
          </ul>
          <h2 className="font-bold text-lg">4. Cookies & Tracking</h2>
          <ul className="list-disc ml-6">
            <li>Remember your preferences</li>
            <li>Improve your user experience</li>
            <li>Analyze site usage</li>
          </ul>
          <p>
            You can disable cookies via your browser settings, but this may affect site functionality.
          </p>
          <h2 className="font-bold text-lg">5. Data Security</h2>
          <ul className="list-disc ml-6">
            <li>Supabase secure database with Row-Level Security (RLS)</li>
            <li>HTTPS encryption</li>
            <li>Strong access controls</li>
            <li>Regular security updates</li>
          </ul>
          <h2 className="font-bold text-lg">6. Your Rights</h2>
          <ul className="list-disc ml-6">
            <li>Access your data</li>
            <li>Correct or update personal information</li>
            <li>Request deletion of your account/data</li>
            <li>Opt out of marketing emails</li>
          </ul>
          <p>
            To do so, contact us at <a href="mailto:turfxofficial@gmail.com" className="underline">turfxofficial@gmail.com</a>
          </p>
          <h2 className="font-bold text-lg">7. Data Retention</h2>
          <p>
            We retain your data as long as your account is active or as needed to fulfill bookings, comply with legal obligations, and resolve disputes.
          </p>
          <h2 className="font-bold text-lg">8. Children's Privacy</h2>
          <p>
            TurfX is not intended for children under 13. We do not knowingly collect data from minors without parental consent.
          </p>
          <h2 className="font-bold text-lg">9. Policy Updates</h2>
          <p>
            We may update this Privacy Policy to reflect changes in law or our services. Users will be notified of major updates via email or platform notification.
          </p>
          <h2 className="font-bold text-lg">10. Contact Us</h2>
          <ul className="ml-6">
            <li>
              📧 <strong>Email</strong>: <a href="mailto:turfxofficial@gmail.com" className="underline">turfxofficial@gmail.com</a>
            </li>
            <li>
              📱 <strong>Instagram</strong>: <a href="https://instagram.com/turfxofficial" target="_blank" className="underline">@turfxofficial</a>
            </li>
          </ul>
        </div>

        <Button variant="secondary" className="mt-8 w-full" onClick={() => navigate(-1)}>
          Close
        </Button>
      </div>
    </Layout>
  );
}
