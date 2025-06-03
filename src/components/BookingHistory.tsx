
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, MapPin, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { getUserBookings } from "@/services/bookingService";
import { cancelBooking, canCancelBooking } from "@/services/enhancedBookingService";
import { BookingWithTurf } from "@/services/bookingService";

export function BookingHistory() {
  const [bookings, setBookings] = useState<BookingWithTurf[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    setCancelling(bookingId);
    try {
      await cancelBooking(bookingId);
      toast.success("Booking cancelled successfully");
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
    } finally {
      setCancelling(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="bg-muted h-4 w-1/3 rounded mb-2"></div>
              <div className="bg-muted h-3 w-1/4 rounded mb-4"></div>
              <div className="bg-muted h-3 w-1/2 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
          <p className="text-muted-foreground">
            When you book a turf, your bookings will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const canCancel = canCancelBooking(booking.booking_date, booking.start_time);
        
        return (
          <Card key={booking.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{booking.turf.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {booking.turf.location}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                  <span>{format(new Date(booking.booking_date), 'PPP')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>{booking.start_time} - {booking.end_time}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="text-lg font-bold text-primary">₹{booking.total_price}</p>
                </div>
                
                {booking.status === 'confirmed' && canCancel && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancelBooking(booking.id)}
                    disabled={cancelling === booking.id}
                  >
                    {cancelling === booking.id ? "Cancelling..." : "Cancel Booking"}
                  </Button>
                )}
                
                {booking.status === 'confirmed' && !canCancel && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>Cannot cancel (less than 12h)</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
