import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";
import { delay, motion, useInView } from "framer-motion";
import {useRef} from 'react'

function Star({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} text-amber-400`}>
      <path
        fill="currentColor"
        d="M12 2.5l2.97 6.02 6.65.97-4.81 4.69 1.14 6.64L12 17.77 6.05 20.82l1.14-6.64-4.81-4.69 6.65-.97L12 2.5z"
      />
    </svg>
  );
}

const leftVariant = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" as const },
  },
};

const rightVariant = {
  hidden: { x: "100%", opacity: 0 },
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

export default function SuccessStoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  return (
    <>
      <div ref={ref} className="my-16 w-[75%] z-10">
        <div className="grid grid-cols-[1.2fr_1fr_1fr]">
          
            <motion.div
            className="col-span-1 flex gap-4 flex-col"
  initial="hidden"
  variants={leftVariant}
  animate={isInView ? "visible" : "hidden"}
>
            <div className=" w-[80%]">
              <SectionHeader
                isInView={isInView}
                hideButton={true}
                heading="Success stories in their own words"
                subHeading="Read what our satisfied clients have to say about their experiences with our platform."
              />
            </div>
            <button
                    className="w-fit text-sm 1xl:text-base animated-button px-8 py-2 border border-blue text-center cursor-pointer"
                    
                  >
              <span className="gap-3 relative flex justify-center">
                <p className={`text-nowrap`}>View More</p>
              </span>
            </button>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-text-black text-base font-medium">
                  Trusted by 50K+ customers
                </p>

                <div className="flex gap-1 items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} />
                    ))}
                  </div>
                  <p className="text-text-black text-xs">4.4/5.0</p>
                  <p className="border-l border-border h-full border-1"></p>
                  <p className="text-text-gray text-xs"> 3,456 Reviews</p>
                </div>
              </div>
              <div className="-mt-8">
                <Image
                  src={"/assets/stories/arrow.svg"}
                  width={100}
                  height={100}
                  alt="arrow"
                />
              </div>
            </div>
          </motion.div>
          <div className="flex gap-4 col-span-2">
            <div className="flex flex-col gap-4">
               <motion.div
                className="bg-white rounded-[8px] p-4 flex flex-col items-start gap-2"
                variants={topVariant}
                animate={isInView ? 'visible' : 'hidden'}
              
              >
                <Image
                  src={"/assets/stories/quote.svg"}
                  width={20}
                  height={20}
                  alt="quote"
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="text-sm text-text-gray line-clamp-2">
                  Booking our dream home was incredibly easy with Dreams Estate
                  The interface was user-friendly
                </p>
                <div className="flex justify-start items-center gap-2">
                  <Image
                    src={"/assets/property/profile.png"}
                    alt="profile"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <p className="text-text-black font-medium text-sm">
                    Lily Brroks
                  </p>
                  <Image
                    src={"/assets/stories/dot.svg"}
                    width={5}
                    height={5}
                    alt="dot"
                  />
                  <p className="text-text-gray text-sm">South Africa</p>
                </div>
              </motion.div>
               <motion.div
                className="bg-white rounded-[8px] p-4 flex flex-col items-start gap-2"
                variants={bottomVariant}
                animate={isInView ? 'visible' : 'hidden'}
              
              >
                <Image
                  src={"/assets/stories/quote.svg"}
                  width={20}
                  height={20}
                  alt="quote"
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="text-sm text-text-gray line-clamp-2">
                  Booking our dream home was incredibly easy with Dreams Estate
                  The interface was user-friendly
                </p>
                <div className="flex justify-start items-center gap-2">
                  <Image
                    src={"/assets/property/profile.png"}
                    alt="profile"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <p className="text-text-black font-medium text-sm">
                    Lily Brroks
                  </p>
                  <Image
                    src={"/assets/stories/dot.svg"}
                    width={5}
                    height={5}
                    alt="dot"
                  />
                  <p className="text-text-gray text-sm">South Africa</p>
                </div>
              </motion.div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
               <motion.div
                className="bg-white rounded-[8px] p-4 flex flex-col items-start gap-2"
                variants={topVariant}
                animate={isInView ? 'visible' : 'hidden'}
              
              >
                <Image
                  src={"/assets/stories/quote.svg"}
                  width={20}
                  height={20}
                  alt="quote"
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="text-sm text-text-gray line-clamp-2">
                  Booking our dream home was incredibly easy with Dreams Estate
                  The interface was user-friendly
                </p>
                <div className="flex justify-start items-center gap-2">
                  <Image
                    src={"/assets/property/profile.png"}
                    alt="profile"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <p className="text-text-black font-medium text-sm">
                    Lily Brroks
                  </p>
                  <Image
                    src={"/assets/stories/dot.svg"}
                    width={5}
                    height={5}
                    alt="dot"
                  />
                  <p className="text-text-gray text-sm">South Africa</p>
                </div>
             </motion.div>
              <motion.div
               className="bg-white rounded-[8px] p-4 flex flex-col items-start gap-2"
               variants={bottomVariant}
               animate={isInView ? 'visible' : 'hidden'}
             
             ><Image
                  src={"/assets/stories/quote.svg"}
                  width={20}
                  height={20}
                  alt="quote"
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="text-sm text-text-gray line-clamp-2">
                  Booking our dream home was incredibly easy with Dreams Estate
                  The interface was user-friendly
                </p>
                <div className="flex justify-start items-center gap-2">
                  <Image
                    src={"/assets/property/profile.png"}
                    alt="profile"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <p className="text-text-black font-medium text-sm">
                    Lily Brroks
                  </p>
                  <Image
                    src={"/assets/stories/dot.svg"}
                    width={5}
                    height={5}
                    alt="dot"
                  />
                  <p className="text-text-gray text-sm">South Africa</p>
                </div>
             </motion.div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
         className="absolute bottom-0 left-0"
        variants={bottomVariant}
        animate={isInView ? 'visible' : 'hidden'}
      
      >
        <Image
          src={"/assets/stories/building.svg"}
          width={200}
          height={200}
          alt="building"
        />
      </motion.div>
      <motion.div
         className="absolute top-0 right-10"
        variants={topVariant}
        animate={isInView ? 'visible' : 'hidden'}
      
      >
        <Image
          src={"/assets/stories/top-square.svg"}
          width={200}
          height={200}
          alt="building"
        />
     </motion.div>
       <motion.div
        className="absolute right-0 bottom-2"
        variants={rightVariant}
        animate={isInView ? 'visible' : 'hidden'}
      
      >
        <Image
          src={"/assets/stories/bottom-square.svg"}
          width={140}
          height={100}
          alt="building"
        />
      </motion.div>
    </>
  );
}
