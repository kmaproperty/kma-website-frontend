import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HomeFooter from "@/components/footer/homeFooter";
import HomeHeader from "@/components/header/homeHeader";

const termsAndConditionsItems = [
  {
    title: "1. Welcome to KMA Global Properties",
    description:
      "Welcome to KMA Global Properties Pvt. Ltd. By accessing or using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions, as well as all applicable laws and regulations.",
  },
  {
    title: "2. Company Overview",
    description:
      "KMA Global Properties Pvt. Ltd. is a professionally managed real estate firm specializing in residential and commercial property solutions. The company offers comprehensive services including property sales, purchases, leasing, and rentals, ensuring seamless transactions for clients through a commitment to transparency, market expertise, and client-centric service delivery.",
  },
  {
    title: "3. Website Usage",
    description:
      "Users agree to access and use the website solely for lawful purposes and in a manner that does not violate any applicable laws or regulations. All information provided by users must be accurate, complete, and up to date. Any misuse of the website, including submission of false information or unauthorized activities, may result in restricted access or termination of services.",
  },
  {
    title: "4. Property Information",
    description:
      "All property listings and details are provided for informational purposes only and are subject to change without prior notice. While every effort is made to ensure accuracy, KMA Global Properties Pvt. Ltd. does not guarantee the completeness or reliability of such information. Prices, availability, specifications, and other details may vary at the discretion of the respective owners, developers, or authorities. Clients are advised to independently verify all property-related information before making any decisions.",
  },
  {
    title: "5. Role of Company",
    description:
      "KMA Global Properties Pvt. Ltd. operates strictly as a facilitator/intermediary between buyers, sellers, tenants, and property owners. The Company does not guarantee the completion, performance, or outcome of any transaction and shall not be held liable for any decisions made by the parties involved. All transactions are undertaken at the sole discretion and responsibility of the respective clients.",
  },
  {
    title: "6. Fees & Charges",
    description:
      "Applicable brokerage and/or service fees will be clearly communicated and mutually agreed upon prior to the closure of any transaction. Such charges become due and payable upon finalization of the deal (including booking, token, or agreement stage), unless otherwise specified in writing.",
  },
  {
    title: "7. No Legal or Financial Advice",
    description:
      "KMA Global Properties Pvt. Ltd. does not provide any legal, financial, or investment advice. All information shared is for general guidance only. Clients are strongly advised to independently verify all property details, legal documents, and financial aspects, and to consult with qualified professionals before making any decisions.",
  },
  {
    title: "8. Third-Party Responsibility",
    description:
      "KMA Global Properties Pvt. Ltd. shall not be held responsible or liable for the actions, representations, commitments, or defaults of any third parties, including but not limited to developers, property owners, landlords, financial institutions, or agents. Any agreements, transactions, or disputes arising between the client and such third parties are solely the responsibility of the respective parties involved.",
  },
  {
    title: "9. Intellectual Property",
    description:
      "All content available on the website, including but not limited to text, images, logos, designs, and branding, is the exclusive property of KMA Global Properties Pvt. Ltd. and is protected under applicable intellectual property laws. Any unauthorized use, reproduction, distribution, or modification of such content without prior written consent is strictly prohibited and may result in legal action.",
  },
  {
    title: "10. Limitation of Liability",
    description:
      "KMA Global Properties Pvt. Ltd. shall not be held liable for any direct, indirect, incidental, or consequential losses, including financial losses or disputes, arising out of or in connection with any property transaction. All decisions and transactions are undertaken at the sole risk and discretion of the client.",
  },
  {
    title: "11. Privacy",
    description:
      "All user information is collected, stored, and processed in accordance with the Company's Privacy Policy. By using our services, users consent to such handling of their data as outlined therein.",
  },
  {
    title: "12. Termination",
    description:
      "KMA Global Properties Pvt. Ltd. reserves the right to suspend, restrict, or terminate access to its services at its sole discretion, in the event of any violation of these Terms & Conditions, misuse of services, or submission of false or misleading information, without prior notice.",
  },
  {
    title: "13. Governing Law",
    description:
      "These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Gurugram, Haryana.",
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
            Terms & Conditions
          </h1>

          <p className="mt-4 text-[#44525a] text-sm md:text-base leading-relaxed">
            Welcome to KMA Global Properties. Please review the terms below carefully before
            using our website and services.
          </p>

          <div className="mt-6 space-y-6">
            {termsAndConditionsItems.map((item) => (
              <section key={item.title}>
                <h2 className="text-[#010048] text-base md:text-lg font-medium">{item.title}</h2>
                <p className="mt-2 text-[#44525a] text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
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
