import Image from "next/image";

export default function RentSellHeaderView({type}) {
  return (
    <div className="flex justify-start overflow-hidden rounded-xl h-[280px]">
      <div className="flex flex-col justify-between bg-blue pl-8 pt-8 pb-3 pr-5">
        <div className="flex flex-col gap-2">
          <div className="flex ">
            <p className="underline text-white font-semibold text-sm">
              {type =='rent' ? 'RENT' : 'BUY'} A HOME
            </p>
            <Image
              src={"/assets/left-arrow-white.svg"}
              width={20}
              height={20}
              alt="arrow"
              className="ml-6"
            />
          </div>
          <p className="text-white text-sm cursor-pointer">Commercial</p>
          <p className="text-white text-sm cursor-pointer">Residential</p>
        </div>
        <div>
          <p className="text-white text-xs">Contact Us Toll Free on</p>
          <p className="text-white text-xs">
            <span className="font-semibold text-xs">1800 41 00000</span> ( 9AM -
            11PM IST )
          </p>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_150px] bg-white pl-8 py-5 pr-5">
        <div className="flex justify-between flex-col pr-5">
          <p className="text-sm mb-2 text-text-gray break-inside-avoid">
            Property Type
          </p>
            <div className="columns-2 h-[180px] [column-fill:auto]">
          <p className="cursor-pointer text-sm mt-1 font-medium text-text-black break-inside-avoid">
            Flats / Apartments
          </p>
          <p className="cursor-pointer text-sm mt-1 font-medium text-text-black break-inside-avoid">
            Flats / Apartments
          </p>
          <p className="text-sm mt-1 font-medium text-text-black break-inside-avoid">
            Flats / Apartments
          </p>
          <p className="text-sm mt-1 font-medium text-text-black break-inside-avoid">
            Flats / Apartments
          </p>
          <p className="text-sm mt-1 font-medium text-text-black break-inside-avoid">
            Flats / Apartments
          </p>
          <p className="text-sm mt-1 font-medium text-text-black break-inside-avoid">
            Flats / Apartments
          </p>
          <p className="text-sm mt-1 font-medium text-text-black break-inside-avoid">
            Flats / Apartments
          </p>
          <p className="text-sm mt-1 font-medium text-text-black break-inside-avoid">
            Flats / Apartments
          </p>

            </div>
            <div>
                <p className="text-xs text-text-gray max-w-[250px] lg:max-w-fit">Email Us at Services@kma.com or call us at 1800 41 00000 (IND Toll-Free)</p>
            </div>
        </div>
        <div>
          <Image
            src={"/assets/app-banner.svg"}
            width={300}
            height={300}
            alt="app"
            className="w-[150px] h-full"
          />
        </div>
      </div>
    </div>
  );
}
