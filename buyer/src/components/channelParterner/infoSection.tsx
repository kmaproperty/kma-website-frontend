"use client";

import { USER_TYPE } from "@/lib/enums";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const cardInfo = {
  endUser: [
    {
      src: "/assets/propertyDetails.png",
      title: "Basic Property Details",
      subTitle: "Tell us what you're listing—Flat, Villa, or Plot. It only takes a minute to start.",
    },
    {
      src: "/assets/location-color.png",
      title: "Location & Pricing",
      subTitle: "Set your price and pinpoint the location. Transparency leads to faster closures.",
    },
    {
      src: "/assets/propertyLive.png",
      title: "Verify & Go Live",
      subTitle: "Complete a quick digital MOU to get verified leads directly on your WhatsApp and CRM.",
    },
  ],
  channelPartnerRegister: [
    {
      src: "/assets/home-color.png",
      title: "No Listing Packages",
      subTitle:
        "List your properties without buying any expensive packages. Start for free and scale as you grow.",
    },
    {
      src: "/assets/partnerAccess.png",
      title: "Verified Partner Access",
      subTitle:
        "Get exclusive access to a verified network. We ensure every listing and inquiry meets our quality standards.",
    },
    {
      src: "/assets/upload-color.png",
      title: "End-to-End Assistance",
      subTitle:
        "From digital MOU to field support, our team assists you at every step to ensure smoother closures.",
    },
  ],
  channelPartnerLogin: [
    {
      src: "/assets/home-color.png",
      title: "Live CRM Tracking",
      subTitle:
        "Access your personal dashboard to track lead status, field updates, and property performance in real-time.",
    },
    {
      src: "/assets/partnerAccess.png",
      title: "Direct Partner Leads",
      subTitle:
        "Continue managing your exclusive inquiries filtered through our WhatsApp API and pre-sales support.",
    },
    {
      src: "/assets/upload-color.png",
      title: "Field & Sales Support",
      subTitle:
        "Stay connected with our field team for site visits and closures. We are here to help you close faster.",
    },
  ],
  owner: [
    {
      src: "/assets/propertyDetails.png",
      title: "Basic Property Details",
      subTitle: "Tell us what you're listing—Flat, Villa, or Plot. It only takes a minute to start.",
    },
    {
      src: "/assets/location-color.png",
      title: "Location & Pricing",
      subTitle: "Set your price and pinpoint the location. Transparency leads to faster closures.",
    },
    {
      src: "/assets/propertyLive.png",
      title: "Verify & Go Live",
      subTitle: "Complete a quick digital MOU to get verified leads directly on your WhatsApp and CRM.",
    },
  ],
  ownerOtp: [
    {
      src: "/assets/home-color.png",
      title: "Zero Listing Fees",
      subTitle: "Post your property for free. No hidden charges, no premium packages—just pure results.",
    },
    {
      src: "/assets/propertyDetails.png",
      title: "Verified Listings",
      subTitle:
        "Access premium, WhatsApp-verified leads. No shared data. No spam calls. Only genuine, exclusive opportunities.",
    },
    {
      src: "/assets/propertyLive.png",
      title: "80% Operational Support",
      subTitle: "We handle pre-sales and field visits. You just focus on closing the deal.",
    },
  ],
};

function Card({ src, title, subTitle }: { src: string; title: string; subTitle: string }) {
  return (
    <div className="flex flex-col flex-grow py-4 sm:py-5 px-3 sm:px-4 items-center justify-start">
      <Image
        alt={title}
        src={src}
        width={100}
        height={100}
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] mb-3"
      />
      <div>
        <p className="text-center text-text-black font-semibold text-[clamp(1rem,1.3vw,1.6rem)] leading-tight mb-1.5 sm:mb-2">
          {title}
        </p>
        <p className="text-center text-text-gray font-normal text-[clamp(0.78rem,0.9vw,1rem)] leading-[1.45]">
          {subTitle}
        </p>
      </div>
    </div>
  );
}

interface InfoSectionProps {
  titlePrefix: string;
  title: string;
  subHeading?: string;
}

export default function InfoSection({ titlePrefix, title, subHeading }: InfoSectionProps) {
  const searchParams = useSearchParams();
  const ownerType = searchParams.get("ownerType");
  const isOtp = searchParams.get("isOtp") === "true";
  const flow = searchParams.get("flow");
  const postProperty = searchParams.get("postProperty") === "true";

  const isSignupOtp = isOtp && flow === "signup";
  const isCpLoginOtp = isOtp && flow === "login";

  let cardKey: keyof typeof cardInfo = "endUser";
  if (isCpLoginOtp) {
    cardKey = "channelPartnerLogin";
  } else if (isSignupOtp && ownerType === USER_TYPE.OWNER) {
    cardKey = "ownerOtp";
  } else if (isSignupOtp && ownerType === USER_TYPE.CHANNEL_PARTNER) {
    cardKey = "channelPartnerRegister";
  } else if (postProperty && ownerType === USER_TYPE.OWNER && !isOtp) {
    cardKey = "owner";
  } else if (postProperty && ownerType === USER_TYPE.CHANNEL_PARTNER && !isOtp) {
    cardKey = "channelPartnerRegister";
  }

  const cards = cardInfo[cardKey];
  const useSellerStyleLayout = cardKey !== "endUser";

  return (
    <div
      className={
        useSellerStyleLayout
          ? "flex justify-center items-start flex-col mt-0 md:mt-2 lg:mt-4"
          : "mt-8 flex flex-col items-start justify-center md:mt-[7rem]"
      }
    >
      <p
        className={
          useSellerStyleLayout
            ? "text-white font-normal text-[clamp(0.9rem,1.1vw,1.15rem)] mb-2"
            : "mb-2 text-base font-normal text-white md:text-lg"
        }
      >
        {titlePrefix}
      </p>
      <h2
        className={
          useSellerStyleLayout
            ? "text-white font-semibold text-[clamp(2rem,3.2vw,3rem)] leading-[1.2] mb-2 max-w-[22ch]"
            : "mb-8 text-xl font-semibold leading-tight text-white sm:text-2xl sm:leading-snug md:mb-12 md:text-[2rem] md:leading-[2.2rem]"
        }
      >
        {title}
      </h2>
      {subHeading ? (
        <p className="text-white font-normal text-[clamp(0.95rem,1.2vw,1.25rem)] mb-5 md:mb-7 max-w-[62ch]">
          {subHeading}
        </p>
      ) : null}
      <div
        className={
          useSellerStyleLayout
            ? "mt-1 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3 sm:gap-4 w-full"
            : "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full"
        }
      >
        {cards.map((info) => (
          <div
            key={info.title}
            className={
              useSellerStyleLayout
                ? "bg-white rounded-[10px] shadow-md flex flex-col h-full min-h-[200px] sm:min-h-[220px]"
                : "bg-white rounded-[10px] shadow-md flex flex-col h-full"
            }
          >
            <Card {...info} />
          </div>
        ))}
      </div>
    </div>
  );
}
