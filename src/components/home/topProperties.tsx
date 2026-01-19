"use client";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import Slider from "react-slick";

export default function TopProperties({ topProperties }) {
  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    speed: 400,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  const isFirst = currentSlide === 0;
  const isLast = currentSlide === topProperties.length - 1;
  return (
    <div className="bg-white/10 rounded-[8px] bg-clip-padding backdrop-filter flex flex-col gap-2 backdrop-blur-[5px] px-[10px] 2md:px-[12px] pt-[6px] pb-[10px]">
      <div className="flex justify-start items-center gap-1 2md:gap-2">
        <div className="text-white h-[14px] 2md:h-[20px] border-l border-1"></div>
        <p className="text-white text-xs 2md:text-sm xl:text-sm font-semibold">
          Top Properties
        </p>
      </div>
      <div className="flex justify-between gap-2 2md:gap-3">
        <div className="flex-1 min-w-0">
          <Slider ref={sliderRef} {...settings}>
            {topProperties.map((item, index) => {
              const img =
                item.images.length > 0 ? item.images[0]?.fileKey : null;
              return (
                <div key={index}>
                  <div className="flex justify-start gap-2 2md:gap-3">
                    <div className="w-[110px] flex-shrink-0">
                      {img && (
                        <Image
                          src={profileBaseUrl + img}
                          width={100}
                          height={100}
                          alt="property"
                          className="rounded-[8px] w-[110px] h-[110px] object-cover"
                        />
                      )}
                    </div>

                    <div className="flex flex-col justify-between 2md:py-2 items-start min-w-0 flex-1">
                      <p className="text-xs xl:text-sm font-semibold text-white truncate w-full">
                        {item.propertyName}
                      </p>
                      <p className="text-xs xl:text-sm text-white truncate w-full">
                        {item.address}
                      </p>
                      <p className="text-xs xl:text-sm font-semibold text-yellow">
                        $
                        {item.listingType == "Sale"
                          ? item.price
                          : item.monthlyRent}{" "}
                        <span className="text-white font-medium">
                          {item.listingType == "Sale" ? "" : "/ Month"}
                        </span>
                      </p>

                      <div className="flex flex-col 2md:flex-row gap-3 2md:items-center">
                        {![
                          "Office",
                          "Plot",
                          "Retail Shop",
                          "Warehouse",
                          "Showroom",
                          "Agricultural Land",
                        ].includes(item.propertyType) && (
                          <div className="flex gap-1">
                            <Image
                              alt="bed"
                              src="/assets/bed.svg"
                              width={26}
                              height={26}
                              className="w-[18px] xl:w-[20px] h-[18px] xl:h-[20px]"
                            />
                            <p className="text-white text-xs xl:text-sm">
                              {item.bed} BedRoom
                            </p>
                          </div>
                        )}

                        {![
                          "Office",
                          "Plot",
                          "Retail Shop",
                          "Warehouse",
                          "Showroom",
                          "Agricultural Land",
                        ].includes(item.propertyType) && (
                          <div className="flex gap-1">
                            <Image
                              alt="bath"
                              src="/assets/bath.svg"
                              width={26}
                              height={26}
                              className="w-[18px] xl:w-[20px] h-[18px] xl:h-[20px]"
                            />
                            <p className="text-white text-xs xl:text-sm">
                              {item.bath} Bath
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>

        <div className="flex justify-center gap-10 flex-col items-center">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            disabled={isFirst}
            className={`transition-opacity ${
              isFirst
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer opacity-100"
            }`}
          >
            <Image
              alt="up arrow"
              src="/assets/up-white-arrow.svg"
              width={30}
              height={30}
              className="w-[25px] h-[20px]"
            />
          </button>

          <button
            onClick={() => sliderRef.current?.slickNext()}
            disabled={isLast}
            className={`transition-opacity ${
              isLast
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer opacity-100"
            }`}
          >
            <Image
              alt="down arrow"
              src="/assets/down-white-arrow.svg"
              width={30}
              height={30}
              className="w-[25px] h-[20px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
