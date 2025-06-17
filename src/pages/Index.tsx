
import { HeroSection } from "@/components/HeroSection";
import { FeaturedTurfs } from "@/components/FeaturedTurfs";
import { SportsCategories } from "@/components/SportsCategories";
import { Layout } from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { getAllTurfs, Turf } from "@/services/turfService";
import { toast } from "sonner";

export default function Index() {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTurfs() {
      try {
        console.log('Index page: Starting to fetch turfs...');
        const data = await getAllTurfs();
        console.log('Index page: Received turfs data:', data);
        setTurfs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching turfs:", error);
        toast.error("Failed to load turfs. Please try again later.");
        setLoading(false);
      }
    }
    
    fetchTurfs();
  }, []);

  return (
    <Layout>
      <HeroSection />
      <SportsCategories />
      <FeaturedTurfs turfs={turfs} />
    </Layout>
  );
}
