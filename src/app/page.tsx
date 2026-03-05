// import Image from "next/image";
import Header from "../components/layout/header";
import QuickActionsGrid from "../components/layout/QuickActionsGrid";
import InvestmentBanner from "../components/layout/InvestmentBanner";
import LandUsePlanningMap from "../components/layout/LandUsePlanningMap";
import RealEstatePriceMap from "../components/layout/RealEstatePriceMap";
import StateLandValuation from "../components/layout/StateLandValuation";
export default function Home() {
  return (
    <div className="">
      <Header />
      <QuickActionsGrid />
      <InvestmentBanner/>
      <LandUsePlanningMap/>
      <RealEstatePriceMap/>
      <StateLandValuation/>
    </div>
  );
}
