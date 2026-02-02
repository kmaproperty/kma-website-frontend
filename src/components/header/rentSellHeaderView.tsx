import { getAboutusData, getSelectedCity } from "@/store/homeHeaderSlice";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function RentSellHeaderView({propertyMasterData, type}) {
  const selectedCity = useSelector(getSelectedCity)
  const aboutusData = useSelector(getAboutusData)
  const [categoryType, setCategoryType] = useState('867c2adf-7e01-45a8-a305-74900b24c529') //residential

  const category = propertyMasterData?.find(item => item.code == type)?.categories ?? []
  const propertyList = category?.find(item => item.id == categoryType)?.propertyTypes ?? []
  return (
    <div className="flex  flex-col 2md:flex-row justify-start overflow-hidden rounded-xl h-full 2md:h-[280px]">
      <div className="flex flex-col gap-6 2md:gap-0 justify-between bg-blue pl-8 pt-8 pb-3 pr-5">
        <div className="flex flex-col gap-2">
          {
            category.map(item => {
              return(
                <p onClick={() => setCategoryType(item.id)} className="text-white text-base cursor-pointer w-fit" style={{borderBottom: categoryType == item.id ? '1px solid white' : ''}}>{item.name}</p>
              )
            })
          }
          
        </div>
        <div>
          <p className="text-white text-xs">Contact Us Toll Free on</p>
          <p className="text-white text-xs">
            <span className="font-semibold text-xs">1800 41 00000</span> ( 9AM -
            11PM IST )
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 2md:grid-cols-[1fr_150px] bg-white pl-8 py-5 pr-5">
        <div className="flex justify-between flex-col gap-3 2md:gap-0 pr-5">
          <p className="text-base 2md:mb-2 text-text-gray break-inside-avoid underline font-medium">
            Property Type
          </p>
            <div className="2md:columns-2 2md:h-[180px] [column-fill:auto]">
              {
                propertyList.map(item => {
                  return(
                    <p className="cursor-pointer text-sm mt-1  text-text-black break-inside-avoid hover:underline">
                      {item.name} {selectedCity ? `in ${selectedCity?.name}` : ''}
                    </p>
                  ) 
                })
              }

            </div>
            <div>
                <p className="text-xs text-text-gray max-w-[250px] lg:max-w-fit">Email Us at Services@kma.com or call us at 1800 41 00000 (IND Toll-Free)</p>
            </div>
        </div>
        {aboutusData?.mobileAppAvailable && <div className="mt-5 2md:mt-0">
          <Image
            src={"/assets/app-banner.svg"}
            width={300}
            height={300}
            alt="app"
            className="w-[95%] 2md:w-[150px] h-full"
          />
        </div>}
      </div>
    </div>
  );
}
