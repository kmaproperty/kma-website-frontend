import HomdeHeader from "@/components/header/homeHeader";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import NewLaunchHero from "./NewLaunchHero";
import NewLaunchProjects from "./NewLaunchProjects";
import NewLaunchWhyInvest from "./NewLaunchWhyInvest";
import NewLaunchDevelopers from "./NewLaunchDevelopers";
import NewLaunchCTA from "./NewLaunchCTA";
import NewLaunchBuyingIntro from "./NewLaunchBuyingIntro";
import NewLaunchKeyFactors from "./NewLaunchKeyFactors";
import NewLaunchPrimeCorridors from "./NewLaunchPrimeCorridors";
import NewLaunchBuyerProfiles from "./NewLaunchBuyerProfiles";
import NewLaunchFaq from "./NewLaunchFaq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Launch Projects in Gurugram | KMA Global Property",
  description: "Discover Gurgaon's most coveted new launch projects — handpicked by KMA Global Property experts. DLF, M3M, Godrej, Emaar & more. Pre-launch prices, RERA verified, zero brokerage for buyers.",
  alternates: {
    canonical: "https://kmaglobalproperty.com/new-launch", 
  },
};

export default function NewLaunchPage() {
  return (
    <div>
      <div className="fixed left-0 right-0 z-[60] flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full flex justify-center">
          <HomdeHeader />
        </div>
      </div>

      <NewLaunchHero />
      <NewLaunchProjects />
      <NewLaunchWhyInvest />
      <NewLaunchDevelopers />
      <NewLaunchCTA />
      <NewLaunchBuyingIntro />
      <NewLaunchKeyFactors />
      <NewLaunchPrimeCorridors />
      <NewLaunchBuyerProfiles />
      <NewLaunchFaq />

      <div className="bg-text-black flex justify-center pb-20">
        <AboutusDataSync />
        <HomeFooter tab={1} />
      </div>
    </div>
  );
}