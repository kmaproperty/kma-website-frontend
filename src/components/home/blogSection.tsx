import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";

export default function BlogSection() {
  return (
    <div className="">
      <SectionHeader
        heading="Latest Blogs"
        subHeading="Explore our featured blog posts on premium properties for sales & rents"
      />
      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="relative bg-white rounded-[8px]">
          <Image
            src="/assets/blogs/blog-img-1.png"
            width={600}
            height={600}
            alt="banner"
            className="w-full rounded-t-[8px] h-[200px]"
          />
          <div className="flex flex-col gap-2 p-6">
            <p className="text-base text-black font-semibold truncate">
              Top 10 Tips for first-Time HomeBuyers
            </p>
            <p className="text-xs text-text-gray line-clamp-2">
              Buying your first home? Learn how to budget, choose the right
              location, and avoid common mistakes.
            </p>
            <p className="flex gap-2 items-center">
              <Image
                src="/assets/calendar-gray.svg"
                width={15}
                height={15}
                alt="calendar"
              />
              <span className="text-xs text-text-gray">27 sep 2025</span>
            </p>
          </div>
          <div className="absolute top-[10px] left-[10px] bg-[#8A73DB] py-1 px-2 rounded-[4px]">
            <p className="text-xs text-white">Booking Tips</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 h-full">
          <div className="flex relative bg-white rounded-[8px] flex-1">
              <Image
                src="/assets/blogs/blog-img-2.png"
                width={600}
                height={600}
                alt="banner"
                className="w-[50%] rounded-l-[8px] h-full"
              />
              <div>
                
              <div className="flex flex-col gap-2 p-6">
                <p className="text-base text-black font-semibold">
                  Top 10 Tips for first-Time HomeBuyers
                </p>
                <p className="text-xs text-text-gray line-clamp-2">
                  Buying your first home? Learn how to budget, choose the right
                  location, and avoid common mistakes.
                </p>
                <p className="flex gap-2 items-center">
                  <Image
                    src="/assets/calendar-gray.svg"
                    width={15}
                    height={15}
                    alt="calendar"
                  />
                  <span className="text-xs text-text-gray">27 sep 2025</span>
                </p>
              </div>
              <div className="absolute top-[10px] left-[10px] bg-[#8A73DB] py-1 px-2 rounded-[4px]">
                <p className="text-xs text-white">Booking Tips</p>
              </div>
              
              </div>
          </div>
          <div className="flex relative bg-white rounded-[8px] flex-1">
              <Image
                src="/assets/blogs/blog-img-3.png"
                width={600}
                height={600}
                alt="banner"
                className="w-[50%] rounded-l-[8px] h-full"
              />
              <div>
                
              <div className="flex flex-col gap-2 p-6">
                <p className="text-base text-black font-semibold">
                  Top 10 Tips for first-Time HomeBuyers
                </p>
                <p className="text-xs text-text-gray line-clamp-2">
                  Buying your first home? Learn how to budget, choose the right
                  location, and avoid common mistakes.
                </p>
                <p className="flex gap-2 items-center">
                  <Image
                    src="/assets/calendar-gray.svg"
                    width={15}
                    height={15}
                    alt="calendar"
                  />
                  <span className="text-xs text-text-gray">27 sep 2025</span>
                </p>
              </div>
              <div className="absolute top-[10px] left-[10px] bg-[#8A73DB] py-1 px-2 rounded-[4px]">
                <p className="text-xs text-white">Booking Tips</p>
              </div>
              
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
