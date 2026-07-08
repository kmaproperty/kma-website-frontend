// import AboutusDataSync from "@/components/footer/AboutusDataSync";
// import HomeFooter from "@/components/footer/homeFooter";
// import HomeHeader from "@/components/header/homeHeader";

// const privacyPolicySections = [
//   {
//     title: "1. Information We Collect",
//     points: [
//       "Full Name",
//       "Email Address",
//       "Phone Number",
//       "Any additional information voluntarily provided during inquiries or communication",
//     ],
//   },
//   {
//     title: "2. Purpose of Data Usage",
//     points: [
//       "Responding to inquiries and service-related communication",
//       "Sending property listings, updates, offers, and promotional content",
//       "Providing customer support",
//       "Internal analysis, improvement, and operational requirements",
//     ],
//   },
//   {
//     title: "3. Data Sharing & Disclosure",
//     paragraphs: [
//       "We do not sell, rent, or commercially distribute your personal information.",
//       "We may disclose your data only in the following cases:",
//     ],
//     points: [
//       "When required under applicable law, legal proceedings, or government request",
//       "To protect the rights, safety, and operations of KMA Global Properties and its stakeholders",
//     ],
//   },
//   {
//     title: "4. Data Protection & Security",
//     paragraphs: [
//       "We implement strong administrative and technical safeguards to protect your data from:",
//     ],
//     points: [
//       "Unauthorized access",
//       "Misuse or alteration",
//       "Data loss or breach",
//     ],
//     footer:
//       "Any employee, partner, or third party found responsible for unauthorized sharing, usage, or breach of personal data will face strict disciplinary action and legal consequences under Indian law, including the IT Act and cyber regulations.",
//   },
//   {
//     title: "5. Cookies & Tracking Technologies",
//     paragraphs: [
//       "Our website may use cookies or similar tracking technologies to:",
//     ],
//     points: [
//       "Improve browsing experience",
//       "Enhance performance and personalization",
//       "Analyze website interactions and traffic",
//     ],
//     footer:
//       "Users may disable cookies through browser settings. Some features may not work optimally if disabled.",
//   },
//   {
//     title: "6. User Rights",
//     paragraphs: ["You have the right to:"],
//     points: [
//       "Request access to your personal information held by us",
//       "Request correction or update of inaccurate data",
//       "Request deletion of stored information (subject to legal requirements)",
//       "Withdraw consent from promotional communication anytime",
//     ],
//   },
//   {
//     title: "7. Third-Party Links",
//     paragraphs: [
//       "Our website may contain external links. We are not responsible for the privacy practices, security, or content of those third-party websites.",
//     ],
//   },
//   {
//     title: "8. Consent",
//     paragraphs: [
//       "By using our website or submitting information through inquiry forms, WhatsApp, or other communication channels, you consent to the collection and use of your information as described in this Privacy Policy.",
//     ],
//   },
//   {
//     title: "9. Policy Updates",
//     paragraphs: [
//       "We reserve the right to update or modify this Privacy Policy at any time. Continued use of our website after changes are posted will be deemed as acceptance of the updated policy.",
//     ],
//   },
//   {
//     title: "10. Data Privacy & Recruitment Policy",
//     paragraphs: [
//       "We are committed to protecting your personal information. The data collected through any form (Name, Contact Number, and Professional details) will be used exclusively for recruitment purposes within our company. We do not share or sell your data to any third-party organizations.",
//     ],
//   },
// ];

// export default function PrivacyPolicyPage() {
//   return (
//     <>
//       <div className="sticky top-0 z-50 w-full flex justify-center pb-2">
//         <HomeHeader  showColor={true}/>
//       </div>

//       <main className="bg-[#f8fafc] py-10 px-4 md:py-14">
//         <div className="max-w-5xl mx-auto bg-white rounded-xl border border-[#e5e7eb] p-6 md:p-10">
//           <h1 className="text-[#010048] text-2xl md:text-3xl font-semibold uppercase">
//             Privacy Policy
//           </h1>

//           <p className="mt-4 text-[#44525a] text-sm md:text-base leading-relaxed">
//             KMA Global Properties Pvt. Ltd. operates the website kmaglobalproperties.in and is
//             committed to protecting the privacy and confidentiality of all personal information
//             shared with us.
//           </p>
//           <p className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed">
//             This Privacy Policy outlines how we collect, use, process, and safeguard your personal
//             data.
//           </p>

//           <div className="mt-6 space-y-6">
//             {privacyPolicySections.map((section) => (
//               <section key={section.title}>
//                 <h2 className="text-[#010048] text-base md:text-lg font-medium">{section.title}</h2>

//                 {section.paragraphs?.map((paragraph) => (
//                   <p
//                     key={paragraph}
//                     className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed"
//                   >
//                     {paragraph}
//                   </p>
//                 ))}

//                 {section.points?.length ? (
//                   <ul className="mt-2 list-disc pl-6 space-y-1 text-[#44525a] text-sm md:text-base leading-relaxed">
//                     {section.points.map((point) => (
//                       <li key={point}>{point}</li>
//                     ))}
//                   </ul>
//                 ) : null}

//                 {section.footer ? (
//                   <p className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed">
//                     {section.footer}
//                   </p>
//                 ) : null}
//               </section>
//             ))}
//           </div>

//           <section className="mt-8">
//             <h2 className="text-[#010048] text-base md:text-lg font-medium">11. Contact Information</h2>
//             <p className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed">
//               If you have any questions or requests related to this Privacy Policy, you can contact
//               us at:
//             </p>

//             <div className="mt-3 text-[#44525a] text-sm md:text-base leading-relaxed space-y-1">
//               <p>KMA Global Properties Pvt. Ltd.</p>
//               <p>Plot No. 3A, Sector 106</p>
//               <p>Dwarka Expressway, Gurugram, Haryana</p>
//               <p>India</p>
//               <p>Email: info@kmaglobalproperty.com</p>
//               <p>Phone: +91-8047136232</p>
//               <p>Website: www.kmaglobalproperty.com</p>
//             </div>
//           </section>
//         </div>
//       </main>

//       <AboutusDataSync />
//       <HomeFooter />
//     </>
//   );
// }


import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HomeFooter from "@/components/footer/homeFooter";
import HomeHeader from "@/components/header/homeHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – KMA Global Properties, Gurugram",
  description: "Learn how KMA Global Properties, a trusted real estate advisory in Gurugram, collects, uses, and protects your data under India's DPDP Act 2023.",
  alternates: {
    canonical: "https://kmaglobalproperty.com/privacy-policy", 
  },
};


const privacyPolicySections = [
  {
    title: "1. Data Trust & Transparency",
    paragraphs: [
      "Our internal data handling standards are built around a few simple ideas: collect only what's needed, use it only for the purpose it was given, store it securely, and never share or misuse it commercially. Anyone who shares information with us, a property buyer in Gurugram, an investor, or a channel partner, is what the DPDP Act calls a Data Principal, and the rights described later in this policy belong to you.",
    ],
  },
  {
    title: "2. Information We Collect",
    points: [
      "For most inquiries, this comes down to your name, phone number, and email address, along with whatever you tell us about your requirements, preferred location, budget, and whether you're buying for investment or end-use. If you reach out for a consultation, we'll also have a record of what was discussed.",
      "On the technical side, our website picks up basic data like device type and IP address, mainly for security and analytics purposes. We don't go beyond this. There's no reason for a real estate advisory in Gurugram to need anything more than what helps with your property search.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    points: [
      "Responding to property inquiries and follow-ups",
      "Putting together residential and commercial property options that match what you're looking for",
      "Looping in verified developers or partners, but only where your inquiry actually requires it",
      "Keeping our website and overall service running smoothly",
      "Internal record-keeping for service quality",
      "Sending updates or project information, but only if you've opted in",
    ],
    footer:
      "What we don't do: use your data for profiling, hand it to advertisers, or use it for anything outside real estate advisory work.",
  },
  {
    title: "4. Data Sharing Policy",
    paragraphs: [
      "We don't sell, rent, or trade user data. Full stop.",
      "There are a few situations where data does get shared, with verified developers or channel partners when it's needed to assist a property inquiry or site visit, with service providers who keep our communication and CRM systems running, and with legal or government authorities where the law requires it. Anyone we work with is expected to handle your data with the same care we do.",
    ],
  },
  {
    title: "5. Security Measures",
    paragraphs: [
      "Access to client data is limited to authorized personnel; that's the starting point for everything else. Beyond that, we maintain reasonable technical and organizational safeguards against unauthorized access, data alteration, and accidental loss or disclosure, and we review these practices periodically.",
    ],
    footer:
      "No system is completely immune to risk, but we work to keep ours as tight as possible.",
  },
  {
    title: "6. Cookies & Analytics",
    paragraphs: [
      "Like most websites, ours uses cookies and basic analytics to understand how visitors browse our property listings and project pages, what's loading slowly, which pages get the most attention, and where people drop off. This feeds back into improving the site itself.",
      "You're free to turn off cookies through your browser settings whenever you like, though some site features may not work as smoothly afterward."
    ],
  },
  {
    title: "7. Your Rights as a Data Principal",
    paragraphs: [
      "Under the DPDP Act, you can:",
    ],
    points: [
      "Ask what personal data we hold about you.",
      "Get inaccurate information corrected.",
      "Request deletion, subject to our legal obligations.",
      "Withdraw consent for marketing communications anytime.",
    ],
    footer: [
      "We try to act on valid requests within a reasonable timeframe. If something doesn't get resolved to your satisfaction, you can take it up with our Grievance Officer (details in Section 13), and from there, with the Data Protection Board of India if needed."
    ]
  },
  {
    title: "8. Data Retention",
    paragraphs: [
      "We hold on to personal data only as long as it serves an actual purpose, ongoing service, legal record-keeping, or internal business needs. Once that purpose is done, the data gets deleted or anonymized rather than sitting around indefinitely.",
    ],
  },
  {
    title: "9. Recruitment Data",
    paragraphs: [
      "If you've applied for a job with us, your resume and related details are used only to evaluate that application. Nothing from a job application gets repurposed for marketing or passed on externally.",
    ],
  },
  {
    title: "10. External Links",
    paragraphs: [
      "Our site sometimes links out to developer project pages or partner platforms. Once you're on one of those sites, their privacy practices apply, not ours. We'd suggest checking their policy before sharing anything there.",
    ],
  },
  {
    title: "11. Policy Updates",
    paragraphs: [
      "This policy may change from time to time, particularly as rules under the DPDP Act continue to evolve. When it does, we'll update the date at the top of this page. Using the website after a change means the updated policy applies to you.",
    ],
  },
  {
    title: "12. Grievance Officer & Contact Details",
    paragraphs: [
      "As required under the IT Act, 2000, and the DPDP Act, 2023, here's where to direct privacy-related concerns:",
      "KMA Global Properties Pvt. Ltd. — Grievance Officer",
      "Plot No. 3A, Sector 106, Dwarka Expressway, Gurugram, Haryana, India - 122006",
      " +91-8047136232",
      "info@kmaglobalproperty.com",
      "www.kmaglobalproperty.com",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="sticky top-0 z-50 w-full flex justify-center pb-2">
        <HomeHeader  showColor={true}/>
      </div>

      <main className="bg-[#f8fafc] py-10 px-4 md:py-14">
        <div className="max-w-5xl mx-auto bg-white rounded-xl border border-[#e5e7eb] p-6 md:p-10">
          <h1 className="text-[#010048] text-2xl md:text-3xl font-semibold uppercase">
            Privacy Policy | KMA Global Properties – Real Estate Advisory in Gurugram
          </h1>

          <p className="mt-4 text-[#44525a] text-sm md:text-base leading-relaxed">
            KMA Global Properties Pvt. Ltd. is a real estate advisory and property solutions company based in Gurugram, Haryana. We work with buyers, investors, and channel partners across residential and commercial segments, helping them make property decisions with the right information.
          </p>
          <p className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed">
            We operate only through verified channels, our official website, phone, email, and authorized team members. If you're contacted by anyone claiming to represent KMA Global Properties outside these channels, please verify before sharing any details.
          </p>
          <p className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed">
            This policy explains how we handle personal information collected through our digital platforms, and reflects our commitment to the Digital Personal Data Protection Act, 2023 (DPDP Act). Under this law, KMA Global Properties acts as the Data Fiduciary for the data you share with us, the entity responsible for deciding how it's processed and for keeping it safe.
          </p>

          <div className="mt-6 space-y-6">
            {privacyPolicySections.map((section) => (
              <section key={section.title}>
                <h2 className="text-[#010048] text-base md:text-lg font-medium">{section.title}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.points?.length ? (
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-[#44525a] text-sm md:text-base leading-relaxed">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}

                {section.footer ? (
                  <p className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed">
                    {section.footer}
                  </p>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-8">
            <p>
              If a concern remains unresolved after reaching out to us, you can escalate it to the Data Protection Board of India, as set up under the DPDP Act.
            </p>
          </div>

          {/* <section className="mt-8">
            <h2 className="text-[#010048] text-base md:text-lg font-medium">11. Contact Information</h2>
            <p className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed">
              If you have any questions or requests related to this Privacy Policy, you can contact
              us at:
            </p>

            <div className="mt-3 text-[#44525a] text-sm md:text-base leading-relaxed space-y-1">
              <p>KMA Global Properties Pvt. Ltd.</p>
              <p>Plot No. 3A, Sector 106</p>
              <p>Dwarka Expressway, Gurugram, Haryana</p>
              <p>India</p>
              <p>Email: info@kmaglobalproperty.com</p>
              <p>Phone: +91-8047136232</p>
              <p>Website: www.kmaglobalproperty.com</p>
            </div>
          </section> */}
        </div>
      </main>

      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}
