
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { TurfCard } from "@/components/TurfCard";
import { turfs } from "@/data/mockData";
import { FilterBar } from "@/components/FilterBar";

export default function BrowseTurfs() {
  const [filteredTurfs, setFilteredTurfs] = useState(turfs);
  
  const handleFilterChange = (filters: any) => {
    // In a real app, we would apply the filters here
    // For now, let's just use the same turfs
    console.log("Applied filters:", filters);
    setFilteredTurfs(turfs);
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
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTurfs.map((turf) => (
            <TurfCard key={turf.id} turf={turf} />
          ))}
        </div>
        
        {filteredTurfs.length === 0 && (
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
