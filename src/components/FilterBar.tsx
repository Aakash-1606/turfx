
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [priceRange, setPriceRange] = useState([500, 3000]);
  const [location, setLocation] = useState("Pondicherry");
  const [sport, setSport] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleFilterChange = () => {
    if (onFilterChange) {
      onFilterChange({
        date,
        priceRange,
        location,
        sport
      });
    }
  };
  
  return (
    <div className="bg-background sticky top-0 z-10 border-b py-3 px-4 mb-6">
      <div className="container">
        <div className="flex flex-wrap items-center gap-3">
          {/* Mobile filter button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="md:hidden"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          
          {/* Search input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search turfs..."
              className="pl-9"
            />
          </div>
          
          {/* Desktop filters */}
          <div className={cn(
            "hidden md:flex items-center gap-3",
            isFilterOpen && "flex w-full flex-wrap mt-3"
          )}>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pondicherry">Pondicherry</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sport} onValueChange={setSport}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sport Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="cricket">Cricket</SelectItem>
                <SelectItem value="badminton">Badminton</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[150px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            <div className="w-[200px] px-3">
              <p className="text-sm mb-2">Price: ₹{priceRange[0]} - ₹{priceRange[1]}</p>
              <Slider
                defaultValue={[500, 3000]}
                min={0}
                max={5000}
                step={100}
                value={priceRange}
                onValueChange={(value: number[]) => setPriceRange(value)}
              />
            </div>
          </div>
          
          <Button onClick={handleFilterChange} size="sm">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
