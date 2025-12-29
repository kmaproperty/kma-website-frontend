import HomdeHeader from "../header/homeHeader";
import BannerSlider from "./bannerSlider";
import BannerText from "./bannertext";
import ContactUs from "./contactus";
import Social from "./social";
import TopProperties from "./topProperties";

export default function Home(){
    return(
        <div className="relative ">
            <BannerSlider/>

            <div className="absolute w-[100%] h-[88vh] top-0">
                <div>
                    <Social/>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-[75%] mt-[25px]">
                    <HomdeHeader/>
                    </div>

                    <div className="w-[75%] mt-[45px] flex justify-between gap-5">
                        <div className="w-[50%]">
                            <BannerText/>
                        </div>
                        <div className="w-[40%]">
                            <TopProperties/>
                        </div>
                    </div>
                </div>
                <div>
                    <ContactUs/>
                </div>
            </div>
        </div>
    )
}