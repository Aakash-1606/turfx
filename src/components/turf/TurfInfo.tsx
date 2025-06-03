
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock } from "lucide-react";
import { Turf } from "@/services/turfService";

interface TurfInfoProps {
  turf: Turf;
}

export function TurfInfo({ turf }: TurfInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{turf.name}</h1>
        <div className="mt-2 flex items-center text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{turf.location}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {turf.sport}
        </Badge>
        {turf.capacity && (
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span className="text-sm">Up to {turf.capacity} players</span>
          </div>
        )}
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          <span className="text-sm">₹{turf.price_per_hour}/hour</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-muted-foreground">{turf.description}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {turf.amenities?.map((amenity) => (
            <Badge key={amenity} variant="outline">
              {amenity}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
