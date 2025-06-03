
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Turf } from "@/services/turfService";
import { TimeSlot as TimeSlotType } from "@/data/mockData";

interface TurfBookingProps {
  turf: Turf;
}

export function TurfBooking({ turf }: TurfBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotType | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Mock time slots - in a real app, this would come from the backend
  const timeSlots: TimeSlotType[] = [
    { id: '1', time: '06:00 - 07:00', available: true },
    { id: '2', time: '07:00 - 08:00', available: true },
    { id: '3', time: '08:00 - 09:00', available: false },
    { id: '4', time: '09:00 - 10:00', available: true },
    { id: '5', time: '10:00 - 11:00', available: true },
    { id: '6', time: '11:00 - 12:00', available: false },
    { id: '7', time: '12:00 - 13:00', available: true },
    { id: '8', time: '13:00 - 14:00', available: true },
    { id: '9', time: '14:00 - 15:00', available: true },
    { id: '10', time: '15:00 - 16:00', available: false },
    { id: '11', time: '16:00 - 17:00', available: true },
    { id: '12', time: '17:00 - 18:00', available: true },
  ];

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book a turf");
      navigate("/login");
      return;
    }

    if (!selectedDate || !selectedSlot) {
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
      time: selectedSlot.time,
      price: turf.price_per_hour,
    };

    navigate("/payment", { state: { bookingData } });
  };

  const handleSlotSelect = (slot: TimeSlotType | null) => {
    if (slot && !slot.available) {
      toast.error("This time slot is not available");
      return;
    }
    setSelectedSlot(slot);
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
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot.id}
                variant={selectedSlot?.id === slot.id ? "default" : "outline"}
                className={`h-10 ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!slot.available}
                onClick={() => handleSlotSelect(slot)}
              >
                {slot.time}
              </Button>
            ))}
          </div>
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
            disabled={!selectedDate || !selectedSlot}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
