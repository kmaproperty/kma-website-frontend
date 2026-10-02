// "use client";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useMemo } from "react";
// import Slider from "react-slick";
// import Image from "next/image";

// type SliderItem = { imagePath: string; alt?: string };

// const RenderSliderBody = ({
//   sliderItem,
//   overlayClass,
//   bannerHeight,
//   priority,
// }: {
//   sliderItem: SliderItem;
//   overlayClass?: string;
//   bannerHeight?: string;
//   priority?: boolean;
// }) => {
//   const resolvedBannerHeight =
//     bannerHeight && bannerHeight.trim().length > 0
//       ? `min-h-[320px] sm:min-h-[420px] ${bannerHeight}`
//       : "min-h-[320px] sm:min-h-[420px]";

//   return (
//     <div className={`relative w-[100%] ${resolvedBannerHeight}`}>
//       <div className="absolute inset-0 gradient-mask">
//         <Image
//           alt={sliderItem.alt ?? "banner"}
//           className="object-cover"
//           src={sliderItem.imagePath}
//           fill
//           priority={priority}
//           sizes="100vw"
//         />
//         <div className={overlayClass}></div>
//       </div>
//     </div>
//   );
// };

// export default function BannerSlider({
//   backgroundImages,
//   overlayClass,
//   bannerHeight,
// }: {
//   backgroundImages: SliderItem[];
//   overlayClass?: string;
//   bannerHeight?: string;
// }) {

//   const settings = useMemo(() => {
//     return {
//       dots: false,
//       infinite: true,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       autoplay: true,
//       autoplaySpeed: 2000,
//       arrows: false,
//       pauseOnHover: false,
//     };
//   }, []);

//   return (
//     <div>
//       <Slider {...settings}>
//         {backgroundImages.map((sliderItem, index) => {
//           return (
//             <RenderSliderBody
//               bannerHeight={bannerHeight}
//               key={sliderItem.imagePath ?? index}
//               sliderItem={sliderItem}
//               overlayClass={overlayClass}
//               priority={index === 0}
//             />
//           );
//         })}
//       </Slider>
//     </div>
//   );
// }

// "use client";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useMemo } from "react";
// import Slider from "react-slick";
// import Image from "next/image";

// type SliderItem = { imagePath: string; alt?: string };

// const TARGET_URL = "https://kmaglobalproperty.in/yugen-golf-city-goa/";

// const RenderSliderBody = ({
//   sliderItem,
//   overlayClass,
//   bannerHeight,
//   priority,
// }: {
//   sliderItem: SliderItem;
//   overlayClass?: string;
//   bannerHeight?: string;
//   priority?: boolean;
// }) => {
//   const resolvedBannerHeight =
//     bannerHeight && bannerHeight.trim().length > 0
//       ? `min-h-[320px] sm:min-h-[420px] ${bannerHeight}`
//       : "min-h-[320px] sm:min-h-[420px]";

//   return (
//     <div className={`relative w-[100%] ${resolvedBannerHeight} cursor-pointer`}>
//       <div className="absolute inset-0 gradient-mask pointer-events-none">
//         <Image
//           alt={sliderItem.alt ?? "banner"}
//           className="object-cover"
//           src={sliderItem.imagePath}
//           fill
//           priority={priority}
//           sizes="100vw"
//         />
//         <div className={overlayClass}></div>
//       </div>

//       {/* Pure slide ke size ka clickable link */}
//       <a
//         href={TARGET_URL}
//         className="absolute inset-0 z-0 block w-full h-full cursor-pointer"
//         aria-label="Yugen Golf City Goa"
//       />
//     </div>
//   );
// };

// export default function BannerSlider({
//   backgroundImages,
//   overlayClass,
//   bannerHeight,
// }: {
//   backgroundImages: SliderItem[];
//   overlayClass?: string;
//   bannerHeight?: string;
// }) {
//   const settings = useMemo(() => {
//     return {
//       dots: false,
//       infinite: true,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       autoplay: true,
//       autoplaySpeed: 3000,
//       arrows: false,
//       pauseOnHover: false,
//     };
//   }, []);

//   return (
//     <div className="w-full relative">
//       <Slider {...settings}>
//         {backgroundImages.map((sliderItem, index) => {
//           return (
//             <RenderSliderBody
//               bannerHeight={bannerHeight}
//               key={sliderItem.imagePath ?? index}
//               sliderItem={sliderItem}
//               overlayClass={overlayClass}
//               priority={index === 0}
//             />
//           );
//         })}
//       </Slider>
//     </div>
//   );
// }

"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMemo } from "react";
import Slider from "react-slick";
import Image from "next/image";

type SliderItem = { imagePath: string; alt?: string };

const TARGET_URL = "https://kmaglobalproperty.in/yugen-golf-city-goa/";

const RenderSliderBody = ({
  sliderItem,
  overlayClass,
  bannerHeight,
  priority,
  showMobileOverlay,
}: {
  sliderItem: SliderItem;
  overlayClass?: string;
  bannerHeight?: string;
  priority?: boolean;
  showMobileOverlay?: boolean;
}) => {
  const resolvedBannerHeight =
    bannerHeight && bannerHeight.trim().length > 0
      ? `min-h-[320px] sm:min-h-[420px] ${bannerHeight}`
      : "min-h-[320px] sm:min-h-[420px]";

  return (
    <div className={`relative w-[100%] ${resolvedBannerHeight} cursor-pointer`}>
      <div className="absolute inset-0 gradient-mask pointer-events-none">
        <Image
          alt={sliderItem.alt ?? "banner"}
          className="object-fill"
          src={sliderItem.imagePath}
          fill
          priority={priority}
          sizes="100vw"
        />
        <div className={overlayClass}></div>
      </div>

      {showMobileOverlay && (
        <div className="absolute inset-0 z-10 flex flex-col items-center pt-24 pointer-events-none px-4">
          <div className="flex items-center justify-center gap-3 sm:gap-6 drop-shadow-lg max-w-[90%]">
            {/* KMA Logo */}
            <div className="relative w-28 h-12 sm:w-36 sm:h-16">
              <Image
                src="https://kmaglobalproperty.com/assets/kma-logo-white.svg"
                alt="KMA"
                fill
                className="object-contain"
              />
            </div>

            <span className="text-white text-2xl sm:text-3xl font-light opacity-90 select-none">
              ✕
            </span>

            {/* Yugen Infra Logo */}
            <div className="relative w-32 h-12 sm:w-44 sm:h-16">
              <Image
                src="/assets/backgroundSlider/yugenLogo.png"
                alt="Yugen Infra"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* EXPLORE NOW Button */}
          <div className="mt-5 sm:mt-7">
            <span className="bg-white/95 text-slate-900 text-xs sm:text-sm font-semibold tracking-widest px-5 py-2 uppercase shadow-md backdrop-blur-xs select-none">
              EXPLORE NOW
            </span>
          </div>
        </div>
      )}

      <a
        href={TARGET_URL}
        className="absolute inset-0 z-20 block w-full h-full cursor-pointer"
        aria-label="Yugen Golf City Goa"
      />
    </div>
  );
};

export default function BannerSlider({
  backgroundImages,
  overlayClass,
  bannerHeight,
  showMobileOverlay = false,
}: {
  backgroundImages: SliderItem[];
  overlayClass?: string;
  bannerHeight?: string;
  showMobileOverlay?: boolean;
}) {
  const settings = useMemo(() => {
    return {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      pauseOnHover: false,
    };
  }, []);

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {backgroundImages.map((sliderItem, index) => {
          return (
            <RenderSliderBody
              bannerHeight={bannerHeight}
              key={sliderItem.imagePath ?? index}
              sliderItem={sliderItem}
              overlayClass={overlayClass}
              priority={index === 0}
              showMobileOverlay={showMobileOverlay}
            />
          );
        })}
      </Slider>
    </div>
  );
}
