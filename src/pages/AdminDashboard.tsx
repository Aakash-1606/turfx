import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, User, Calendar, MapPin, CreditCard, TrendingUp } from "lucide-react";
import { AdminTurfDialog } from "@/components/AdminTurfDialog";
import { adminGetAllTurfs, adminDeleteTurf } from "@/services/adminService";
import { Turf } from "@/services/turfService";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [turfDialogOpen, setTurfDialogOpen] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState<Turf | null>(null);
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTurfs = async () => {
    setLoading(true);
    try {
      console.log('Admin fetching all turfs');
      const data = await adminGetAllTurfs();
      console.log('All turfs fetched:', data);
      setTurfs(data);
    } catch (error) {
      console.error("Error fetching turfs:", error);
      toast.error("Failed to fetch turfs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTurfs();
  }, []);

  const handleAddTurf = () => {
    setSelectedTurf(null);
    setTurfDialogOpen(true);
  };

  const handleEditTurf = (turf: Turf) => {
    console.log('Admin editing turf:', turf);
    setSelectedTurf(turf);
    setTurfDialogOpen(true);
  };

  const handleDeleteTurf = async (turfId: string) => {
    if (!confirm("Are you sure you want to delete this turf? This action cannot be undone.")) return;
    
    try {
      console.log('Admin deleting turf:', turfId);
      await adminDeleteTurf(turfId);
      toast.success("Turf deleted successfully");
      fetchAllTurfs(); // Refresh the list
    } catch (error) {
      console.error("Error deleting turf:", error);
      toast.error("Failed to delete turf");
    }
  };

  const handleTurfSaved = () => {
    console.log('Turf saved, refreshing list');
    fetchAllTurfs(); // Refresh the list after adding/updating
    setTurfDialogOpen(false);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Manage all turfs, users, and platform operations
            </p>
          </div>
          
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Turfs</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{turfs.length}</div>
              <p className="text-xs text-muted-foreground">
                Active facilities
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
              <CreditCard className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹12,500</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings This Month</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">
                Across all turfs
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="turfs" className="mt-8">
          <TabsList>
            <TabsTrigger value="turfs">All Turfs</TabsTrigger>
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="turfs" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">All Turf Facilities</h3>
              <p className="text-sm text-muted-foreground">
                Manage all turfs across the platform
              </p>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                        <div className="h-10 bg-muted rounded w-full mt-4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : turfs.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <h3 className="text-xl mb-2">No turfs found</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by adding the first turf facility to the platform.
                  </p>
                  
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {turfs.map((turf) => (
                  <Card key={turf.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{turf.name}</CardTitle>
                        <Badge variant="secondary">{turf.sport}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Location:</strong> {turf.location}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Price:</strong> ₹{turf.price}/hr
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Capacity:</strong> {turf.capacity} players
                      </p>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {turf.description}
                      </p>
                      
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bookings" className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Turf
                    </th>
                    <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 py-5 border-b text-sm">City Ground</td>
                    <td className="px-5 py-5 border-b text-sm">10/05/2024</td>
                    <td className="px-5 py-5 border-b text-sm">16:00</td>
                    <td className="px-5 py-5 border-b text-sm">John Doe</td>
                    <td className="px-5 py-5 border-b text-sm">
                      <Badge variant="default">Active</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Platform Users</h3>
            <p className="text-muted-foreground">User management features coming soon...</p>
          </TabsContent>
        </Tabs>
      </div>

      
    </Layout>
  );
}
