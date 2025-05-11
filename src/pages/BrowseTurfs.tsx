
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { TurfCard } from "@/components/TurfCard";
import { FilterBar } from "@/components/FilterBar";
import { getAllTurfs } from "@/services/turfService";
import { toast } from "sonner";

export default function BrowseTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [filteredTurfs, setFilteredTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
  }, []);
  
  const handleFilterChange = (filters: any) => {
    console.log("Applied filters:", filters);
    
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
    
    setFilteredTurfs(filtered);
  };

  return (
    <Layout>
      <FilterBar onFilterChange={handleFilterChange} />
      
      <div className="container py-8">
        <div className="mb-8">
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
            {filteredTurfs.map((turf) => (
              <TurfCard key={turf.id} turf={turf} />
            ))}
          </div>
        )}
        
        {!loading && filteredTurfs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl mb-2">No turfs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
