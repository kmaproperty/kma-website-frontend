import HomdeHeader from "@/components/header/homeHeader";
import {
  BadgePercent,
  CircleCheckBig,
  House,
  Lightbulb,
  ListCheck,
  ListChecks,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  PhoneIncoming,
  Section,
} from "lucide-react";
import PageTitle from "@/components/common/PageTitle";
import { TbBulb } from "react-icons/tb";
import SectionHeading from "@/components/common/SectionHeading";
import Image from "next/image";
import BlogSection from "@/components/home/blogSection";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import ContactFormComponent from "@/components/contactUs/contactForm";
import Link from "next/link";
import ContactTable from "../../components/contactUs/ContactTable";
import JoinUsForm from "@/components/joinUs/JoinUsForm";

const JoinUs = () => {
  const breadcrumps = [
    {
      name: "Home",
      link: "/",
      icon: <House className="w-5" />,
    },
    {
      name: "Join Us",
    },
  ];

  const actionButtons = [
    {
      name: "Join Us",
      link: "#joinus-form",
    },
  ];

  return (
    <div>
      <div className="fixed left-0 right-0 z-[60] flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full flex justify-center">
          <HomdeHeader />
        </div>
      </div>

      <div
        className="relative rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[100px] md:rounded-br-[100px] pt-[25px] h-auto min-h-[400px] md:h-[100vh] md:max-h-[600px] overflow-hidden"
        style={{
          backgroundImage: "url(assets/join-us-hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-[90%] md:w-[75%] max-w-[600px] mx-auto mt-[100px] md:mt-[150px] pb-20 md:pb-0">
          <PageTitle
            title="Join Us as a Channel Partner"
            description=""
            actions={actionButtons}
            breadcrumps={breadcrumps}
          />
        </div>
      </div>

      <div
        className="relative flex flex-col md:flex-row items-center justify-between w-[90%] mx-auto max-w-[1440px] bg-white rounded-2xl shadow-lg px-6 py-8 md:px-16 md:py-15 gap-6 md:gap-8"
        style={{
          transform:
            typeof window !== "undefined" && window.innerWidth < 768
              ? "translateY(-10%)"
              : "translateY(-25%)",
        }}
      >
        <h3 className="text-[20px] md:text-[28px] font-bold text-black mb-0 w-full md:w-[36%] text-center md:text-left">
          Become a Channel Partner to post unlimited listings with 80%
          operational support.
        </h3>
        <div className="w-full md:w-[48%]">
          <p className="text-[15px] md:text-[18px] font-normal text-[#888888] mb-0 text-center md:text-left leading-relaxed">
            Join Gurgaon’s most transparent network for brokers and owners. Post
            unlimited luxury properties for free, track every lead through our
            real-time CRM, and get exclusive pre-sales & field support to close
            deals faster. We handle the follow-ups and filtering so you can
            focus only on the final meetings.
          </p>
        </div>
      </div>

      <div className="w-full pb-20 md:pb-[150px] pt-8 md:pt-16 px-6 md:px-[50px]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col-reverse md:flex-row gap-10 justify-between items-center">
            <div className="space-y-6 w-full md:w-[55%]">
              <SectionHeading
                title=""
                subtitle="Join Now"
                type={"left"}
                color=""
                lineTop={true}
                description=""
              />
              <JoinUsForm />
            </div>

            <div className="w-full md:w-auto flex justify-center">
              <Image
                src={"/assets/app/real-estate-agent.png"}
                width={500}
                height={700}
                className="w-full md:w-[100%] max-w-[300px] md:max-w-full h-auto rounded-[20px] object-cover"
                alt="channel partner"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-text-black flex flex-col items-center justify-center">
        <AboutusDataSync />
        <HomeFooter tab={1} />
      </div>
    </div>
  );
};

export default JoinUs;
