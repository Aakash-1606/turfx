
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { getTurfById, Turf } from "@/services/turfService";
import { TurfInfo } from "@/components/turf/TurfInfo";
import { TurfBooking } from "@/components/turf/TurfBooking";

export default function TurfDetail() {
  const { id } = useParams<{ id: string }>();
  const [turf, setTurf] = useState<Turf | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTurf(id);
    }
  }, [id]);

  const fetchTurf = async (turfId: string) => {
    try {
      const data = await getTurfById(turfId);
      setTurf(data);
    } catch (error) {
      console.error("Error fetching turf:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!turf) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Turf not found</h1>
            <p className="text-muted-foreground">The turf you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={turf.image}
                alt={turf.name}
                className="h-full w-full object-cover"
              />
            </div>
            <TurfInfo turf={turf} />
          </div>
          <div>
            <TurfBooking turf={turf} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
