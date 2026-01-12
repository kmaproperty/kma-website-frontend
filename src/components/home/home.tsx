import { Variants, motion } from "framer-motion";
import { useState } from "react";
import Social from "./social";
import HomdeHeader from "../header/homeHeader";
import BannerText from "./bannertext";
import TopProperties from "./topProperties";
import ProfileRating from "./rating";
import Filter from "./filter";
import ContactUs from "./contactus";

export default function MainHome() {
  const [show, setShow] = useState(false);

  const dissolve: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.div
      className="absolute w-[100%] h-[88vh] top-0"
      variants={dissolve}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      onMouseMove={() => setShow(true)}
    >
      <div>
        <Social />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[90%] lg:w-[75%] mt-[25px]">
          <HomdeHeader />
        </div>

        <div className="w-[75%] mt-[45px] flex justify-between gap-5 overflow-scroll no-scrollbar">
          <div className="w-[100%] lg:w-[50%]">
            <BannerText />
          </div>
          <div className="w-[100%] lg:w-[40%]">
            <TopProperties />
            <ProfileRating />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[75%] lg:w-[55%]">
          <Filter />
        </div>
      </div>
      <div>
        <ContactUs />
      </div>
    </motion.div>
  );
}
