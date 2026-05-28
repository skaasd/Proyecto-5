import { PortfolioView } from "@/components/portfolio-view";
import { portfolioMock } from "@/lib/portfolio-data";

export default function DemoPortfolioPage() {
  return <PortfolioView data={portfolioMock} />;
}
