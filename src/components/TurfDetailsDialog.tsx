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
import { useState, useEffect } from "react";
import { addTurf, updateTurf, Turf } from "@/services/turfService";
import { toast } from "sonner";

export type TurfDetailsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: boolean;
  turfData?: Turf | null;
  onSave: () => void;
};

export function TurfDetailsDialog({ open, onOpenChange, isEdit = false, turfData = null, onSave }: TurfDetailsProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: 500,
    price_per_hour: 500,
    capacity: 22,
    description: "",
    sport: "Football",
    amenities: "Parking, Changing Rooms, Floodlights",
    image: "",
  });

  const [saving, setSaving] = useState(false);

  // Reset form data when dialog opens or turfData changes
  useEffect(() => {
    if (open) {
      setFormData({
        name: turfData?.name || "",
        location: turfData?.location || "",
        price: turfData?.price || 500,
        price_per_hour: turfData?.price_per_hour || 500,
        capacity: turfData?.capacity || 22,
        description: turfData?.description || "",
        sport: turfData?.sport || "Football",
        amenities: turfData?.amenities?.join(", ") || "Parking, Changing Rooms, Floodlights",
        image: turfData?.image || "",
      });
    }
  }, [open, turfData]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.location || !formData.sport) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const turfPayload = {
        name: formData.name,
        location: formData.location,
        sport: formData.sport,
        price: formData.price,
        price_per_hour: formData.price_per_hour,
        capacity: formData.capacity,
        description: formData.description,
        image: formData.image || "/placeholder.svg", // Provide default image
        amenities: formData.amenities.split(",").map(a => a.trim()).filter(a => a),
        rating: turfData?.rating || 4.0,
      };

      if (isEdit && turfData) {
        console.log('Updating turf with data:', turfPayload);
        await updateTurf(turfData.id, turfPayload);
        toast.success("Turf updated successfully!");
      } else {
        console.log('Adding new turf with data:', turfPayload);
        await addTurf(turfPayload);
        toast.success("Turf added successfully!");
      }

      onSave();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error saving turf:", error);
      const errorMessage = error?.message || "Failed to save turf. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Turf Details" : "Add New Turf"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Make changes to the turf details here."
              : "Fill in the details to add a new turf."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name *
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
              Location *
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
              Price (₹) *
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", parseInt(e.target.value) || 0)}
              className="col-span-3"
              placeholder="500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price_per_hour" className="text-right">
              Price/Hour (₹) *
            </Label>
            <Input
              id="price_per_hour"
              type="number"
              value={formData.price_per_hour}
              onChange={(e) => handleChange("price_per_hour", parseInt(e.target.value) || 0)}
              className="col-span-3"
              placeholder="500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Capacity *
            </Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => handleChange("capacity", parseInt(e.target.value) || 0)}
              className="col-span-3"
              placeholder="22"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sport" className="text-right">
              Sport *
            </Label>
            <Input
              id="sport"
              value={formData.sport}
              onChange={(e) => handleChange("sport", e.target.value)}
              className="col-span-3"
              placeholder="Football"
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
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
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
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update" : "Add"} Turf
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
