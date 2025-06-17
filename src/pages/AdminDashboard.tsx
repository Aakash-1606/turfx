
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, CreditCard, Calendar, TrendingUp, Plus, Edit } from "lucide-react";
import { adminGetAllTurfs } from "@/services/adminService";
import { Turf } from "@/services/turfService";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { UserBookingsDialog } from "@/components/UserBookingsDialog";
import { AdminTurfDialog } from "@/components/AdminTurfDialog";
import { useRef } from "react";

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

  // Turf dialog states
  const [turfDialogOpen, setTurfDialogOpen] = useState(false);
  const [editingTurf, setEditingTurf] = useState<Turf | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

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

  // --- REALTIME USERS LISTENING ---
  useEffect(() => {
    const channel = supabase
      .channel("realtime:profiles")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, payload => {
        fetchAllUsers(); // Refresh users list on any change
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line
  }, []);

  // SEARCH STATES
  const [turfSearch, setTurfSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: string, name: string } | null>(null);

  // Turf dialog handlers
  const handleAddTurf = () => {
    setEditingTurf(null);
    setIsEditMode(false);
    setTurfDialogOpen(true);
  };

  const handleEditTurf = (turf: Turf) => {
    setEditingTurf(turf);
    setIsEditMode(true);
    setTurfDialogOpen(true);
  };

  const handleTurfDialogSave = () => {
    fetchAllTurfs(); // Refresh turfs list after save
    setTurfDialogOpen(false);
    setEditingTurf(null);
    setIsEditMode(false);
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
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          <TabsContent value="turfs" className="mt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
              <h3 className="text-xl font-semibold">All Turf Facilities</h3>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Search Turfs..."
                  className="border rounded px-3 py-1.5 text-sm max-w-xs"
                  value={turfSearch}
                  onChange={e => setTurfSearch(e.target.value)}
                />
                <Button onClick={handleAddTurf} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Turf
                </Button>
              </div>
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
                  <Button onClick={handleAddTurf} className="flex items-center gap-2 mx-auto">
                    <Plus className="h-4 w-4" />
                    Add First Turf
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {turfs
                  .filter(turf =>
                    turf.name.toLowerCase().includes(turfSearch.toLowerCase()) ||
                    (turf.location && turf.location.toLowerCase().includes(turfSearch.toLowerCase()))
                  )
                  .map((turf) => (
                    <Card key={turf.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{turf.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{turf.sport}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditTurf(turf)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
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
          <TabsContent value="users" className="mt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
              <h3 className="text-xl font-semibold">All Users</h3>
              <input
                type="text"
                placeholder="Search Users..."
                className="border rounded px-3 py-1.5 text-sm max-w-xs"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
              />
            </div>
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
                      <th className="px-4 py-2 border-b bg-muted text-left">Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter(u =>
                        ((u.first_name || "") + " " + (u.last_name || "")).toLowerCase().includes(userSearch.toLowerCase()) ||
                        (u.email && u.email.toLowerCase().includes(userSearch.toLowerCase()))
                      )
                      .map((u) => (
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
                        <td className="px-4 py-2 border-b">
                          <button
                            className="text-blue-600 hover:underline text-sm"
                            onClick={() => {
                              setSelectedUser({
                                id: u.id,
                                name: ((u.first_name || "") + " " + (u.last_name || "")).trim() || (u.email || ""),
                              });
                              setUserDialogOpen(true);
                            }}
                          >
                            View Bookings
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <UserBookingsDialog
              open={userDialogOpen}
              onClose={() => setUserDialogOpen(false)}
              userId={selectedUser?.id ?? null}
              userName={selectedUser?.name ?? ""}
            />
          </TabsContent>
        </Tabs>

        <AdminTurfDialog
          open={turfDialogOpen}
          onOpenChange={setTurfDialogOpen}
          isEdit={isEditMode}
          turfData={editingTurf}
          onSave={handleTurfDialogSave}
        />
      </div>
    </Layout>
  );
}
