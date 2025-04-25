
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedTurfs } from "@/components/FeaturedTurfs";
import { SportsCategories } from "@/components/SportsCategories";
import { turfs } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, MapPin, Smartphone } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      
      <SportsCategories />
      
      <FeaturedTurfs turfs={turfs} />
      
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How TurfX Works</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Booking a sports turf has never been easier. Follow these simple steps to secure your spot.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find a Turf</h3>
              <p className="text-muted-foreground">
                Browse through our selection of sports turfs in your city and choose one that suits your needs.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Date & Time</h3>
              <p className="text-muted-foreground">
                Pick your preferred date and time slot from the available options, just like booking movie tickets.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Confirm & Play</h3>
              <p className="text-muted-foreground">
                Complete your booking, receive confirmation, and show up to play at your reserved time.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <a href="/browse">Book a Turf Now</a>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get the TurfX App</h2>
              <p className="mb-6 text-muted-foreground">
                Download the TurfX Progressive Web App for a seamless booking experience.
                Book turfs, manage your reservations, and receive notifications all from your phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Quick Bookings</h3>
                    <p className="text-sm text-muted-foreground">Book a turf in under 60 seconds</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Location-Based</h3>
                    <p className="text-sm text-muted-foreground">Find turfs near you instantly</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Install TurfX App
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vYmlsZSUyMGFwcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" 
                alt="TurfX Mobile App" 
                className="rounded-lg shadow-lg mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full bg-primary/20 -z-10 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 rounded-full bg-secondary/20 -z-10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
