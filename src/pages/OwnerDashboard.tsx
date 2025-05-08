
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart, Calendar, Clock, inr } from "lucide-react";
import { useState } from "react";
import { TurfDetailsDialog } from "@/components/TurfDetailsDialog";

export default function OwnerDashboard() {
  const [turfDialogOpen, setTurfDialogOpen] = useState(false);

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
              <inr className="h-4 w-4 text-muted-foreground" />
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

        <div className="mt-8">
          <Tabs defaultValue="upcoming">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
              <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
              <TabsTrigger value="availability">Manage Availability</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4 hover-scale">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Green Valley Football Turf</p>
                          <div className="mt-1 flex text-sm text-muted-foreground">
                            <span>John Doe</span>
                            <span className="mx-2">•</span>
                            <span>May 15, 2023</span>
                            <span className="mx-2">•</span>
                            <span>6:00 PM - 7:00 PM</span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                      </div>
                    </div>
                    <div className="rounded-md border p-4 fade-in">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Green Valley Football Turf</p>
                          <div className="mt-1 flex text-sm text-muted-foreground">
                            <span>Jane Smith</span>
                            <span className="mx-2">•</span>
                            <span>May 16, 2023</span>
                            <span className="mx-2">•</span>
                            <span>7:00 PM - 9:00 PM</span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="font-medium">Green Valley Football Turf</p>
                          <div className="mt-1 flex flex-wrap text-sm text-muted-foreground">
                            <span>Robert Johnson</span>
                            <span className="mx-2">•</span>
                            <span>May 18, 2023</span>
                            <span className="mx-2">•</span>
                            <span>5:00 PM - 6:00 PM</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="availability" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Detailed availability management interface will be available in the full version
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="earnings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Detailed earnings reports and analytics will be available in the full version
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <TurfDetailsDialog
        open={turfDialogOpen}
        onOpenChange={setTurfDialogOpen}
        isEdit={true}
        turfData={{
          name: "Green Valley Football Turf",
          location: "Mahavishnu Nagar, Mortandi",
          price: 500,
          description: "A premium football turf with well-maintained grass and excellent facilities.",
          sportsAvailable: ["Football", "Cricket"],
          amenities: ["Parking", "Changing Rooms", "Floodlights", "Water"],
          imageUrl: "/placeholder.svg",
        }}
      />
    </Layout>
  );
}
