import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";

const partnerData = [
    {
        name: 'Manjeet Skyzen Homes',
        experience: '3',
        properties: '1',
        expert: true,
    },
    {
        name: 'Liam Anderson',
        experience: '3',
        properties: '1',
        expert: true,
    },
    {
        name: 'Noah Bennett',
        experience: '3',
        properties: '1',
        expert: true,
    },
    {
        name: 'James Walker',
        experience: '3',
        properties: '1',
        expert: true,
    },
    {
        name: 'Noah Bennett',
        experience: '3',
        properties: '1',
        expert: false,
    },
    {
        name: 'Manjeet Skyzen Homes',
        experience: '3',
        properties: '1',
        expert: false,
    },
    {
        name: 'James Walker',
        experience: '3',
        properties: '1',
        expert: false,
    },
    {
        name: 'Liam Anderson',
        experience: '3',
        properties: '1',
        expert: false,
    },
]
export default function ChannelPartnerSection(){
    return(
        <div className="">
            <SectionHeader
                channelPartnerBtn={true}
                heading="Become a Channel Partner"
                subHeading="Join hands with us and unlock new opportunities in the real estate ecosystem."
            />
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-3 mt-3">
                {
                    partnerData.map(item => {
                        return(
                            <div className="bg-white px-2 py-4 flex gap-2 rounded-[8px]">
                                <Image src='/assets/property/profile.png' width={35} height={35} alt="profile" className="h-[35px] w-[35px] rounded-full"/> 
                                <div className="flex flex-col">
                                    <p className="text-text-black text-sm font-medium">{item.name}</p>
                                    <div className="flex flex-col justify-start items-start">
                                        <p className="text-text-gray text-xs">{item.experience} Years Experience</p>
                                        {/* <div className="border-l border-1 border-border h-full"></div> */}
                                        <p className="text-text-gray text-xs">{item.properties} Properties</p>
                                    </div>
                                    <p className={`mt-2 rounded-[2px]  text-white text-[10px] w-fit px-1`} style={{background: !item.expert ? '#FFC107' : '#FE792D'}}>{!item.expert ? 'Housing Expert' : 'Housing Expert Pro'}</p>

                                </div>
                            </div>

                        )
                    })
                }

            </div>
        </div>
    )
}