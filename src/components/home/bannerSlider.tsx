"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMemo } from "react";
import Slider from "react-slick";
import Image from "next/image";

const RenderSliderBody = ({ sliderItem, overlayClass, bannerHeight }) => {
  return (
    <div className={`relative w-[100%] ${bannerHeight}`}>
      <div className="absolute inset-0 gradient-mask">
        <Image alt='banner' className="" src={sliderItem.imagePath} fill/>
        <div className={overlayClass}></div>  
      </div>
    </div>
  );
};

export default function BannerSlider({backgroundImages, overlayClass, bannerHeight}){

    var settings = useMemo(() => {
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

  let sliderImages = useMemo(() => {
    return backgroundImages
  }, [backgroundImages]);

    return(
        <div>
            <Slider {...settings}>
                {sliderImages.map((sliderItem, index) => {
                return <RenderSliderBody bannerHeight={bannerHeight} key={index} sliderItem={sliderItem} overlayClass={overlayClass}/>;
                })}
            </Slider>
        </div>
    )
}