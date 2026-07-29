// import React from 'react'
// import FaqHeroSection from './FaqHeroSection'
// import HomdeHeader from "@/components/header/homeHeader";
// import FaqScroll from './FaqScroll';
// import FaqStatsBar from './FaqStatsBar';
// import AboutusDataSync from '@/components/footer/AboutusDataSync';
// import HomeFooter from '@/components/footer/homeFooter';
// import ContactExpertCta from './ContactExpertCta';

// const FaqPage = () => {
//   return (
//     <>
//     <div className="fixed left-0 right-0 z-[60] flex justify-center pointer-events-none">
//             <div className="pointer-events-auto w-full flex justify-center">
//               <HomdeHeader />
//             </div>
//           </div>
//     <FaqHeroSection/>
//     <FaqScroll/>
//     <FaqStatsBar/>
//     <ContactExpertCta/>
//     <div className="bg-text-black flex justify-center">
//                           <AboutusDataSync />
//                           <HomeFooter tab={1} />
//                       </div>
//     </>
//   )
// }

// export default FaqPage

import React from 'react'
import FaqHeroSection from './FaqHeroSection'
import HomdeHeader from "@/components/header/homeHeader";
import FaqScroll from './FaqScroll';
import FaqStatsBar from './FaqStatsBar';
import AboutusDataSync from '@/components/footer/AboutusDataSync';
import HomeFooter from '@/components/footer/homeFooter';
import ContactExpertCta from './ContactExpertCta';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "KMA Global Properties FAQs | Real Estate Questions",
  description:
    "Find answers to common questions about buying, selling, investing, channel partners, site visits, RERA, and real estate services at KMA Global Properties.",
  alternates: {
    canonical: "https://kmaglobalproperty.com/faqs",
  },

  // OPENGRAPH TAGS
  openGraph: {
    type: "website",
    siteName: "KMA Global Properties",
    title: "Frequently Asked Questions | KMA Global Properties",
    description:
      "Find answers to common questions about buying, selling, renting, listings, channel partners, and real estate services at KMA Global Properties.",
    url: "https://kmaglobalproperty.com/faqs",
    locale: "en_IN",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/images/og/faqs.jpg",
        width: 1200,
        height: 630,
        alt: "KMA Global Properties FAQs",
      },
    ],
  },

  // TWITTER CARDS
  twitter: {
    card: "summary_large_image",
    site: "@kmaproperty",
    creator: "@kmaproperty",
    title: "Frequently Asked Questions | KMA Global Properties",
    description:
      "Find answers about buying, selling, renting, channel partners, listings, and real estate services.",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/images/og/faqs.jpg",
        alt: "KMA Global Properties FAQs",
      },
    ],
  },
};

const FaqPage = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://kmaglobalproperty.com/#website",
    url: "https://kmaglobalproperty.com/",
    name: "KMA Global Properties",
    alternateName: "KMA Global Property",
    publisher: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
    inLanguage: "en-IN",
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://kmaglobalproperty.com/faqs#webpage",
    url: "https://kmaglobalproperty.com/faqs",
    name: "Frequently Asked Questions | KMA Global Properties",
    headline: "Frequently Asked Questions",
    description:
      "Find answers to common questions about buying, selling, renting, investing, channel partners, listings and real estate services offered by KMA Global Properties.",
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
      "@id": "https://kmaglobalproperty.com/faqs#breadcrumb",
    },
    mainEntity: {
      "@id": "https://kmaglobalproperty.com/faqs#faq",
    },
  };

  // CollectionPage Schema
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://kmaglobalproperty.com/faqs#collectionpage",
    url: "https://kmaglobalproperty.com/faqs",
    name: "KMA Global Properties FAQs",
    description:
      "Browse answers to frequently asked questions about KMA Global Properties, property buying, selling, renting, investments and channel partner services.",
    mainEntity: {
      "@id": "https://kmaglobalproperty.com/faqs#faq",
    },
    isPartOf: {
      "@id": "https://kmaglobalproperty.com/#website",
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://kmaglobalproperty.com/faqs#breadcrumb",
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
        name: "FAQs",
        item: "https://kmaglobalproperty.com/faqs",
      },
    ],
  };

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://kmaglobalproperty.com/faqs#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does KMA Global Properties Pvt. Ltd. do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are a real estate consultancy company based in Gurugram, helping people buy, sell, and invest in residential and commercial properties. We also provide other brokers to list properties on our website free of cost.",
        },
      },
      {
        "@type": "Question",
        name: "Where is your office located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our office is located at: Plot No. 3A, Sector 106, Dwarka Expressway, Gurugram, Haryana, India – 122006",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact KMA Global Properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can call us at +91-9056580022 or email us at info@kmaglobalproperty.com. You can also use the contact form on our website.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide real estate guidance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We help clients understand property options, pricing, location benefits, and investment opportunities before making a decision.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to pay for a consultation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, basic consultation and property guidance are usually free of cost.",
        },
      },
      {
        "@type": "Question",
        name: "Is KMA Global Properties a registered real estate company?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we are a RERA-registered real estate company (RERA No.: GGM/3440/3035/2025/317) based in Gurugram, dealing in residential and commercial properties.",
        },
      },
      {
        "@type": "Question",
        name: "Do you only work in Gurugram?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our main focus is Gurugram, especially Dwarka Expressway and nearby sectors, but we also handle selected projects across Delhi NCR.",
        },
      },
      {
        "@type": "Question",
        name: "Can you help me buy a property in Gurugram?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We assist buyers in finding residential and commercial properties in Gurugram and nearby areas based on their budget and requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Do you deal in new projects or resale properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We deal in both new launch projects and resale properties, depending on availability and client needs.",
        },
      },
      {
        "@type": "Question",
        name: "Can I book a site visit through KMA Global Properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can contact us, and we will arrange site visits for the shortlisted properties.",
        },
      },
      {
        "@type": "Question",
        name: "Do you help with property investment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We guide investors in selecting properties based on location trends, budget, rental potential, and expected returns.",
        },
      },
      {
        "@type": "Question",
        name: "Is buying property through KMA safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We work with verified projects and developers. Our team ensures that clients get complete clarity and verified information before making any decision.",
        },
      },
      {
        "@type": "Question",
        name: "Do you charge buyers any brokerage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Charges depend on the property and transaction type. Our team will clearly explain all costs before proceeding.",
        },
      },
      {
        "@type": "Question",
        name: "Do you help first-time home buyers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we regularly assist first-time buyers by explaining budget options, locations, and the complete buying process in simple terms.",
        },
      },
      {
        "@type": "Question",
        name: "How do I know which property is right for investment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We suggest options based on location growth, budget, rental potential, and long-term value.",
        },
      },
      {
        "@type": "Question",
        name: "Do you help with under-construction projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we deal in both ready-to-move and under-construction properties depending on client preference.",
        },
      },
      {
        "@type": "Question",
        name: "Are all projects RERA-approved?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We only deal in verified and RERA-registered projects. Details are shared clearly before any booking.",
        },
      },
      {
        "@type": "Question",
        name: "What documents should I check before buying property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We guide you through all important documents, such as RERA details, builder approvals, and legal paperwork, before purchase.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly can I book a property visit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Usually within 24-48 hours, depending on project availability and location.",
        },
      },
      {
        "@type": "Question",
        name: "Can I negotiate property prices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, in many cases, we help clients get the best possible deal depending on project terms.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer channel partner opportunities?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We work with channel partners, brokers, and real estate consultants across Gurugram and Delhi NCR.",
        },
      },
      {
        "@type": "Question",
        name: "How can I become a channel partner with KMA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact us directly via phone or email. Our team will guide you through the onboarding process. You can also register on our website and list your property here: https://seller.kmaglobalproperty.com/user-flow?postProperty=true",
        },
      },
      {
        "@type": "Question",
        name: "What support do you provide to channel partners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide access to inventory, project details, site visit support, and coordination assistance to help partners close deals.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer commission on sales?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Channel partners earn commission based on successful property transactions.",
        },
      },
      {
        "@type": "Question",
        name: "Can new brokers or small agencies join KMA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We welcome both experienced and new partners who are serious about real estate business growth.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide project training to partners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We share product knowledge, pricing updates, and project insights to help partners sell effectively.",
        },
      },
      {
        "@type": "Question",
        name: "How fast can I start working as a channel partner?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once you register and share details, onboarding can usually start quickly after verification.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide exclusive project inventory to partners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, selected projects and inventory updates are shared with active partners.",
        },
      },
      {
        "@type": "Question",
        name: "How do I schedule a meeting or site visit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can call us directly or send a message through the contact form. Our team will coordinate with you.",
        },
      },
      {
        "@type": "Question",
        name: "What areas do you operate in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We mainly deal in Gurugram, especially along Dwarka Expressway and nearby developing sectors.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly do you respond to inquiries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We usually respond within working hours on the same day.",
        },
      },
      {
        "@type": "Question",
        name: "Can I apply for a job at KMA Global Properties through the website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can apply through our Careers page. Our recruitment team will review your application and contact shortlisted candidates.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I choose KMA Global Properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because we focus on clear guidance, verified property options, and practical support throughout your real estate journey",
        },
      },
    ],
  };

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
    <div className="fixed left-0 right-0 z-[60] flex justify-center pointer-events-none">
            <div className="pointer-events-auto w-full flex justify-center">
              <HomdeHeader />
            </div>
          </div>
    <FaqHeroSection/>
    <FaqScroll/>
    <FaqStatsBar/>
    <ContactExpertCta/>
    <div className="bg-text-black flex justify-center">
                          <AboutusDataSync />
                          <HomeFooter tab={1} />
                      </div>
    </>
  )
}

export default FaqPage
