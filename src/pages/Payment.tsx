
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { BookingConfirmationDialog } from "@/components/BookingConfirmationDialog";
import { createSecureBooking } from "@/services/secureBookingService";
import { useAuth } from "@/contexts/AuthContext";
import { handleError, validateInput } from "@/lib/errorHandler";
import { bookingSchema } from "@/lib/validationSchemas";
import { PaymentMethod } from "@/components/payment/PaymentMethod";
import { BookingSummary } from "@/components/payment/BookingSummary";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const bookingData = location.state?.bookingData || {};
  
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [completedBooking, setCompletedBooking] = useState(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to continue");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
  }, [isAuthenticated, navigate, location.pathname]);
  
  if (!bookingData.turfId) {
    navigate("/browse");
    return null;
  }
  
  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to continue");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const formattedDate = bookingData.date instanceof Date 
        ? bookingData.date.toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      
      const bookingPayload = {
        turfId: bookingData.turfId,
        date: formattedDate,
        time: bookingData.time,
        price: bookingData.price,
      };

      const validatedData = validateInput(bookingPayload, bookingSchema);
      
      const newBooking = {
        ...validatedData,
        payment_method: paymentMethod,
        status: paymentMethod === 'venue' ? 'pending' : 'confirmed'
      };
      
      const [createdBooking] = await createSecureBooking(newBooking);
      setCompletedBooking(createdBooking);
      setShowConfirmation(true);
    } catch (error) {
      handleError(error, "Failed to complete booking");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate("/bookings");
  };
  
  return (
    <Layout>
      <div className="container py-8 fade-in">
        <h1 className="text-3xl font-bold">Complete Your Payment</h1>
        <p className="mt-2 text-muted-foreground">
          Secure payment for your turf booking
        </p>
        
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <BookingSummary bookingData={bookingData} />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentMethod 
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                />
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
      
      <BookingConfirmationDialog 
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        bookingData={{
          ...bookingData,
          id: completedBooking?.id,
          status: completedBooking?.status
        }}
      />
    </Layout>
  );
}
