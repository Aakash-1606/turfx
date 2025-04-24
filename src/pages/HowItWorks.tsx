
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold">How TurfTime Works</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Booking sports facilities has never been easier - just like booking movie tickets!
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col items-center md:items-end">
              <div className="rounded-lg border bg-card p-6 shadow-md w-full max-w-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="text-xl font-semibold">1</span>
                </div>
                <h2 className="mb-3 text-xl font-semibold">Find the Perfect Turf</h2>
                <p className="text-muted-foreground">
                  Browse through our extensive collection of sports facilities. Filter by location, 
                  sport type, price, and more to find the perfect match for your needs.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex h-full items-center">
                <img
                  src="https://images.unsplash.com/photo-1487466365202-1afdb86c764e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Football turf"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-20 grid gap-12 md:grid-cols-2">
            <div className="relative order-2 md:order-1">
              <div className="flex h-full items-center">
                <img
                  src="https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Calendar selection"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex flex-col items-center md:items-start">
              <div className="rounded-lg border bg-card p-6 shadow-md w-full max-w-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="text-xl font-semibold">2</span>
                </div>
                <h2 className="mb-3 text-xl font-semibold">Select a Date and Time</h2>
                <p className="text-muted-foreground">
                  Just like picking seats at a movie theater, choose from available time slots on your 
                  preferred date. Our visual booking interface makes it easy to see what's available.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-20 grid gap-12 md:grid-cols-2">
            <div className="flex flex-col items-center md:items-end">
              <div className="rounded-lg border bg-card p-6 shadow-md w-full max-w-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="text-xl font-semibold">3</span>
                </div>
                <h2 className="mb-3 text-xl font-semibold">Book and Play</h2>
                <p className="text-muted-foreground">
                  Confirm your booking with a simple click. No upfront payment required - just pay at the venue. 
                  Receive instant confirmation and you're all set to play!
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex h-full items-center">
                <img
                  src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Sports play"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 rounded-lg bg-primary/10 p-8 text-center">
          <h2 className="text-2xl font-bold">Ready to Book Your First Turf?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Join thousands of sports enthusiasts who are already enjoying seamless 
            booking experiences on TurfTime.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/browse">Browse Turfs</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
