
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
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { adminAddTurfWithOwner, adminUpdateTurf, AdminTurfData } from "@/services/adminService";
import { Turf } from "@/services/turfService";
import { toast } from "sonner";

export type AdminTurfDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: boolean;
  turfData?: Turf | null;
  onSave: () => void;
};

export function AdminTurfDialog({ 
  open, 
  onOpenChange, 
  isEdit = false, 
  turfData = null, 
  onSave 
}: AdminTurfDialogProps) {
  const [formData, setFormData] = useState({
    // Turf data
    name: turfData?.name || "",
    location: turfData?.location || "Pondicherry",
    sport: turfData?.sport || "Football",
    price: turfData?.price || 500,
    price_per_hour: turfData?.price_per_hour || 500,
    capacity: turfData?.capacity || 22,
    description: turfData?.description || "",
    image: turfData?.image || "/placeholder.svg",
    amenities: turfData?.amenities?.join(", ") || "Parking, Changing Rooms, Floodlights",
    // Owner data (only for new turfs)
    ownerEmail: "",
    ownerFirstName: "",
    ownerLastName: "",
    ownerPhone: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.location || !formData.sport) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isEdit && (!formData.ownerEmail || !formData.ownerFirstName || !formData.ownerLastName)) {
      toast.error("Please provide owner details for new turf");
      return;
    }

    setSaving(true);
    try {
      const turfPayload: AdminTurfData = {
        name: formData.name,
        location: formData.location,
        sport: formData.sport,
        price: formData.price,
        price_per_hour: formData.price_per_hour,
        capacity: formData.capacity,
        description: formData.description,
        image: formData.image,
        amenities: formData.amenities.split(",").map(a => a.trim()).filter(a => a),
        rating: turfData?.rating || 4.0,
        owner_id: turfData?.owner_id || '',
        ownerEmail: formData.ownerEmail,
        ownerFirstName: formData.ownerFirstName,
        ownerLastName: formData.ownerLastName,
        ownerPhone: formData.ownerPhone,
      };

      if (isEdit && turfData) {
        await adminUpdateTurf(turfData.id, turfPayload);
        toast.success("Turf updated successfully!");
      } else {
        await adminAddTurfWithOwner(turfPayload);
        toast.success("Turf and owner account created successfully!");
      }

      onSave();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving turf:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save turf");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Turf" : "Add New Turf & Create Owner Account"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the turf details below."
              : "Fill in the turf details and owner information to create a new facility."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="text-sm font-medium text-muted-foreground">Turf Information</div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Turf Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Green Valley Football Turf"
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Pondicherry"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sport">Sport *</Label>
              <Input
                id="sport"
                value={formData.sport}
                onChange={(e) => handleChange("sport", e.target.value)}
                placeholder="Football"
              />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleChange("capacity", parseInt(e.target.value) || 0)}
                placeholder="22"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
                placeholder="500"
              />
            </div>
            <div>
              <Label htmlFor="price_per_hour">Price/Hour (₹)</Label>
              <Input
                id="price_per_hour"
                type="number"
                value={formData.price_per_hour}
                onChange={(e) => handleChange("price_per_hour", parseFloat(e.target.value) || 0)}
                placeholder="500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="amenities">Amenities</Label>
            <Input
              id="amenities"
              value={formData.amenities}
              onChange={(e) => handleChange("amenities", e.target.value)}
              placeholder="Parking, Changing Rooms, Floodlights"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              placeholder="A well-maintained turf with excellent facilities..."
            />
          </div>

          {!isEdit && (
            <>
              <Separator />
              <div className="text-sm font-medium text-muted-foreground">Owner Information</div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerFirstName">First Name *</Label>
                  <Input
                    id="ownerFirstName"
                    value={formData.ownerFirstName}
                    onChange={(e) => handleChange("ownerFirstName", e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerLastName">Last Name *</Label>
                  <Input
                    id="ownerLastName"
                    value={formData.ownerLastName}
                    onChange={(e) => handleChange("ownerLastName", e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerEmail">Email *</Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => handleChange("ownerEmail", e.target.value)}
                    placeholder="owner@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerPhone">Phone</Label>
                  <Input
                    id="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={(e) => handleChange("ownerPhone", e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                A temporary password will be assigned. The owner will need to reset their password on first login.
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update Turf" : "Create Turf & Owner"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
