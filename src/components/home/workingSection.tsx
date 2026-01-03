import UserRating from "../common/home/rating";
import WorkingSectionImage from "../common/home/workingSectionImage";

export default function WorkingSection(){
    return(
        <div className="">
            <div className="grid grid-cols-2 gap-3 justify-between items-center">
                <div className="relative h-full">
                    <WorkingSectionImage imageUrl={'/assets/aboutUs/about_us_img.png'}/>
                    <div className="absolute top-3 right-0 bg-white/10 rounded-full bg-clip-padding backdrop-filter flex flex-col gap-2 backdrop-blur-[5px] px-6 py-3">
                        <UserRating/>
                    </div>
                </div>
                <div className="flex flex-col gap-3 pl-6">
                    <p className="text-white font-semibold text-sm">How it Works</p>
                    <div className="bg-gray-400 h-0.5 w-8 mb-2">
                        <div className="w-1/2 h-0.5 bg-white" />
                    </div>
                    <p className="text-white font-semibold text-base">Want tailor this more for a specific niche</p>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#FFC107]">Step 1</p>
                        <p className="text-xs text-white font-semibold">Search for Location</p>
                        <p className="text-white text-xs">Search by location, category, budget, and amenities. Find listings that match your needs whether it's a home, office, or land.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#8A73DB]">Step 2</p>
                        <p className="text-xs text-white font-semibold">Select Property Type</p>
                        <p className="text-white text-xs">Choose from modern apartments, spacious houses, stylish condos, or commercial spaces that meet your specific needs.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#DA6A99]">Step 3</p>
                        <p className="text-xs text-white font-semibold">Book Your Property</p>
                        <p className="text-white text-xs">Select your preferred property type, provide your details, and confirm your booking in just a few easy steps.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}