// import AboutusDataSync from "@/components/footer/AboutusDataSync";
// import HomeFooter from "@/components/footer/homeFooter";
// import HomeHeader from "@/components/header/homeHeader";

// const termsAndConditionsItems = [
//   {
//     title: "1. Welcome to KMA Global Properties",
//     description:
//       "Welcome to KMA Global Properties Pvt. Ltd. By accessing or using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions, as well as all applicable laws and regulations.",
//   },
//   {
//     title: "2. Company Overview",
//     description:
//       "KMA Global Properties Pvt. Ltd. is a professionally managed real estate firm specializing in residential and commercial property solutions. The company offers comprehensive services including property sales, purchases, leasing, and rentals, ensuring seamless transactions for clients through a commitment to transparency, market expertise, and client-centric service delivery.",
//   },
//   {
//     title: "3. Website Usage",
//     description:
//       "Users agree to access and use the website solely for lawful purposes and in a manner that does not violate any applicable laws or regulations. All information provided by users must be accurate, complete, and up to date. Any misuse of the website, including submission of false information or unauthorized activities, may result in restricted access or termination of services.",
//   },
//   {
//     title: "4. Property Information",
//     description:
//       "All property listings and details are provided for informational purposes only and are subject to change without prior notice. While every effort is made to ensure accuracy, KMA Global Properties Pvt. Ltd. does not guarantee the completeness or reliability of such information. Prices, availability, specifications, and other details may vary at the discretion of the respective owners, developers, or authorities. Clients are advised to independently verify all property-related information before making any decisions.",
//   },
//   {
//     title: "5. Role of Company",
//     description:
//       "KMA Global Properties Pvt. Ltd. operates strictly as a facilitator/intermediary between buyers, sellers, tenants, and property owners. The Company does not guarantee the completion, performance, or outcome of any transaction and shall not be held liable for any decisions made by the parties involved. All transactions are undertaken at the sole discretion and responsibility of the respective clients.",
//   },
//   {
//     title: "6. Fees & Charges",
//     description:
//       "Applicable brokerage and/or service fees will be clearly communicated and mutually agreed upon prior to the closure of any transaction. Such charges become due and payable upon finalization of the deal (including booking, token, or agreement stage), unless otherwise specified in writing.",
//   },
//   {
//     title: "7. No Legal or Financial Advice",
//     description:
//       "KMA Global Properties Pvt. Ltd. does not provide any legal, financial, or investment advice. All information shared is for general guidance only. Clients are strongly advised to independently verify all property details, legal documents, and financial aspects, and to consult with qualified professionals before making any decisions.",
//   },
//   {
//     title: "8. Third-Party Responsibility",
//     description:
//       "KMA Global Properties Pvt. Ltd. shall not be held responsible or liable for the actions, representations, commitments, or defaults of any third parties, including but not limited to developers, property owners, landlords, financial institutions, or agents. Any agreements, transactions, or disputes arising between the client and such third parties are solely the responsibility of the respective parties involved.",
//   },
//   {
//     title: "9. Intellectual Property",
//     description:
//       "All content available on the website, including but not limited to text, images, logos, designs, and branding, is the exclusive property of KMA Global Properties Pvt. Ltd. and is protected under applicable intellectual property laws. Any unauthorized use, reproduction, distribution, or modification of such content without prior written consent is strictly prohibited and may result in legal action.",
//   },
//   {
//     title: "10. Limitation of Liability",
//     description:
//       "KMA Global Properties Pvt. Ltd. shall not be held liable for any direct, indirect, incidental, or consequential losses, including financial losses or disputes, arising out of or in connection with any property transaction. All decisions and transactions are undertaken at the sole risk and discretion of the client.",
//   },
//   {
//     title: "11. Privacy",
//     description:
//       "All user information is collected, stored, and processed in accordance with the Company's Privacy Policy. By using our services, users consent to such handling of their data as outlined therein.",
//   },
//   {
//     title: "12. Termination",
//     description:
//       "KMA Global Properties Pvt. Ltd. reserves the right to suspend, restrict, or terminate access to its services at its sole discretion, in the event of any violation of these Terms & Conditions, misuse of services, or submission of false or misleading information, without prior notice.",
//   },
//   {
//     title: "13. Governing Law",
//     description:
//       "These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Gurugram, Haryana.",
//   },
// ];

// export default function TermsAndConditionsPage() {
//   return (
//     <>
//       <div className="sticky top-0 z-50 w-full flex justify-center pb-2">
//         <HomeHeader showColor={true} />
//       </div>

//       <main className="bg-[#f8fafc] py-10 px-4 md:py-14">
//         <div className="max-w-5xl mx-auto bg-white rounded-xl border border-[#e5e7eb] p-6 md:p-10">
//           <h1 className="text-[#010048] text-2xl md:text-3xl font-semibold uppercase">
//             Terms & Conditions
//           </h1>

//           <p className="mt-4 text-[#44525a] text-sm md:text-base leading-relaxed">
//             Welcome to KMA Global Properties. Please review the terms below carefully before
//             using our website and services.
//           </p>

//           <div className="mt-6 space-y-6">
//             {termsAndConditionsItems.map((item) => (
//               <section key={item.title}>
//                 <h2 className="text-[#010048] text-base md:text-lg font-medium">{item.title}</h2>
//                 <p className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed">
//                   {item.description}
//                 </p>
//               </section>
//             ))}
//           </div>
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
  title: "Terms & Conditions – KMA Global Properties, Gurugram",
  description: "Read the terms governing use of KMA Global Properties' website, your trusted real estate advisory in Gurugram for property listings, sales, and investment guidance.",
  alternates: {
    canonical: "https://kmaglobalproperty.com/terms-and-conditions", 
  },
};

const termsAndConditionsItems = [
  {
    title: "1. Introduction",
    description:
      `Welcome to KMA Global Properties Pvt. Ltd., a real estate advisory and property solutions company based in Gurugram, Haryana. We help individuals and businesses navigate residential and commercial property decisions across Gurugram and the wider Delhi NCR region through property listings, expert real estate consultation, and detailed project information.<br>
These Terms and Conditions govern your access to and use of our website, including its content, features, and services. By browsing or using this platform, you're agreeing to be bound by what's laid out here. If something here doesn't sit right with you, the simplest option is to stop using the site.
`,
  },
  {
    title: "2. Acceptance of Terms",
    description:
      `Using this website, whether you're browsing listings, reading about a project, or sending an inquiry, means you accept these Terms in full. They form a legally binding agreement between you and KMA Global Properties Pvt. Ltd. (referred to here as "we," "us," or "KMA Global").<br>
We may update these Terms from time to time. If you keep using the site after a change, that's taken as acceptance of the updated version.
`,
  },
  {
    title: "3. Use of the Website",
    description:
      `You're granted a limited, non-exclusive license to use this website for personal, non-commercial purposes connected to real estate services and property listings, browsing residential property and commercial property options, exploring real estate consultation resources, or submitting genuine inquiries about a property purchase or sale.<br>
What's not okay: anything that overloads our systems, interferes with other users, or involves scraping, data mining, or framing our content without permission.
`,
  },
  {
    title: "4. Property Information Disclaimer",
    description:
      `Descriptions, images, pricing, dimensions, and availability shown for any property listing in Gurugram or elsewhere on this site are for general information only. We make a genuine effort to keep this accurate, but real estate moves fast, layouts get revised, prices change, units sell out, so we can't guarantee the content reflects the current state of a project at every moment.<br>
Before making any property investment decision, please verify details independently, through a site visit, legal due diligence, title search, and consultation with qualified professionals. KMA Global isn't responsible for errors, omissions, or outdated listings, and actual properties may differ from what's shown on the site.
`,
  },
  {
    title: "5. Intellectual Property Rights",
    description:
      `Everything on this website, text, graphics, logos, property photos, videos, and underlying code, belongs to KMA Global Properties Pvt. Ltd. or our licensors, and is protected under Indian copyright and trademark law. You can't reproduce, distribute, modify, or publicly display this material without our written consent, and the KMA Global Properties name and logo can't be used without permission.<br>
Unauthorized use ends your license to use the site immediately and may lead to further action.
`,
  },
  {
    title: "6. User Responsibilities",
    description:
      `When you use this site, it's on you to: <br>
      <ul >
      <li>&bull; Give accurate and current information when submitting an inquiry</li>
      <li>&bull; Keep any account credentials confidential</li>
      <li>&bull; Use the site in line with applicable law and these Terms</li>
      <li>&bull; Avoid anything that could harm our reputation or other users' experience</li>
      </ul>
      One more thing worth noting: any guidance you get through this platform is informational. It doesn't create a formal advisor-client relationship unless that's separately agreed in writing.`,
  },
  {
    title: "7. Third-Party Links",
    description:
      "We sometimes link out to third-party sites, banks, legal service providers, and government property portals purely for convenience. We don't control or vouch for these external sites, so anything you do there is at your own risk. Worth checking their terms before sharing information.",
  },
  {
    title: "8. Property Listings & Availability",
    description:
      `Listings on this site are subject to availability and can be withdrawn, sold, or modified without prior notice. Prices, specifications, and features may change based on market conditions or developer updates. <br>
      Displaying a listing isn't an offer to sell or buy; every transaction needs a formal agreement, title clearance, and compliance with applicable real estate laws in India. KMA Global Properties acts as an intermediary facilitator for property purchase and sale processes and doesn't guarantee that any transaction will go through.`,
  },
  {
    title: "9. Limitation of Liability",
    description:
      `To the extent allowed by law, KMA Global Properties Pvt. Ltd., along with its directors, employees, and affiliates, won't be liable for any direct, indirect, or consequential damages arising from your use of this site, reliance on property information, or transactions facilitated through our services, including loss of profits, data, or goodwill.<br>
Where any liability does apply, it's capped at the amount you've paid us, if any, in the twelve months before the claim.
`,
  },
  {
    title: "10. Privacy & Data Protection",
    description:
      "How we collect, use, and protect your personal data is covered in our separate Privacy Policy, which is aligned with the Digital Personal Data Protection Act, 2023. Using this website means you're also agreeing to what's described there.",
  },
  {
    title: "11. Prohibited Activities",
    description:
    `You agree not to: <br>
    <ul >
      <li>&bull; Upload or transmit viruses, malware, or harmful code</li>
      <li>&bull; Engage in unlawful, defamatory, or fraudulent conduct related to real estate investment or listings</li>
      <li>&bull; Impersonate any person or entity</li>
      <li>&bull; Interfere with the website's security features</li>
      <li>&bull; Use the platform for competitive analysis or to build a competing service</li>
      <li>&bull; Harass, threaten, or intimidate other users or our team</li>
      </ul>
      Breaking any of these may lead to your access being terminated and could carry legal consequences.`,
  },
  {
    title: "12. Indemnification",
    description:
      "You agree to cover KMA Global Properties Pvt. Ltd. and its team for any claims, damages, or expenses (including legal fees) that arise from your breach of these Terms, your misuse of the website, content you submit, or your violation of someone else's rights.",
  },
  {
    title: "13. Modification of Terms",
    description:
      `We may update these Terms at any time, with changes reflected by the "Last Updated" date at the top of this page. It's a good idea to check back periodically. Continued use after an update means you've accepted the revised Terms.`,
  },
  {
    title: "14. Governing Law & Jurisdiction",
    description:
      `These Terms are governed by the laws of India. Any disputes connected to these Terms, this website, or our real estate services fall under the exclusive jurisdiction of the courts of Gurugram, Haryana.`,
  },
  {
    title: "Conclusion",
    description:
      `At KMA Global Properties Pvt. Ltd., transparency and professionalism guide how we work, whether you're exploring residential property in Gurugram, looking at commercial property investment, or just researching the market. These Terms exist to keep that relationship clear and fair for everyone.
      <br>
      <em>This document is for informational purposes and does not constitute legal advice. For specific matters, please consult independent legal counsel.</em>`,
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <div className="sticky top-0 z-50 w-full flex justify-center pb-2">
        <HomeHeader showColor={true} />
      </div>

      <main className="bg-[#f8fafc] py-10 px-4 md:py-14">
        <div className="max-w-5xl mx-auto bg-white rounded-xl border border-[#e5e7eb] p-6 md:p-10">
          <h1 className="text-[#010048] text-2xl md:text-3xl font-semibold uppercase">
            Terms and Conditions | KMA Global Properties – Gurugram Real Estate
          </h1>

          <p className="mt-4 text-[#44525a] text-sm md:text-base leading-relaxed">
            Welcome to KMA Global Properties. Please review the terms below carefully before
            using our website and services.
          </p>

          <div className="mt-6 space-y-6">
            {termsAndConditionsItems.map((item) => (
              <section key={item.title}>
                <h2 className="text-[#010048] text-base md:text-lg font-medium">{item.title}</h2>
                {/* <p className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed">
                  {item.description}
                </p> */}
                <div 
  className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed"
  dangerouslySetInnerHTML={{ __html: item.description || "" }} 
/>
              </section>
            ))}
          </div>
        </div>
      </main>

      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}
