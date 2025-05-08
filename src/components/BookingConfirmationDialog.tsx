
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, MapPin, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface BookingData {
  turfId: string;
  turfName: string;
  turfLocation: string;
  turfImage: string;
  turfSport: string;
  price: number;
  date: Date;
  time: string;
}

interface BookingConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingData;
}

export function BookingConfirmationDialog({
  isOpen,
  onClose,
  bookingData,
}: BookingConfirmationDialogProps) {
  const navigate = useNavigate();
  
  const handleViewBookings = () => {
    onClose();
    navigate("/bookings");
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md fade-in">
        <DialogHeader>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-center text-xl">Booking Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Your booking has been successfully confirmed
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-4 border rounded-lg mt-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded overflow-hidden">
              <img 
                src={bookingData.turfImage} 
                alt={bookingData.turfName}
                className="h-full w-full object-cover" 
              />
            </div>
            <div>
              <h3 className="font-semibold">{bookingData.turfName}</h3>
              <p className="text-sm text-muted-foreground">{bookingData.turfSport}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              <span className="line-clamp-1">{bookingData.turfLocation}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-primary" />
              <span>{bookingData.time}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1 text-primary" />
              <span>
                {bookingData.date ? format(new Date(bookingData.date), 'PPP') : 'Today'}
              </span>
            </div>
            <div className="font-semibold">
              ₹{bookingData.price}
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
          <Button onClick={handleViewBookings} className="w-full sm:w-auto">
            View My Bookings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
