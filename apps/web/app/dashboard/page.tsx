import { DashboardView } from "@/components/dashboard-view";
import { getCurrentUser } from "@/lib/current-user";
import { getDashboardDataForUser } from "@/lib/dashboard-data";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  const data = await getDashboardDataForUser(currentUser);

  return <DashboardView data={data} />;
}
