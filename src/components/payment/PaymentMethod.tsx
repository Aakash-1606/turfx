
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet, WalletCards } from "lucide-react";

interface PaymentMethodProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

export function PaymentMethod({ paymentMethod, onPaymentMethodChange }: PaymentMethodProps) {
  return (
    <div className="space-y-4">
      <RadioGroup 
        value={paymentMethod}
        onValueChange={onPaymentMethodChange}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
            <CreditCard className="h-4 w-4" />
            <span>Credit/Debit Card</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
          <RadioGroupItem value="upi" id="upi" />
          <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
            <WalletCards className="h-4 w-4" />
            <span>UPI Payment</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
          <RadioGroupItem value="venue" id="venue" />
          <Label htmlFor="venue" className="flex items-center gap-2 cursor-pointer flex-1">
            <Wallet className="h-4 w-4" />
            <span>Pay at Venue</span>
          </Label>
        </div>
      </RadioGroup>
      
      {paymentMethod === 'card' && <CardPaymentForm />}
      {paymentMethod === 'upi' && <UPIPaymentForm />}
      {paymentMethod === 'venue' && <VenuePaymentInfo />}
    </div>
  );
}

function CardPaymentForm() {
  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card-number">Card Number</Label>
        <Input 
          id="card-number" 
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input id="expiry" placeholder="MM/YY" maxLength={5} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" maxLength={3} type="password" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name on Card</Label>
        <Input id="name" placeholder="John Doe" />
      </div>
    </div>
  );
}

function UPIPaymentForm() {
  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="upi-id">UPI ID</Label>
        <Input id="upi-id" placeholder="username@ybl" />
      </div>
    </div>
  );
}

function VenuePaymentInfo() {
  return (
    <div className="mt-6 p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">
      <p>You'll need to pay at the venue before your slot time. Please arrive 15 minutes early.</p>
    </div>
  );
}
