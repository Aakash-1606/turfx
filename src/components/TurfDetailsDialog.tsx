
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export type TurfDetailsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: boolean;
  turfData?: {
    name?: string;
    location?: string;
    price?: number;
    description?: string;
    sportsAvailable?: string[];
    amenities?: string[];
    imageUrl?: string;
  };
};

export function TurfDetailsDialog({ open, onOpenChange, isEdit = false, turfData = {} }: TurfDetailsProps) {
  const [formData, setFormData] = useState({
    name: turfData.name || "",
    location: turfData.location || "",
    price: turfData.price || 500,
    description: turfData.description || "",
    sports: turfData.sportsAvailable?.join(", ") || "Football, Cricket",
    amenities: turfData.amenities?.join(", ") || "Parking, Changing Rooms, Floodlights",
    imageUrl: turfData.imageUrl || "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // In a real application, this would send data to an API
    console.log("Submitted turf data:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update Turf Details" : "Add New Turf"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Make changes to the turf details here."
              : "Fill in the details to add a new turf."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
              placeholder="Green Valley Football Turf"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="col-span-3"
              placeholder="Mahavishnu Nagar, Mortandi"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price (₹)
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", parseInt(e.target.value))}
              className="col-span-3"
              placeholder="500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sports" className="text-right">
              Sports
            </Label>
            <Input
              id="sports"
              value={formData.sports}
              onChange={(e) => handleChange("sports", e.target.value)}
              className="col-span-3"
              placeholder="Football, Cricket, etc."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amenities" className="text-right">
              Amenities
            </Label>
            <Input
              id="amenities"
              value={formData.amenities}
              onChange={(e) => handleChange("amenities", e.target.value)}
              className="col-span-3"
              placeholder="Parking, Changing Rooms, etc."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Input
              id="image"
              value={formData.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              className="col-span-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3"
              rows={4}
              placeholder="A well-maintained turf with excellent facilities..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {isEdit ? "Update" : "Add"} Turf
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
