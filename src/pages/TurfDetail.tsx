import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { generateTimeSlots, TimeSlot } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TimeSlotGrid } from "@/components/TimeSlotGrid";
import { MapPin, Star, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getTurfById, Turf } from "@/services/turfService";
import { checkAvailability } from "@/services/bookingService";

export default function TurfDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [turf, setTurf] = useState<Turf | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    generateTimeSlots(new Date())
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    async function fetchTurfDetails() {
      if (!id) return;
      
      try {
        const data = await getTurfById(id);
        setTurf(data);
      } catch (error) {
        console.error("Error fetching turf details:", error);
        toast.error("Failed to load turf details");
      } finally {
        setLoading(false);
        // Trigger animations after a short delay
        setTimeout(() => {
          setContentVisible(true);
        }, 100);
      }
    }
    
    fetchTurfDetails();
    
    // Add IntersectionObserver to handle reveal animations
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
    
    // Observe elements with reveal class
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
    
    // Observe the description section for fade-in effect
    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [id]);
  
  const handleDateChange = async (newDate: Date | undefined) => {
    if (newDate && turf) {
      setDate(newDate);
      setTimeSlots(generateTimeSlots(newDate));
      setSelectedSlot(null);
      
      // Check availability for all time slots
      setCheckingAvailability(true);
      const updatedSlots = await Promise.all(
        generateTimeSlots(newDate).map(async (slot) => {
          const endTime = format(new Date(`2000-01-01 ${slot.time}`).getTime() + 60 * 60 * 1000, 'HH:mm');
          const available = await checkAvailability(
            turf.id,
            format(newDate, 'yyyy-MM-dd'),
            slot.time,
            endTime
          );
          return { ...slot, available };
        })
      );
      setTimeSlots(updatedSlots);
      setCheckingAvailability(false);
    }
  };
  
  const handleBooking = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }
    
    if (!selectedSlot.available) {
      toast.error("Selected time slot is not available");
      return;
    }
    
    // Navigate to payment page with booking data
    const bookingData = {
      turfId: turf!.id,
      turfName: turf!.name,
      turfLocation: turf!.location,
      turfImage: turf!.image,
      turfSport: turf!.sport,
      price: turf!.price,
      date: date,
      time: selectedSlot.time
    };
    
    navigate('/payment', { state: { bookingData } });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="bg-muted h-64 w-full rounded-lg mb-6"></div>
            <div className="bg-muted h-8 w-1/3 rounded-md mb-4"></div>
            <div className="bg-muted h-4 w-1/4 rounded-md mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-muted h-32 w-full rounded-md mb-4"></div>
                <div className="bg-muted h-4 w-full rounded-md mb-2"></div>
                <div className="bg-muted h-4 w-3/4 rounded-md mb-6"></div>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-muted h-12 rounded-md"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="bg-card border rounded-lg p-6 shadow-md h-80"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!turf) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">Turf not found</h1>
          <p className="mt-4 text-muted-foreground">
            The turf you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => navigate("/browse")}
            className="mt-8"
          >
            Browse Turfs
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Turf Details */}
          <div className="md:col-span-2 space-y-6">
            <div className={`aspect-video w-full overflow-hidden rounded-lg shadow-md transition-all duration-700 ${contentVisible ? 'slide-in-left opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
              <img
                src={turf.image || "/placeholder.svg"}
                alt={turf.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className={`transition-all duration-700 ${contentVisible ? 'slide-in-right opacity-100' : 'translate-x-[50px] opacity-0'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{turf.name}</h1>
                  <div className="mt-2 flex items-center text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>{turf.location}</span>
                  </div>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {turf.sport}
                </Badge>
              </div>
              
              <div className="mt-4 flex items-center">
                <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{turf.rating} rating</span>
              </div>
              
              <div className="mt-6 reveal" ref={descriptionRef}>
                <h2 className="text-xl font-semibold">About this turf</h2>
                <p className="mt-2 text-muted-foreground">
                  {turf.description}
                </p>
              </div>
              
              <div className="mt-6 reveal">
                <h2 className="text-xl font-semibold">Amenities</h2>
                <ul className="mt-4 grid grid-cols-2 gap-3">
                  {turf.amenities.map((amenity, index) => (
                    <li 
                      key={amenity} 
                      className="flex items-center rounded-md border bg-card px-3 py-2 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-card/80 hover:border-primary/30"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-primary"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Booking Section */}
          <div className="space-y-6">
            <div className={`rounded-lg border bg-card p-6 shadow-md transition-all duration-700 ${contentVisible ? 'slide-in-left opacity-100 delay-500' : 'translate-y-[30px] opacity-0'}`}>
              <div className="mb-4 flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">Book This Turf</h2>
                <div className="text-xl font-bold text-primary">₹{turf.price}/hr</div>
              </div>
              
              <Separator className="my-4" />
              
              <Tabs defaultValue="calendar">
                <TabsList className="w-full">
                  <TabsTrigger value="calendar" className="flex-1">Calendar</TabsTrigger>
                  <TabsTrigger value="slots" className="flex-1">Time Slots</TabsTrigger>
                </TabsList>
                
                <TabsContent value="calendar" className="space-y-4 pt-4">
                  <div className="flex flex-col space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal hover-scale",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 pointer-events-auto">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </TabsContent>
                
                <TabsContent value="slots" className="pt-4">
                  {checkingAvailability ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2 text-sm text-muted-foreground">Checking availability...</p>
                    </div>
                  ) : (
                    <TimeSlotGrid 
                      timeSlots={timeSlots}
                      selectedSlot={selectedSlot}
                      onSlotSelect={setSelectedSlot}
                    />
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <Button
                  onClick={handleBooking}
                  className={`w-full transition-all duration-300 ${selectedSlot ? 'pulse' : ''}`}
                  disabled={!selectedSlot || !selectedSlot.available || checkingAvailability}
                >
                  Pay ₹{turf.price} & Book Now
                </Button>
              </div>
              
              <div className="mt-4 rounded-md border border-muted-foreground/10 bg-muted/30 p-3">
                <p className="text-center text-xs text-muted-foreground">
                  Secure payment options available. Cancel up to 12 hours before.
                </p>
              </div>
            </div>
            
            <div className={`rounded-lg border bg-card p-6 shadow-sm transition-all duration-700 ${contentVisible ? 'slide-in-left opacity-100 delay-700' : 'translate-y-[30px] opacity-0'}`}>
              <h3 className="font-semibold">Booking Policy</h3>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground reveal">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Bookings can be cancelled up to 12 hours before the scheduled time</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>No refunds for late cancellations or no-shows</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Please arrive 15 minutes before your slot</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
