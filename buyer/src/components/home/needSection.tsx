'use client'
import { Easing, useInView, Variants } from "framer-motion";
import SectionHeader from "../common/home/secionHeader";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const featureDetails = [
  {
    icon: "home.svg",
    heading: "Home Loan",
    subHeading: " Make Your Dream Home Possible",
    text: " Quick approvals with minimal paperwork and competitive rates.",
    background: "#FDF3E2",
  },
  {
    icon: "money.svg",
    heading: "Plot Loan",
    subHeading: "Turn Your Land Into Opportunity",
    text: "Easy financing for residential land in approved locations.",
    background: "#FCEDF4",
  },
  {
    icon: "key.svg",
    heading: "Rent Agreement",
    subHeading: "Simple, Secure & Hassle-Free",
    text: "Create and manage rent agreements online with ease.",
    background: "#D5E7E8",
  },
];

export default function NeedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const [activeIndex, setActiveIndex] = useState(0);

  const smartTransition = {
    duration: 1,
    ease: "easeOut" as Easing,
  };
  const cardVariants: Variants = {
    hiddenLeft: {
      opacity: 0,
      x: '-100%',
    },
    hiddenRight: {
      opacity: 0,
      x: '100%',
    },
    hiddenBottom: {
      opacity: 0,
      y: 500,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: smartTransition,
    },
  };

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.9;
    const calculatedIndex = Math.round(scrollPosition / cardWidth);
    
    if (calculatedIndex !== activeIndex && calculatedIndex >= 0 && calculatedIndex < featureDetails.length) {
      setActiveIndex(calculatedIndex);
    }
  };

  return (
    <div className="" >
      <SectionHeader
        isInView={isInView}
        heading="All Your Needs. One Trusted Platform."
        subHeading="Reliable support for all your property, loan, and agreement needs."
        hideButton={true}
      />
      <div className="mt-10" ref={ref}>
        <div className="2md:hidden flex flex-col gap-4">
          <div 
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-0 pr-16"
          > 
            {featureDetails.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => toast.info("This feature is coming soon!")}
                className="rounded-[8px] p-5 w-[90vw] sm:w-[90vw] flex-shrink-0 snap-center cursor-pointer transition-all duration-500 ease-out"
                style={{ background: item.background }}
                initial="hiddenBottom"
                animate={isInView ? "visible" : "hiddenBottom"}
                variants={cardVariants}
              >
                <div className="flex gap-4 items-start mb-2">
                  <img
                    src={`/assets/${item.icon}`}
                    alt={item.heading}
                    className="w-11 h-11"
                  />
                  <div>
                    <h2 className="text-base font-semibold text-black">
                      {item.heading}
                    </h2>
                    <h3 className="text-blue text-xs mb-2">{item.subHeading}</h3>
                  </div>
                </div>
                <p className="text-text-gray text-xs">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-2 py-1">
            {featureDetails.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ease-out ${
                  activeIndex === index 
                    ? "w-6 bg-[#010048]" 
                    : "w-2 bg-gray-300 bg-opacity-70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View Layout Grid Block */}
        <div className="hidden 2md:flex gap-4 flex-col flex-wrap 2md:flex-row">
          {featureDetails.map((item, index) => {
            const initialVariant =
              index === 0 ? "hiddenLeft" : index === 1 ? "hiddenBottom" : "hiddenRight";
            return (
              <motion.div
                key={index}
                onClick={() => toast.info("This feature is coming soon!")}
                className="rounded-[8px] p-5 flex-1 cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2"
                style={{ background: item.background }}
                variants={cardVariants}
                initial={initialVariant}
                animate={isInView ? "visible" : initialVariant}
              >
                <div className="flex gap-4 items-start mb-2">
                  <img
                    src={`/assets/${item.icon}`}
                    alt={item.heading}
                    className="w-11 h-11"
                  />
                  <div>
                    <h2 className="text-base font-semibold text-black">
                      {item.heading}
                    </h2>
                    <h3 className="text-blue text-xs mb-2">{item.subHeading}</h3>
                  </div>
                </div>
                <p className="text-text-gray text-xs">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}