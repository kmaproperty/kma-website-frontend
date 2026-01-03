import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";

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

export default function SuccessStoriesSection() {
  return (
    <div className="grid grid-cols-[1.2fr_1fr_1fr]">
      <div className="col-span-1 flex gap-4 flex-col">
        <div className=" w-[80%]">
        <SectionHeader
          hideButton={true}
          heading="Success stories in their own words"
          subHeading="Read what our satisfied clients have to say about their experiences with our platform."
        />

        </div>
        <button className="w-fit text-sm 1xl:text-base animated-button px-8 py-2 border border-blue text-center cursor-pointer">
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
      </div>
      <div className="flex gap-4 col-span-2">
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-[8px] p-4 flex flex-col items-start gap-2">
                <Image src={'/assets/stories/quote.svg'} width={20} height={20} alt="quote" />
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                          <Star key={i} />
                        ))}
                </div>
                <p className="text-sm text-text-gray line-clamp-2">Booking our dream home was incredibly easy with Dreams Estate The interface was user-friendly</p>
                <div className="flex justify-start items-center gap-2">
                    <Image src={'/assets/property/profile.png'} alt="profile" width={28} height={28} className="rounded-full"/>
                    <p className="text-text-black font-medium text-sm">Lily Brroks</p>
                    <Image src={'/assets/stories/dot.svg'} width={5} height={5} alt="dot" />
                    <p className="text-text-gray text-sm">South Africa</p>
                </div>
            </div>
            <div className="bg-white rounded-[8px] p-4 flex flex-col items-start gap-2">
                <Image src={'/assets/stories/quote.svg'} width={20} height={20} alt="quote" />
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                          <Star key={i} />
                        ))}
                </div>
                <p className="text-sm text-text-gray line-clamp-2">Booking our dream home was incredibly easy with Dreams Estate The interface was user-friendly</p>
                <div className="flex justify-start items-center gap-2">
                    <Image src={'/assets/property/profile.png'} alt="profile" width={28} height={28} className="rounded-full"/>
                    <p className="text-text-black font-medium text-sm">Lily Brroks</p>
                    <Image src={'/assets/stories/dot.svg'} width={5} height={5} alt="dot" />
                    <p className="text-text-gray text-sm">South Africa</p>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
            <div className="bg-white rounded-[8px] p-4 flex flex-col items-start gap-2">
                <Image src={'/assets/stories/quote.svg'} width={20} height={20} alt="quote" />
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                          <Star key={i} />
                        ))}
                </div>
                <p className="text-sm text-text-gray line-clamp-2">Booking our dream home was incredibly easy with Dreams Estate The interface was user-friendly</p>
                <div className="flex justify-start items-center gap-2">
                    <Image src={'/assets/property/profile.png'} alt="profile" width={28} height={28} className="rounded-full"/>
                    <p className="text-text-black font-medium text-sm">Lily Brroks</p>
                    <Image src={'/assets/stories/dot.svg'} width={5} height={5} alt="dot" />
                    <p className="text-text-gray text-sm">South Africa</p>
                </div>
            </div>
            <div className="bg-white rounded-[8px] p-4 flex flex-col items-start gap-2">
                <Image src={'/assets/stories/quote.svg'} width={20} height={20} alt="quote" />
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                          <Star key={i} />
                        ))}
                </div>
                <p className="text-sm text-text-gray line-clamp-2">Booking our dream home was incredibly easy with Dreams Estate The interface was user-friendly</p>
                <div className="flex justify-start items-center gap-2">
                    <Image src={'/assets/property/profile.png'} alt="profile" width={28} height={28} className="rounded-full"/>
                    <p className="text-text-black font-medium text-sm">Lily Brroks</p>
                    <Image src={'/assets/stories/dot.svg'} width={5} height={5} alt="dot" />
                    <p className="text-text-gray text-sm">South Africa</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
