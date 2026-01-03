import Image from "next/image";

export default function AppDownloadSection(){
    return(
        <div className="w-[75%] mt-3">
        <div className="flex gap-3 justify-start items-center">
            <div className="w-fit flex flex-col">
                <p className="text-text-black text-base">Download App</p>
                <p className="text-text-gray text-xs">Explore, connect, and manage — anytime, anywhere.</p>
            </div>
            <Image src={'/assets/app/appdownload.svg'} width={400} height={180} className="" alt="download"/>
        </div>
        </div>
    )
}