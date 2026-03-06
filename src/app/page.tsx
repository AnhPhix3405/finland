// import Image from "next/image";
import Header from "../components/layout/header";
import QuickActionsGrid from "../components/layout/QuickActionsGrid";
import InvestmentBanner from "../components/layout/InvestmentBanner";
export default function Home() {
  return (
    <div className="">
      <Header />
      <QuickActionsGrid />
      <InvestmentBanner/>
    </div>
  );
}