
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, CreditCard, Calendar, TrendingUp } from "lucide-react";
import { adminGetAllTurfs } from "@/services/adminService";
import { Turf } from "@/services/turfService";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient"; // For fetching users

type Profile = {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  created_at?: string;
};

export default function AdminDashboard() {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Profile[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);

  // --- TURFS fetching ---
  const fetchAllTurfs = async () => {
    setLoading(true);
    try {
      const data = await adminGetAllTurfs();
      setTurfs(data);
    } catch (error) {
      toast.error("Failed to fetch turfs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTurfs();
  }, []);

  // --- USERS fetching ---
  const fetchAllUsers = async () => {
    setUsersLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, first_name, last_name, role, created_at")
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      setUsers(data || []);
    } catch (error) {
      toast.error("Failed to fetch users");
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

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
                    Start by adding the first turf facility to the platform—in the database.
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
            <h3 className="text-xl font-semibold mb-4">All Users</h3>
            {usersLoading ? (
              <div className="text-muted-foreground">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="text-muted-foreground">No users found.</div>
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b bg-muted text-left">Name</th>
                      <th className="px-4 py-2 border-b bg-muted text-left">Email</th>
                      <th className="px-4 py-2 border-b bg-muted text-left">Role</th>
                      <th className="px-4 py-2 border-b bg-muted text-left">Registered At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td className="px-4 py-2 border-b">
                          {(u.first_name || "") + " " + (u.last_name || "")}
                        </td>
                        <td className="px-4 py-2 border-b">{u.email || ""}</td>
                        <td className="px-4 py-2 border-b">{u.role || ""}</td>
                        <td className="px-4 py-2 border-b">
                          {u.created_at
                            ? new Date(u.created_at).toLocaleDateString()
                            : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
