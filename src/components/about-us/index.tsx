"use client";
import HomdeHeader from "@/components/header/homeHeader";
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
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { CitiesResponse, getCityListApiHandler } from "@/services/homeService";
import { getSelectedCity, setSelectedCity } from "@/store/homeHeaderSlice";
import { useEffect, useState } from "react";
import BannerSlider from "../home/bannerSlider";

export default function AboutUsComponent({
  propertyMasterData,
  propertyCitiesData,
}) {
  const dispatch = useDispatch();
  const selectedCity = useSelector(getSelectedCity); //to get the selected city

  const [cityData, setCityData] = useState(null);

  const { mutate: fetchCities, isPending: cityLoader } = useMutation({
    mutationFn: getCityListApiHandler,
    onSuccess: (response: CitiesResponse) => {
      let findCity = response?.allCities?.find(
        (item) => item.name == "Gurgaon"
      );
      if (findCity) {
        dispatch(setSelectedCity(findCity));
      }
      setCityData(response);
    },
    onError: (error) => {},
  });

  useEffect(() => {
    if (propertyCitiesData) {
      let findCity = propertyCitiesData?.allCities?.find(
        (item) => item.name == "Gurgaon"
      );
      if (findCity) {
        dispatch(setSelectedCity(findCity));
      }
      setCityData(propertyCitiesData);
    } else {
      fetchCities({});
    }
  }, []);

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
      <div className="relative">
        <BannerSlider bannerHeight={'min-h-[600px] 2md:h-[60vh]'} backgroundImages={sliderImage} overlayClass='about-us-gradient-overlay'/>
        <div className="absolute flex flex-col items-center top-0 w-[100%] ">
          <HomdeHeader
            fetchCities={fetchCities}
            cityLoader={cityLoader}
            cityData={cityData}
            propertyMasterData={propertyMasterData}
          />
          <div className="mt-[150px]">
          <PageTitle
            title="About Us"
            description="Discover who we are, what we stand for, and how we make your real estate journey smooth and successful."
            breadcrumps={breadcrumps}
          />
        </div>
        </div>
        
      </div>
      <div className="w-full py-[120px] px-[50px]">
        <div className="flex items-center justify-between gap-6 max-w-[1444px] mx-auto">
          <div className="w-[50%]">
            <SectionHeading
              title="Who We Are"
              subtitle="About KMA Properties"
              type={"left"}
              description="KMA Property Group, established on January 1, 2025, is a beacon of excellence in Gurugram’s high-end property market. We specialize in the sale, purchase, and rental of luxury properties, offering personalized experiences to clients who demand sophistication, trust, and lasting value."
            />
            <div className="grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-4 mt-6 w-fit">
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
            <div className="w-full  px-8 py-3 rounded-lg border border-dashed border-gray-400 grid grid-cols-4 gap-10 justify-between mt-7">
              <div>
                <h3 className="text-[36px] font-semibold text-[#010048]">
                  10Lac+
                </h3>
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                  Active Listing
                </p>
              </div>
              <div>
                <h3 className="text-[36px] font-semibold text-[#010048]">
                  15,000
                </h3>
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                  Projects across India
                </p>
              </div>
              <div>
                <h3 className="text-[36px] font-semibold text-[#010048]">
                  10,000+
                </h3>
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                  Happy Customers
                </p>
              </div>
              <div>
                <h3 className="text-[36px] font-semibold text-[#010048]">
                  500+
                </h3>
                <p className={`text-[#5C727D] text-md leading-7 font-normal`}>
                  Channel Partner across India.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <h2 className={`text-[28px] leading-11 font-semibold text-[#010048]`}>Founder’s Profile</h2>
              <div className="flex items-center gap-3 mt-4">
                <div className="px-5 py-2 border border-gray-200 flex items-center gap-4 rounded-lg">
                  <Image
                    src="/assets/aboutUs/avatar.png"
                    alt="About Us"
                    className="w-[60px] object-cover rounded-full"
                    width={60}
                    height={60}
                  />
                  <div className="space-y-1.5">
                    <h3 className="text-[16px] font-medium text-[#010048]">Dwayne Douglas</h3>
                    <p className="text-[13px] font-medium text-[#fff] w-fit px-3 py-0.5 rounded-sm" style={{background: "linear-gradient(90deg, #C75C10 0%, #CE9554 100%)"}}>Founder</p>
                  </div>
                </div>
                <div className="px-5 py-2 border border-gray-200 flex items-center gap-4 rounded-lg">
                  <Image
                    src="/assets/aboutUs/avatar.png"
                    alt="About Us"
                    className="w-[60px] object-cover rounded-full"
                    width={60}
                    height={60}
                  />
                  <div className="space-y-1.5">
                    <h3 className="text-[16px] font-medium text-[#010048]">Dwayne Douglas</h3>
                    <p className="text-[13px] font-medium text-[#fff] w-fit px-3 py-0.5 rounded-sm" style={{background: "linear-gradient(90deg, #C75C10 0%, #CE9554 100%)"}}>Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Image
            src="/assets/aboutUs/who-we-are-graphic.png"
            alt="About Us"
            className="w-[45%] max-w-[600px]"
            width={600}
            height={600}
          />
        </div>
      </div>
      <div className="w-full pt-[100px] pr-[50px] bg-[#F2F2F2]">
        <div className="flex items-center justify-between gap-6 max-w-[1680] mr-auto">
          <Image
            src="/assets/aboutUs/hand-presenting-model.png"
            alt="About Us"
            className="w-[60%] object-cover max-w-[930px]"
            width={930}
            height={600}
          />
          <div className="w-[40%] space-y-3">
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
      <div className="w-full px-[50px] py-[100px]">
        <div className="max-w-[1444px] mx-auto ">
          <h2 className={`text-[28px] leading-11 font-semibold text-[#010048] text-center`}>A Service You Can Trust and Feel Confident In</h2>
          <div className="grid grid-cols-4 gap-x-8 gap-y-4 mt-10 items-center">
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
      <div className="w-full bg-[#010048] pr-[50px]">
        <div className="flex items-center justify-between gap-6 max-w-[1680] mr-auto">
          <Image
            src="/assets/aboutUs/about-video-thumbnail.png"
            alt="About Us"
            className="w-[60%] max-w-[946] object-cover aspect-video"
            width={946}
            height={600}
          />
          <div className="w-[40%] space-y-3">
            <SectionHeading
              title="Our Story"
              lineTop
              subtitle="Shaping Gurugram’s Skyline, One Icon at a Time"
              type={"left"}
              color="white"
              description="KMA Property Group was founded to redefine real estate through elegance, trust, and innovation — blending decades of expertise with a deep understanding of today’s luxury market."
            />
            <p className={`text-[#d5d5d5] text-md leading-7`}>
              We also offer customized real estate solutions for buyers,
              investors, and developers seeking high-end villas, commercial
              hubs, or rental properties tailored to their lifestyle.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-[50px] py-[100px]">
        <div className="max-w-[1444px] mx-auto ">
          <SectionHeading
            title="Team Members"
            subtitle="immediate help got from our team"
            type={"center"}
            description=""
          />
          <div className="grid grid-cols-4 gap-x-8 gap-y-4 mt-10 items-center">
            <div
              className="rounded-lg relative aspect-square"
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
              <div className="absolute right-0 bottom-[50px] bg-black/30 rounded-bl-lg rounded-tl-lg backdrop-blur-sm p-2.5 px-5 w-[75%] border-l-2 border-l-[#010048]">
                <h3 className="text-white text-[20px] uppercase leading-5 font-medium mb-0">
                  katherine legge
                </h3>
                <p className="text-white text-[15px] leading-7">Designer</p>
              </div>
            </div>
            <div
              className="rounded-lg relative aspect-square"
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
              <div className="absolute right-0 bottom-[50px] bg-black/30 rounded-bl-lg rounded-tl-lg backdrop-blur-sm p-2.5 px-5 w-[75%] border-l-2 border-l-[#010048]">
                <h3 className="text-white text-[20px] uppercase leading-5 font-medium mb-0">
                  katherine legge
                </h3>
                <p className="text-white text-[15px] leading-7">Designer</p>
              </div>
            </div>
            <div
              className="rounded-lg relative aspect-square"
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
              <div className="absolute right-0 bottom-[50px] bg-black/30 rounded-bl-lg rounded-tl-lg backdrop-blur-sm p-2.5 px-5 w-[75%] border-l-2 border-l-[#010048]">
                <h3 className="text-white text-[20px] uppercase leading-5 font-medium mb-0">
                  katherine legge
                </h3>
                <p className="text-white text-[15px] leading-7">Designer</p>
              </div>
            </div>
            <div
              className="rounded-lg relative aspect-square"
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
              <div className="absolute right-0 bottom-[50px] bg-black/30 rounded-bl-lg rounded-tl-lg backdrop-blur-sm p-2.5 px-5 w-[75%] border-l-2 border-l-[#010048]">
                <h3 className="text-white text-[20px] uppercase leading-5 font-medium mb-0">
                  katherine legge
                </h3>
                <p className="text-white text-[15px] leading-7">Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center overflow-hidden">
        <div className="my-16 w-[90%] 2md:w-[75%]">
          <BlogSection />
        </div>
      </div>
      <div className="">
          <HomeFooter propertyMasterData={propertyMasterData}/>
      </div>
    </div>
  );
}
