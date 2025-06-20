
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile } from "@/components/UserProfile";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
            <img
              src="/lovable-uploads/4ce6b63b-0348-4eab-b6f9-dfe52bbbe41c.png"
              alt="TurfX Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-lg font-bold text-foreground">TurfX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/browse"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Browse Turfs
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/bookings"
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                My Bookings
              </Link>
            </>
          )}
          <Link
            to="/about"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="hidden md:flex">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="hidden md:flex">
                  <UserProfile />
                </div>
              )}
            </>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/" 
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/browse" 
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Browse Turfs
                </Link>
                {isAuthenticated && (
                  <Link 
                    to="/bookings" 
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    My Bookings
                  </Link>
                )}
                <Link 
                  to="/about" 
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                {!loading && (
                  <div className="flex flex-col gap-2 mt-4">
                    {!isAuthenticated ? (
                      <>
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">
                            <User className="h-4 w-4 mr-2" />
                            Login
                          </Button>
                        </Link>
                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                          <Button className="w-full">Sign Up</Button>
                        </Link>
                      </>
                    ) : (
                      <div className="w-full">
                        <UserProfile />
                      </div>
                    )}
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
