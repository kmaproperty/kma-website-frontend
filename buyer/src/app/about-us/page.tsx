// import AboutUsComponent from "@/components/about-us";
// import { fetchPropertyCitiesData, fetchPropertyMasterData } from "../api/home";


// export default async function AboutUs(){
//     let propertyMasterData: any = await fetchPropertyMasterData();
//       if (propertyMasterData?.success) {
//         propertyMasterData = propertyMasterData.data;
//       } else {
//         propertyMasterData = []
//       }
    
//       let propertyCitiesData: any = await fetchPropertyCitiesData();
//     return(
//         <>
//         <AboutUsComponent propertyMasterData={propertyMasterData} propertyCitiesData={propertyCitiesData}/>
//         </>
//     )
// }

// import AboutUsComponent from "@/components/about-us";
// import { fetchPropertyCitiesData, fetchPropertyMasterData } from "../api/home";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "About Us | KMA Global Properties — Gurgaon Real Estate",
//   description: "Learn about KMA Global Properties - Gurgaon's broker-friendly real estate consultancy offering verified listings, investment advisory, and end-to-end property support.",
//   alternates: {
//     canonical: "https://kmaglobalproperty.com/about-us", 
//   },
// };


// export default async function AboutUs(){
//     let propertyMasterData: any = await fetchPropertyMasterData();
//       if (propertyMasterData?.success) {
//         propertyMasterData = propertyMasterData.data;
//       } else {
//         propertyMasterData = []
//       }
    
//       let propertyCitiesData: any = await fetchPropertyCitiesData();
//     return(
//         <>
//         <AboutUsComponent propertyMasterData={propertyMasterData} propertyCitiesData={propertyCitiesData}/>
//         </>
//     )
// }

import AboutUsComponent from "@/components/about-us";
import { fetchPropertyCitiesData, fetchPropertyMasterData } from "../api/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | KMA Global Properties — Gurgaon Real Estate",
  description: "Learn about KMA Global Properties - Gurgaon's broker-friendly real estate consultancy offering verified listings, investment advisory, and end-to-end property support.",
  alternates: {
    canonical: "https://kmaglobalproperty.com/about-us", 
  },

  openGraph: {
    type: "website",
    siteName: "KMA Global Properties",
    title: "About KMA Global Properties | Gurgaon Real Estate Consultancy",
    description:
      "Learn about KMA Global Properties, our mission, founder, and trusted real estate services across Gurgaon and Delhi NCR.",
    url: "https://kmaglobalproperty.com/about-us",
    locale: "en_IN",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/images/og/about-us.jpg",
        width: 1200,
        height: 630,
        alt: "About KMA Global Properties",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@kmaproperty",
    creator: "@kmaproperty",
    title: "About KMA Global Properties | Gurgaon Real Estate Consultancy",
    description:
      "Learn about KMA Global Properties, our mission, founder, and trusted real estate services across Gurgaon and Delhi NCR.",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/images/og/about-us.jpg",
        alt: "About KMA Global Properties",
      },
    ],
  },
};


export default async function AboutUs(){

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://kmaglobalproperty.com/about-us#aboutpage",
    url: "https://kmaglobalproperty.com/about-us",
    name: "About KMA Global Properties",
    headline: "About Us — KMA Global Properties | Gurgaon Real Estate Consultancy",
    description:
      "Learn about KMA Global Properties, a Gurgaon-based real estate consultancy offering verified property listings, investment advisory, rental assistance and broker support across Delhi NCR.",
    inLanguage: "en-IN",
    isPartOf: {
      "@id": "https://kmaglobalproperty.com/#website",
    },
    about: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
    publisher: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
    breadcrumb: {
      "@id": "https://kmaglobalproperty.com/about-us#breadcrumb",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://kmaglobalproperty.com/assets/kma-logo-white.svg",
    },
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://kmaglobalproperty.com/about-us#webpage",
    url: "https://kmaglobalproperty.com/about-us",
    name: "About Us | KMA Global Properties",
    headline: "About KMA Global Properties",
    description:
      "Learn about KMA Global Properties, our mission, founder, services and commitment to transparent real estate transactions in Gurugram and Delhi NCR.",
    inLanguage: "en-IN",
    isPartOf: {
      "@id": "https://kmaglobalproperty.com/#website",
    },
    about: [
      {
        "@id": "https://kmaglobalproperty.com/#realestateagent",
      },
      {
        "@id": "https://kmaglobalproperty.com/#organization",
      },
      {
        "@id": "https://kmaglobalproperty.com/about-us#founder",
      },
    ],
    publisher: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
    breadcrumb: {
      "@id": "https://kmaglobalproperty.com/about-us#breadcrumb",
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://kmaglobalproperty.com/about-us#breadcrumb",
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
        name: "About Us",
        item: "https://kmaglobalproperty.com/about-us",
      },
    ],
  };

  // Person Schema (Founder)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Karmjeet Dahiya",
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: "KMA Global Properties Pvt. Ltd.",
      url: "https://kmaglobalproperty.com",
    },
    description:
      "Founder of KMA Global Properties, a Gurgaon-based real estate consultancy focused on transparent property transactions, verified listings, and broker support systems.",
    url: "https://kmaglobalproperty.com/about-us",
    sameAs: [],
    knowsAbout: [
      "Real Estate Consulting",
      "Property Investment in Gurgaon",
      "Residential Sales",
      "Real Estate Brokerage",
      "Dwarka Expressway Properties",
    ],
    nationality: "Indian",
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://kmaglobalproperty.com/about-us#services",
    serviceType: "Real Estate Consultancy",
    provider: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Gurugram",
      },
      {
        "@type": "City",
        name: "Delhi",
      },
      {
        "@type": "City",
        name: "Noida",
      },
      {
        "@type": "City",
        name: "Faridabad",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Real Estate Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Property Buying",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Selling",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Rental Assistance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Investment Advisory",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Channel Partner Support",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legal Documentation Assistance",
          },
        },
      ],
    },
  };

    let propertyMasterData: any = await fetchPropertyMasterData();
      if (propertyMasterData?.success) {
        propertyMasterData = propertyMasterData.data;
      } else {
        propertyMasterData = []
      }
    
      let propertyCitiesData: any = await fetchPropertyCitiesData();
    return(
        <>
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
        <AboutUsComponent propertyMasterData={propertyMasterData} propertyCitiesData={propertyCitiesData}/>
        </>
    )
}

