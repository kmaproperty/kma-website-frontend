import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  hidden: { y: 120, opacity: 0 },
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

const opacityVariant = {
    hidden: {opacity: 1},
    visible: {
        opacity: 0,
        transition: {duration: 1, ease: 'easeOut' as const}
    }
}

export default function AppDownloadSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
    
  return (
    <>
      <div ref={ref} className="app-background">
        <div className="z-2 h-full relative py-16 flex justify-center w-full">
          <div className="w-[90%] 2md:w-[75%] relative h-full flex flex-col gap-10 2md:gap-20">
            <motion.div
            variants={topVariant}
            className="flex w-full 2md:w-[40%] h-full gap-20 flex-col justify-between items-start"
            animate={isInView ? 'visible' : 'hidden'}
          >
              <div>
                <div className="bg-gray-400 h-0.5 w-8 mb-2">
                  <div className="w-1/2 h-0.5 bg-white" />
                </div>
                <h2 className="text-2xl text-white font-semibold">
                  Get the Power of Real Estate in Your Pocket
                </h2>
                <h3 className="text-text-gray text-xs">
                  Browse properties, connect with agents, and manage your deals
                  — all from your phone. Anytime. Anywhere.
                </h3>
              </div>
           </motion.div>
           <motion.div
            variants={leftVariant}
            className="flex justify-between items-center gap-4"
            ref={ref}
            animate={isInView ? 'visible' : 'hidden'}
          >
              <div className="flex gap-4">
                <div className="flex">
                  <p className="text-white text-sm w-[70px]">
                    Scan to Downlaod
                  </p>
                  <div className="mt-8">
                    <Image
                      src={"/assets/app/arrow.svg"}
                      width={100}
                      height={100}
                      alt="arrow"
                    />
                  </div>
                </div>
                <div>
                  <Image
                    src={"/assets/app/qrcode.svg"}
                    width={100}
                    height={100}
                    alt="qrcode"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
            variants={rightVariant}
            className="hidden 2md:block absolute right-0 top-13 h-[400px]"
            ref={ref}
            animate={isInView ? 'visible' : 'hidden'}
          >
              <Image
                src={"/assets/app/mobile.svg"}
                width={800}
                height={500}
                alt="mobile"
                className="w-fit h-[400px]"
              />
            </motion.div>
            <motion.div
            variants={opacityVariant}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2"
            ref={ref}
            animate={isInView ? 'visible' : 'hidden'}
          >
              <Image
                src={"/assets/app/video-pause.svg"}
                width={800}
                height={500}
                alt="mobile"
                className="w-fit"
              />
              </motion.div>
          </div>
        </div>
      </div>
      <motion.div
      variants={bottomVariant}
            className="flex justify-center mb-4 2md:mb-16"
            ref={ref}
            animate={isInView ? 'visible' : 'hidden'}
          >
        <div className="w-[75%] mt-3">
          <div className="flex gap-3 flex-col lg:flex-row 2md:justify-start items-center">
            <div className="w-fit flex flex-col items-center">
              <p className="text-text-black text-base">Download App</p>
              <p className="text-text-gray text-xs">
                Explore, connect, and manage — anytime, anywhere.
              </p>
            </div>
            <Image
              src={"/assets/app/appdownload.svg"}
              width={400}
              height={180}
              className=""
              alt="download"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
