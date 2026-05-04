import type { ReactNode } from "react";
import HomeHeader from "@/components/header/homeHeader";
import channelPartnerHeroBg from "@/assets/channel-partner-herobg.jpg";

type ChannelPartnerHeroLayoutProps = {
  children: ReactNode;
  headerClassName?: string;
  heroClassName?: string;
  contentWrapClassName?: string;
};

export default function ChannelPartnerHeroLayout({
  children,
  headerClassName = "sticky top-0 z-50 w-full flex justify-center 2md:pt-6",
  heroClassName = "absolute top-0 left-0 w-full h-[430px] sm:h-[550px] rounded-b-[16px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px] bg-cover bg-center",
  contentWrapClassName = "relative z-1 flex w-full justify-center pb-[2rem] pt-[8.5rem] sm:pt-[9.5rem] md:pt-[10.5rem] lg:pt-[11.5rem]",
}: ChannelPartnerHeroLayoutProps) {
  return (
    <div className="relative w-full min-h-[calc(100dvh-10dvh)] md:min-h-[calc(100dvh-7dvh)] bg-list-background">
      <div className={headerClassName}>
        <HomeHeader />
      </div>

      <div
        className={heroClassName}
        style={{
          backgroundImage: `linear-gradient(0deg, #00000099, #00000099), url('${channelPartnerHeroBg.src}')`,
        }}
      />

      <div className={contentWrapClassName}>
        <div className="w-full max-w-[1440px] min-h-[66dvh] flex">{children}</div>
      </div>
    </div>
  );
}
