// import HomdeHeader from "@/components/header/homeHeader";
// import HomeFooter from "@/components/footer/homeFooter";
// import AboutusDataSync from "@/components/footer/AboutusDataSync";
// import NewLaunchHero from "./NewLaunchHero";
// import NewLaunchProjects from "./NewLaunchProjects";
// import NewLaunchWhyInvest from "./NewLaunchWhyInvest";
// import NewLaunchDevelopers from "./NewLaunchDevelopers";
// import NewLaunchCTA from "./NewLaunchCTA";
// import NewLaunchBuyingIntro from "./NewLaunchBuyingIntro";
// import NewLaunchKeyFactors from "./NewLaunchKeyFactors";
// import NewLaunchPrimeCorridors from "./NewLaunchPrimeCorridors";
// import NewLaunchBuyerProfiles from "./NewLaunchBuyerProfiles";
// import NewLaunchFaq from "./NewLaunchFaq";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "New Launch Projects in Gurugram | KMA Global Property",
//   description: "Discover Gurgaon's most coveted new launch projects — handpicked by KMA Global Property experts. DLF, M3M, Godrej, Emaar & more. Pre-launch prices, RERA verified, zero brokerage for buyers.",
//   alternates: {
//     canonical: "https://kmaglobalproperty.com/new-launch", 
//   },
// };

// export default function NewLaunchPage() {
//   return (
//     <div>
//       <div className="fixed left-0 right-0 z-[60] flex justify-center pointer-events-none">
//         <div className="pointer-events-auto w-full flex justify-center">
//           <HomdeHeader />
//         </div>
//       </div>

//       <NewLaunchHero />
//       <NewLaunchProjects />
//       <NewLaunchWhyInvest />
//       <NewLaunchDevelopers />
//       <NewLaunchCTA />
//       <NewLaunchBuyingIntro />
//       <NewLaunchKeyFactors />
//       <NewLaunchPrimeCorridors />
//       <NewLaunchBuyerProfiles />
//       <NewLaunchFaq />

//       <div className="bg-text-black flex justify-center pb-20">
//         <AboutusDataSync />
//         <HomeFooter tab={1} />
//       </div>
//     </div>
//   );
// }

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
  openGraph: {
    type: "website",
    siteName: "KMA Global Properties",
    title: "New Launch Projects in Gurgaon | KMA Global Properties",
    description:
      "Discover the latest residential and commercial property launches in Gurgaon with expert guidance from KMA Global Properties.",
    url: "https://kmaglobalproperty.com/new-launch",
    locale: "en_IN",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/images/og/new-launch.jpg",
        width: 1200,
        height: 630,
        alt: "New Launch Projects in Gurgaon",
      },
    ],
  },

  // TWITTER CARDS
  twitter: {
    card: "summary_large_image",
    site: "@kmaproperty",
    creator: "@kmaproperty",
    title: "New Launch Projects in Gurgaon | KMA Global Properties",
    description:
      "Discover newly launched residential and commercial projects across Gurgaon with expert guidance from KMA Global Properties.",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/images/og/new-launch.jpg",
        alt: "New Launch Projects",
      },
    ],
  },
};

export default function NewLaunchPage() {
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://kmaglobalproperty.com/new-launch#collectionpage",
    url: "https://kmaglobalproperty.com/new-launch",
    name: "New Launch Projects in Gurugram | KMA Global Properties",
    headline: "New Launch Residential & Commercial Projects",
    description:
      "Explore verified new launch residential and commercial projects in Gurugram and Delhi NCR. Compare builders, prices, floor plans, amenities and investment opportunities with KMA Global Properties.",
    inLanguage: "en-IN",
    isPartOf: {
      "@id": "https://kmaglobalproperty.com/#website",
    },
    about: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
    publisher: {
      "@id": "https://kmaglobalproperty.com/#organization",
    },
    breadcrumb: {
      "@id": "https://kmaglobalproperty.com/new-launch#breadcrumb",
    },
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://kmaglobalproperty.com/new-launch#webpage",
    url: "https://kmaglobalproperty.com/new-launch",
    name: "New Launch Projects | KMA Global Properties",
    headline: "Latest New Launch Projects in Gurugram & Delhi NCR",
    description:
      "Browse the latest verified new launch apartments, builder floors, villas, plots and commercial projects across Gurugram and Delhi NCR with KMA Global Properties.",
    inLanguage: "en-IN",
    isPartOf: {
      "@id": "https://kmaglobalproperty.com/#website",
    },
    about: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
    publisher: {
      "@id": "https://kmaglobalproperty.com/#organization",
    },
    breadcrumb: {
      "@id": "https://kmaglobalproperty.com/new-launch#breadcrumb",
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://kmaglobalproperty.com/new-launch#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kmaglobalproperty.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "New Launch",
        item: "https://kmaglobalproperty.com/new-launch",
      },
    ],
  };
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
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
    </>
  );
}