
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Trophy, Circle, Award, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  const [location, setLocation] = useState("Pondicherry");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const createFloatingIcon = () => {
      const iconContainer = document.getElementById('floating-icons');
      if (!iconContainer) return;

      const icons = [Award, Activity, Trophy, Circle];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];

      const icon = document.createElement('div');
      icon.className = 'absolute text-primary/20';
      icon.style.left = `${Math.random() * 100}%`;
      icon.style.top = `${Math.random() * 100}%`;
      icon.style.fontSize = `${Math.random() * 20 + 20}px`;
      icon.style.opacity = '0.2';
      icon.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "24");
      svg.setAttribute("height", "24");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "2");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");

      let path;
      if (randomIcon === Award) {
        path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z");
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "m8.21 13.89-1.8 6.59a1 1 0 0 0 1.35 1.2L12 19.25l4.24 2.43a1 1 0 0 0 1.35-1.2l-1.8-6.59");
        svg.appendChild(path);
        svg.appendChild(path2);
      } else if (randomIcon === Activity) {
        path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M22 12h-4l-3 9L9 3l-3 9H2");
        svg.appendChild(path);
      } else if (randomIcon === Trophy) {
        path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M8 21h8M12 3v18M17 8l-5 5-5-5");
        svg.appendChild(path);
      } else {
        path = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        path.setAttribute("cx", "12");
        path.setAttribute("cy", "12");
        path.setAttribute("r", "10");
        svg.appendChild(path);
      }

      icon.appendChild(svg);
      iconContainer.appendChild(icon);

      setTimeout(() => {
        if (iconContainer.contains(icon)) {
          iconContainer.removeChild(icon);
        }
      }, 10000);
    };
    const iconInterval = setInterval(createFloatingIcon, 2000);
    return () => {
      clearInterval(iconInterval);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-background py-16 md:py-24">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/lovable-uploads/2b4f2fbe-2ad0-4472-8f2b-1cfe122aac78.png')"
        }}
      />
      {/* Overlay for contrast */}
      <div className="absolute inset-0 z-0 bg-black/40" />
      {/* Background Pattern and floating icons */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-3xl"></div>
        <div id="floating-icons" className="absolute inset-0 overflow-hidden"></div>
      </div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className={`transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <img
              src="/icons/TurfX Logo.png"
              alt="TurfX Logo"
              className={`h-20 mx-auto mb-6 ${visible ? 'animate-fade-in' : 'opacity-0'}`}
            />
            <h1 className={`text-4xl font-bold tracking-tight text-foreground sm:text-6xl slide-in-left delay-200`}>
              Book Sports Turfs Across <span className="text-primary">India</span>
            </h1>
            <p className={`mt-6 text-lg leading-8 text-muted-foreground slide-in-right delay-400`}>
              Find and book the perfect sports turf in your area.
              Just like booking movie tickets, but for sports facilities.
            </p>
          </div>
          <div className={`mt-10 flex flex-col items-center justify-center gap-4 slide-in-bottom delay-600`}>
            <div className="relative w-full max-w-md">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 pr-4 py-6 text-base"
              />
              <Button className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1 hover-scale">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            <div className="flex w-full max-w-md flex-wrap justify-center gap-4">
              <Link to="/browse" className="w-full sm:w-auto">
                <Button size="lg" className={`w-full ${visible ? 'zoom-in delay-800 pulse' : 'opacity-0'}`}>Browse Turfs</Button>
              </Link>
              <Link to="/how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className={`w-full ${visible ? 'zoom-in delay-900' : 'opacity-0'}`}>
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
          <div className={`mt-8 flex flex-wrap items-center justify-center gap-3 text-sm fade-in delay-1000`}>
            <span className="text-muted-foreground">Popular sports:</span>
            {["Football", "Cricket", "Badminton", "Tennis", "Basketball"].map((sport, index) => (
              <Link
                key={sport}
                to={`/browse?sport=${sport.toLowerCase()}`}
                className={`rounded-full bg-muted px-3 py-1 hover:bg-primary/10 transition-colors hover-scale delay-${(index + 10) * 100}`}
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
