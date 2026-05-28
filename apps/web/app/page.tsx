import { HomeView } from "@/components/home-view";
import { homeData } from "@/lib/home-data";

export default function HomePage() {
  return <HomeView data={homeData} />;
}
