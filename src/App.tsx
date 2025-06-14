// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import BrowseTurfs from "./pages/BrowseTurfs";
import TurfDetail from "./pages/TurfDetail";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Signup from "./pages/Signup";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import CustomerHome from "./pages/CustomerHome";
import Privacy from "./pages/Privacy";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleRedirect } from "@/components/RoleRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* 🏠 Home page - original Index */}
            <Route path="/" element={<Index />} />

            {/* 🔀 Role-based redirection for authenticated users */}
            <Route path="/dashboard" element={<RoleRedirect />} />

            {/* 🌐 Public Routes */}
            <Route path="/browse" element={<BrowseTurfs />} />
            <Route path="/turf/:id" element={<TurfDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* 🔒 Protected Routes */}
            <Route
              path="/customer/home"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <Bookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner/dashboard"
              element={
                <ProtectedRoute allowedRoles={["turf_owner"]}>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />

            {/* 🚫 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
