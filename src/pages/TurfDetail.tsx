
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { turfs, generateTimeSlots, TimeSlot } from "@/data/mockData";
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

export default function TurfDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const turf = turfs.find((t) => t.id === id);
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    generateTimeSlots(new Date())
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  
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
  
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setTimeSlots(generateTimeSlots(newDate));
      setSelectedSlot(null);
    }
  };
  
  const handleBooking = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }
    
    // In a real app, we would submit the booking to an API
    toast.success(`Booking confirmed for ${format(date!, "PPP")} at ${selectedSlot.time}`);
    navigate("/bookings");
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Turf Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="aspect-video w-full overflow-hidden rounded-lg shadow-md">
              <img
                src={turf.image}
                alt={turf.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div>
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
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold">About this turf</h2>
                <p className="mt-2 text-muted-foreground">
                  {turf.description}
                </p>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Amenities</h2>
                <ul className="mt-4 grid grid-cols-2 gap-3">
                  {turf.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center rounded-md border bg-card px-3 py-2 shadow-sm">
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
            <div className="rounded-lg border bg-card p-6 shadow-md">
              <div className="mb-4 flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">Book This Turf</h2>
                <div className="text-xl font-bold text-primary">${turf.price}/hr</div>
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
                            "justify-start text-left font-normal",
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
                  <TimeSlotGrid 
                    timeSlots={timeSlots}
                    selectedSlot={selectedSlot}
                    onSlotSelect={setSelectedSlot}
                  />
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <Button
                  onClick={handleBooking}
                  className="w-full"
                  disabled={!selectedSlot}
                >
                  Book Now for ${turf.price}
                </Button>
              </div>
              
              <div className="mt-4 rounded-md border border-muted-foreground/10 bg-muted/30 p-3">
                <p className="text-center text-xs text-muted-foreground">
                  No payment required now. Pay at venue.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="font-semibold">Booking Policy</h3>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
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
