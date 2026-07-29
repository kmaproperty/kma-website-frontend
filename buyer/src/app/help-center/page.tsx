//  'use client'

// import HomdeHeader from '@/components/header/homeHeader'
// import { BadgePercent, CircleCheckBig, House, Lightbulb, ListCheck, ListChecks, Mail, MapPin, Phone, PhoneCall, PhoneIncoming, Section } from 'lucide-react';
// import PageTitle from '@/components/common/PageTitle';
// import { TbBulb } from "react-icons/tb";
// import SectionHeading from '@/components/common/SectionHeading';
// import Image from 'next/image';
// import BlogSection from '@/components/home/blogSection';
// import HomeFooter from '@/components/footer/homeFooter';
// import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
// import ContactFormComponent from '@/components/contactUs/contactForm';
// import Link from 'next/link';
// import ContactTable from '../../components/contactUs/ContactTable';
// import AccordionComponent from '@/components/common/accordion';
// import AboutusDataSync from '@/components/footer/AboutusDataSync';
// import { useSelector } from 'react-redux';
// import { getAboutusData } from '@/store/homeHeaderSlice';

// const HelpCenter = () => {
//     const aboutusData: any = useSelector(getAboutusData);
//     const contactPhoneNumber = aboutusData?.phoneNumber
//         ? (aboutusData.phoneNumber.startsWith('+') ? aboutusData.phoneNumber : `+91 ${aboutusData.phoneNumber}`)
//         : '+91 2589645266';
//     const contactEmail = aboutusData?.email || 'info@kmaproperty.com';

//     const breadcrumps = [
//         {
//             name: 'Home',
//             link: '/',
//             icon: <House className='w-5' />
//         },
//         {
//             name: 'Help Center',
//         }
//     ]

//     const gettingStartedAccordionData = [
//         {
//             question: "Who can post a property on KMA?",
//             answer: "Property Owners, Individual Brokers, and Builders can list. We welcome anyone who wants a transparent, spam-free way to close deals in Gurgaon."
//         },
//         {
//             question: "How do I join as a Channel Partner?",
//             answer: "Simply sign up and complete your profile. Once you want to scale beyond 3 properties, you can upgrade to a Channel Partner for unlimited access."
//         },
//     ];
//     const postPropertiesAccordionData = [
//         {
//             question: "Is it free to post a project/property?",
//             answer: "Yes, 100% Free. Owners can post up to 3 listings after a digital MOU. For unlimited listings and advanced CRM access, you can join as a Channel Partner."
//         },
//         {
//             question: "What documents are required to list a project?",
//             answer: "We keep it simple. Just basic property details and a digitally signed MOU to ensure all listings on our platform are genuine and verified."
//         },
//         {
//             question: "Can I edit my listing after posting?",
//             answer: "Yes, you can manage and update your listings 24/7 through your personalized dashboard or KMA partner panel."
//         },
//     ];
//     const propertySearchAccordionData = [
//         {
//             question: "How can I search for a property on KMA?",
//             answer: "Use our smart filters on the home page. You can search by location, budget, or property type. No fake ads—only verified luxury options."
//         },
//         {
//             question: "Do I need to log in to search?",
//             answer: "You can browse freely, but logging in allows you to save favorites and get direct WhatsApp updates for new properties matching your profile."
//         },
//     ];
//     const generalQuestionsAccordionData = [
//         {
//             question: "What makes KMA different from other portals?",
//             answer: "We don't sell your leads to 50 people. We provide 80% operational support, including pre-sales, WhatsApp filtering, and field support for site visits."
//         },
//         {
//             question: "How long does it take for my project to go live?",
//             answer: "Once submitted, our team verifies the details within 24 hours. After verification, your property goes live and matching leads are synced to your CRM"
//         },
//     ];

//     return (
//         <div className='bg-[#f5f5f5]'>
//             <div className='fixed left-0 right-0 z-[60] flex justify-center pointer-events-none'>
//                 <div className='pointer-events-auto w-full flex justify-center'>
//                     <HomdeHeader />
//                 </div>
//             </div>
//             <div className="relative min-h-[385px] max-h-[385px] pt-[25px] rounded-br-[40px] rounded-bl-[40px] sm:min-h-[min(100dvh,600px)] sm:max-h-[600px] sm:rounded-br-[72px] sm:rounded-bl-[72px] lg:rounded-br-[100px] lg:rounded-bl-[100px]" style={{ backgroundImage: 'url(assets/app/help-center-herobg.jpg)', backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
//         <div className="mx-auto mt-[120px] w-full max-w-[600px] px-4 sm:mt-28 sm:w-[85%] sm:px-0 md:mt-32 md:w-[75%] xl:mt-[150px] ">
//                     <PageTitle
//                         title="Help Center"
//                         description="Have Questions? We've All the Answers"
//                         breadcrumps={breadcrumps}
//                         actions={null}
//                     />
//                 </div>
//             </div>
//             <div className='w-full min-w-0 px-4 py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-[100px]'>
//                 <div className='mx-auto max-w-[1440px]'>
//                     <div className='flex flex-col gap-8 2md:flex-row 2md:gap-10'>
//                         <div className='col-auto space-y-8'>
//                             <SectionHeading title="" subtitle="Getting Started" type={'left'} color='' lineTop={true}
//                                 description=""
//                             />
//                             <AccordionComponent
//                                 data={gettingStartedAccordionData}
//                             />
//                         </div>
//                         <div className='col-auto space-y-8'>
//                             <SectionHeading title="" subtitle="Posting Projects & Properties" type={'left'} color='' lineTop={true}
//                                 description=""
//                             />
//                             <AccordionComponent
//                                 data={postPropertiesAccordionData}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className='mx-auto mt-10 max-w-[1440px] min-w-0 sm:mt-12 2md:mt-16'>
//                     <div className='flex flex-col gap-8 2md:flex-row 2md:gap-10'>
//                         <div className='col-auto space-y-8'>
//                             <SectionHeading title="" subtitle="Property Search & User Assistance" type={'left'} color='' lineTop={true}
//                                 description=""
//                             />
//                             <AccordionComponent
//                                 data={propertySearchAccordionData}
//                             />
//                         </div>
//                         <div className='col-auto space-y-8'>
//                             <SectionHeading title="" subtitle="General Questions" type={'left'} color='' lineTop={true}
//                                 description=""
//                             />
//                             <AccordionComponent
//                                 data={generalQuestionsAccordionData}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className='w-full min-w-0 bg-[#fff] px-4 py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-[100px]'>
//                 <div className='mx-auto w-full max-w-[720px] 2md:w-[50%]'>
//                     <h2 className="mb-4 text-center text-xl font-semibold leading-snug text-text-black sm:text-2xl md:text-[28px] md:leading-9">
//                       Need More Help?
//                     </h2>
//                     <p className='text-md leading-7 text-center font-normal text-[#0D1520] mb-0'>If your question isn’t listed above, feel free to reach out: <br /> <b>Mon–Sat, 10am–6pm</b></p>
//                 </div>
//                 <div className='flex flex-wrap 2md:gap-3 gap-2 justify-center 2md:mt-8 mt-5'>
//                     <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
//                         <Image
//                             src={'/assets/telephone.png'}
//                             width={24}
//                             height={24}
//                             alt='phone'
//                         />
//                         {contactPhoneNumber}
//                     </div>
//                     <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
//                         <Image
//                             src={'/assets/mail.png'}
//                             width={24}
//                             height={24}
//                             alt='mail'
//                         />
//                         {contactEmail}
//                     </div>
//                     <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
//                         <Image
//                             src={'/assets/whatsapp.png'}
//                             width={24}
//                             height={24}
//                             alt='whatsapp'
//                         />
//                         {contactPhoneNumber}
//                     </div>
//                 </div>
//             </div>
//             <div className="bg-text-black flex justify-center">
//                 <AboutusDataSync />
//                 <HomeFooter tab={1} />
//             </div>
//         </div>
//     )
// };

// export default HelpCenter;

//  'use client'

// import HomdeHeader from '@/components/header/homeHeader'
// import { BadgePercent, CircleCheckBig, House, Lightbulb, ListCheck, ListChecks, Mail, MapPin, Phone, PhoneCall, PhoneIncoming, Section } from 'lucide-react';
// import PageTitle from '@/components/common/PageTitle';
// import { TbBulb } from "react-icons/tb";
// import SectionHeading from '@/components/common/SectionHeading';
// import Image from 'next/image';
// import BlogSection from '@/components/home/blogSection';
// import HomeFooter from '@/components/footer/homeFooter';
// import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
// import ContactFormComponent from '@/components/contactUs/contactForm';
// import Link from 'next/link';
// import ContactTable from '../../components/contactUs/ContactTable';
// import AccordionComponent from '@/components/common/accordion';
// import AboutusDataSync from '@/components/footer/AboutusDataSync';
// import { useSelector } from 'react-redux';
// import { getAboutusData } from '@/store/homeHeaderSlice';

// const HelpCenter = () => {
//     const aboutusData: any = useSelector(getAboutusData);
//     const contactPhoneNumber = aboutusData?.phoneNumber
//         ? (aboutusData.phoneNumber.startsWith('+') ? aboutusData.phoneNumber : `+91 ${aboutusData.phoneNumber}`)
//         : '+91 2589645266';
//     const contactEmail = aboutusData?.email || 'info@kmaproperty.com';

//     const breadcrumps = [
//         {
//             name: 'Home',
//             link: '/',
//             icon: <House className='w-5' />
//         },
//         {
//             name: 'Help Center',
//         }
//     ]

//     const gettingStartedAccordionData = [
//         {
//             question: "Who can list a property on KMA?",
//             answer: "Anyone can. KMA is open to property owners, individual brokers, builders, and developers — you don't need an existing real estate license or agency to get started. If you're a working professional selling your own flat, an entrepreneur building a brokerage, or someone exploring real estate as a full-time career, the platform is built to support all of you with a transparent, verified, and spam-free way to buy, sell, and promote property across Gurgaon and Delhi NCR."
//         },
//         {
//             question: "Does KMA cover both residential and commercial properties?",
//             answer: "Yes. Whether you're listing a 2BHK apartment, a builder floor, a retail shop, or an office space, KMA supports both residential and commercial categories, so owners, builders, and brokers can all reach genuine, relevant buyers in one place."
//         },
//         {
//             question: "Which areas does KMA operate in?",
//             answer: "KMA Global Property is currently focused on Delhi NCR, with Gurgaon as a core market, and we're actively expanding into other premium real estate corridors nearby. If you're listing outside this footprint today, keep an eye out — coverage is growing."
//         },
//         {
//             question: "Is it free to list a property?",
//             answer: "Yes, listing is completely free for eligible users. There's no commission charged by KMA for posting a property — any brokerage fee or commercial terms are worked out directly between the buyer and seller (or their representatives). As an individual owner, you can list up to three properties at no cost, provided you complete a simple digitally signed MOU."
//         },
//         {
//             question: "What if I need to list more than three properties?",
//             answer: "That's exactly what our Channel Partner program is for. Brokers, agencies, and high-volume listers can upgrade to a Channel Partner account to unlock unlimited listings, a dedicated CRM to manage enquiries, and additional business support like lead tracking and field assistance for site visits. Signing up is simple: create your profile, complete verification, and request the upgrade from your dashboard."
//         },
//     ];
//     const postPropertiesAccordionData = [
//         {
//             question: "What documents do I need to post a listing?",
//             answer: "Nothing complicated. You'll need basic property details (location, size, price, ownership status) and a digitally signed MOU. This one-time step is what allows KMA to keep every listing on the platform genuine and traceable, instead of relying on unverified, self-reported ads."
//         },
//         {
//             question: "How long does it take for a listing to go live?",
//             answer: "Most listings are reviewed and published within 24 hours of submitting complete information and your signed MOU. Once your listing clears verification, it becomes visible to matching buyers, and any enquiries start flowing straight into your dashboard."
//         },
//         {
//             question: "How does the verification process actually work?",
//             answer: "Every submission is checked against the details provided before it's approved. This isn't a rubber-stamp process — it exists specifically to filter out duplicate entries, outdated listings, and spam ads, which is a big part of why buyers trust what they see on KMA in the first place."
//         },
//         {
//             question: "Can I add photos and videos to my listing?",
//             answer: "Yes, and we'd recommend it. Listings with clear, high-quality photos consistently attract more genuine enquiries than text-only ads, since buyers want to see the space before they commit to a site visit. You can upload multiple images and videos directly while creating or editing your listing."
//         },
//         {
//             question: "Can I make changes after my property goes live?",
//             answer: "Absolutely. Your dashboard (or the Channel Partner Panel, if you're a partner) gives you 24/7 control to edit details, swap out photos, adjust pricing, deactivate the listing temporarily, or remove it entirely — whenever your situation changes."
//         },
//     ];
//     const propertySearchAccordionData = [
//         {
//             question: "How do I find the right property on KMA?",
//             answer: "Start with the smart filters on the homepage. You can narrow results by location, budget range, or property type to skip past irrelevant ads and get straight to verified, relevant options — no fake listings padding out your search."
//         },
//         {
//             question: "Do I need an account to browse listings?",
//             answer: "No — you can browse and search freely without logging in. That said, creating an account unlocks a couple of useful extras: you can save favourite properties for later, and opt in to direct WhatsApp alerts whenever a new listing matches what you're looking for."
//         },
//         {
//             question: "How do I get in touch with a property owner or builder?",
//             answer: "Submit an enquiry directly from the property listing page. From there, our team steps in to connect you with the actual owner, builder, or an authorized Channel Partner — so you're never left messaging into a void."
//         },
//         {
//             question: "Can I schedule a site visit through the platform?",
//             answer: "Yes. Request a visit right from the listing, and our team will coordinate timing with the owner, builder, or Channel Partner so the visit actually gets arranged, instead of you chasing contact details yourself."
//         },
//         {
//             question: "Will my enquiry get sent to a dozen different agents?",
//             answer: "No. This is one of the bigger differences between KMA and typical property portals, we don't broadcast your enquiry to multiple agents hoping someone bites. Instead, KMA connects you directly with the relevant owner, builder, or authorized partner, and backs that up with pre-sales support and CRM-driven lead handling so enquiries don't get lost or spammed out."
//         },
//     ];
//     const generalQuestionsAccordionData = [
//         {
//             question: "How do I reset my password?",
//             answer: `Click "Forgot Password" on the login page, and you'll receive reset instructions at your registered email address.`
//         },
//         {
//             question: "Can I update my phone number or email later?",
//             answer: "Yes, anytime. Head to your account settings to update your contact information or other profile details whenever they change."
//         },
//         {
//             question: "Is my personal information kept private?",
//             answer: "Your data is handled under KMA's Privacy Policy, with security measures in place to protect your account. Your contact details are never displayed publicly on the platform — they're only shared with another party when it's necessary to facilitate a genuine, verified enquiry, such as connecting a buyer with a seller."
//         },
//         {
//             question: "What should I do if I spot a duplicate or incorrect listing?",
//             answer: "Reach out to our support team with the listing details. We'll review the report and take appropriate action once it's verified, this keeps the marketplace clean for everyone searching or listing on it."
//         },
//     ];

//     return (
//         <div className='bg-[#f5f5f5]'>
//             <div className='fixed left-0 right-0 z-[60] flex justify-center pointer-events-none'>
//                 <div className='pointer-events-auto w-full flex justify-center'>
//                     <HomdeHeader />
//                 </div>
//             </div>
//             {/* <div className="relative min-h-[385px] max-h-[500px] md:max-h-[385px] pt-[10px] md:pt-[25px] rounded-br-[40px] rounded-bl-[40px] sm:min-h-[min(100dvh,600px)] sm:max-h-[600px] sm:rounded-br-[72px] sm:rounded-bl-[72px] lg:rounded-br-[100px] lg:rounded-bl-[100px] bg-blue" style={{ backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
//         <div className="mx-auto mt-[120px] w-full max-w-[600px] px-4 sm:mt-28 sm:w-[85%] sm:px-0 md:mt-32 md:w-[75%] xl:mt-[150px] ">
//                     <PageTitle
//                         title="KMA Global Property Help Center"
//                         description="Buying, selling, or listing real estate in Gurgaon and Delhi NCR shouldn't feel like a guessing game. This Help Center walks you through everything you need to know about using the KMA platform — from posting your first property to understanding how we verify every listing and protect your data. Whether you're a first-time buyer, a broker managing dozens of listings, or a builder launching a new project, you'll find clear, straight-to-the-point answers below."
//                         breadcrumps={breadcrumps}
//                         actions={null}
//                     />
//                 </div>
//             </div> */}

//             <section className="sm:rounded-br-[72px] sm:rounded-bl-[72px] lg:rounded-br-[100px] lg:rounded-bl-[100px] bg-blue text-white py-25 md:py-30 px-4 shadow-md">
//           <div className="max-w-3xl mx-auto text-center space-y-4">
//             <h1 className="text-3xl md:text-6xl font-bold tracking-wide text-white leading-tighter">
//               KMA Global Property{" "}
//               <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-white/90">
//                 Help Center
//               </span>
//             </h1>
//             <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto font-light">
//               Buying, selling, or listing real estate in Gurgaon and Delhi NCR
//               shouldn't feel like a guessing game. This Help Center walks you
//               through everything you need to know about using the KMA platform —
//               from posting your first property to understanding how we verify
//               every listing and protect your data. Whether you're a first-time
//               buyer, a broker managing dozens of listings, or a builder
//               launching a new project, you'll find clear, straight-to-the-point
//               answers below.
//             </p>
//           </div>
//         </section>
//             <div className='w-full min-w-0 px-4 py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-[100px]'>
//                 <div className='mx-auto max-w-[1440px]'>
//                     <div className='flex flex-col gap-8 2md:flex-row 2md:gap-10'>
//                         <div className='space-y-8'>
//                             <SectionHeading title="" subtitle="Getting Started on KMA" type={'left'} color='' lineTop={true}
//                                 description=""
//                             />
//                             <AccordionComponent
//                                 data={gettingStartedAccordionData}
//                             />
//                         </div>
//                         <div className='space-y-8'>
//                             <SectionHeading title="" subtitle="Listing Your Property: The Process" type={'left'} color='' lineTop={true}
//                                 description=""
//                             />
//                             <AccordionComponent
//                                 data={postPropertiesAccordionData}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className='mx-auto mt-10 max-w-[1440px] min-w-0 sm:mt-12 2md:mt-16'>
//                     <div className='flex flex-col gap-8 2md:flex-row 2md:gap-10'>
//                         <div className='col-auto space-y-8'>
//                             <SectionHeading title="" subtitle="Searching for Properties as a Buyer" type={'left'} color='' lineTop={true}
//                                 description=""
//                             />
//                             <AccordionComponent
//                                 data={propertySearchAccordionData}
//                             />
//                         </div>
//                         <div className='col-auto space-y-8'>
//                             <SectionHeading title="" subtitle="Account, Profile, and Data Privacy" type={'left'} color='' lineTop={true}
//                                 description=""
//                             />
//                             <AccordionComponent
//                                 data={generalQuestionsAccordionData}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className='w-full min-w-0 bg-[#fff] px-4 py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-[100px]'>
//                 <div className='mx-auto w-full max-w-[720px] 2md:w-[50%]'>
//                     <h2 className="mb-4 text-center text-xl font-semibold leading-snug text-text-black sm:text-2xl md:text-[28px] md:leading-9">
//                       Still Have Questions?
//                     </h2>
//                     <p className='text-md leading-7 text-center font-normal text-[#0D1520] mb-0'>Our support team is available Monday to Saturday, 10 AM to 6 PM</p>
//                 </div>
//                 <div className='flex flex-wrap 2md:gap-3 gap-2 justify-center 2md:mt-8 mt-5'>
//                     <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
//                         <Image
//                             src={'/assets/telephone.png'}
//                             width={24}
//                             height={24}
//                             alt='phone'
//                         />
//                         {contactPhoneNumber}
//                     </div>
//                     <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
//                         <Image
//                             src={'/assets/mail.png'}
//                             width={24}
//                             height={24}
//                             alt='mail'
//                         />
//                         {contactEmail}
//                     </div>
//                     <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
//                         <Image
//                             src={'/assets/whatsapp.png'}
//                             width={24}
//                             height={24}
//                             alt='whatsapp'
//                         />
//                         {contactPhoneNumber}
//                     </div>
//                 <p className='text-center'>Whether you're posting your first listing or trying to close a deal in Gurgaon's competitive market, we're here to help you get it right.</p>
//                 </div>
//             </div>
//             <div className="bg-text-black flex justify-center">
//                 <AboutusDataSync />
//                 <HomeFooter tab={1} />
//             </div>
//         </div>
//     )
// };

// export default HelpCenter;

import { Metadata } from 'next';
import React from 'react'
import HelpCenterClient from './HelpCenterClient';

export const metadata: Metadata = {
  title: "Help Center | KMA Global Property - Gurgaon & Delhi NCR",
  description:
    "Get answers on listing, verifying, and searching properties in Gurgaon & Delhi NCR. Learn how KMA connects buyers, owners, and Channel Partners.",
  alternates: {
    canonical: "https://kmaglobalproperty.com/help-center",
  },

  // OPENGRAPH TAGS
  openGraph: {
    type: "website",
    siteName: "KMA Global Properties",
    title: "Help Center | KMA Global Properties",
    description:
      "Get answers about property listings, buying, selling, rentals, account management, and platform support at KMA Global Properties.",
    url: "https://kmaglobalproperty.com/help-center",
    locale: "en_IN",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/images/og/help-center.jpg",
        width: 1200,
        height: 630,
        alt: "KMA Global Properties Help Center",
      },
    ],
  },

  // TWITTER CARDS
  twitter: {
    card: "summary_large_image",
    site: "@kmaproperty",
    creator: "@kmaproperty",
    title: "Help Center | KMA Global Properties",
    description:
      "Get answers about property listings, account management, buying, selling, renting, and platform support.",
    images: [
      {
        url: "https://kmaglobalproperty.com/assets/images/og/help-center.jpg",
        alt: "Help Center",
      },
    ],
  },
};

const HelpCenterPage = () => {
    const realEstateAgentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://kmaglobalproperty.com/#realestateagent",
    name: "KMA Global Properties Pvt. Ltd.",
    url: "https://kmaglobalproperty.com/",
    logo: {
      "@type": "ImageObject",
      url: "https://kmaglobalproperty.com/assets/kma-logo-white.svg",
    },
    image: {
      "@type": "ImageObject",
      url: "https://kmaglobalproperty.com/assets/kma-logo-white.svg",
    },
    description:
      "KMA Global Properties Pvt. Ltd. is a luxury real estate consultancy in Gurugram, offering property buying, selling, renting and investment advisory services across Dwarka Expressway, New Gurgaon, Golf Course Road, SPR and other prime locations.",
    telephone: "+91-9289977646",
    email: "info@kmaglobalproperty.com",
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Plot No. 3A, Shastri Nagar Industrial Area, Sector 106, Dwarka Expressway",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122006",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.495066726388554,
      longitude: 77.00045681349395,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Gurugram",
      },
      {
        "@type": "Place",
        name: "Dwarka Expressway",
      },
      {
        "@type": "Place",
        name: "New Gurgaon",
      },
      {
        "@type": "Place",
        name: "Golf Course Road",
      },
      {
        "@type": "Place",
        name: "Sohna Road",
      },
      {
        "@type": "Place",
        name: "Southern Peripheral Road (SPR)",
      },
    ],
    makesOffer: [
      {
        "@type": "Service",
        name: "Property Buying",
      },
      {
        "@type": "Service",
        name: "Property Selling",
      },
      {
        "@type": "Service",
        name: "Property Rental",
      },
      {
        "@type": "Service",
        name: "Property Investment Consultancy",
      },
      {
        "@type": "Service",
        name: "Luxury Residential Property Services",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9289977646",
      contactType: "Sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    hasMap:
      "https://maps.google.com/?q=28.495066726388554,77.00045681349395",
    sameAs: [
      "https://www.instagram.com/kmaglobalproperty/",
      "https://www.facebook.com/people/KMA-Global-Properties-Pvt-Ltd/61586635903995/",
      "https://www.linkedin.com/company/kma-global-properties-pvt-ltd/",
      "https://www.youtube.com/@kmaglobalproperties",
      "https://x.com/kmaproperty",
    ],
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://kmaglobalproperty.com/#website",
    url: "https://kmaglobalproperty.com/",
    name: "KMA Global Properties",
    publisher: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
    inLanguage: "en-IN",
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://kmaglobalproperty.com/#webpage",
    url: "https://kmaglobalproperty.com/",
    name: "KMA Global Properties | Luxury Real Estate in Gurgaon",
    description:
      "Buy, sell and rent luxury properties in Gurgaon with KMA Global Properties.",
    isPartOf: {
      "@id": "https://kmaglobalproperty.com/#website",
    },
    about: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
    publisher: {
      "@id": "https://kmaglobalproperty.com/#realestateagent",
    },
    inLanguage: "en-IN",
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://kmaglobalproperty.com/help-center/#breadcrumb",
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
        name: "Help Center",
        item: "https://kmaglobalproperty.com/help-center/",
      },
    ],
  };

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://kmaglobalproperty.com/help-center/#faq",
    url: "https://kmaglobalproperty.com/help-center/",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who can list a property on KMA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Anyone can list a property on KMA, including property owners, individual brokers, builders, and developers. Whether you're selling your own home or managing multiple listings, KMA provides a verified platform for buying, selling, and promoting properties across Gurgaon and Delhi NCR.",
        },
      },
      {
        "@type": "Question",
        name: "Does KMA cover both residential and commercial properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. KMA supports both residential and commercial property listings, including apartments, builder floors, villas, retail shops, office spaces, and commercial projects.",
        },
      },
      {
        "@type": "Question",
        name: "Which areas does KMA operate in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KMA Global Property primarily operates in Gurgaon and Delhi NCR, with ongoing expansion into nearby premium real estate markets.",
        },
      },
      {
        "@type": "Question",
        name: "Is it free to list a property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Eligible users can list properties free of charge. Individual owners can post up to three properties after completing a digitally signed MOU. KMA does not charge any commission for posting listings.",
        },
      },
      {
        "@type": "Question",
        name: "What if I need to list more than three properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Users requiring unlimited listings can upgrade to the KMA Channel Partner program, which includes unlimited property listings, CRM access, lead management, and additional business support.",
        },
      },
      {
        "@type": "Question",
        name: "What documents do I need to post a listing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You'll need your property's basic information, including location, size, price, ownership status, along with a digitally signed MOU for verification.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take for a listing to go live?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most listings are reviewed and published within 24 hours after complete information and the signed MOU are submitted.",
        },
      },
      {
        "@type": "Question",
        name: "How does the verification process work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every property listing is manually reviewed and verified to eliminate duplicate, outdated, or spam listings before publication.",
        },
      },
      {
        "@type": "Question",
        name: "Can I add photos and videos to my listing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. KMA allows you to upload multiple high-quality photos and videos to increase your property's visibility and enquiries.",
        },
      },
      {
        "@type": "Question",
        name: "Can I edit my listing after it goes live?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can edit property details, pricing, photos, videos, activate or deactivate listings, or remove them anytime through your dashboard.",
        },
      },
      {
        "@type": "Question",
        name: "How do I find the right property on KMA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use KMA's search filters to narrow results by location, budget, and property type to quickly discover verified listings.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need an account to browse listings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Anyone can browse property listings without an account. Creating an account lets you save favourites and receive WhatsApp alerts for matching properties.",
        },
      },
      {
        "@type": "Question",
        name: "How do I contact a property owner or builder?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Submit an enquiry through the property page. KMA connects you directly with the owner, builder, or an authorised Channel Partner.",
        },
      },
      {
        "@type": "Question",
        name: "Can I schedule a site visit through KMA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Site visits can be requested directly from the property listing page, and KMA coordinates with the owner, builder, or authorised partner.",
        },
      },
      {
        "@type": "Question",
        name: "Will my enquiry be shared with multiple agents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. KMA shares your enquiry only with the relevant property owner, builder, or authorised Channel Partner to minimise spam and improve response quality.",
        },
      },
      {
        "@type": "Question",
        name: "How do I reset my password?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Click 'Forgot Password' on the login page and follow the instructions sent to your registered email address.",
        },
      },
      {
        "@type": "Question",
        name: "Can I update my phone number or email address?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can update your contact information anytime from your account settings.",
        },
      },
      {
        "@type": "Question",
        name: "Is my personal information kept private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. KMA protects your personal information according to its Privacy Policy. Contact details are only shared when necessary to facilitate verified property enquiries.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do if I find a duplicate or incorrect listing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Report the listing to the KMA support team. After verification, appropriate action will be taken to maintain listing quality.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact KMA Global Property support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our support team is available Monday to Saturday from 10:00 AM to 6:00 PM. Call +91 8047136232 or email info@kmaglobalproperty.com for assistance.",
        },
      },
    ],
  };
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
      />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HelpCenterClient/>
    </>
  )
}

export default HelpCenterPage