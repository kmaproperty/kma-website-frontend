"use client";

import EditProfileScreen from "@/components/profile/editProfileScreen";
import CopyRightFooter from "@/components/footer/copyrightFooter";
import ProfileHeader from "@/components/profile/profileHeader";

export default function Profile() {
  return (
    <div>
      <div className="relative min-h-[calc(100dvh-10dvh)] md:min-h-[calc(100dvh-7dvh)] bg-list-background">
        {/* Short blue band on mobile & tablet (below lg); full hero height on desktop */}
        <div className="absolute left-0 top-0 h-[76px] w-full rounded-b-[20px] bg-blue sm:h-[84px] sm:rounded-b-[28px] md:h-[65px] md:rounded-b-[36px] lg:h-[330px] lg:rounded-b-[80px] xl:rounded-b-[100px]" />
        <ProfileHeader />
        <div className="relative z-10 flex justify-center px-2 pb-8 pt-8 sm:px-6 sm:pt-10 md:pt-12 lg:pt-[8.8rem]">
          <div className="w-full min-w-0 max-w-[1100px]">
            <EditProfileScreen />
          </div>
        </div>
      </div>
      <CopyRightFooter />
    </div>
  );
}
