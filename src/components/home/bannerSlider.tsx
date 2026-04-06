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
  return (
    <div className={`relative w-full ${bannerHeight}`}>
      <div className="absolute w-full h-full inset-0 gradient-mask">
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
    <div className="absolute top-0 left-0 w-full h-full home_hero_slider">
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