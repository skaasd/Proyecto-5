import { MissionView } from "@/components/mission-view";
import { getCurrentUser } from "@/lib/current-user";
import { getMissionDataForUser } from "@/lib/mission-data";

export default async function MissionPage({ params }: { params: { id: string } }) {
  const currentUser = await getCurrentUser();
  const data = await getMissionDataForUser(params.id, currentUser);

  return <MissionView data={data} />;
}
