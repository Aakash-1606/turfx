
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin, CreditCard, Wallet, WalletCards } from "lucide-react";
import { format } from "date-fns";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData || {};
  
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  if (!bookingData.turfId) {
    // Redirect if no booking data is available
    navigate("/browse");
    return null;
  }
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful! Your booking has been confirmed.");
      navigate("/bookings");
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="container py-8 fade-in">
        <h1 className="text-3xl font-bold">Complete Your Payment</h1>
        <p className="mt-2 text-muted-foreground">
          Secure payment for your turf booking
        </p>
        
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
          {/* Booking Summary */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Details of your turf booking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden">
                      <img
                        src={bookingData.turfImage}
                        alt={bookingData.turfName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{bookingData.turfName}</h3>
                      <div className="mt-1 flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-3.5 w-3.5" />
                        <span>{bookingData.turfLocation}</span>
                      </div>
                      <Badge variant="outline" className="mt-2 bg-primary/10 text-primary">
                        {bookingData.turfSport}
                      </Badge>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <div className="mt-1 flex items-center">
                        <CalendarIcon className="mr-1 h-4 w-4 text-primary" />
                        <span>{bookingData.date ? format(new Date(bookingData.date), 'PPP') : 'Today'}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <div className="mt-1 flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-primary" />
                        <span>{bookingData.time || '6:00 PM'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Price Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Turf booking fee</span>
                      <span>₹{bookingData.price || 500}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span>₹{Math.round((bookingData.price || 500) * 0.18)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>₹{Math.round((bookingData.price || 500) * 1.18)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Payment Method */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
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
                
                {paymentMethod === 'card' && (
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
                )}
                
                {paymentMethod === 'upi' && (
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input id="upi-id" placeholder="username@ybl" />
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'venue' && (
                  <div className="mt-6 p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">
                    <p>You'll need to pay at the venue before your slot time. Please arrive 15 minutes early.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  className="w-full"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Complete Payment"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  By completing this payment, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
