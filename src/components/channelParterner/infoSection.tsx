import Image from "next/image";

const cardInfo = [
  {
    src: "/assets/home-color.png",
    title: "Zero Brokerage",
    subTitle: "Connect directly with property owners.",
  },
  {
    src: "/assets/location-color.png",
    title: "Verified Listings",
    subTitle: "Explore genuine, up-to-date properties you can trust.",
  },
  {
    src: "/assets/upload-color.png",
    title: "Instant Contact",
    subTitle: "Reach owners or tenants in minutes for faster deals.",
  },
];

function Card({ src, title, subTitle }: { [key: string]: string }) {
  return (
    <div className="flex flex-col flex-grow py-4 px-3 items-center justify-start">
      <Image alt={title} src={src} width={70} height={70} className="w-[40px] h-[40px] mb-3" />
      <div>
        <p className="text-center text-text-black font-semibold text-sm md:text-base mb-2">
          {title}
        </p>
        <p className="text-center text-text-gray font-normal text-xs md:text-sm leading-5">
          {subTitle}
        </p>
      </div>
    </div>
  );
}

interface InfoSectionProps {
  titlePrefix: string;
  title: string;
}

export default function InfoSection({ titlePrefix, title }: InfoSectionProps) {
  return (
    <div className="flex justify-center items-start flex-col mt-8 md:mt-[7rem]">
      <p className="text-white font-normal text-base md:text-lg mb-1">{titlePrefix}</p>
      <p className="text-white font-semibold text-[2rem] leading-[2.2rem] mb-6">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
        {cardInfo.map((info) => (
          <div key={info.title} className="bg-white rounded-[10px] shadow-md flex flex-col h-full">
            <Card {...info} />
          </div>
        ))}
      </div>
    </div>
  );
}
