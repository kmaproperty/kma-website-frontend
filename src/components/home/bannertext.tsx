import Link from "next/link";

export default function BannerText(){
    return(
        <div className="flex flex-col">

            <div style={{width: 'max-content'}} className="bg-white/10 rounded-[5px] bg-clip-padding backdrop-filter flex gap-3 items-center backdrop-blur-[20px] px-[8px] py-[4px]">
                <button className="rounded-[5px] bg-[#ffbb55] px-[4px] py-[2px] text-xs xl:text-sm text-white">New</button>
                <p className="text-xs xl:text-sm text-white">No 1 Best Selling Realstate Website</p>
            </div>

            <div className="text-white mt-5">
                <p className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1">India's #1 Platform to Buy,</p>
                <p className="text-xl sm:text-2xl lg:text-4xl font-bold">Rent & Sell Property</p>
            </div>

            <p className="text-xs xl:text-sm text-white mt-2">Properties for buy / rent in your location. We have more than 3000+ listings</p>

            {/* <Link href="/contact-us" className="border border-1 rounded-full px-7.5 text-xs py-2 w-max cursor-pointer mt-5 text-white">
                <p className="text-nowrap xl:text-sm">Contact Us</p>
            </Link> */}

        </div>
    )
}