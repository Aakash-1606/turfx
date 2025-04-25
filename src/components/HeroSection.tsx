
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  const [location, setLocation] = useState("Pondicherry");
  
  return (
    <div className="relative overflow-hidden bg-background py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Book Sports Turfs Across <span className="text-primary">India</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Find and book the perfect sports turf in your area. 
            Just like booking movie tickets, but for sports facilities.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <div className="relative w-full max-w-md">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Enter your location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 pr-4 py-6 text-base"
              />
              <Button className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            
            <div className="flex w-full max-w-md flex-wrap justify-center gap-4">
              <Link to="/browse" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">Browse Turfs</Button>
              </Link>
              <Link to="/how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="text-muted-foreground">Popular sports:</span>
            {["Football", "Cricket", "Badminton", "Tennis", "Basketball"].map((sport) => (
              <Link 
                key={sport} 
                to={`/browse?sport=${sport.toLowerCase()}`}
                className="rounded-full bg-muted px-3 py-1 hover:bg-primary/10 transition-colors"
              >
                {sport}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
