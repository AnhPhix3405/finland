// import Image from "next/image";
import QuickActionsGrid from "../components/layout/home/QuickActionsGrid";
import InvestmentBanner from "../components/layout/home/InvestmentBanner";
import LandUsePlanningMap from "../components/layout/home/LandUsePlanningMap";
import RealEstatePriceMap from "../components/layout/home/RealEstatePriceMap";
import StateLandValuation from "../components/layout/home/StateLandValuation";
import PostingSupportPolicy from "../components/layout/home/PostingSupportPolicy";
import InstructionalVideos from "../components/layout/home/InstructionalVideos";
export default function Home() {
  return (
    <div className="">
      <QuickActionsGrid />
      <InvestmentBanner/>
      <LandUsePlanningMap/>
      <RealEstatePriceMap/>
      <StateLandValuation/>
      <PostingSupportPolicy/>
      <InstructionalVideos/>
    </div>
  );
}
