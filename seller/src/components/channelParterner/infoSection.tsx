"use client"

import { RootState } from "@/store/store";
import Image from "next/image";
import { useSelector } from "react-redux";

const cardInfo = {
  channelPartner : [
    {
      src: "/assets/home-color.png",
      title: "No Listing Packages",
      subTitle: "List your properties without buying any expensive packages. Start for free and scale as you grow.",
    },
    {
      src: "/assets/partnerAccess.png",
      title: "Verified Partner Access",
      subTitle: "Get exclusive access to a verified network. We ensure every listing and inquiry meets our quality standards.",
    },
    {
      src: "/assets/upload-color.png",
      title: "End-to-End Assistance",
      subTitle: "From digital MOU to field support, our team assists you at every step to ensure smoother closures.",
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
      subTitle: "Access premium, WhatsApp-verified leads. No shared data. No spam calls. Only genuine, exclusive opportunities.",
    },
    {
      src: "/assets/propertyLive.png",
      title: "80% Operational Support",
      subTitle: "We handle pre-sales and field visits. You just focus on closing the deal.",
    },
  ],
};

function Card({ src, title, subTitle }: { [key: string]: string | any }) {
  return (
    <div className="flex flex-col flex-grow py-5 px-4 items-center justify-start">
      <Image alt={title} src={src} width={100} height={100} className="w-[60px] h-[60px] mb-3" />
      <div>
        <p className="text-center text-text-black font-semibold text-sm md:text-lg mb-2">
          {title}
        </p>
        <p className="text-center text-text-gray font-normal text-xs md:text-sm leading-5">
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
  params?: any;
}

export default function InfoSection({ titlePrefix, title, subHeading, params }: InfoSectionProps) {
  const formData = useSelector((state: RootState) => state.form);
  const isOtp = params?.isOtp === "true";
  return (
    <div className="flex justify-center items-start flex-col mt-8 md:mt-[7rem]">
      <p className="text-white font-normal text-base md:text-lg mb-2">{titlePrefix}</p>
      <h2 className="text-white font-semibold text-[2rem] leading-[2.2rem] mb-2">{title}</h2>
      <p className="text-white font-normal text-base md:text-lg mb-12">{subHeading}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
        {cardInfo[isOtp ? (formData.userType === "OWNER" ? "ownerOtp" : 'channelPartner') : formData.userType === "OWNER" ? "owner" : 'channelPartner'].map((info) => (
          <div key={info.title} className="bg-white rounded-[10px] shadow-md flex flex-col h-full">
            <Card {...info} />
          </div>
        ))}
      </div>
    </div>
  );
}
