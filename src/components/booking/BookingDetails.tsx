
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";

interface BookingDetailsProps {
  bookingData: {
    turfName: string;
    turfLocation: string;
    turfImage: string;
    turfSport: string;
    date: Date;
    time: string;
    price: number;
  };
}

export function BookingDetails({ bookingData }: BookingDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-md overflow-hidden">
          <img
            src={bookingData.turfImage}
            alt={bookingData.turfName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{bookingData.turfName}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            <span>{bookingData.turfLocation}</span>
          </div>
          <Badge variant="outline" className="mt-2 bg-primary/10 text-primary">
            {bookingData.turfSport}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Date</p>
          <div className="flex items-center mt-1">
            <CalendarIcon className="mr-1 h-4 w-4 text-primary" />
            <span className="font-medium">{format(bookingData.date, 'PPP')}</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Time</p>
          <div className="flex items-center mt-1">
            <Clock className="mr-1 h-4 w-4 text-primary" />
            <span className="font-medium">{bookingData.time}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Amount</span>
          <span className="text-xl font-bold text-primary">₹{bookingData.price}</span>
        </div>
      </div>
    </div>
  );
}
