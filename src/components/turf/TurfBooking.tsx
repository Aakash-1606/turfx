
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { TimeSlotGrid } from "@/components/TimeSlotGrid";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Turf } from "@/services/turfService";

interface TurfBookingProps {
  turf: Turf;
}

export function TurfBooking({ turf }: TurfBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book a turf");
      navigate("/login");
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    const bookingData = {
      turfId: turf.id,
      turfName: turf.name,
      turfLocation: turf.location,
      turfImage: turf.image,
      turfSport: turf.sport,
      date: selectedDate,
      time: selectedTime,
      price: turf.price_per_hour,
    };

    navigate("/payment", { state: { bookingData } });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book This Turf</CardTitle>
        <CardDescription>Select your preferred date and time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Select Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </div>

        <div>
          <h3 className="font-semibold mb-3">Select Time</h3>
          <TimeSlotGrid
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            turfId={turf.id}
            selectedDate={selectedDate}
          />
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-xl font-bold text-primary">₹{turf.price_per_hour}</span>
          </div>
          <Button 
            onClick={handleBooking} 
            className="w-full" 
            size="lg"
            disabled={!selectedDate || !selectedTime}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
