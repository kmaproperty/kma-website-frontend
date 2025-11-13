import Image from "next/image";

export default function MenuList(){
    return(
        <div className="w-[100%] flex flex-col items-between bg-white px-6 2md:px-5 py-6 2md:py-2  gap-8">
            <div className="flex flex-col w-full gap-3">
                <div className="flex items-center gap-3">
                <p className="text-text-black font-medium text-base">Dashboard</p>
                </div>
                <div className="flex items-center gap-3">
                <p className="text-text-black font-medium text-base">Listing</p>
                </div>
                <div className="flex items-center gap-3">
                <p className="text-text-black font-medium text-base">Leads</p>
                </div>
                <button className="w-min text-base animated-button px-7 lg:px-10 py-3 border border-blue text-center cursor-pointer">
                    <span className="gap-3 relative flex justify-center">
                        <img src='/assets/plus-sign.svg'/>
                        <p className={`text-nowrap font-medium`}>Post Property</p>
                    </span>
                </button>
            </div>
        </div>
    )
}