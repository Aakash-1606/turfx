import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getUserSecureBookings, cancelSecureBooking } from "@/services/secureBookingService";
import { useAuth } from "@/contexts/AuthContext";
import { handleError } from "@/lib/errorHandler";

export default function Bookings() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    async function fetchBookings() {
      try {
        const data = await getUserSecureBookings();
        setBookings(data);
      } catch (error) {
        handleError(error, "Failed to load bookings");
      } finally {
        setLoading(false);
        // Start animations after data is loaded
        setTimeout(() => {
          setAnimationStarted(true);
        }, 100);
      }
    }

    fetchBookings();
    
    // Set up intersection observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [navigate, isAuthenticated]);

  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.date) >= new Date()
  );
  
  const pastBookings = bookings.filter(
    (booking) => new Date(booking.date) < new Date()
  );

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelSecureBooking(bookingId);
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      toast.success("Booking cancelled successfully");
    } catch (error) {
      handleError(error, "Failed to cancel booking");
    }
  };

  const handleRescheduleBooking = (bookingId) => {
    toast.info("Rescheduling feature will be available soon");
  };

  const handleBookAgain = (turfId) => {
    navigate(`/turf/${turfId}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-lg border bg-card p-4 shadow-sm animate-pulse">
                <div className="flex gap-4">
                  <div className="h-20 w-20 bg-muted rounded-md"></div>
                  <div className="flex-1">
                    <div className="h-5 w-1/3 bg-muted rounded-md mb-2"></div>
                    <div className="h-4 w-1/4 bg-muted rounded-md mb-2"></div>
                    <div className="h-4 w-2/5 bg-muted rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8" ref={contentRef}>
        <h1 className={`text-3xl font-bold transition-all duration-500 ${animationStarted ? 'opacity-100' : 'opacity-0 transform translate-y-4'}`}>
          My Bookings
        </h1>
        
        {upcomingBookings.length === 0 && pastBookings.length === 0 ? (
          <div className={`mt-8 rounded-lg border bg-card p-8 text-center shadow-sm reveal ${animationStarted ? 'slide-in-bottom' : 'opacity-0'}`}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-pulse">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">No Bookings Yet</h2>
            <p className="mt-2 text-muted-foreground">
              You haven't made any bookings yet. Browse turfs to make your first booking.
            </p>
            <Button asChild className="mt-4 hover-scale">
              <Link to="/browse">Browse Turfs</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {upcomingBookings.length > 0 && (
              <div className={`reveal ${animationStarted ? 'slide-in-left' : 'opacity-0'}`}>
                <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
                <div className="mt-4 space-y-4">
                  {upcomingBookings.map((booking, index) => {
                    const turf = booking.turfs;
                    if (!turf) return null;
                    
                    return (
                      <div
                        key={booking.id}
                        className={`rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
                          animationStarted ? 'fade-in' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
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
                              className="border-destructive/30 text-destructive hover:bg-destructive/10 transition-all duration-200"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="hover-scale"
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
              <div className={`reveal ${animationStarted ? 'slide-in-right delay-300' : 'opacity-0'}`}>
                <h2 className="text-xl font-semibold">Past Bookings</h2>
                <div className="mt-4 space-y-4">
                  {pastBookings.map((booking, index) => {
                    const turf = booking.turfs;
                    if (!turf) return null;
                    
                    return (
                      <div
                        key={booking.id}
                        className={`rounded-lg border bg-card p-4 shadow-sm transition-opacity duration-500 ${
                          animationStarted ? 'fade-in' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
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
                                <Button variant="outline" size="sm" className="w-[110px] hover-scale">
                                  <span>Book Again</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="fade-in">
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
