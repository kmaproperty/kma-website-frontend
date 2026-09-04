"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

interface BannerSlide {
  id: number | string;
  title: string;
  image: string;
  href: string;
  alt: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    title: "Channel Partner",
    image: "/assets/CP.jpg",
    href: "/join-us",
    alt: "CPPoster",
  },
  {
    id: 2,
    title: "Refer and Earn",
    image: "/assets/REF.jpg",
    href: "/refer-and-earn",
    alt: "ReferralPoster",
  },
];

export default function PosterBannerSlider({
  autoSlideInterval = 4000,
}: {
  autoSlideInterval?: number;
}) {
  if (!BANNER_SLIDES || BANNER_SLIDES.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden select-none">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{
          delay: autoSlideInterval,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full h-[220px] sm:h-[340px] md:h-[440px] lg:h-[700px] [&_.swiper-wrapper]:!h-full"
      >
        {BANNER_SLIDES.map((slide, index) => {
          const isFirstSlide = index === 0;

          return (
            <SwiperSlide key={slide.id} className="relative !w-full !h-full shrink-0">
              <Link
                href={slide.href}
                className="relative block w-full h-full cursor-pointer overflow-hidden"
                aria-label={slide.title || slide.alt}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={isFirstSlide}
                  sizes="100vw"
                  className="object-cover object-center w-full h-full"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}