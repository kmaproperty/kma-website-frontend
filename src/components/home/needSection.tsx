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
    subHeading: "Make Your Dream Home a Reality",
    text: "Get easy and fast home loans with minimum documentation and competitive interest rates.",
    background: "#FDF3E2",
  },
  {
    icon: "money.svg",
    heading: "Plot Loan",
    subHeading: "Turn That Plot into a Home",
    text: "Easy financing for residential land purchases in approved locations.",
    background: "#FCEDF4",
  },
  {
    icon: "key.svg",
    heading: "Rent Agreement",
    subHeading: "Hassle-Free Online Rent Agreements",
    text: "Create, verify, and register your rent agreement online quick, legal, and secure.",
    background: "#D5E7E8",
  },
];

export default function NeedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
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

  return (
    <div className="" >
      <SectionHeader
        isInView={isInView}
        heading="All Your Needs. One Trusted Platform."
        subHeading="Reliable support for all your property, loan, and agreement needs."
        hideButton={true}
      />
      <div className="mt-10 flex gap-4 flex-col flex-wrap 2md:flex-row" ref={ref}>
        {featureDetails.map((item, index) => {
          const initialVariant =
            index === 0
              ? "hiddenLeft"
              : index === 1
              ? "hiddenBottom"
              : "hiddenRight";
          return (
            <motion.div
              key={index}
              onClick={() => toast.info("This feature is coming soon!")}
              className="rounded-[8px] p-5 flex-1 cursor-pointer transition-all duration-500 ease-out
             hover:-translate-y-2 "
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
                  <h3 className="text-blue  text-xs mb-2">{item.subHeading}</h3>
                </div>
              </div>
              <p className="text-text-gray text-xs">{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
