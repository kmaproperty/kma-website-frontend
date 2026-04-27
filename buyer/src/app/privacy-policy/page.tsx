import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HomeFooter from "@/components/footer/homeFooter";
import HomeHeader from "@/components/header/homeHeader";

const privacyPolicySections = [
  {
    title: "1. Information We Collect",
    points: [
      "Full Name",
      "Email Address",
      "Phone Number",
      "Any additional information voluntarily provided during inquiries or communication",
    ],
  },
  {
    title: "2. Purpose of Data Usage",
    points: [
      "Responding to inquiries and service-related communication",
      "Sending property listings, updates, offers, and promotional content",
      "Providing customer support",
      "Internal analysis, improvement, and operational requirements",
    ],
  },
  {
    title: "3. Data Sharing & Disclosure",
    paragraphs: [
      "We do not sell, rent, or commercially distribute your personal information.",
      "We may disclose your data only in the following cases:",
    ],
    points: [
      "When required under applicable law, legal proceedings, or government request",
      "To protect the rights, safety, and operations of KMA Global Properties and its stakeholders",
    ],
  },
  {
    title: "4. Data Protection & Security",
    paragraphs: [
      "We implement strong administrative and technical safeguards to protect your data from:",
    ],
    points: [
      "Unauthorized access",
      "Misuse or alteration",
      "Data loss or breach",
    ],
    footer:
      "Any employee, partner, or third party found responsible for unauthorized sharing, usage, or breach of personal data will face strict disciplinary action and legal consequences under Indian law, including the IT Act and cyber regulations.",
  },
  {
    title: "5. Cookies & Tracking Technologies",
    paragraphs: [
      "Our website may use cookies or similar tracking technologies to:",
    ],
    points: [
      "Improve browsing experience",
      "Enhance performance and personalization",
      "Analyze website interactions and traffic",
    ],
    footer:
      "Users may disable cookies through browser settings. Some features may not work optimally if disabled.",
  },
  {
    title: "6. User Rights",
    paragraphs: ["You have the right to:"],
    points: [
      "Request access to your personal information held by us",
      "Request correction or update of inaccurate data",
      "Request deletion of stored information (subject to legal requirements)",
      "Withdraw consent from promotional communication anytime",
    ],
  },
  {
    title: "7. Third-Party Links",
    paragraphs: [
      "Our website may contain external links. We are not responsible for the privacy practices, security, or content of those third-party websites.",
    ],
  },
  {
    title: "8. Consent",
    paragraphs: [
      "By using our website or submitting information through inquiry forms, WhatsApp, or other communication channels, you consent to the collection and use of your information as described in this Privacy Policy.",
    ],
  },
  {
    title: "9. Policy Updates",
    paragraphs: [
      "We reserve the right to update or modify this Privacy Policy at any time. Continued use of our website after changes are posted will be deemed as acceptance of the updated policy.",
    ],
  },
  {
    title: "10. Data Privacy & Recruitment Policy",
    paragraphs: [
      "We are committed to protecting your personal information. The data collected through any form (Name, Contact Number, and Professional details) will be used exclusively for recruitment purposes within our company. We do not share or sell your data to any third-party organizations.",
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
            Privacy Policy
          </h1>

          <p className="mt-4 text-[#44525a] text-sm md:text-base leading-relaxed">
            KMA Global Properties Pvt. Ltd. operates the website kmaglobalproperties.in and is
            committed to protecting the privacy and confidentiality of all personal information
            shared with us.
          </p>
          <p className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed">
            This Privacy Policy outlines how we collect, use, process, and safeguard your personal
            data.
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

          <section className="mt-8">
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
              <p>Email: md.karmjeet@kmaglobalproperty.com</p>
              <p>Phone: +91-9056580022</p>
              <p>Website: www.kmaglobalproperty.com</p>
            </div>
          </section>
        </div>
      </main>

      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}
