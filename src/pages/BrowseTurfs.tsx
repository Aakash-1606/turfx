
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { TurfCard } from "@/components/TurfCard";
import { FilterBar } from "@/components/FilterBar";
import { getAllTurfs, Turf } from "@/services/turfService";
import { toast } from "sonner";

export default function BrowseTurfs() {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [filteredTurfs, setFilteredTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    async function fetchTurfs() {
      try {
        const data = await getAllTurfs();
        setTurfs(data);
        setFilteredTurfs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching turfs:", error);
        toast.error("Failed to load turfs. Please try again later.");
        setLoading(false);
      }
    }
    
    fetchTurfs();
    
    // Handle parallax effect on scroll
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.05}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
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
    
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);
  
  const handleFilterChange = (filters: any) => {
    console.log("Applied filters:", filters);
    
    // Store selected sport for animation effects
    setSelectedSport(filters.sport);
    
    // Apply filters to the turfs
    let filtered = [...turfs];
    
    // Filter by sport if selected
    if (filters.sport) {
      filtered = filtered.filter(turf => 
        turf.sport.toLowerCase() === filters.sport.toLowerCase()
      );
    }
    
    // Filter by price range
    if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
      filtered = filtered.filter(turf => 
        turf.price >= filters.priceRange[0] && turf.price <= filters.priceRange[1]
      );
    }
    
    // Filter by location (for future use when we have multiple locations)
    if (filters.location && filters.location !== "Pondicherry") {
      filtered = filtered.filter(turf => 
        turf.location.includes(filters.location)
      );
    }
    
    // Apply with delay for animation effect
    setTimeout(() => {
      setFilteredTurfs(filtered);
    }, 300);
  };

  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Parallax background specific to the selected sport */}
        <div ref={parallaxRef} className="absolute inset-0 -z-10 opacity-10">
          {selectedSport === 'football' && (
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
          )}
          {selectedSport === 'cricket' && (
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
          )}
          {selectedSport === 'basketball' && (
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
          )}
          {/* Default or other sports */}
          {(!selectedSport || !['football', 'cricket', 'basketball'].includes(selectedSport)) && (
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"></div>
            </div>
          )}
        </div>
        
        <FilterBar onFilterChange={handleFilterChange} />
        
        <div className="container py-8">
          <div className="mb-8 reveal">
            <h1 className="text-3xl font-bold">Sports Turfs in Pondicherry</h1>
            <p className="mt-2 text-muted-foreground">
              Book your preferred turf, time slot, and play your favorite sport
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="rounded-lg border shadow-sm p-4 h-80 animate-pulse">
                  <div className="bg-muted h-40 rounded-md mb-4"></div>
                  <div className="bg-muted h-6 w-3/4 rounded-md mb-4"></div>
                  <div className="bg-muted h-4 w-1/2 rounded-md mb-2"></div>
                  <div className="bg-muted h-4 w-1/4 rounded-md mb-2"></div>
                  <div className="bg-muted h-10 w-full rounded-md mt-4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTurfs.map((turf, index) => (
                <div 
                  key={turf.id} 
                  className={`reveal stagger-item ${
                    selectedSport && turf.sport.toLowerCase() === selectedSport.toLowerCase()
                      ? 'bounce'
                      : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TurfCard turf={turf} />
                </div>
              ))}
            </div>
          )}
          
          {!loading && filteredTurfs.length === 0 && (
            <div className="text-center py-12 fade-in">
              <h3 className="text-xl mb-2">No turfs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more results
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
