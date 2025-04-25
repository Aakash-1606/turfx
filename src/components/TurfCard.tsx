
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Turf } from "@/data/mockData";
import { MapPin, Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TurfCardProps {
  turf: Turf;
}

export function TurfCard({ turf }: TurfCardProps) {
  return (
    <Link to={`/turf/${turf.id}`} className="block hover-scale">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={turf.image}
            alt={turf.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold line-clamp-1">{turf.name}</h3>
              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                <span className="line-clamp-1">{turf.location}</span>
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {turf.sport}
            </Badge>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{turf.rating}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3.5 w-3.5" />
              <span>Open Now</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="text-sm">
            <span className="font-semibold text-primary">₹{turf.price}</span> / hour
          </div>
          <Badge variant="secondary">Book Now</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
