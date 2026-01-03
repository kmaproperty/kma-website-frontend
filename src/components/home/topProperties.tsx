import Image from "next/image";

export default function TopProperties() {
  return (
    <div className="bg-white/10 rounded-[8px] bg-clip-padding backdrop-filter flex flex-col gap-2 backdrop-blur-[5px] px-[12px] pt-[6px] pb-[10px]">
      <div className="flex justify-start items-center gap-2">
        <div
          style={{
            borderLeft: "2px solid white",
            height: "20px",
            color: "white",
          }}
        ></div>
        <p className="text-white text-sm xl:text-sm font-semibold">Top Properties</p>
      </div>
      <div className="flex justify-start gap-3">
        <div className="w-[110px] flex-shrink-0">
          <Image src='/assets/properties_pic_1.png' width={100} height={100} alt="property" className="rounded-[8px] w-[110px] h-[110px] object-cover"/>
        </div>
        <div className="flex flex-col justify-between py-2 items-start min-w-0 flex-1">
            <p className="text-xs xl:text-sm font-semibold text-white truncate w-full">Beautiful Condo Room </p>
            <p className="text-xs xl:text-sm text-white truncate w-full">Willow Crest Apartment</p>
            <p className="text-xs xl:text-sm font-semibold text-yellow">$400 <span className="text-white font-medium">/ Month</span></p>
            <div className="flex gap-3 items-center">
              <div className="flex gap-1">
                  <Image alt="bed" src='/assets/bed.svg' width={26} height={26} className="w-[18px] xl:w-[20px] h-[18px] xl:h-[20px]"/>
                  <p className="text-white text-xs xl:text-sm">2 BedRoom</p>
              </div>
              <div className="flex gap-1">
                  <Image alt="bath" src='/assets/bath.svg' width={26} height={26} className="w-[18px] xl:w-[20px] h-[18px] xl:h-[20px]"/>
                  <p className="text-white text-xs xl:text-sm">2 Bath</p>
              </div>
            </div>
        </div>
        <div className="flex justify-center gap-10 flex-col items-center">
            <Image alt='up arrow' src='/assets/up-white-arrow.svg' width={30} height={30} className="w-[25px] h-[20px]" />
            <Image alt='down arrow' src='/assets/down-white-arrow.svg' width={30} height={30} className="w-[25px] h-[20px]"  />
        </div>
      </div>
    </div>
  );
}
