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
      title: "Active Listing",
      value: "10Lac+",
    },
    {
      title: "Projects across India",
      value: "15,000",
    },
    {
      title: "Happy Customers",
      value: "10,000+",
    },
    {
      title: "Channel Partners accross India",
      value: "500+",
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
    <div>
      <HeaderDataSync propertyMasterData={propertyMasterData} propertyCitiesData={propertyCitiesData} />
      <div className="relative non_home_page_slider">
        <BannerSlider bannerHeight={'min-h-[600px] 2md:h-[60vh]'} backgroundImages={sliderImage} overlayClass='about-us-gradient-overlay' />
        <div className="absolute flex flex-col items-center top-0 w-[100%] ">
          <HomeHeader />
          <div className="mt-[150px]">
            <PageTitle
              title="About Us"
              description="Discover who we are, what we stand for, and how we make your real estate journey smooth and successful."
              breadcrumps={breadcrumps}
            />
          </div>
        </div>

      </div>
      <div className="w-full px-4 2xl:py-[120px] xl:py-20 lg:py-16 md:py-12 py-10">
        <div className="flex xl:flex-row flex-col-reverse items-center justify-between max-w-[1444px] mx-auto gap-6">
          <div className="xl:w-[50%] w-full">
            <SectionHeading
              title="Who We Are"
              subtitle="About KMA Properties"
              type={"left"}
              description="KMA Property Group, established on January 1, 2025, is a beacon of excellence in Gurugram’s high-end property market. We specialize in the sale, purchase, and rental of luxury properties, offering personalized experiences to clients who demand sophistication, trust, and lasting value."
            />
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4 mt-6 w-fit">
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-[#010048]" />
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                  Premium Real Estate Services
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-[#010048]" />
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                  24/7 Expert Assistance
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-[#010048]" />
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                  Highly Skilled Professionals
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-[#010048]" />
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                  Bespoke Client Experiences
                </p>
              </div>
            </div>
            <div className="w-full 2xl:px-8 px-5 py-3 rounded-lg border border-dashed border-gray-400 grid 2xl:grid-cols-4 xl:grid-cols-2 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 2xl:gap-10 gap-5 justify-between md:mt-10 mt-6  ">
              {
                companyStats.map((stat) => (
                  <div key={stat.title}>
                    <h3 className="2xl:text-[36px] xl:text-[28px] text-[22px] font-semibold text-[#010048]">
                      {stat.value}
                    </h3>
                    <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                      {stat.title}
                    </p>
                  </div>
                ))
              }
            </div>
            <div className="mt-8">
              <h2 className={`text-[28px] leading-11 font-semibold text-[#010048]`}>Founder’s Profile</h2>
              <div className="flex flex-wrap items-center gap-3 mt-5">
                <div className="sm:w-fit w-full px-5 py-2 border border-gray-200 flex items-center gap-4 rounded-lg">
                  <Image
                    src="/assets/aboutUs/avatar.png"
                    alt="About Us"
                    className="w-[60px] object-cover rounded-full"
                    width={60}
                    height={60}
                  />
                  <div className="space-y-1.5">
                    <h3 className="text-[16px] font-medium text-[#010048]">Dwayne Douglas</h3>
                    <p className="text-[13px] font-medium text-[#fff] w-full text-center px-3 py-0.5 rounded-sm" style={{ background: "linear-gradient(90deg, #C75C10 0%, #CE9554 100%)" }}>Founder</p>
                  </div>
                </div>
                <div className="sm:w-fit w-full px-5 py-2 border border-gray-200 flex items-center gap-4 rounded-lg">
                  <Image
                    src="/assets/aboutUs/avatar.png"
                    alt="About Us"
                    className="w-[60px] object-cover rounded-full"
                    width={60}
                    height={60}
                  />
                  <div className="space-y-1.5">
                    <h3 className="text-[16px] font-medium text-[#010048]">Dwayne Douglas</h3>
                    <p className="text-[13px] w-full text-center font-medium text-[#fff] px-3 py-0.5 rounded-sm" style={{ background: "linear-gradient(90deg, #C75C10 0%, #CE9554 100%)" }}>CO-Founder</p>
                  </div>
                </div>
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
        <div className="flex xl:flex-row flex-col-reverse items-center justify-between max-w-[1444px] mx-auto">
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
              subtitle="Shaping Gurugram’s Skyline, One Icon at a Time"
              type={"left"}
              description="KMA Property Group was founded to redefine real estate through elegance, trust, and innovation — blending decades of expertise with a deep understanding of today’s luxury market."
            />
            <p className={`text-[#5C727D] text-md leading-7`}>
              Whether you're investing in a luxury home, renting a penthouse, or
              managing a commercial property, we ensure your journey is smooth,
              tech-enabled, and truly exceptional.
            </p>
            <div className="pl-4 mt-6 border-l-4 border-[#010048]">
              <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                From opulent villas to commercial landmarks, we craft legacy
                experiences, not just transactions.
              </p>
              <i className={`text-[#5C727D] text-md leading-7 font-normal`}>
                "At KMA, we don’t just deal in property — we deal in prestige."
              </i>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 2xl:py-[100px] xl:py-20 lg:py-16 md:py-12 py-10">
        <div className="max-w-[1444px] mx-auto">
          <h2 className={`text-[28px] leading-11 font-semibold text-[#010048] text-center`}>A Service You Can Trust and Feel Confident In</h2>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 md:mt-10 mt-6 items-center">
            <div className="bg-[#F2F2F2] px-8 py-5 rounded-lg flex flex-col gap-1 h-full justify-center">
              <div className="bg-white w-[60px] h-[60px] flex items-center justify-center rounded-lg mb-2">
                <BadgePercent className="w-8 h-8 text-[#010048]" />
              </div>
              <h3 className="text-[#010048] text-[22px] leading-6 font-medium mb-0">
                Transparent Pricing
              </h3>
              <p className="text-[#5C727D] text-md leading-7">
                No hidden charges, ever
              </p>
            </div>
            <div className="bg-[#F2F2F2] px-8 py-5 rounded-lg flex flex-col gap-1 h-full justify-center">
              <div className="bg-white w-[60px] h-[60px] flex items-center justify-center rounded-lg mb-2">
                <ListCheck className="w-8 h-8 text-[#010048]" />
              </div>
              <h3 className="text-[#010048] text-[22px] leading-6 font-medium mb-0">
                Verified Listings Only
              </h3>
              <p className="text-[#5C727D] text-md leading-7">
                100% authenticated premium properties
              </p>
            </div>
            <div className="bg-[#F2F2F2] px-8 py-5 rounded-lg flex flex-col gap-1 h-full justify-center">
              <div className="bg-white w-[60px] h-[60px] flex items-center justify-center rounded-lg mb-2">
                <Lightbulb className="w-8 h-8 text-[#010048]" />
              </div>
              <h3 className="text-[#010048] text-[22px] leading-6 font-medium mb-0">
                Tailored Property Advice
              </h3>
              <p className="text-[#5C727D] text-md leading-7">
                From first-timers to investors
              </p>
            </div>
            <div className="bg-[#F2F2F2] px-8 py-5 rounded-lg flex flex-col gap-1 h-full justify-center">
              <div className="bg-white w-[60px] h-[60px] flex items-center justify-center rounded-lg mb-2">
                <ListChecks className="w-8 h-8 text-[#010048]" />
              </div>
              <h3 className="text-[#010048] text-[22px] leading-6 font-medium mb-0">
                End-to-End Management
              </h3>
              <p className="text-[#5C727D] text-md leading-7">
                Including legal & documentation
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <div className="flex xl:flex-row flex-col items-center justify-between max-w-[1444px] mx-auto">
          <div className="xl:w-[50%] w-full">
            <Image
              src="/assets/aboutUs/about-video-thumbnail.png"
              alt="About Us"
              className="xl:w-[50%] w-full xl:absolute top-0 left-0 h-full object-cover"
              width={946}
              height={600}
            />
          </div>
          <div className="xl:w-[50%] w-full space-y-3 xl:pl-[50px] py-10 px-4 xl:min-h-[579px] flex flex-col justify-center bg-[#010048]">
            <SectionHeading
              title="Why Choose Us?"
              lineTop
              subtitle="The Innovative Creations of KMA"
              type={"left"}
              color="white"
              description="MA Property Group is continuously pushing the boundaries of luxury real estate in Gurugram. With a visionary team and a tech-enabled platform, we deliver bespoke property experiences that blend architectural brilliance, modern amenities, and timeless elegance."
            />
            <p className={`text-[#d5d5d5] text-md leading-7`}>We also offer customized real estate solutions for buyers, investors, and developers seeking high-end villas, commercial hubs, or rental properties tailored to their lifestyle.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-4 2xl:py-[100px] xl:py-20 lg:py-16 md:py-12 py-10">
        <div className="max-w-[1444px] mx-auto">
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
      </div>
      {/* <div className="flex justify-center overflow-hidden">
        <div className="my-16 w-[90%] 2md:w-[75%]">
          <BlogSection />
        </div>
      </div> */}
      <div className="">
        <HomeFooter />
      </div>
    </div>
  );
}
