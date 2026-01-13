import { InputBase } from "@mui/material";
import Image from "next/image";

export default function CityView() {
  return (
    <div className="p-2 w-full sm:w-[330px]">
      <div className="flex justify-between items-center px-4 flex-3 border border-border rounded-full">
        <InputBase
          placeholder="Select or type your city"
          fullWidth
          onChange={(event) => {}}
          className="w-full h-[40px] px-2 text-xs rounded-full"
          inputProps={{
            className:
              "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
          }}
        />
        <Image
          src="/assets/search-gray.svg"
          width={16}
          height={16}
          alt="search"
        />
      </div>
      <div className="flex justify-start gap-2 mt-4">
          <Image src={'/assets/city/purple-location-find.svg'} width={20} height={20} alt="location" />
          <p className="text-sm text-[#757BEE]">Detect My Location</p>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-4">
          <div className="flex flex-1 flex-col justify-center items-center gap-1.5 bg-[#F3F3F3] rounded-[5px] px-3 sm:px-1 py-3">
            <Image src={'/assets/city/city1.svg'} width={600} height={600} alt="city" className="w-[45px] h-[34px]"/>
            <p className="text-xs text-black">Hedrabad</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center gap-1.5 bg-[#F3F3F3] rounded-[5px] px-3 sm:px-1 py-3">
            <Image src={'/assets/city/city1.svg'} width={600} height={600} alt="city" className="w-[45px] h-[34px]"/>
            <p className="text-xs text-black">Hedrabad</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center gap-1.5 bg-[#F3F3F3] rounded-[5px] px-3 sm:px-1 py-3">
            <Image src={'/assets/city/city1.svg'} width={600} height={600} alt="city" className="w-[45px] h-[34px]"/>
            <p className="text-xs text-black">Hedrabad</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center gap-1.5 bg-[#F3F3F3] rounded-[5px] px-3 sm:px-1 py-3">
            <Image src={'/assets/city/city1.svg'} width={600} height={600} alt="city" className="w-[45px] h-[34px]"/>
            <p className="text-xs text-black">Hedrabad</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center gap-1.5 bg-[#F3F3F3] rounded-[5px] px-3 sm:px-1 py-3">
            <Image src={'/assets/city/city1.svg'} width={600} height={600} alt="city" className="w-[45px] h-[34px]"/>
            <p className="text-xs text-black">Hedrabad</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center gap-1.5 bg-[#F3F3F3] rounded-[5px] px-3 sm:px-1 py-3">
            <Image src={'/assets/city/city1.svg'} width={600} height={600} alt="city" className="w-[45px] h-[34px]"/>
            <p className="text-xs text-black">Hedrabad</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center gap-1.5 bg-[#F3F3F3] rounded-[5px] px-3 sm:px-1 py-3">
            <Image src={'/assets/city/city1.svg'} width={600} height={600} alt="city" className="w-[45px] h-[34px]"/>
            <p className="text-xs text-black">Hedrabad</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center gap-1.5 bg-[#F3F3F3] rounded-[5px] px-3 sm:px-1 py-3 grayscale hover:grayscale-0 cursor-pointer">
            <Image src={'/assets/city/city1.svg'} width={600} height={600} alt="city" className="w-[45px] h-[34px]"/>
            <p className="text-xs text-black">Hedrabad</p>
          </div>
      </div>
      <div className="mt-4">
        <p className="text-base text-text-black font-medium">Other Cities</p>
        <div className="h-full sm:h-[165px] overflow-auto">
            <p className="text-sm text-text-black hover:bg-list-background cursor-pointer px-2 py-1.5 my-1 rounded-lg">{'Surat'}</p>
            {<div className="border-b border-border mx-2"></div>}   
            <p className="text-sm text-text-black hover:bg-list-background cursor-pointer px-2 py-1.5 my-1 rounded-lg">{'Surat'}</p>
            {<div className="border-b border-border mx-2"></div>}   
            <p className="text-sm text-text-black hover:bg-list-background cursor-pointer px-2 py-1.5 my-1 rounded-lg">{'Surat'}</p>
            {<div className="border-b border-border mx-2"></div>}   
            <p className="text-sm text-text-black hover:bg-list-background cursor-pointer px-2 py-1.5 my-1 rounded-lg">{'Surat'}</p>
            {<div className="border-b border-border mx-2"></div>}   
            <p className="text-sm text-text-black hover:bg-list-background cursor-pointer px-2 py-1.5 my-1 rounded-lg">{'Surat'}</p>
            
        </div>
      </div>
    </div>
  );
}
