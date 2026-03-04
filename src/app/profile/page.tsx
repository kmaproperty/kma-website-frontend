import EditProfileScreen from "@/components/profile/editProfileScreen";
import CopyRightFooter from "@/components/footer/copyrightFooter";
import HomeHeader from "@/components/header/homeHeader";

export default function Profile() {
  return (
    <div>
      <div className="relative min-h-[calc(100dvh-10dvh)] bg-background-gray md:min-h-[calc(100dvh-7dvh)]">
        <div className="absolute left-0 top-0 h-[330px] w-full rounded-b-[25px] bg-blue sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px]" />
        <HomeHeader />
        <div className="relative z-10 flex justify-center px-4 pb-8 pt-[7.2rem] sm:px-6 lg:pt-[8.8rem]">
          <div className="w-full max-w-[1100px]">
            <EditProfileScreen />
          </div>
        </div>
      </div>
      <CopyRightFooter />
    </div>
  );
}