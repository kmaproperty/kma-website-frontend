import { AREA_UNIT_LIST, PROPERTY_STATUS } from "@/lib/enums";
import { getStatusLabel } from "@/lib/helper";
import { ListingItem } from "@/services/postProperty";
import moment from "moment";
import Image from "next/image";

export default function ListCard({data, handleManage}: {data: ListingItem, handleManage: (id) => void}) {
    let imgBaseUrl = process.env.NEXT_PUBLIC_AWS_URL
  return (
    <div className="flex flex-col lg:flex-row items-center bg-[#F2F2F2] rounded-[10px] px-2 gap-5 py-2">
      <div className="lg:h-full">
        <Image
          src={imgBaseUrl + data.coverPhotoKey}
          alt="image"
          width={600}
          height={600}
          className="w-full lg:w-[260px] lg:h-full object-cover aspect-video rounded-[10px]"
        />
      </div>
      <div className="w-full flex flex-1 flex-col justify-start gap-4 bg-[#F2F2F2]">
        <div className="flex flex-1 justify-between items-center">
          <p className="text-text-gray text-base lg:text-sm">ID: {data.id}</p>
          <button className="bg-[#33AB414D] text-sm text-[#1B8836] flex items-center gap-2 px-4 py-1 rounded-[5px] font-medium">
            {" "}
            <p className="w-2 h-2 bg-[#1B8836] rounded-full"></p>Verify
          </button>
        </div>
        <hr className="border-border"></hr>
        <div className="flex justify-start gap-3 items-center">
          <p className="font-semibold text-blue text-lg lg:text-base">
            4.50L{" "}
            <span className="text-text-gray font-normal"> ({data.area} {AREA_UNIT_LIST.find(item => item.value == data.areaUnit)?.label}) </span>
          </p>
          <button className="bg-[#AEAEAE] text-sm px-4 py-1 rounded-[5px] text-white">
            {getStatusLabel(data.status)}
          </button>
        </div>
        <div className="flex flex-col">
          <p className="text-blue text-base lg:text-sm font-medium">
            {data.bhkTypeName} {data.propertyType.name}
          </p>
          <p className="text-text-gray text-sm lg:text-xs">
            {data.address}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-blue text-base lg:text-sm">
            <span className="text-text-gray text-sm">created on: </span> {moment(data.createdAt).format('DD MMM YYYY')}
          </p>
          <button onClick={() => {
            handleManage(data.id)
          }} className="cursor-pointer flex gap-2 items-center underline font-medium text-blue text-base">
            Manage <img src="/assets/long-arrow-blue.svg" />
          </button>
        </div>
      </div>
      
    </div>
  );
}
