
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart, Calendar, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { TurfDetailsDialog } from "@/components/TurfDetailsDialog";

export default function AdminDashboard() {
  const [addTurfDialogOpen, setAddTurfDialogOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dashboardRef = useRef(null);

  useEffect(() => {
    // Set loaded state after a short delay for animation purposes
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    // Add IntersectionObserver to handle reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (dashboardRef.current) {
      observer.observe(dashboardRef.current);
    }
    
    document.querySelectorAll('.dashboard-item').forEach((el, index) => {
      el.classList.add('stagger-item');
      el.style.animationDelay = `${index * 0.1 + 0.3}s`;
      el.style.animation = 'fadeIn 0.5s ease-out forwards';
      observer.observe(el);
    });
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <Layout>
      <div className="container py-8" ref={dashboardRef}>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 reveal">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Manage bookings, turfs, users, and revenue
            </p>
          </div>
          <Button 
            onClick={() => setAddTurfDialogOpen(true)}
            className={`transition-transform duration-300 ${loaded ? 'scale-100' : 'scale-95 opacity-0'} hover:bg-primary/90 hover:-translate-y-1`}
          >
            Add New Turf
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="dashboard-item transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <span className="text-muted-foreground">₹</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹24,567</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="dashboard-item transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Turf Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="dashboard-item transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Turfs</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>
          <Card className="dashboard-item transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,352</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 reveal">
          <Tabs defaultValue="bookings">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
              <TabsTrigger value="turfs">Turfs</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            <TabsContent value="bookings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4 transition-all duration-300 hover:shadow-md hover:border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Green Valley Football Turf</p>
                          <div className="mt-1 flex text-sm text-muted-foreground">
                            <span>John Doe</span>
                            <span className="mx-2">•</span>
                            <span>May 15, 2023</span>
                            <span className="mx-2">•</span>
                            <span>6:00 PM</span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 transition-all duration-300 hover:scale-105">Paid</Badge>
                      </div>
                    </div>
                    <div className="rounded-md border p-4 transition-all duration-300 hover:shadow-md hover:border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">City Hoops Basketball Court</p>
                          <div className="mt-1 flex text-sm text-muted-foreground">
                            <span>Jane Smith</span>
                            <span className="mx-2">•</span>
                            <span>May 14, 2023</span>
                            <span className="mx-2">•</span>
                            <span>7:00 PM</span>
                          </div>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800 transition-all duration-300 hover:scale-105">Pending</Badge>
                      </div>
                    </div>
                    <div className="rounded-md border p-4 transition-all duration-300 hover:shadow-md hover:border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Smash Point Tennis Club</p>
                          <div className="mt-1 flex text-sm text-muted-foreground">
                            <span>Robert Johnson</span>
                            <span className="mx-2">•</span>
                            <span>May 14, 2023</span>
                            <span className="mx-2">•</span>
                            <span>5:00 PM</span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 transition-all duration-300 hover:scale-105">Paid</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="turfs" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Turfs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Detailed turf management interface will be available in the full version
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="users" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Detailed user management interface will be available in the full version
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
        open={addTurfDialogOpen}
        onOpenChange={setAddTurfDialogOpen}
        isEdit={false}
      />
    </Layout>
  );
}
