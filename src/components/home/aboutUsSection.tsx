import Image from "next/image";
import AboutUsImage from "../common/home/aboutUsImage";

export default function AboutUsSection() {
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-6 justify-between items-center">
        <div className="flex flex-col gap-3 pr-6">
          <div className="w-fit text-black bg-white px-2 py-1 text-xs rounded-[5px]">
            About Us
          </div>
          <div>
            <p className="text-xl text-white text-wrap font-semibold">
              Discover property solutions that are simple, transparent, and
              hassle-free.
            </p>
            <p className="mt-1 leading-4 text-xs text-white text-wrap font-regular">
              Explore top-performing locations where we deliver expert support,
              faster service, and exceptional customer satisfaction — right in
              your neighborhood.
            </p>
          </div>
          <div className="flex gap-4 mt-2">
            <button className="w-auto text-sm 1xl:text-base text-white! hover:text-text-black! animated-button-white px-8 py-2 border border-white bg-transparent! text-center cursor-pointer">
              <span className="gap-3 relative flex justify-center">
                <p className={`text-nowrap`}>Contact Us</p>
              </span>
            </button>
          </div>
        </div>
        <div className="flex justify-end">
            <AboutUsImage imageUrl={'/assets/aboutUs/about_us_img.png'}/>
        </div>
      </div>
      <div className="flex justify-between gap-3 mt-15">
            <div className="flex justify-start items-center gap-4 bg-[#131D2C] px-5 py-4 flex-1 rounded-xl relative">
                    <Image src='/assets/aboutUs/about_us_1.svg' width={40} height={40} alt="Rent"/>
                    <div className="align-start">
                        <p className="text-xl text-white font-medium">8040+</p>
                        <p className="text-xs text-white">Rentals Completed</p>
                    </div>
            </div>
            <div className="flex justify-start items-center gap-4 bg-[#131D2C] px-5 py-5 flex-1 rounded-xl">
                    <Image src='/assets/aboutUs/about_us_2.svg' width={40} height={40} alt="trust"/>
                    <div className="align-start">
                        <p className="text-xl text-white font-medium">1014+</p>
                        <p className="text-xs text-white">Trusted Owners</p>
                    </div>
            </div>
            <div className="flex justify-start items-center gap-4 bg-[#131D2C] px-5 py-5 flex-1 rounded-xl">
                    <Image src='/assets/aboutUs/about_us_3.svg' width={40} height={40} alt="happy"/>
                    <div className="align-start">
                        <p className="text-xl text-white font-medium">6K+</p>
                        <p className="text-xs text-white">Happy Clients</p>
                    </div>
            </div>
            <div className="flex justify-start items-center gap-4 bg-[#131D2C] px-5 py-5 flex-1 rounded-xl">
                    <Image src='/assets/aboutUs/about_us_4.svg' width={40} height={40} alt="total"/>
                    <div className="align-start">
                        <p className="text-xl text-white font-medium">1014+</p>
                        <p className="text-xs text-white">Total Bookings</p>
                    </div>
            </div>
        </div>
    </div>
  );
}
