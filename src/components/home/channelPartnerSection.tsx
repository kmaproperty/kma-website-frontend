'use client'
import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const partnerData = [
    {
        name: 'Manjeet Skyzen Homes',
        experience: '3',
        properties: '1',
        expert: true,
    },
    {
        name: 'Liam Anderson',
        experience: '3',
        properties: '1',
        expert: true,
    },
    {
        name: 'Noah Bennett',
        experience: '3',
        properties: '1',
        expert: true,
    },
    {
        name: 'James Walker',
        experience: '3',
        properties: '1',
        expert: true,
    },
    {
        name: 'Noah Bennett',
        experience: '3',
        properties: '1',
        expert: false,
    },
    {
        name: 'Manjeet Skyzen Homes',
        experience: '3',
        properties: '1',
        expert: false,
    },
    {
        name: 'James Walker',
        experience: '3',
        properties: '1',
        expert: false,
    },
    {
        name: 'Liam Anderson',
        experience: '3',
        properties: '1',
        expert: false,
    },
]


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
export default function ChannelPartnerSection(){
    const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
    return(
        <div ref={ref} className="">
            <SectionHeader
                isInView={isInView}
                channelPartnerBtn={true}
                heading="Become a Channel Partner"
                subHeading="Join hands with us and unlock new opportunities in the real estate ecosystem."
            />
            <div className="grid  grid-cols-1 sm:grid-cols-[1fr_1fr] 2md:grid-cols-[1fr_1fr_1fr] xl:grid-cols-[1fr_1fr_1fr_1fr] gap-3 mt-3">
                {
                    partnerData.map((item, index) => {
                        return(
                            <motion.div
            className="bg-white px-2 py-4 flex gap-2 rounded-[8px]"
            ref={ref}
            variants={[0,1,2,3].includes(index) ? leftVariant : rightVariant}
            animate={isInView ? 'visible' : 'hidden'}
          >
                                <Image src='/assets/property/profile.png' width={35} height={35} alt="profile" className="h-[35px] w-[35px] rounded-full"/> 
                                <div className="flex flex-col">
                                    <p className="text-text-black text-sm font-medium">{item.name}</p>
                                    <div className="flex flex-col justify-start items-start">
                                        <p className="text-text-gray text-xs">{item.experience} Years Experience</p>
                                        {/* <div className="border-l border-1 border-border h-full"></div> */}
                                        <p className="text-text-gray text-xs">{item.properties} Properties</p>
                                    </div>
                                    <p className={`mt-2 rounded-[2px]  text-white text-[10px] w-fit px-1`} style={{background: !item.expert ? '#FFC107' : '#FE792D'}}>{!item.expert ? 'Housing Expert' : 'Housing Expert Pro'}</p>

                                </div>
                            </motion.div>

                        )
                    })
                }

            </div>
        </div>
    )
}