
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { turfs } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock bookings data
const mockBookings = [
  {
    id: "b1",
    turfId: "1",
    date: "2023-05-15",
    time: "6:00 PM",
    status: "upcoming",
  },
  {
    id: "b2",
    turfId: "3",
    date: "2023-05-10",
    time: "7:00 PM",
    status: "completed",
  },
  {
    id: "b3",
    turfId: "2",
    date: "2023-05-05",
    time: "5:00 PM",
    status: "completed",
  },
];

export default function Bookings() {
  const upcomingBookings = mockBookings.filter(
    (booking) => booking.status === "upcoming"
  );
  const pastBookings = mockBookings.filter(
    (booking) => booking.status === "completed"
  );

  const handleCancelBooking = (bookingId: string) => {
    toast.success("Booking cancelled successfully");
  };

  const handleRescheduleBooking = (bookingId: string) => {
    toast.info("Rescheduling feature will be available soon");
  };

  const handleBookAgain = (turfId: string) => {
    // In a real app, we would navigate to the booking page with pre-filled data
    toast.success("Redirecting to booking page");
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        
        {upcomingBookings.length === 0 && pastBookings.length === 0 ? (
          <div className="mt-8 rounded-lg border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">No Bookings Yet</h2>
            <p className="mt-2 text-muted-foreground">
              You haven't made any bookings yet. Browse turfs to make your first booking.
            </p>
            <Button asChild className="mt-4">
              <Link to="/browse">Browse Turfs</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {upcomingBookings.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
                <div className="mt-4 space-y-4">
                  {upcomingBookings.map((booking) => {
                    const turf = turfs.find((t) => t.id === booking.turfId);
                    if (!turf) return null;
                    
                    return (
                      <div
                        key={booking.id}
                        className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex gap-4">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md shadow-sm">
                              <img
                                src={turf.image}
                                alt={turf.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">{turf.name}</h3>
                              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-3.5 w-3.5" />
                                <span className="line-clamp-1">{turf.location}</span>
                              </div>
                              <div className="mt-2 flex items-center gap-3">
                                <div className="flex items-center text-sm">
                                  <Calendar className="mr-1 h-3.5 w-3.5 text-primary" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Clock className="mr-1 h-3.5 w-3.5 text-primary" />
                                  <span>{booking.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-destructive/30 text-destructive hover:bg-destructive/10"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRescheduleBooking(booking.id)}
                            >
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold">Past Bookings</h2>
                <div className="mt-4 space-y-4">
                  {pastBookings.map((booking) => {
                    const turf = turfs.find((t) => t.id === booking.turfId);
                    if (!turf) return null;
                    
                    return (
                      <div
                        key={booking.id}
                        className="rounded-lg border bg-card p-4 shadow-sm"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex gap-4">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                              <img
                                src={turf.image}
                                alt={turf.name}
                                className="h-full w-full object-cover opacity-80"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">{turf.name}</h3>
                              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-3.5 w-3.5" />
                                <span className="line-clamp-1">{turf.location}</span>
                              </div>
                              <div className="mt-2 flex items-center gap-3">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="mr-1 h-3.5 w-3.5" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="mr-1 h-3.5 w-3.5" />
                                  <span>{booking.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="w-[110px]">
                                  <span>Book Again</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleBookAgain(turf.id)}>
                                  Same Time & Date
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link to={`/turf/${turf.id}`}>Different Time</Link>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
