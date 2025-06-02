import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { TurfDetailsDialog } from "@/components/TurfDetailsDialog";
import { supabase } from "@/lib/supabaseClient"; // Make sure you import your supabase client

export default function OwnerDashboard() {
  const [turfDialogOpen, setTurfDialogOpen] = useState(false);
  const [turfs, setTurfs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Step 2.3: Fetch turfs owned by the logged-in user
  const fetchTurfs = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setTurfs([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("turfs")
      .select("*")
      .eq("owner_id", user.id);

    if (error) {
      console.error("Error fetching turfs:", error);
      setTurfs([]);
    } else {
      setTurfs(data);
    }
    setLoading(false);
  };

  // Step 2.4: Call fetchTurfs on component mount
  useEffect(() => {
    fetchTurfs();
  }, []);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Owner Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your turfs, bookings, and earnings
            </p>
          </div>
          <Button onClick={() => setTurfDialogOpen(true)}>
            Update Turf Details
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <span className="text-muted-foreground">₹</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹4,567</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Booking Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86 hrs</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* NEW: Display fetched turfs */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Your Turfs</h2>
          {loading ? (
            <p>Loading turfs...</p>
          ) : turfs.length === 0 ? (
            <p>No turfs found. Please add your turf details.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {turfs.map((turf) => (
                <Card key={turf.id}>
                  <CardHeader>
                    <CardTitle>{turf.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Location:</strong> {turf.location}</p>
                    <p><strong>Price:</strong> ₹{turf.price}</p>
                    <p className="mt-2">{turf.description}</p>
                    {/* Add button to open TurfDetailsDialog if needed */}
                    <Button
                      className="mt-4"
                      onClick={() => {
                        setTurfDialogOpen(true);
                        // Optionally pass this turf's data to dialog
                      }}
                    >
                      Edit Turf
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Your Tabs & Booking sections remain unchanged */}
        <div className="mt-8">
          {/* ... your existing Tabs code here ... */}
        </div>
      </div>

      {/* You can modify TurfDetailsDialog to accept dynamic turf data if you want */}
      <TurfDetailsDialog
        open={turfDialogOpen}
        onOpenChange={setTurfDialogOpen}
        isEdit={true}
        turfData={
          turfs.length > 0
            ? turfs[0]
            : {
                name: "Green Valley Football Turf",
                location: "Mahavishnu Nagar, Mortandi",
                price: 500,
                description: "A premium football turf with well-maintained grass and excellent facilities.",
                sportsAvailable: ["Football", "Cricket"],
                amenities: ["Parking", "Changing Rooms", "Floodlights", "Water"],
                imageUrl: "/placeholder.svg",
              }
        }
      />
    </Layout>
  );
}
