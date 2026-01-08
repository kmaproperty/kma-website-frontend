import UserRating from "../common/home/rating";
import WorkingSectionImage from "../common/home/workingSectionImage";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const leftVariant = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const rightVariant = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const bottomVariant = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const topVariant = {
  hidden: { y: '-100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

export default function WorkingSection(){
    const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
    return(
        <>
            <div ref={ref} className="my-16 w-[75%] z-1">
                <div className="grid grid-cols-2 gap-3 justify-between items-center">
                    <motion.div
                            className="relative h-full"
                            ref={ref}
                            variants={topVariant}
                            animate={isInView ? "visible" : "hidden"}
                          >
                        <WorkingSectionImage imageUrl={'/assets/aboutUs/about_us_img.png'}/>
                        <div className="absolute top-3 right-0 bg-white/10 rounded-full bg-clip-padding backdrop-filter flex flex-col gap-2 backdrop-blur-[10px] px-6 py-3">
                            <UserRating/>
                        </div>
                    </motion.div>
                        <motion.div
                           className="flex flex-col gap-4 pl-6"
                            ref={ref}
                            variants={bottomVariant}
                            animate={isInView ? "visible" : "hidden"}
                          >
                        <p className="text-white font-semibold text-sm">How it Works</p>
                        <div className="bg-gray-400 h-0.5 w-8 mb-2">
                            <div className="w-1/2 h-0.5 bg-white" />
                        </div>
                        <p className="text-white font-semibold text-base">Want tailor this more for a specific niche</p>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-[#FFC107]">Step 1</p>
                            <p className="text-sm text-white font-semibold">Search for Location</p>
                            <p className="text-white text-xs">Search by location, category, budget, and amenities. Find listings that match your needs whether it's a home, office, or land.</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-[#8A73DB]">Step 2</p>
                            <p className="text-sm text-white font-semibold">Select Property Type</p>
                            <p className="text-white text-xs">Choose from modern apartments, spacious houses, stylish condos, or commercial spaces that meet your specific needs.</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-[#DA6A99]">Step 3</p>
                            <p className="text-sm text-white font-semibold">Book Your Property</p>
                            <p className="text-white text-xs">Select your preferred property type, provide your details, and confirm your booking in just a few easy steps.</p>
                        </div>
                    </motion.div>
                </div>

            </div>
            <motion.div
                    className="absolute -right-0 bottom-0 z-0"
                    ref={ref}
                    variants={rightVariant}
                    animate={isInView ? "visible" : "hidden"}
                  >
            
                      <Image
                        alt="background"
                        src="/assets/working/back.svg"
                        width={300}
                        height={300}
                      />
                    </motion.div>
                    <motion.div
                    className="absolute left-20 top-0 z-0"
                    ref={ref}
                    variants={leftVariant}
                    animate={isInView ? "visible" : "hidden"}
                  >
                      <Image
                        alt="background"
                        src="/assets/working/top-arrow.svg"
                        width={300}
                        height={300}
                      />
                    </motion.div>
                    <motion.div
                    className="absolute left-20 bottom-0 z-0"
                    ref={ref}
                    variants={leftVariant}
                    animate={isInView ? "visible" : "hidden"}
                  >
                      <Image
                        alt="background"
                        src="/assets/working/bottom-arrow.svg"
                        width={300}
                        height={300}
                      />
                    </motion.div>
        </>
    )
}