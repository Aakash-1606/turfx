
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { TurfDetailsDialog } from "@/components/TurfDetailsDialog";

export default function AdminDashboard() {
  const [addTurfDialogOpen, setAddTurfDialogOpen] = useState(false);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Manage bookings, turfs, users, and revenue
            </p>
          </div>
          <Button onClick={() => setAddTurfDialogOpen(true)}>Add New Turf</Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
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
          <Card>
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
          <Card>
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
          <Card>
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

        <div className="mt-8">
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
                    <div className="rounded-md border p-4 hover-scale">
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
                        <Badge className="bg-green-100 text-green-800">Paid</Badge>
                      </div>
                    </div>
                    <div className="rounded-md border p-4 fade-in">
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
                        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      </div>
                    </div>
                    <div className="rounded-md border p-4 fade-in">
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
                        <Badge className="bg-green-100 text-green-800">Paid</Badge>
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
