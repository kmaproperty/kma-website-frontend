"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMemo } from "react";
import Slider from "react-slick";
import Image from "next/image";

const RenderSliderBody = ({ sliderItem }) => {
  return (
    <div className="relative w-[100%] min-h-[700px] 2md:min-h-auto 2md:h-[90vh]">
      <div className="absolute inset-0 gradient-mask">
        <Image alt='banner' className="" src={sliderItem.imagePath} fill/>
        <div className="gradient-overlay"></div>  
      </div>
    </div>
  );
};

export default function BannerSlider(){

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
    return [
      {
        imagePath: "/assets/backgroundSlider/background_slider_1.jpg",
        alt: "Background Image 1",
      },
      {
        imagePath: "/assets/backgroundSlider/background_slider_2.png",
        alt: "Background Image 2",
      },
    ];
  }, []);

    return(
        <div>
            <Slider {...settings}>
                {sliderImages.map((sliderItem, index) => {
                return <RenderSliderBody key={index} sliderItem={sliderItem} />;
                })}
            </Slider>
        </div>
    )
}