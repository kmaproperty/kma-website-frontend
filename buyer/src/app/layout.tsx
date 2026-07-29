import type { Metadata } from "next";
import { IBM_Plex_Sans  } from "next/font/google";
import "@/styles/globals.css";
import QueryProvider from "@/providers/QueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import ToasterProvider from "@/providers/ToastProvider";
import { Suspense } from "react";
import TopLoaderProvider from "@/providers/TopLoaderProvider";
import CookieSessionGuard from "@/components/common/cookieSessionGuard";
import WhatsAppSticky from "@/components/whatsappSticky/WhatsAppSticky";
import Script from "next/script";
import RealEstateChatbot from "@/components/RealEstateChatbot";

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KHBBX4H2');`;

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "KMA Global Property | Buy, Sell & Rent Property in NCR",
  description:
    "Find verified properties in Gurugram, Delhi, Noida, Faridabad, and Gaziabad. Connect with trusted real estate professionals through KMA Global Property.",
  alternates: {
    canonical: "https://kmaglobalproperty.com/",
  },

  // OPENGRAPH TAGS
  openGraph: {
    type: "website",
    siteName: "KMA Global Properties",
    title: "KMA Global Properties | Buy, Sell & Rent Property in Gurgaon",
    description:
      "Explore verified residential and commercial properties in Gurgaon and Delhi NCR. Buy, sell, rent, and invest with KMA Global Properties.",
    url: "https://kmaglobalproperty.com/",
    locale: "en_IN",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/backgroundSlider/Tonino.webp",
        width: 1200,
        height: 630,
        alt: "KMA Global Properties",
      },
    ],
  },

  // TWITTER CARDS
  twitter: {
    card: "summary_large_image",
    site: "@kmaproperty",
    creator: "@kmaproperty",
    title: "KMA Global Properties | Buy, Sell & Rent Property in Gurgaon",
    description:
      "Explore verified residential and commercial properties in Gurgaon and Delhi NCR. Buy, sell, rent, and invest with KMA Global Properties.",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/backgroundSlider/Tonino.webp",
        alt: "KMA Global Properties",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://kmaglobalproperty.com/#webpage",
    url: "https://kmaglobalproperty.com/",
    name: "KMA Global Properties | Luxury Real Estate in Gurugram & Delhi NCR",
    headline: "Buy, Sell & Rent Property in Gurugram and Delhi NCR",
    description:
      "KMA Global Properties connects buyers, sellers, tenants, investors and channel partners with verified residential and commercial properties across Gurugram, Delhi, Noida, Greater Noida, Faridabad and surrounding NCR locations.",
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
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://kmaglobalproperty.com/#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kmaglobalproperty.com/",
      },
    ],
  };

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://kmaglobalproperty.com/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is KMA Global Property a broker or a listing platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KMA Global Property operates as both a real estate broker and a referral-based property platform, connecting buyers, sellers, tenants and investors with verified property owners, trusted agents and channel partners.",
        },
      },
      {
        "@type": "Question",
        name: "Are the properties listed on KMA verified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every property listing goes through a review process to verify basic accuracy, ownership relevance, availability and pricing before publication.",
        },
      },
      {
        "@type": "Question",
        name: "Does KMA charge buyers or tenants for property search?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fees depend on the service and user type. Any applicable charges are communicated clearly before you proceed.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide home loans or financial services directly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. KMA does not provide home loans directly but can connect users with trusted lending professionals and financial advisors.",
        },
      },
      {
        "@type": "Question",
        name: "Which areas in NCR does KMA mainly cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KMA primarily serves Gurugram, Delhi, Noida, Greater Noida and Faridabad, with strong coverage across Dwarka Expressway, Golf Course Extension Road, Sohna Road and New Gurugram.",
        },
      },
      {
        "@type": "Question",
        name: "How does the KMA Coin Rewards Program work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Users receive one Coin after registration and another after referring a friend who registers. Rewards become withdrawable after successful property transactions according to the programme terms.",
        },
      },
      {
        "@type": "Question",
        name: "How does your property buying process work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "After sharing your property requirements, KMA connects you with a verified property professional or channel partner who specialises in your preferred location and property type.",
        },
      },
      {
        "@type": "Question",
        name: "I'm an NRI. Can I buy property in India through KMA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. KMA assists NRI buyers with virtual property tours, documentation coordination, Power of Attorney guidance and connections to legal and financial professionals.",
        },
      },
      {
        "@type": "Question",
        name: "How do I become a channel partner with KMA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can apply through the Channel Partner registration form. After review and onboarding, approved partners receive access to buyer leads, shared listings and business support.",
        },
      },
    ],
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://kmaglobalproperty.com/#services",
    serviceType: "Real Estate Services",
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
        name: "Greater Noida",
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
            name: "Property Buying",
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
            name: "Property Rental",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Investment Consultancy",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Channel Partner Services",
          },
        },
      ],
    },
  };

  // Reviews Schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Review",
        "@id": "https://kmaglobalproperty.com/#review-yogesh",
        itemReviewed: {
          "@id": "https://kmaglobalproperty.com/#realestateagent",
        },
        author: {
          "@type": "Person",
          name: "Yogesh",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody:
          "KMA Global Properties is one of the most trusted real estate consultants in Gurugram.",
      },
      {
        "@type": "Review",
        "@id": "https://kmaglobalproperty.com/#review-aarushi",
        itemReviewed: {
          "@id": "https://kmaglobalproperty.com/#realestateagent",
        },
        author: {
          "@type": "Person",
          name: "Aarushi",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody:
          "Professional team with transparent dealings and excellent support throughout the property buying process.",
      },
      {
        "@type": "Review",
        "@id": "https://kmaglobalproperty.com/#review-ananjay-kumar",
        itemReviewed: {
          "@id": "https://kmaglobalproperty.com/#realestateagent",
        },
        author: {
          "@type": "Person",
          name: "Ananjay Kumar",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody:
          "KMA Global Properties Pvt. Ltd. is described as a professionally managed real estate consultancy.",
      },
      {
        "@type": "Review",
        "@id": "https://kmaglobalproperty.com/#review-vishal-shekhawat",
        itemReviewed: {
          "@id": "https://kmaglobalproperty.com/#realestateagent",
        },
        author: {
          "@type": "Person",
          name: "Vishal Shekhawat",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody:
          "KMA Global Properties completely changed how I look at real estate with their transparent and professional guidance.",
      },
      {
        "@type": "AggregateRating",
        "@id": "https://kmaglobalproperty.com/#aggregate-rating",
        itemReviewed: {
          "@id": "https://kmaglobalproperty.com/#realestateagent",
        },
        ratingValue: "5.0",
        reviewCount: "4",
        bestRating: "5",
        worstRating: "1",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
        <script
          dangerouslySetInnerHTML={{
            __html: gtmScript,
          }}
        />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3837781979695365');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body
        className={`${ibmPlexSans.variable} antialiased min-w-0 overflow-x-hidden`}
      >
      <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3837781979695365&ev=PageView&noscript=1"
            alt="meta-pixel-fallback"
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: gtmScript,
          }}
        />
        <Suspense>
        <StoreProvider>
          <QueryProvider>
          <CookieSessionGuard />
          {children}
          <ToasterProvider />
          <TopLoaderProvider/>
          <WhatsAppSticky phoneNumber="919289977646"/>
          <RealEstateChatbot/>
          </QueryProvider>
        </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
