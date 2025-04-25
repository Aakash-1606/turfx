
export interface Turf {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  sport: string;
  amenities: string[];
  description: string;
}

export const turfs: Turf[] = [
  {
    id: "1",
    name: "FFC Arena Pondy",
    location: "Mahavishnu Nagar, Mortandi",
    image: "/lovable-uploads/4ce6b63b-0348-4eab-b6f9-dfe52bbbe41c.png",
    price: 1200,
    rating: 4.5,
    sport: "Football",
    amenities: ["Floodlights", "Changing Rooms", "Parking", "Water Dispensers"],
    description: "Premier football turf in Mahavishnu Nagar with professional-grade artificial grass and modern amenities."
  },
  {
    id: "2",
    name: "Pondy Pitch",
    location: "Ramayee Garden, Ariyankuppam",
    image: "https://images.unsplash.com/photo-1487466365202-1afdb86c764e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    price: 1000,
    rating: 4.3,
    sport: "Football",
    amenities: ["Night Lighting", "Parking", "Seating Area"],
    description: "Well-maintained football turf in Ariyankuppam with excellent facilities and easy accessibility."
  },
  {
    id: "3",
    name: "Flick on Arena",
    location: "Opp. Shiva Vishnu Mahal, Karuvadikuppam",
    image: "https://images.unsplash.com/photo-1577075246611-39e1f9f0fa3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    price: 1100,
    rating: 4.4,
    sport: "Football",
    amenities: ["Pro Turf", "Floodlights", "Washrooms"],
    description: "Modern sports facility opposite Shiva Vishnu Mahal, perfect for evening games."
  },
  {
    id: "4",
    name: "Turf 10",
    location: "Ellaipillaichavady",
    image: "https://images.unsplash.com/photo-1589743795127-e32dfd70a399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    price: 900,
    rating: 4.2,
    sport: "Football",
    amenities: ["Basic Amenities", "Parking", "Water"],
    description: "Affordable and accessible turf in Ellaipillaichavady, ideal for casual games and practice sessions."
  },
  {
    id: "5",
    name: "Unity Park",
    location: "ECR Road, Opp. Ambur Star Biryani",
    image: "https://images.unsplash.com/photo-1534296264129-22c9f242d00c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    price: 1500,
    rating: 4.7,
    sport: "Multi-Sport",
    amenities: ["Premium Facilities", "Cafe", "Pro Shop", "Coaching"],
    description: "Premium multi-sport facility on ECR Road with top-notch amenities and professional coaching options."
  },
  {
    id: "6",
    name: "DK7 Sports Hub",
    location: "Near Aditya Vidyashram, Moolakulam",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    price: 1300,
    rating: 4.6,
    sport: "Multi-Sport",
    amenities: ["Multiple Courts", "Pro Training", "Cafe"],
    description: "Comprehensive sports hub near Aditya Vidyashram offering multiple sports facilities and professional training."
  },
  {
    id: "7",
    name: "MSG Turf",
    location: "Thavalakuppam, Periyakattupalayam",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    price: 800,
    rating: 4.1,
    sport: "Football",
    amenities: ["Basic Facilities", "Parking"],
    description: "Affordable football turf in Thavalakuppam with basic amenities for casual players."
  },
  {
    id: "8",
    name: "Spin Turf",
    location: "Marina Beach area",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    price: 1200,
    rating: 4.4,
    sport: "Cricket",
    amenities: ["Cricket Nets", "Equipment Rental", "Coaching"],
    description: "Specialized cricket facility near Marina Beach with professional coaching and equipment rental."
  },
  {
    id: "9",
    name: "Dynamic Sports Club",
    location: "Sudhakar Nagar, Reddiyarpalayam",
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    price: 1100,
    rating: 4.3,
    sport: "Multi-Sport",
    amenities: ["Multiple Courts", "Gym", "Cafe"],
    description: "Comprehensive sports club in Reddiyarpalayam offering various sports facilities and fitness options."
  },
  {
    id: "10",
    name: "Turf Eden Gulf Villianur",
    location: "Marie Oulgaret, Manavely",
    image: "https://images.unsplash.com/photo-1589743795127-e32dfd70a399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    price: 1000,
    rating: 4.2,
    sport: "Football",
    amenities: ["Standard Facilities", "Parking", "Refreshments"],
    description: "Well-maintained football turf in Manavely with standard amenities and refreshment options."
  }
];

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  // Generate time slots from 6am to 10pm
  const slots: TimeSlot[] = [];
  const startHour = 6; // 6am
  const endHour = 22; // 10pm
  
  for (let hour = startHour; hour < endHour; hour++) {
    // Create random availability, but more likely to be available
    const available = Math.random() > 0.3;
    
    // Format the time (e.g. "6:00 AM")
    const timeStr = `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
    
    slots.push({
      id: `slot-${date.toISOString().split('T')[0]}-${hour}`,
      time: timeStr,
      available
    });
  }
  
  return slots;
};
