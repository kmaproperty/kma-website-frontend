"use client";
import HomeHeader from "@/components/header/homeHeader";
import {
  BadgePercent,
  CircleCheckBig,
  House,
  Lightbulb,
  ListCheck,
  ListChecks,
} from "lucide-react";
import PageTitle from "@/components/common/PageTitle";
import SectionHeading from "@/components/common/SectionHeading";
import Image from "next/image";
import BlogSection from "@/components/home/blogSection";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getSelectedCity } from "@/store/homeHeaderSlice";
import { useHeaderStore } from "@/store/useHeaderStore";
import { use, useEffect, useState } from "react";
import BannerSlider from "../home/bannerSlider";
import HeaderDataSync from "@/components/header/HeaderDataSync";

export default function AboutUsComponent({
  propertyMasterData,
  propertyCitiesData,
}) {
  const selectedCity = useSelector(getSelectedCity);
  const { fetchCities } = useHeaderStore();
  const [companyStats, setCompanyStats] = useState([
    {
      title: "Channel Partners",
      value: "0",
    },
    {
      title: "Happy Customers",
      value: "0",
    },
    {
      title: "Societies Covered",
      value: "0",
    },
    {
      title: " Active Listing",
      value: "0",
    },
  ])

  useEffect(() => {
    if (!propertyCitiesData) {
      fetchCities({});
    }
  }, [propertyCitiesData, fetchCities]);

  const breadcrumps = [
    {
      name: "Home",
      link: "/",
      icon: <House className="w-5" />,
    },
    {
      name: "About Us",
    },
  ];

  const sliderImage = [
    {
      imagePath: '/assets/About-us.jpg',
      alt: "Background Image 1",
    },
  ]

  return (
    <div className="overflow-x-hidden">
      <HeaderDataSync propertyMasterData={propertyMasterData} propertyCitiesData={propertyCitiesData} />
      <div className="fixed left-0 right-0 z-[60] flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full flex justify-center">
          <HomeHeader />
        </div>
      </div>
      <div className="relative overflow-hidden rounded-b-[20px] sm:rounded-br-[30px] non_home_page_slider min-h-[330px] sm:min-h-[380px] md:min-h-[430px]">
        <BannerSlider bannerHeight={'h-full'} backgroundImages={sliderImage} overlayClass='about-us-gradient-overlay' />
        <div className="absolute inset-0 z-10 flex flex-col items-center top-0 w-[100%] ">
          <div className="2xl:py-[160px] 1xl:py-[145px] xl:py-[130px] lg:py-[115px] 2md:py-[95px] md:py-[75px] sm:py-[75px] py-[75px]">
            <PageTitle
              title="About Us"
              description="Discover who we are, what we stand for, and why thousands of brokers and buyers across Gurgaon trust KMA Global Properties every single day."
              breadcrumps={breadcrumps}
              actions={[]}
            />
          </div>
        </div>

      </div>
      <div className="w-full px-4 2xl:py-[120px] xl:py-20 lg:py-16 md:py-12 py-10">
        <div className="flex xl:flex-row flex-col-reverse items-center justify-between max-w-[1440px] mx-auto gap-6">
          <div className="xl:w-[50%] w-full">
            <SectionHeading
              title="Who We Are"
              subtitle="About KMA Global Properties"
              type={"left"}
              color=""
              lineTop={false}
              description="KMA Global Properties, established in 2025, is Gurgaon's most transparent and broker-friendly real estate platform. We specialize in residential rentals, sales, and property investments — delivering a complete end-to-end experience for buyers, owners, and brokers who value trust, clarity, and real results."
            />
            <div className="mt-6 grid w-full grid-cols-1 gap-x-8 gap-y-4 sm:w-fit sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-[#010048]" />
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                Free Listing & Exclusive Leads
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-[#010048]" />
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                Pre-Sales & Field Support
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-[#010048]" />
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                2500+ Broker Network 
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-[#010048]" />
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                Live CRM & Complete Transparency
                </p>
              </div>
            </div>
            <div className="w-full rounded-lg border border-gray-300 md:border-dashed px-5 py-4 grid grid-cols-2 gap-x-5 gap-y-4 md:mt-10 mt-6 2xl:px-8 2xl:gap-10 2xl:grid-cols-4 xl:grid-cols-2 md:grid-cols-4 sm:grid-cols-2">
              {
                companyStats.map((stat) => (
                  <div key={stat.title} className="text-left">
                    <h3 className="text-[22px] font-semibold text-[#010048] 2xl:text-[36px] xl:text-[28px]">
                      {stat.value}
                    </h3>
                    <p className={`text-[#5C727D] text-[14px] leading-6 font-normal`}>
                      {stat.title}
                    </p>
                  </div>
                ))
              }
            </div>
            <div className="mt-8">
              <h2 className={`text-[28px] leading-11 font-semibold text-[#010048]`}>Founder’s Profile</h2>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="w-full px-3 py-2 border border-gray-200 flex items-center gap-2 rounded-lg sm:w-fit sm:px-5 sm:gap-4">
                  <Image
                    src="/assets/team/karmjeet Sir .png"
                    alt="Karmjeet Dahiya"
                    className="h-[52px] w-[52px] object-cover rounded-full sm:h-[60px] sm:w-[60px]"
                    width={60}
                    height={60}
                  />
                  <div className="min-w-0 space-y-1.5">
                    <h3 className="truncate text-[16px] font-medium text-[#010048]">Karamjeet Dahiya</h3>
                    <p className="text-[13px] font-medium text-[#fff] w-full text-center px-3 py-0.5 rounded-sm" style={{ background: "linear-gradient(90deg, #C75C10 0%, #CE9554 100%)" }}>Founder</p>
                  </div>
                </div>
                {/* <div className="w-full px-3 py-2 border border-gray-200 flex items-center gap-2 rounded-lg sm:w-fit sm:px-5 sm:gap-4">
                  <Image
                    src="/assets/team/founder1.png"
                    alt="Anipal Yadav"
                    className="h-[52px] w-[52px] object-cover rounded-full sm:h-[60px] sm:w-[60px]"
                    width={60}
                    height={60}
                  />
                  <div className="min-w-0 space-y-1.5">
                    <h3 className="truncate text-[16px] font-medium text-[#010048]">Anipal Yadav</h3>
                    <p className="text-[13px] w-full text-center font-medium text-[#fff] px-3 py-0.5 rounded-sm" style={{ background: "linear-gradient(90deg, #C75C10 0%, #CE9554 100%)" }}>Co-Founder</p>
                  </div>
                </div>
                <div className="w-full px-3 py-2 border border-gray-200 flex items-center gap-2 rounded-lg sm:w-fit sm:px-5 sm:gap-4">
                  <Image
                    src="/assets/team/founder2.png"
                    alt="Paramjeet Dahiya"
                    className="h-[52px] w-[52px] object-cover rounded-full sm:h-[60px] sm:w-[60px]"
                    width={60}
                    height={60}
                  />
                  <div className="min-w-0 space-y-1.5">
                    <h3 className="truncate text-[16px] font-medium text-[#010048]">Paramjeet Dahiya</h3>
                    <p className="text-[13px] w-full text-center font-medium text-[#fff] px-3 py-0.5 rounded-sm" style={{ background: "linear-gradient(90deg, #C75C10 0%, #CE9554 100%)" }}>Co-Founder</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <Image
            src="/assets/aboutUs/who-we-are-graphic.png"
            alt="About Us"
            className="xl:w-[45%] w-full max-w-[600px]"
            width={600}
            height={600}
          />
        </div>
      </div>
      <div className="w-full relative 2xl:pt-[100px] xl:pt-20 bg-[#F2F2F2]">
        <div className="flex xl:flex-row flex-col items-center justify-between max-w-[1440px] mx-auto">
          <div className="xl:w-[50%] w-full">
            <Image
               src="/assets/aboutUs/hand-presenting-model.png"
               alt="About Us"
              className="xl:w-[50%] w-full xl:absolute top-0 left-0 h-full object-cover"
              width={930}
              height={600}
            />
          </div>
          <div className="xl:w-[50%] w-full space-y-3 xl:pl-[50px] py-10 px-4 xl:min-h-[579px] flex flex-col justify-center">
            <SectionHeading
              title="Our Story"
              subtitle="Building Trust in Gurgaon, One Property at a Time"
              type={"left"}
              color=""
              lineTop={false}
              description="KMA Global Properties was founded with one clear purpose — to fix what was broken in real estate. No more paying to list. No more shared leads. No more doing all the work and still losing a cut to the portal."
            />
            <p className={`text-[#5C727D] text-md leading-7`}>
            Whether you're buying your first home, renting in Gurgaon's top societies, or growing your brokerage business — we ensure your journey is transparent, tech-enabled, and fully supported from start to finish.
            </p>
            <div className="pl-4 mt-6 border-l-4 border-[#010048]">
              <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                From the first enquiry to the final handover, we don't just close properties — we build relationships that last.

              </p>
              <i className={`text-[#5C727D] text-md leading-7 font-normal`}>
              "At KMA Global Properties, we don't just work in real estate — we work for the people in it."
              </i>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full px-4 py-10 md:block md:py-12 lg:py-16 xl:py-20 2xl:py-[100px]">
        <div className="max-w-[1440px] mx-auto">
          <h2 className={`text-[28px] leading-8 font-semibold text-[#010048] text-left sm:text-center`}>A Service You Can Trust and Feel Confident In</h2>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-[18px] sm:gap-5 md:mt-10 mt-[22px] items-center">
            <div className="bg-[#F2F2F2] px-[16px] md:px-[30px] py-[10px] md:py-[18px] sm:px-8 sm:py-5 rounded-lg flex flex-col gap-1 h-[200px] justify-center">
              <div className="bg-white w-[57px] h-[57px] sm:w-[60px] sm:h-[60px] flex items-center justify-center rounded-lg mb-2">
                <BadgePercent className="w-8 h-8 text-[#010048]" />
              </div>
              <h3 className="text-[#010048] text-[22px] leading-6 font-medium mb-0">
                Transparent Pricing
              </h3>
              <p className="text-[#5C727D] text-md leading-5">
                No hidden charges, ever
              </p>
            </div>
            <div className="bg-[#F2F2F2] px-[16px] md:px-[30px] py-[10px] md:py-[18px] sm:px-8 sm:py-5 rounded-lg flex flex-col gap-1 h-[200px] justify-center">
              <div className="bg-white w-[57px] h-[57px] sm:w-[60px] sm:h-[60px] flex items-center justify-center rounded-lg mb-2">
                <ListCheck className="w-8 h-8 text-[#010048]" />
              </div>
              <h3 className="text-[#010048] text-[22px] leading-6 font-medium mb-0">
                Verified Listings Only
              </h3>
              <p className="text-[#5C727D] text-md leading-5">
                100% authenticated premium properties
              </p>
            </div>
            <div className="bg-[#F2F2F2] px-[16px] md:px-[30px] py-[10px] md:py-[18px] sm:px-8 sm:py-5 rounded-lg flex flex-col gap-1 h-[200px] justify-center">
              <div className="bg-white w-[57px] h-[57px] sm:w-[60px] sm:h-[60px] flex items-center justify-center rounded-lg mb-2">
                <Lightbulb className="w-8 h-8 text-[#010048]" />
              </div>
              <h3 className="text-[#010048] text-[22px] leading-6 font-medium mb-0">
                Tailored Property Advice
              </h3>
              <p className="text-[#5C727D] text-md leading-5">
                From first-timers to investors
              </p>
            </div>
            <div className="bg-[#F2F2F2] px-[16px] md:px-[30px] py-[10px] md:py-[18px] sm:px-8 sm:py-5 rounded-lg flex flex-col gap-1 h-[200px] justify-center">
              <div className="bg-white w-[57px] h-[57px] sm:w-[60px] sm:h-[60px] flex items-center justify-center rounded-lg mb-2">
                <ListChecks className="w-8 h-8 text-[#010048]" />
              </div>
              <h3 className="text-[#010048] text-[22px] leading-6 font-medium mb-0">
                End-to-End Management
              </h3>
              <p className="text-[#5C727D] text-md leading-5">
                Including legal & documentation
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full pb-10 md:pb-12 lg:pb-16 xl:pb-20 2xl:pb-[100px]">
        <div className="grid w-full grid-cols-1 xl:grid-cols-2">
          <div className="relative min-h-[280px] xl:min-h-[579px]">
            <Image
              src="/assets/aboutUs/about-video-thumbnail.png"
              alt="About Us"
              className="object-cover"
              fill
              sizes="(max-width: 1279px) 100vw, 50vw"
            />
          </div>
          <div className="w-full bg-[#010048] px-4 py-10 xl:min-h-[579px] xl:pl-[50px] flex flex-col justify-center">
            <div className="w-full max-w-[665px] space-y-3">
              <SectionHeading
                title="Why Choose Us?"
                lineTop
                subtitle="What Makes KMA Global Properties Different"
                type={"left"}
                color="white"
                description="KMA Global Properties is continuously redefining how real estate works in Gurgaon. With a 2500+ broker network, a tech-enabled CRM platform, and a dedicated support system, we deliver a property experience that is transparent, efficient, and built entirely around you."
              />
              <p className={`text-[#d5d5d5] text-md leading-7`}>We offer complete real estate solutions for buyers, owners, and brokers — whether you're looking for your dream home, listing a property for free, or growing your brokerage business with the right infrastructure and support behind you.              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full px-4 2xl:py-[100px] xl:py-20 lg:py-16 md:py-12 py-10">
        <div className="max-w-[1440px] mx-auto">
          <SectionHeading
            title="Team Members"
            subtitle="immediate help got from our team"
            type={"center"}
            description=""
          />
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-8 sm:gap-y-4 gap-5 md:mt-10 mt-6 items-center">
            <div
              className="rounded-lg relative aspect-square bg-cover"
              style={{ backgroundImage: "url(assets/aboutUs/team-1.png)" }}
            >
              <div className="absolute right-6 top-0 z-10">
                <div className="flex flex-col gap-4 px-2.5 py-4 bg-[#0b145a] rounded-br-2xl">
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaFacebook size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaTwitter size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaLinkedin size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaYoutube size={22} />
                  </a>
                </div>
              </div>
              <div className="absolute right-0 md:bottom-[50px] bottom-6 bg-black/30 rounded-bl-lg rounded-tl-lg backdrop-blur-sm p-2.5 px-5 md:w-[75%] w-[85%] border-l-2 border-l-[#010048]">
                <h3 className="text-white text-[20px] uppercase leading-5 font-medium mb-0">
                  katherine legge
                </h3>
                <p className="text-white text-[15px] leading-7">Designer</p>
              </div>
            </div>
            <div
              className="rounded-lg relative aspect-square bg-cover"
              style={{ backgroundImage: "url(assets/aboutUs/team-2.png)" }}
            >
              <div className="absolute right-6 top-0 z-10">
                <div className="flex flex-col gap-4 px-2.5 py-4 bg-[#0b145a] rounded-br-2xl">
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaFacebook size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaTwitter size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaLinkedin size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaYoutube size={22} />
                  </a>
                </div>
              </div>
              <div className="absolute right-0 md:bottom-[50px] bottom-6 bg-black/30 rounded-bl-lg rounded-tl-lg backdrop-blur-sm p-2.5 px-5 md:w-[75%] w-[85%] border-l-2 border-l-[#010048]">
                <h3 className="text-white text-[20px] uppercase leading-5 font-medium mb-0">
                  katherine legge
                </h3>
                <p className="text-white text-[15px] leading-7">Designer</p>
              </div>
            </div>
            <div
              className="rounded-lg relative aspect-square bg-cover"
              style={{ backgroundImage: "url(assets/aboutUs/team-3.png)" }}
            >
              <div className="absolute right-6 top-0 z-10">
                <div className="flex flex-col gap-4 px-2.5 py-4 bg-[#0b145a] rounded-br-2xl">
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaFacebook size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaTwitter size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaLinkedin size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaYoutube size={22} />
                  </a>
                </div>
              </div>
              <div className="absolute right-0 md:bottom-[50px] bottom-6 bg-black/30 rounded-bl-lg rounded-tl-lg backdrop-blur-sm p-2.5 px-5 md:w-[75%] w-[85%] border-l-2 border-l-[#010048]">
                <h3 className="text-white text-[20px] uppercase leading-5 font-medium mb-0">
                  katherine legge
                </h3>
                <p className="text-white text-[15px] leading-7">Designer</p>
              </div>
            </div>
            <div
              className="rounded-lg relative aspect-square bg-cover"
              style={{ backgroundImage: "url(assets/aboutUs/team-4.png)" }}
            >
              <div className="absolute right-6 top-0 z-10">
                <div className="flex flex-col gap-4 px-2.5 py-4 bg-[#0b145a] rounded-br-2xl">
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaFacebook size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaTwitter size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaLinkedin size={22} />
                  </a>
                  <a
                    href="#"
                    className="text-white opacity-100 transition transform hover:scale-110"
                  >
                    <FaYoutube size={22} />
                  </a>
                </div>
              </div>
              <div className="absolute right-0 md:bottom-[50px] bottom-6 bg-black/30 rounded-bl-lg rounded-tl-lg backdrop-blur-sm p-2.5 px-5 md:w-[75%] w-[85%] border-l-2 border-l-[#010048]">
                <h3 className="text-white text-[20px] uppercase leading-5 font-medium mb-0">
                  katherine legge
                </h3>
                <p className="text-white text-[15px] leading-7">Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="flex justify-center overflow-hidden">
        <div className="my-16 w-[90%] 2md:w-[75%]">
          <BlogSection />
        </div>
      </div> */}
      <AboutusDataSync />
      <div className="">
        <HomeFooter />
      </div>
    </div>
  );
}
