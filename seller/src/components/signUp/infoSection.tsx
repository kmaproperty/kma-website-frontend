import Image from "next/image";

const cardInfo = [
  {
    src: '/assets/home-color.png',
    title: 'Enter Property Details',
    subTitle: "Tell us what you're listing flat, house, land, or commercial.",
  },
  {
    src: '/assets/location-color.png',
    title: 'Add Location & Price',
    subTitle: 'Set your price & choose location on map with precision.',
  },
  {
    src: '/assets/upload-color.png',
    title: 'Upload Photos & Videos',
    subTitle: 'Highlight the best features of your property.',
  }
];

function Card({ src, title, subTitle }: { [key: string]: string }) {
  return (
    <div className="flex flex-col flex-grow py-3.5 px-3 2xl:py-8 items-center justify-start">
      <Image alt='Home' src={src} width={70} height={70} className="w-[35px] 2xl:w-[50px] h-[35px] 2xl:h-[50px]  mb-2 sm:mb-4" />
      <div>
      <p className="text-center text-text-black font-ibm-plex-sans font-semibold text-sm 1xl:text-base  leading-3 md:leading-4 mb-2">
        {title}
      </p>
      <p className="text-center text-text-gray font-ibm-plex-sans font-normal text-xs 1xl:text-sm leading-5 md:leading-5 ">
        {subTitle}
      </p>
      </div>
    </div>
  );
}

export default function InfoSection() {
  return (
    <div className="flex felx-wrap justify-center items-start flex-col sm:mt-[5rem]"  >
      <p className="text-white font-ibm-plex-sans font-semibold text-[1.5rem] sm:text-[1.65rem] lg:text-[1.8rem] mb-2 sm:mb-3">
        Upload Your Property in 3 Easy Steps
      </p>
      <p className="text-text-light-gray font-ibm-plex-sans font-normal text-sm sm:text-lg lg:text-base mb-6 sm:mb-8">
        Listing your property is quick and simple. Just add the basic details and get started in minutes!
      </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
          {cardInfo.map((info, index) => (
            <div
              key={index}
              className={`
                bg-white rounded-[10px] shadow-md flex flex-col h-full
                ${index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}
              `}
            >
              <Card {...info} />
            </div>
          ))}
        </div>
    </div>
  );
}
