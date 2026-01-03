import Image from "next/image";

export default function HomdeHeader(){
    return(
        <div className="bg-white/10 rounded-[200px] bg-clip-padding backdrop-filter  backdrop-blur-[20px] h-[63px] px-7 pt-[4px] flex justify-between items-center border border-1 border-[#FFFFFF33]"> 
            
            <div className="flex items-center px-1.5 shrink-0 cursor-pointer">
                <Image src="/assets/kma-logo-white.svg" width={100} height={35} alt="logo" style={{height:'38px'}} />
            </div>

            <div className="flex flex-row justify-between items-center gap-1 w-full px-4 text-center">
                <div className="flex items-center justify-between cursor-pointer">
                    <Image
                        src="/assets/location-white.svg"
                        className="text-gray-300"
                        width={20}
                        height={20}
                        alt="location"
                        style={{width: '14px', height: '14px'}}
                    />
                    <p className="pl-1 text-gray-100 text-xs lg:text-sm"> City </p>
                    <Image src='/assets/down-arrow-white-line.svg' alt='down-arrow' width={20} height={20} style={{width: '12px', height: '10px', marginLeft: '15px'}}/>
                </div>
                <div className="border border-[0.2px] border-[#FFFFFF] h-[30px] ml-2" />

                {[
                    "Rent",
                    "Buy",
                    "Projects",
                    "Channel Partner",
                    "Refer & Earn",
                    "Help",
                ].map((item) => (
                    <p key={item} className="mt-2 text-gray-100 break-word text-xs lg:text-sm nowrap w-max border-b-2 border-transparent hover:border-blue transition-colors duration-200 cursor-pointer px-1.5  pb-1">
                    {item}
                    </p>
                ))}

                <Image src="/assets/more-white.svg" height={14} width={14} alt="more" className="cursor-pointer"/>
            </div>
            <div className="flex items-center justify-start gap-[7px] shrink-0">
                <button className="animated-button px-[20px] py-[9px] cursor-pointer">
                    <span className="flex items-center justify-between gap-[6px] relative z-11">
                    <Image src="/assets/home-white.svg" width={14} height={14} alt="home" />
                    <p className="text-nowrap text-xs lg:text-sm">Post Property</p>
                    </span>
                </button>
                <div className="flex flex-row gap-[6px] items-center cursor-pointer">
                <Image
                    src="/assets/profile.png"
                    height={40}
                    width={40}
                    className="w-[35px] h-[35px] rounded-[50%] object-cover"
                    alt="profile"
                />
                <Image
                    src="/assets/down-arrow-white.svg"
                    width={12}
                    height={5}
                    alt="Down Arrow"
                    className="w-[10px] h-full"
                />
                </div>
            </div>
        </div>
    )
}