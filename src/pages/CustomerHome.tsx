
import { Layout } from "@/components/layout/Layout";
import { UserDashboard } from "@/components/UserDashboard";

export default function CustomerHome() {
  return (
    <Layout>
      <div className="container py-8">
        <UserDashboard />
      </div>
    </Layout>
  );
}
