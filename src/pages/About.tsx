
import { Layout } from "@/components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">About TurfX</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              TurfX is Pondicherry's premier sports turf booking platform, making it easy for sports enthusiasts 
              to find and book the perfect venue for their games and activities.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to connect sports lovers with quality facilities, making sports more accessible 
              to everyone. We believe that finding and booking a sports venue should be as simple as 
              booking movie tickets - quick, transparent, and hassle-free.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">What Makes Us Different</h2>
            <ul className="space-y-2 list-disc pl-6 mt-4">
              <li>Comprehensive listings of all sports turfs in Pondicherry</li>
              <li>Real-time availability and instant booking confirmation</li>
              <li>Detailed information about each facility including amenities</li>
              <li>User reviews and ratings to help you choose the best venue</li>
              <li>No upfront payment - pay directly at the venue</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
            <p>
              TurfX was founded in 2023 by a group of sports enthusiasts who were frustrated with the 
              process of finding and booking sports facilities. We noticed that while other industries had 
              moved online, sports venue booking was still stuck in the past - relying on phone calls, 
              uncertainty about availability, and lack of transparency.
            </p>
            <p className="mt-4">
              Starting with just a few partners in Pondicherry, we've grown to include all major sports turfs 
              in the city, with plans to expand to neighboring areas soon. Our platform has helped thousands 
              of users book their favorite sports activities without the hassle.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Join Our Community</h2>
            <p>
              Whether you're an individual looking to play with friends, a team seeking regular practice venues, 
              or a turf owner wanting to list your facility, TurfX welcomes you. Join our growing community of 
              sports enthusiasts and facility owners making sports more accessible for everyone.
            </p>
          </div>
          
          <div className="mt-12 p-6 bg-primary/5 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-4">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <ul className="space-y-2">
              <li>Email: info@turfx.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: 123 Beach Road, White Town, Pondicherry - 605001</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
