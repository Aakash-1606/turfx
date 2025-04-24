
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TimeSlot as TimeSlotType } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TimeSlotGridProps {
  timeSlots: TimeSlotType[];
  onSlotSelect: (slot: TimeSlotType | null) => void;
  selectedSlot: TimeSlotType | null;
}

export function TimeSlotGrid({ timeSlots, onSlotSelect, selectedSlot }: TimeSlotGridProps) {
  const handleSlotClick = (slot: TimeSlotType) => {
    if (!slot.available) {
      toast.error("This time slot is not available");
      return;
    }
    
    onSlotSelect(selectedSlot?.id === slot.id ? null : slot);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Select Time</h3>
          <p className="text-sm text-muted-foreground">Choose an available time slot</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="mr-2 h-3 w-3 rounded-full bg-primary/20 border border-primary/30"></span>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 h-3 w-3 rounded-full bg-muted/50 border border-muted"></span>
            <span className="text-xs">Unavailable</span>
          </div>
        </div>
      </div>
      
      <div className="booking-grid">
        {timeSlots.map((slot) => (
          <div
            key={slot.id}
            onClick={() => handleSlotClick(slot)}
            className={cn(
              "time-slot",
              slot.available ? "available" : "unavailable",
              selectedSlot?.id === slot.id && "selected"
            )}
          >
            {slot.time}
          </div>
        ))}
      </div>
      
      {selectedSlot && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium">Selected Time:</p>
          <div className="flex items-center rounded-md border border-primary/30 bg-primary/10 px-4 py-2 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{selectedSlot.time}</span>
          </div>
        </div>
      )}
    </div>
  );
}
