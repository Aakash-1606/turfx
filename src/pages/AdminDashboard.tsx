import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { User, Calendar, MapPin, CreditCard, TrendingUp, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const data = [
  { name: "Mon", bookings: 4 },
  { name: "Tue", bookings: 3 },
  { name: "Wed", bookings: 5 },
  { name: "Thu", bookings: 7 },
  { name: "Fri", bookings: 10 },
  { name: "Sat", bookings: 12 },
  { name: "Sun", bookings: 8 },
];

export default function AdminDashboard() {
  const [animateChart, setAnimateChart] = useState(false);
  
  useEffect(() => {
    // Animate dashboard elements on load
    const animateElements = () => {
      setAnimateChart(true);
      
      // Apply reveal animation to cards
      const cards = document.querySelectorAll('.dashboard-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          if (card instanceof HTMLElement) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }
        }, 100 * index);
      });
    };
    
    // Add parallax effect to the background decoration
    const parallaxBg = (e) => {
      const decorElements = document.querySelectorAll('.bg-decor');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      decorElements.forEach((elem) => {
        if (elem instanceof HTMLElement) {
          elem.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        }
      });
    };
    
    // Initialize animations
    setTimeout(animateElements, 300);
    
    // Add mousemove event for parallax
    window.addEventListener('mousemove', parallaxBg);
    
    return () => {
      window.removeEventListener('mousemove', parallaxBg);
    };
  }, []);

  return (
    <Layout>
      <div className="container relative">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="bg-decor absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="bg-decor absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-secondary/10 blur-3xl"></div>
        </div>
        
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your TurfX business</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="dashboard-card" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-muted-foreground">Total Turfs</div>
              </div>
              <User className="h-6 w-6 text-primary" />
            </div>
          </Card>
          
          <Card className="dashboard-card" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">₹12,500</div>
                <div className="text-muted-foreground">Revenue This Month</div>
              </div>
              <CreditCard className="h-6 w-6 text-green-500" />
            </div>
          </Card>
          
          <Card className="dashboard-card" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">128</div>
                <div className="text-muted-foreground">Bookings This Month</div>
              </div>
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
          </Card>
          
          <Card className="dashboard-card" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              <TrendingUp className="h-6 w-6 text-yellow-500" />
            </div>
          </Card>
        </div>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>
          
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
                    <td className="px-5 py-5 border-b text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-foreground whitespace-no-wrap">
                            City Ground
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b text-sm">
                      <p className="text-foreground whitespace-no-wrap">
                        10/05/2024
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b text-sm">
                      <p className="text-foreground whitespace-no-wrap">
                        16:00
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b text-sm">
                      <p className="text-foreground whitespace-no-wrap">
                        John Doe
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative text-xs">Active</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 border-b text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-foreground whitespace-no-wrap">
                            Sports Arena
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b text-sm">
                      <p className="text-foreground whitespace-no-wrap">
                        12/05/2024
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b text-sm">
                      <p className="text-foreground whitespace-no-wrap">
                        18:00
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b text-sm">
                      <p className="text-foreground whitespace-no-wrap">
                        Jane Smith
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                        <span className="relative text-xs">Cancelled</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#8884d8" className={animateChart ? 'fade-in' : ''} />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-right mt-2 text-muted-foreground">
              <TrendingUp className="inline-block h-4 w-4 mr-1 align-middle" />
              <span>+15% from last month</span>
            </div>
          </TabsContent>
          
          <TabsContent value="locations" className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Top Locations</h3>
            <ul className="list-none pl-0">
              <li className="py-2 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-medium">Pondicherry</p>
                    <p className="text-sm text-muted-foreground">12 Turfs</p>
                  </div>
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
              </li>
              <li className="py-2 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-medium">Chennai</p>
                    <p className="text-sm text-muted-foreground">8 Turfs</p>
                  </div>
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
              </li>
              <li className="py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-medium">Bangalore</p>
                    <p className="text-sm text-muted-foreground">5 Turfs</p>
                  </div>
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
