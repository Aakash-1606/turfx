
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";

interface BookingSummaryProps {
  bookingData: any;
}

export function BookingSummary({ bookingData }: BookingSummaryProps) {
  const totalWithTax = Math.round((bookingData.price || 500) * 1.18);
  const tax = Math.round((bookingData.price || 500) * 0.18);

  return (
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
              <span>₹{tax}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{totalWithTax}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
