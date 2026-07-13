export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  subtitle: string;
  faqs: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    id: "company-basics",
    title: "Company Basics",
    subtitle: "Who we are, where we're based, and how to reach us",
    faqs: [
      {
        id: "cb-1",
        question: "What does KMA Global Property do?",
        answer:
          "KMA Global Property is a Gurugram based real estate consultancy that helps individuals and families buy, sell, and invest in residential and commercial properties across Delhi NCR. Alongside direct buyer advisory, we also give independent brokers a free platform to list their inventory on our website, widening reach for both sides of a transaction.",
      },
      {
        id: "cb-2",
        question: "Where is the KMA Global Property office located?",
        answer:
          "Our office is at Plot No. 3A, Sector 106, Dwarka Expressway, Gurugram, Haryana, India – 122006 — right in the middle of one of Gurugram's fastest-developing corridors, which also happens to be where a large share of our listed projects are located.",
      },
      {
        id: "cb-3",
        question: "How can I get in touch with KMA Global Property?",
        answer:
          "You can call our team directly at +91-9056580022, write to us at info@kmaglobalproperty.com, or fill out the contact form on our website and an advisor will get back to you the same working day.",
      },
      {
        id: "cb-4",
        question:
          "Does KMA Global Property offer real estate guidance, not just listings?",
        answer:
          "Yes. Beyond showing you available units, our advisors walk you through pricing context, location trade-offs, and investment potential for each shortlisted option, so your final decision is based on a full picture rather than a single listing sheet.",
      },
      {
        id: "cb-5",
        question: "Is there a fee for the initial consultation?",
        answer:
          "No. Basic consultation and property guidance from our team is free of cost for buyers in almost all cases — you can discuss your requirements and shortlist options without any upfront charge.",
      },
      {
        id: "cb-6",
        question: "Is KMA Global Property a registered real estate company?",
        answer:
          "Yes. KMA Global Properties Pvt. Ltd. is a RERA-registered real estate consultancy (RERA No. GGM/3440/3035/2025/317) based in Gurugram, dealing in both residential and commercial property transactions.",
      },
      {
        id: "cb-7",
        question: "Does KMA Global Property only operate in Gurugram?",
        answer:
          "Our primary focus is Gurugram, with a particular concentration along Dwarka Expressway and the sectors surrounding it, though we also take on select projects and assignments across the wider Delhi NCR region.",
      },
    ],
  },
  {
    id: "new-launch-buying",
    title: "New Launch & Buying Basics",
    subtitle: "Understanding pre-launch, pricing, and safety of early booking",
    faqs: [
      {
        id: "nl-1",
        question: `What does "new launch" mean in real estate, and is it safe to book early?`,
        answer:
          "A new launch is a project just introduced to the market — usually at foundation stage or early construction. Booking early is generally safe if the project is RERA registered, the builder has a credible delivery track record, and land title and statutory approvals (environmental clearance, layout sanction) are verified. KMA Global Property only lists RERA verified new launch projects, and our advisors run this verification for you before you book.",
      },
      {
        id: "nl-2",
        question: `What is pre-launch price, and why is it lower than the final price?`,
        answer:
          "Pre-launch pricing rewards early buyers and helps builders gauge demand before the formal public launch. Prices typically rise in phases as construction progresses, inventory reduces, and the project nears possession — so buyers who enter early usually capture the most price appreciation over the project lifecycle.",
      },
      {
        id: "nl-3",
        question: `What documents should I check before booking a new launch project in Gurgaon?`,
        answer:
          "Before booking, verify the project's HRERA registration certificate, sanctioned building plan and layout approval, land title clearance, environmental clearance (for larger projects), and the developer's past delivery record. Also review the Application Form and draft Builder-Buyer Agreement for payment schedule, possession date, and cancellation terms.",
      },
      {
        id: "nl-4",
        question: `Is booking through a channel partner like KMA Global Property different from booking directly with the builder?`,
        answer:
          "The unit price and builder agreement terms remain exactly the same whether you book directly or through us — RERA mandates a single price list per project. Booking through KMA Global Property gets you an independent advisor who compares projects objectively, negotiates on your behalf, and supports you through documentation, loan coordination, and possession, at zero extra cost.",
      },
    ],
  },
  {
    id: "rera-legal",
    title: "RERA & Legal Compliance",
    subtitle: "Registration, verification, delays, and buyer protection",
    faqs: [
      {
        id: "rl-1",
        question: "What is RERA, and why does it matter when buying a home in Gurgaon?",
        answer:
          "RERA (Real Estate Regulation and Development Act, 2016) requires builders to register every project, publicly disclose layout and approval details, deposit a fixed portion of buyer funds in an escrow account reserved for construction, and commit to a stated possession date. In Haryana, this is regulated by HRERA, and it significantly reduces the risk of fund misuse and indefinite delays.",
      },
      {
        id: "rl-2",
        question: "How do I verify a project's RERA registration number myself?",
        answer:
          "Visit the official Haryana RERA portal (haryanarera.gov.in) and search by project name or registration number. This shows the sanctioned layout, promoter details, approved possession timeline, and any complaints filed against the project. Always cross-check the RERA number printed on the brochure and agreement against the official listing before paying any amount.",
      },
      {
        id: "rl-3",
        question: "What happens if a builder delays possession beyond the RERA-committed date?",
        answer:
          "If possession is delayed past the date committed at RERA registration, buyers can either withdraw with a full refund plus interest, or continue with the booking and receive monthly interest compensation for the delay period, as prescribed under the RERA rules, until possession is finally handed over.",
      },
      {
        id: "rl-4",
        question: "Is stamp duty and registration charge included in the quoted price?",
        answer:
          `No. The quoted "starting price" is the base sale price of the unit. Stamp duty, registration charges, GST, PLC (preferential location charge, if applicable), EDC/IDC, and club membership are additional and payable separately at their respective stages. Your KMA advisor provides a full cost breakup before you book, so there are no surprises.`,
      },
    ],
  },
  {
    id: "payment-loans",
    title: "Payment Plans & Home Loans",
    subtitle: "CLP vs down payment, loan eligibility, and true cost of ownership",
    faqs: [
      {
        id: "pl-1",
        question: "What is a Construction Linked Plan (CLP) versus a Down Payment Plan (DPP)?",
        answer:
          "In a CLP, payments release in installments tied to construction milestones (foundation, slab casting, brickwork, finishing, possession), spreading your financial commitment over the build period. In a DPP, 90–95% is paid upfront in exchange for a price discount from the builder. CLP suits buyers who prefer to pay as the project progresses; DPP suits those comfortable paying early for maximum price benefit.",
      },
      {
        id: "pl-2",
        question: "How much home loan can I get, and what is the typical LTV ratio?",
        answer:
          "Banks typically finance up to 75–90% of a property's value depending on the ticket size — this is the Loan-to-Value (LTV) ratio set by RBI guidelines. The exact eligible amount depends on your income, existing obligations, credit score, and the lender's assessment. Our advisors can connect you with partner banks for a pre-approval estimate before you shortlist a project.",
      },
      {
        id: "pl-3",
        question: "Can I get a home loan for an under-construction property?",
        answer:
          "Yes, banks and NBFCs finance RERA registered under-construction projects, disbursing the loan in stages that match your construction linked payment plan. Interest is generally charged only on the amount disbursed so far (pre-EMI), and full EMIs begin once the loan is fully disbursed, typically around possession.",
      },
      {
        id: "pl-4",
        question: "What additional costs should I budget for besides the base price?",
        answer:
          "Beyond the base sale price, budget for PLC (preferential location charge for corner/park-facing/higher-floor units), EDC/IDC (external/internal development charges), GST, stamp duty and registration, club/amenity membership, a one-time maintenance deposit, and power backup or meter installation charges. Together these can add 8–15% over the base price.",
      },
    ],
  },
  {
    id: "booking-process",
    title: "Booking Process & Documentation",
    subtitle: "Step-by-step process, KYC, and agreements you'll sign",
    faqs: [
      {
        id: "bp-1",
        question: "What is the step-by-step process to book a flat with KMA Global Property?",
        answer:
          "Typically: 1) Share your budget, location, and configuration preference with our advisor. 2) Shortlist projects and complete a guided site visit. 3) Confirm your unit and pay the booking amount. 4) Submit KYC and sign the Application Form. 5) Receive the Allotment Letter and execute the Builder-Buyer Agreement. 6) Follow the agreed payment plan through construction to possession and registration.",
      },
      {
        id: "bp-2",
        question: "What documents (KYC) are needed to book a property?",
        answer:
          "For resident Indian buyers: PAN card, Aadhaar card, address proof, passport-size photographs, income proof (salary slips or ITR), and bank statements if you're applying for a loan. NRI buyers additionally need a valid passport, OCI/PIO card (where applicable), and an NRE/NRO account for remitting funds.",
      },
      {
        id: "bp-3",
        question: "Is the booking amount refundable if I change my mind?",
        answer:
          "Refund terms vary by builder and are specified in the Application Form and RERA registered Builder-Buyer Agreement. Under RERA, cancellation terms must be transparently disclosed upfront; typically an administrative charge is deducted before the balance is refunded. Ask your KMA advisor for the exact cancellation clause of your chosen project before booking.",
      },
      {
        id: "bp-4",
        question: "What is an Allotment Letter and a Builder-Buyer Agreement (BBA)?",
        answer:
          "The Allotment Letter is issued after your booking amount is received, confirming your unit number, floor, area, and price. The Builder-Buyer Agreement is the detailed, RERA mandated legal contract covering the payment schedule, possession timeline, specifications, penalty clauses, and both parties' obligations — it's the most important document to review carefully before signing.",
      },
    ],
  },
  {
    id: "posession-register",
    title: "Possession & Registration",
    subtitle: "Handover checklist, OC/CC, and registry costs",
    faqs: [
      {
        id: "pr-1",
        question: "What should I inspect before taking possession of my unit?",
        answer:
          "Before signing the possession letter, inspect the carpet area against the agreement, check plumbing, electrical points, doors, windows, waterproofing, and fittings against the specification sheet, confirm the Occupation Certificate is in place, and note any snags in writing for the builder to rectify before or shortly after handover.",
      },
      {
        id: "pr-2",
        question: "How is registration done, and who bears the cost?",
        answer:
          "Registration happens at the sub-registrar office covering the property's jurisdiction, where stamp duty and registration charges are paid based on the property's circle rate or transaction value, whichever is higher. These charges are borne by the buyer and are separate from the unit's base sale price — our team can coordinate the registry appointment for you.",
      },
      {
        id: "pr-3",
        question: "What is the difference between a Completion Certificate (CC) and Occupation Certificate (OC)?",
        answer:
          "A Completion Certificate confirms the building is constructed as per the sanctioned plan, while the Occupation Certificate is the final civic approval confirming the building is fit for people to move in, with functional water, sewage, and electricity connections. Taking possession without an OC carries legal and safety risk — always ask for it before moving in.",
      },
      {
        id: "pr-4",
        question: "Am I entitled to compensation if possession is delayed?",
        answer:
          "The Allotment Letter is issued after your booking amount is received, confirming your unit number, floor, area, and price. The Builder-Buyer Agreement is the detailed, RERA mandated legal contract covering the payment schedule, possession timeline, specifications, penalty clauses, and both parties' obligations — it's the most important document to review carefully before signing.",
      },
    ],
  },
  {
    id: "investment-returns",
    title: "Investment & Returns",
    subtitle: "Where to buy, expected yields, and appreciation potential",
    faqs: [
      {
        id: "ir-1",
        question: "Is Gurgaon still a good real estate investment in 2025–26?",
        answer:
          "Gurgaon continues to draw strong investment interest as a major corporate and IT hub with ongoing infrastructure upgrades — including the Dwarka Expressway, metro extensions, and NH-48 improvements. Demand from end-users and NRIs remains healthy, though returns vary meaningfully by micro-market, developer, and project stage, so location and builder due diligence still matter.",
      },
      {
        id: "ir-2",
        question: "Which micro-markets in Gurgaon offer the best appreciation potential?",
        answer:
          "Corridors seeing the strongest momentum include Dwarka Expressway (airport connectivity, new luxury supply), Golf Course Extension Road (established premium address), SPR/Sohna Road (improving connectivity to NH-48), and New Gurgaon sectors (relatively affordable entry with upside as infrastructure matures). Our advisors can map options to your budget and horizon.",
      },
      {
        id: "ir-3",
        question: "What rental yields can I expect on a new launch apartment in Gurgaon?",
        answer:
          "Residential rental yields in Gurgaon typically range between 2–3.5% annually, depending on location, project quality, and proximity to commercial hubs like Cyber City, Golf Course Road, and Sohna Road. Yields are generally higher for well-located mid-segment homes than for ultra-luxury units, where capital appreciation tends to be the bigger driver of returns.",
      },
      {
        id: "ir-4",
        question: "Should I invest pre-launch for capital appreciation, or buy ready-to-move for rental income?",
        answer:
          "Pre-launch and under-construction projects generally offer stronger capital appreciation potential as prices rise through construction stages, but carry construction and delay risk. Ready-to-move properties offer immediate rental income and eliminate delivery risk, but at a higher entry price with typically lower appreciation ahead. Your choice should depend on your investment horizon and risk appetite.",
      },
    ],
  },
  {
    id: "nri-buyers",
    title: "NRI Buyers",
    subtitle: "Eligibility, documentation, financing, and repatriation",
    faqs: [
      {
        id: "nb-1",
        question: "Can NRIs buy residential property in Gurgaon and India?",
        answer:
          "Yes. Under the Foreign Exchange Management Act (FEMA), NRIs and Persons of Indian Origin (PIOs) can freely purchase residential and commercial property in India, except agricultural land, plantation property, and farmhouses. Payment must be made through normal banking channels using an NRE, NRO, or FCNR account, and no RBI approval is needed for such purchases.",
      },
      {
        id: "nb-2",
        question: "What documents does an NRI need to buy property in India?",
        answer:
          "NRI buyers typically need a valid passport, OCI/PIO card (if applicable), PAN card (mandatory for property transactions), overseas and Indian address proof, and an active NRE/NRO bank account. A Power of Attorney is commonly used to authorize a trusted representative in India to complete formalities on the buyer's behalf.",
      },
      {
        id: "nb-3",
        question: "Can NRIs get home loans in India, and how does repatriation of rental income work?",
        answer:
          "Yes, most Indian banks offer home loans to NRIs, usually financing 75–80% of the property value, repayable through NRE/NRO accounts. Rental income earned in India can be repatriated abroad after applicable taxes are paid, subject to RBI's prescribed limits and documentation — a chartered accountant can help structure this efficiently.",
      },
      {
        id: "nb-4",
        question: "Does an NRI need to be physically present in India to complete the purchase?",
        answer:
          "No, physical presence is not mandatory. An NRI can execute a registered Power of Attorney (PoA) in favor of a trusted family member, friend, or representative to sign documents, make payments, and complete registration on their behalf. KMA Global Property regularly assists NRI clients through the entire process remotely, including video site walkthroughs.",
      },
    ],
  },
  {
    id: "channel-partner-b2b",
    title: "Channel Partners & B2B Program",
    subtitle: "Brokerage, site visits, expertise, and joining as a channel partner",
    faqs: [
      {
        id: "cpb-1",
        question: "Does KMA Global Property charge buyers any brokerage or fee?",
        answer:
          "No. KMA Global Property operates on a zero brokerage model for buyers across our listed new launch and primary sale projects — our advisory fee is paid by the developer, not the buyer. You get expert guidance, negotiation support, and site visit assistance at no additional cost to you.",
      },
      {
        id: "cpb-2",
        question: "How is KMA Global Property different from other property consultants in Gurgaon?",
        answer:
          "We focus exclusively on RERA verified new launch and primary market projects across Gurgaon's key micro-markets, with advisors who track each project's approvals, construction progress, and pricing in real time. Unlike generic listing portals, our team provides personalized comparison, price negotiation, and end-to-end documentation support through possession.",
      },
      {
        id: "cpb-3",
        question: "Can I schedule a site visit, and is transport arranged?",
        answer:
          "Yes, we arrange guided site visits to your shortlisted projects, including pickup and drop for serious buyers on request. An on-ground advisor accompanies you to walk through the layout, sample flat, construction progress, and surrounding connectivity in person before you decide.",
      },
      {
        id: "cpb-4",
        question: "How do I become a channel partner or broker with KMA Global Property?",
        answer:
          "Real estate brokers and channel partners can register with us to access our full portfolio of new launch projects, co-brokerage terms, marketing collateral, and shared lead opportunities. Visit our Channel Partner Program page or reach out to our team directly to begin onboarding.",
      },
      {
        id: "cpb-5",
        question: "How exactly do I become a channel partner with KMA?",
        answer:
          "You can reach out to us directly by phone or email and our team will walk you through onboarding. Alternatively, you can register on our website and list your property or inventory here: seller.kmaglobalproperty.com.",
      },
      {
        id: "cpb-6",
        question: "What support does KMA provide once I'm a channel partner?",
        answer:
          "Active partners get access to our inventory, detailed project information, coordination support for site visits, and ongoing assistance that helps you move a lead toward a closed deal faster.",
      },
      {
        id: "cpb-7",
        question: "Do channel partners earn commission on sales?",
        answer:
          "Yes, channel partners earn commission based on transactions that are successfully closed through their referrals — the specific structure is shared during onboarding.",
      },
      {
        id: "cpb-8",
        question: "Can new brokers or small agencies join as KMA partners?",
        answer:
          "Yes, we welcome both established and newer partners as long as they're serious about growing a real estate business — prior scale isn't a prerequisite.",
      },
      {
        id: "cpb-9",
        question: "Does KMA provide project training to its partners?",
        answer:
          "Yes, we share regular product knowledge, pricing updates, and project-specific insights with our partner network so they can pitch and close more effectively.",
      },
      {
        id: "cpb-10",
        question: "How quickly can I start working as a channel partner after registering?",
        answer:
          "Once you register and share your details, onboarding typically begins soon after verification is complete, so you can start receiving inventory and leads without a long wait.",
      },
      {
        id: "cpb-11",
        question: "Do partners get access to exclusive project inventory?",
        answer:
          "Yes, we share selected projects and inventory updates specifically with our active partners, giving them a head start on newly available units.",
      },
    ],
  },
  {
    id: "general-ques",
    title: "General Questions",
    subtitle: "Everything else buyers, partners, and job seekers ask us",
    faqs: [
      {
        id: "gq-1",
        question: "How do I schedule a meeting or site visit with KMA?",
        answer:
          "You can call us directly or send a message through the contact form on our website, and our team will coordinate a convenient time with you.",
      },
      {
        id: "gq-2",
        question: "What areas does KMA Global Property operate in?",
        answer:
          "Our core focus is Gurugram, particularly along Dwarka Expressway and the developing sectors around it, with select coverage extending into nearby parts of Delhi NCR.",
      },
      {
        id: "gq-3",
        question: "How quickly does KMA respond to inquiries?",
        answer:
          "We typically respond within working hours on the same day an inquiry is received, whether it comes in by phone, email, or the website contact form.",
      },
      {
        id: "gq-4",
        question: "Can I apply for a job at KMA Global Property through the website?",
        answer:
          "Yes, open roles are listed on our Careers page, and applications submitted there are reviewed by our recruitment team, who reach out directly to shortlisted candidates.",
      },
      {
        id: "gq-5",
        question: "Why should I choose KMA Global Property over another consultancy?",
        answer:
          "Because our focus stays on clear, honest guidance, verified project information, and practical support at every stage of your real estate journey — not just closing a transaction quickly.",
      },
    ],
  },
];
