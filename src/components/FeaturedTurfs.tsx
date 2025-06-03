
import { TurfCard } from "./TurfCard";
import { Turf } from "@/services/turfService";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface FeaturedTurfsProps {
  turfs: Turf[];
}

export function FeaturedTurfs({ turfs }: FeaturedTurfsProps) {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Featured Turfs <span className="text-primary">Near You</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover top-rated sports facilities in your area
            </p>
          </div>
          <Link
            to="/browse"
            className="hidden text-sm font-medium text-primary underline-offset-4 hover:underline md:block"
          >
            View all turfs
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {turfs.slice(0, 8).map((turf) => (
            <TurfCard key={turf.id} turf={turf} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/browse">
            <Button variant="outline" size="lg">
              View All Turfs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
