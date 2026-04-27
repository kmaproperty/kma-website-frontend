"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMemo } from "react";
import Slider from "react-slick";
import Image from "next/image";

type SliderItem = { imagePath: string; alt?: string };

const RenderSliderBody = ({
  sliderItem,
  overlayClass,
  bannerHeight,
  priority,
}: {
  sliderItem: SliderItem;
  overlayClass?: string;
  bannerHeight?: string;
  priority?: boolean;
}) => {
  const resolvedBannerHeight =
    bannerHeight && bannerHeight.trim().length > 0
      ? `min-h-[320px] sm:min-h-[420px] ${bannerHeight}`
      : "min-h-[320px] sm:min-h-[420px]";

  return (
    <div className={`relative w-[100%] ${resolvedBannerHeight}`}>
      <div className="absolute inset-0 gradient-mask">
        <Image
          alt={sliderItem.alt ?? "banner"}
          className="object-cover"
          src={sliderItem.imagePath}
          fill
          priority={priority}
          sizes="100vw"
        />
        <div className={overlayClass}></div>
      </div>
    </div>
  );
};

export default function BannerSlider({
  backgroundImages,
  overlayClass,
  bannerHeight,
}: {
  backgroundImages: SliderItem[];
  overlayClass?: string;
  bannerHeight?: string;
}) {

  const settings = useMemo(() => {
    return {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      pauseOnHover: false,
    };
  }, []);

  return (
    <div>
      <Slider {...settings}>
        {backgroundImages.map((sliderItem, index) => {
          return (
            <RenderSliderBody
              bannerHeight={bannerHeight}
              key={sliderItem.imagePath ?? index}
              sliderItem={sliderItem}
              overlayClass={overlayClass}
              priority={index === 0}
            />
          );
        })}
      </Slider>
    </div>
  );
}