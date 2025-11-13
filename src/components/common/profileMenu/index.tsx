import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfileMenu(){
    const router = useRouter()

    const handleLogout = () => {
        localStorage.clear()
        router.push('/signup?isLogin=true')    
    }

    return(
        <div className="w-[100%] flex flex-col items-between bg-white px-6 2md:px-5 py-6 2md:py-2  gap-8">
            <div  className="grid grid-cols-[auto_3fr_1fr] gap-3 items-center">
                    <Image
                        src="/assets/profile.png"
                        height={40}
                        width={40}
                        className="w-[45px] h-[45px] rounded-[50%] object-cover"
                        alt="profile"
                    />
                    <div>
                        <p className="text-base text-text-black font-medium">Rock Oberoi</p>
                        <p className="text-xs text-text-gray">+91- 7425030808</p>
                    </div>
                    <div className="flex gap-1 items-center justify-end">
                        <Image
                            src="/assets/edit-pen-blue.svg"
                            height={5}
                            width={5}
                            className="w-[15px] h-[15px] sm:w-[10px] sm:h-[10px]"
                            alt="edit"
                        />
                        <p className="text-blue text-sm">Edit</p>
                    </div>
            </div>
            <div className="flex flex-col w-full gap-3">
                <div className="flex justify-start items-center gap-2" >
                        <Image
                            src="/assets/home-search-blue.svg"
                            height={18}
                            width={18}
                            className="w-[20px] h-[20px]"
                            alt="edit"
                        />
                        <p className="text-text-black text-lg 2md:text-base menu-item" data-count="6">Recently Search</p>
                </div>
                <div className="flex justify-start items-center gap-2">
                        <Image
                            src="/assets/home-search-blue.svg"
                            height={18}
                            width={18}
                            className="w-[20px] h-[20px]"
                            alt="edit"
                        />
                        <p className="text-text-black text-lg 2md:text-base">Recently Viewed</p>
                </div>
                <div className="flex justify-start items-center gap-2">
                        <Image
                            src="/assets/home-search-blue.svg"
                            height={18}
                            width={18}
                            className="w-[20px] h-[20px]"
                            alt="edit"
                        />
                        <p className="text-text-black text-lg 2md:text-base">Saved Properties</p>
                </div>
                <div className="flex justify-start items-center gap-2">
                        <Image
                            src="/assets/home-search-blue.svg"
                            height={18}
                            width={18}
                            className="w-[20px] h-[20px]"
                            alt="edit"
                        />
                        <p className="text-text-black text-lg 2md:text-base">Contacted Properties</p>
                </div>
                <div className="flex justify-start items-center gap-2">
                        <Image
                            src="/assets/home-search-blue.svg"
                            height={18}
                            width={18}
                            className="w-[20px] h-[20px]"
                            alt="edit"
                        />
                        <p className="text-text-black text-lg 2md:text-base">My Reviews (New)</p>
                </div>
                <div className="flex justify-start items-center gap-2">
                        <Image
                            src="/assets/home-search-blue.svg"
                            height={18}
                            width={18}
                            className="w-[20px] h-[20px]"
                            alt="edit"
                        />
                        <p className="text-text-black text-lg 2md:text-base">My Services</p>
                </div>
                <div className="flex justify-start items-center gap-2">
                        <Image
                            src="/assets/home-search-blue.svg"
                            height={18}
                            width={18}
                            className="w-[20px] h-[20px]"
                            alt="edit"
                        />
                        <p className="text-text-black text-lg 2md:text-base">Refer And Earn</p>
                </div>
                <div className="flex justify-start items-center gap-2">
                        <Image
                            src="/assets/home-search-blue.svg"
                            height={18}
                            width={18}
                            className="w-[20px] h-[20px]"
                            alt="edit"
                        />
                        <p className="text-text-black text-lg 2md:text-base">Help</p>
                </div>
            </div>
        <div className="flex justify-end flex-col md:flex-row gap-4 items-center w-full">
                <button onClick={handleLogout} className="w-full animated-button px-12 py-3 border border-blue text-center cursor-pointer">
                  <span className="gap-3 relative">
                    <p className="text-nowrap">Logout</p>
                  </span>
                </button>
              </div>
        </div>
    )
}