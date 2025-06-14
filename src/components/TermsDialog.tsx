
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsDialog({ open, onOpenChange }: TermsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>TurfX – Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please review our Terms and Conditions before using TurfX.
          </DialogDescription>
        </DialogHeader>
        <div className="prose max-w-none text-sm text-foreground space-y-5">
          <h2 className="font-bold text-lg">1. Overview</h2>
          <p>
            TurfX is a digital platform that allows users to browse, book, and review sports turfs across Tamil Nadu and Puducherry. TurfX connects turf owners with customers but does not directly own or operate any turf facilities.
          </p>
          <h2 className="font-bold text-lg">2. Eligibility</h2>
          <ul className="list-disc ml-6">
            <li>You must be at least 13 years old.</li>
            <li>You must agree to provide accurate and up-to-date information.</li>
            <li>You are responsible for maintaining the confidentiality of your account.</li>
          </ul>
          <h2 className="font-bold text-lg">3. Account Registration</h2>
          <ul className="list-disc ml-6">
            <li>Users must create an account to book turfs.</li>
            <li>Admins and turf owners will receive special access privileges.</li>
            <li>You agree not to share your credentials or impersonate others.</li>
          </ul>
          <h2 className="font-bold text-lg">4. Booking Policy</h2>
          <ul className="list-disc ml-6">
            <li>Turf bookings are subject to availability.</li>
            <li>Payment (if applicable) must be made in advance to confirm the booking.</li>
            <li>Users are expected to arrive on time and respect the turf rules.</li>
          </ul>
          <h2 className="font-bold text-lg">5. Cancellation & Refunds</h2>
          <ul className="list-disc ml-6">
            <li>Cancellations can be made up to 24 hours in advance for a full refund.</li>
            <li>No-shows or late cancellations may not be eligible for a refund.</li>
            <li>
              TurfX reserves the right to cancel bookings due to operational issues or turf unavailability (with full refund).
            </li>
          </ul>
          <h2 className="font-bold text-lg">6. User Conduct</h2>
          <ul className="list-disc ml-6">
            <li>Damage or misuse the turf property.</li>
            <li>Use the platform for any illegal or unauthorized purpose.</li>
            <li>Post false reviews or engage in abusive behavior.</li>
          </ul>
          <h2 className="font-bold text-lg">7. Turf Owner Responsibilities</h2>
          <ul className="list-disc ml-6">
            <li>Provide accurate details of the turf (location, amenities, pricing, etc.).</li>
            <li>Ensure that the turf is maintained and safe for use.</li>
            <li>Honor all confirmed bookings unless otherwise stated.</li>
          </ul>
          <h2 className="font-bold text-lg">8. Limitation of Liability</h2>
          <ul className="list-disc ml-6">
            <li>Injuries, damages, or losses occurring on turf premises.</li>
            <li>Disputes between users and turf owners.</li>
            <li>Delays or interruptions in service due to technical issues.</li>
          </ul>
          <h2 className="font-bold text-lg">9. Privacy</h2>
          <p>
            We respect your privacy. Please refer to our <a href="/privacy" className="text-primary underline hover:underline">Privacy Policy</a> for details on how your data is collected and used.
          </p>
          <h2 className="font-bold text-lg">10. Modifications</h2>
          <p>
            TurfX may update these Terms at any time. Users will be notified of major changes via email or platform notice.
          </p>
          <h2 className="font-bold text-lg">12. Contact</h2>
          <p>
            For any queries or support, reach out to: <br />
            📧 Email: <a href="mailto:turfxofficial@gmail.com" className="underline">turfxofficial@gmail.com</a><br />
            📱 Instagram: <a href="https://instagram.com/turfxofficial" target="_blank" className="underline">@turfxofficial</a>
          </p>
        </div>
        <DialogClose asChild>
          <Button variant="secondary" className="mt-6 w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
