// import type { Metadata } from 'next'
// import CareersPageClient from './CareersPageClient'

// export const metadata: Metadata = {
//   title: 'Careers | KMA Global Properties',
//   description: 'Find your next role and grow your career with KMA.',
// }

// export default function CareersPage() {
//   return <CareersPageClient />
// }
import type { Metadata } from 'next'
import CareersPageClient from './CareersPageClient'

export const metadata: Metadata = {
  title: 'KMA Global Properties Careers | Real Estate Jobs & Hiring',
  description: 'Explore real estate careers at KMA Global Properties. Join roles in sales, CRM, and business development with growth-focused opportunities. Apply now.',
  alternates: {
    canonical: "https://kmaglobalproperty.com/careers/",
  },
  openGraph: {
    type: "website",
    siteName: "KMA Global Properties",
    title: "Careers at KMA Global Properties | Join Our Team",
    description:
      "Build your real estate career with KMA Global Properties. Explore current job openings in sales, CRM, marketing, operations, and support.",
    url: "https://kmaglobalproperty.com/careers",
    locale: "en_IN",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/app/help-center-herobg.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at KMA Global Properties",
      },
    ],
  },

  // TWITTER CARDS
  twitter: {
    card: "summary_large_image",
    site: "@kmaproperty",
    creator: "@kmaproperty",
    title: "Careers at KMA Global Properties | Join Our Team",
    description:
      "Explore career opportunities at KMA Global Properties in sales, CRM, marketing, operations, and customer support.",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/app/help-center-herobg.jpg",
        alt: "Careers at KMA Global Properties",
      },
    ],
  },
}

export default function CareersPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://kmaglobalproperty.com/careers/#webpage",
    url: "https://kmaglobalproperty.com/careers/",
    name: "Careers | KMA Global Properties Pvt. Ltd.",
    headline: "Build Your Career with KMA Global Properties Pvt. Ltd.",
    description:
      "Explore career opportunities at KMA Global Properties. Join our team in sales, CRM, marketing, operations, business development and customer support in Gurugram.",
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
      "@id": "https://kmaglobalproperty.com/careers/#breadcrumb",
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://kmaglobalproperty.com/careers/#breadcrumb",
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
        name: "Careers",
        item: "https://kmaglobalproperty.com/careers/",
      },
    ],
  };

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://kmaglobalproperty.com/careers/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you hire freshers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Freshers are welcome if they are willing to learn and grow with KMA Global Properties.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need real estate experience?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not always. Some roles require experience, while many positions are open to candidates without prior real estate experience.",
        },
      },
      {
        "@type": "Question",
        name: "What kind of work will I do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Depending on the role, you may handle client calls, follow-ups, property coordination, CRM activities and sales support.",
        },
      },
      {
        "@type": "Question",
        name: "Is this a field job or an office job?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on the position. Some roles involve client meetings, while others are office-based support roles.",
        },
      },
      {
        "@type": "Question",
        name: "How does growth happen here?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Employees who consistently perform well and continue learning are given greater responsibilities and career growth opportunities.",
        },
      },
      {
        "@type": "Question",
        name: "How do I apply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can apply by submitting your resume through the Careers page on the KMA Global Properties website.",
        },
      },
      {
        "@type": "Question",
        name: "What roles are open?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Current opportunities include Property Consultant, Business Development, CRM, Marketing Support, Operations, Administration and Customer Support.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I join KMA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KMA Global Properties offers hands-on learning, real client exposure, career growth opportunities, and a collaborative work environment.",
        },
      },
    ],
  };

  // CollectionPage Schema
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://kmaglobalproperty.com/careers/#collectionpage",
    url: "https://kmaglobalproperty.com/careers/",
    name: "Current Career Opportunities at KMA Global Properties",
    description:
      "Browse current job openings at KMA Global Properties in sales, CRM, marketing, operations and customer support.",
    about: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
  };

  // JobPosting Schema
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Property Consultant",
    description:
      "We are looking for a Property Consultant to assist buyers, sellers and investors with residential and commercial properties in Gurugram.",
    identifier: {
      "@type": "PropertyValue",
      name: "KMA Global Properties Pvt. Ltd.",
      value: "PC-001",
    },
    datePosted: "2026-07-27",
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gurugram",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
    directApply: true,
  };

  return (
    <>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
    <CareersPageClient />
    </>
  );
  
}
