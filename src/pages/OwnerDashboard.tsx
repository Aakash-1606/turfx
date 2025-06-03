
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart, Calendar, Clock, Plus, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { TurfDetailsDialog } from "@/components/TurfDetailsDialog";
import { getTurfsByOwner, deleteTurf, Turf } from "@/services/turfService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [turfDialogOpen, setTurfDialogOpen] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState<Turf | null>(null);
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTurfs = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const data = await getTurfsByOwner(user.id);
      setTurfs(data);
    } catch (error) {
      console.error("Error fetching turfs:", error);
      toast.error("Failed to fetch turfs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, [user]);

  const handleAddTurf = () => {
    setSelectedTurf(null);
    setTurfDialogOpen(true);
  };

  const handleEditTurf = (turf: Turf) => {
    setSelectedTurf(turf);
    setTurfDialogOpen(true);
  };

  const handleDeleteTurf = async (turfId: string) => {
    if (!confirm("Are you sure you want to delete this turf?")) return;
    
    try {
      await deleteTurf(turfId);
      toast.success("Turf deleted successfully");
      fetchTurfs(); // Refresh the list
    } catch (error) {
      console.error("Error deleting turf:", error);
      toast.error("Failed to delete turf");
    }
  };

  const handleTurfSaved = () => {
    fetchTurfs(); // Refresh the list after adding/updating
    setTurfDialogOpen(false);
  };

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
          <Button onClick={handleAddTurf}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Turf
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Turfs</CardTitle>
              <span className="text-muted-foreground">🏟️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{turfs.length}</div>
              <p className="text-xs text-muted-foreground">
                Active turf listings
              </p>
            </CardContent>
          </Card>
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
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Your Turfs</h2>
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
                  Start by adding your first turf listing.
                </p>
                <Button onClick={handleAddTurf}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Turf
                </Button>
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
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {turf.description}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTurf(turf)}
                        className="flex-1"
                      >
                        <Pencil className="mr-2 h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteTurf(turf.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <TurfDetailsDialog
        open={turfDialogOpen}
        onOpenChange={setTurfDialogOpen}
        isEdit={!!selectedTurf}
        turfData={selectedTurf}
        onSave={handleTurfSaved}
      />
    </Layout>
  );
}
