// "use client";
// import Image from "next/image";
// import SectionHeader from "../common/home/secionHeader";
// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import { topCitiesApiHandler, TopCitiesResponse } from "@/services/homeService";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "nextjs-toploader/app";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

// type CityItem = {
//   id?: string;
//   name: string;
//   propertyCount: number;
//   imageUrl?: string | null;
// };

// const dummyCities: CityItem[] = [
//   {
//     name: "Vaishali Nagar",
//     propertyCount: 300,
//     imageUrl: "/assets/estateCity/vaishali_nagar.jpeg",
//   },
//   {
//     name: "Mansarovar",
//     propertyCount: 300,
//     imageUrl: "/assets/estateCity/mansarovar.jpeg",
//   },
//   {
//     name: "Jagatpura",
//     propertyCount: 300,
//     imageUrl: "/assets/estateCity/jagatpura.jpeg",
//   },
//   {
//     name: "Malviya Nagar",
//     propertyCount: 300,
//     imageUrl: "/assets/estateCity/malviya_nagar.jpeg",
//   },
//   {
//     name: "Tonk Road",
//     propertyCount: 300,
//     imageUrl: "/assets/estateCity/tonk_road.jpeg",
//   },
// ];

// function resolveCityImageSrc(imageUrl?: string | null) {
//   if (!imageUrl) return null;
//   // Local/static asset path
//   if (imageUrl.startsWith("/")) return imageUrl;
//   // Absolute remote URL
//   if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))
//     return imageUrl;
//   // Relative path from API - prefix with AWS base (if configured)
//   const awsBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
//   if (!awsBaseUrl) return imageUrl;
//   return `${awsBaseUrl}${imageUrl}`;
// }

// function ExploreCard({
//   id,
//   name,
//   properties,
//   image,
// }: {
//   id?: string;
//   name: string;
//   properties: number;
//   image?: string | null;
// }) {
//   const router = useRouter();
//   const resolvedSrc = resolveCityImageSrc(image);
//   const encodedCityName = encodeURIComponent(name);

//   return (
//     <motion.div
//       onClick={() =>
//         router.push(
//           id
//             ? `/projects/${id}?cityName=${encodedCityName}`
//             : `/projects?cityName=${encodedCityName}`
//         )
//       }
//       whileHover={{ y: -4 }}
//       transition={{ type: "spring", stiffness: 260, damping: 20 }}
//       className="relative isolate overflow-hidden rounded-2xl bg-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.10)] ring-1 ring-black/5 group cursor-pointer"
//     >
//       <div className="relative h-[170px] sm:h-[220px] w-full">
//         {resolvedSrc ? (
//           <Image
//             src={resolvedSrc}
//             alt={name}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className="cursor-pointer object-cover transition-transform duration-700 ease-out group-hover:scale-[1.12]"
//             priority={false}
//           />
//         ) : (
//           <div className="h-full w-full cursor-pointer bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 flex items-center justify-center text-white text-5xl font-bold uppercase">
//             {name.charAt(0)}
//           </div>
//         )}

//         {/* Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
//         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10" />

//         {/* Text */}
//         <div className="absolute left-4 bottom-4 right-16 text-white">
//           <h3 className="text-lg sm:text-xl font-semibold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
//             {name}
//           </h3>
//           <p className="mt-0.5 text-xs sm:text-sm text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
//             {properties} Properties
//           </p>
//         </div>

//         {/* Arrow button */}
//         <button
//           type="button"
//           aria-label={`Explore ${name}`}
//           className="absolute bottom-4 right-4 grid place-items-center h-11 w-11 rounded-full bg-white shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 active:scale-95 cursor-pointer"
//         >
//           <Image
//             src={"/assets/navigate-arrow-blue.svg"}
//           width={18}
//             height={18}
//             alt=""
//             className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
//           />
//         </button>
//       </div>
//     </motion.div>
//   );
// }

// export default function RealEstateSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });
//   const leftRowVariant = {
//     hidden: { x: "-100%", opacity: 1 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 1,
//         ease: "easeOut" as const,
//       },
//     },
//   };

//   const rightRowVariant = {
//     hidden: { x: "100%", opacity: 1 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 1,
//         ease: "easeOut" as const,
//       },
//     },
//   };

//   const { data: citiList } = useQuery({
//     queryKey: ["city-list"],
//     queryFn: () => {
//       return topCitiesApiHandler();
//     },
//     select: (response: TopCitiesResponse) => {
//       return response.cities;
//     },
//   });

//   const cities: CityItem[] =
//     citiList?.map((c) => ({
//       id: c.id,
//       name: c.name,
//       propertyCount: c.propertyCount ?? 0,
//       imageUrl: c.imageUrl,
//     }))?.filter((c) => c.name) ?? dummyCities;

//   return (
//     <div>
//       <SectionHeader
//         isInView={isInView}
//         heading="Explore Real Estate Across Top Cities"
//         subHeading="Discover verified opportunities in prime urban markets."
//         hideButton={true}
//       />
//       <div className="mt-10 -mr-4" ref={ref}>
//   <div className="lg:hidden">
//     <Swiper
//       spaceBetween={12} 
//       slidesPerView={2.1} 
//       breakpoints={{
//         640: {
//           slidesPerView: 2.2,
//         },
//       }}
//       className="pb-5"
//     >
//       {cities.map((exploreDetail) => (
//         <SwiperSlide key={exploreDetail.name}>
//           <ExploreCard
//             id={exploreDetail.id}
//             name={exploreDetail.name}
//             image={exploreDetail.imageUrl}
//             properties={exploreDetail.propertyCount}
//           />
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   </div>

//   <div className="hidden lg:block">
//     {/* First Row */}
//     <motion.div
//       className="grid grid-cols-3 gap-4 will-change-transform"
//       variants={leftRowVariant}
//       animate={isInView ? "visible" : "hidden"}
//     >
//       {cities.slice(0, 3).map((exploreDetail) => (
//         <ExploreCard
//           key={exploreDetail.name}
//           id={exploreDetail.id}
//           name={exploreDetail.name}
//           image={exploreDetail.imageUrl}
//           properties={exploreDetail.propertyCount}
//         />
//       ))}
//     </motion.div>

//     {/* Second Row */}
//     <motion.div
//       className="grid grid-cols-2 gap-4 mt-4 will-change-transform"
//       variants={rightRowVariant}
//       animate={isInView ? "visible" : "hidden"}
//     >
//       {cities.slice(3).map((exploreDetail) => (
//         <ExploreCard
//           key={exploreDetail.name}
//           id={exploreDetail.id}
//           name={exploreDetail.name}
//           image={exploreDetail.imageUrl}
//           properties={exploreDetail.propertyCount}
//         />
//       ))}
//     </motion.div>
//   </div>
// </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { topCitiesApiHandler, TopCitiesResponse, getPropertiesCountApiHandler } from "@/services/homeService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const GURUGRAM_CITY_ID = "e8894ea7-b8fc-43da-b983-b1d43c77597e";
const GURGAON_CITY_ID = "175e1118-cdfe-4cf3-8a11-62ad4fa4cf1c";
const EXTRA_CITY_ID = "a999b83d-fbd6-4eed-8e18-8a74754748db";

type CityItem = {
  id?: string;
  name: string;
  propertyCount: number;
  imageUrl?: string | null;
};

const dummyCities: CityItem[] = [
  {
    name: "Vaishali Nagar",
    propertyCount: 300,
    imageUrl: "/assets/estateCity/vaishali_nagar.jpeg",
  },
  {
    name: "Mansarovar",
    propertyCount: 300,
    imageUrl: "/assets/estateCity/mansarovar.jpeg",
  },
  {
    name: "Jagatpura",
    propertyCount: 300,
    imageUrl: "/assets/estateCity/jagatpura.jpeg",
  },
  {
    name: "Malviya Nagar",
    propertyCount: 300,
    imageUrl: "/assets/estateCity/malviya_nagar.jpeg",
  },
  {
    name: "Tonk Road",
    propertyCount: 300,
    imageUrl: "/assets/estateCity/tonk_road.jpeg",
  },
];

function resolveCityImageSrc(imageUrl?: string | null) {
  if (!imageUrl) return null;
  if (imageUrl.startsWith("/")) return imageUrl;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))
    return imageUrl;
  const awsBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
  if (!awsBaseUrl) return imageUrl;
  return `${awsBaseUrl}${imageUrl}`;
}

function ExploreCard({
  id,
  name,
  properties,
  image,
}: {
  id?: string;
  name: string;
  properties: number;
  image?: string | null;
}) {
  const router = useRouter();
  const resolvedSrc = resolveCityImageSrc(image);
  const encodedCityName = encodeURIComponent(name);

  return (
    <motion.div
      onClick={() =>
        router.push(
          id
            ? `/projects/${id}?cityName=${encodedCityName}`
            : `/projects?cityName=${encodedCityName}`
        )
      }
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative isolate overflow-hidden rounded-2xl bg-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.10)] ring-1 ring-black/5 group cursor-pointer"
    >
      <div className="relative h-[170px] sm:h-[220px] w-full">
        {resolvedSrc ? (
          <Image
            src={resolvedSrc}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="cursor-pointer object-cover transition-transform duration-700 ease-out group-hover:scale-[1.12]"
            priority={false}
          />
        ) : (
          <div className="h-full w-full cursor-pointer bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 flex items-center justify-center text-white text-5xl font-bold uppercase">
            {name.charAt(0)}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10" />

        <div className="absolute left-4 bottom-4 right-16 text-white">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
            {name}
          </h3>
          <p className="mt-0.5 text-xs sm:text-sm text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
            {properties} Properties
          </p>
        </div>

        <button
          type="button"
          aria-label={`Explore ${name}`}
          className="absolute bottom-4 right-4 grid place-items-center h-11 w-11 rounded-full bg-white shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Image
            src={"/assets/navigate-arrow-blue.svg"}
            width={18}
            height={18}
            alt=""
            className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </motion.div>
  );
}

export default function RealEstateSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const leftRowVariant = {
    hidden: { x: "-100%", opacity: 1 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  const rightRowVariant = {
    hidden: { x: "100%", opacity: 1 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  const { data: cities = dummyCities } = useQuery({
    queryKey: ["top-cities-combined-list"],
    queryFn: async () => {
      const response: TopCitiesResponse = await topCitiesApiHandler();
      const rawCities = response?.cities ?? [];

      if (!rawCities || rawCities.length === 0) return dummyCities;

      const filteredList: CityItem[] = rawCities
        .filter((c) => c.id !== GURGAON_CITY_ID && c.id !== EXTRA_CITY_ID)
        .map((c) => ({
          id: c.id,
          name: c.name,
          propertyCount: c.propertyCount ?? 0,
          imageUrl: c.imageUrl,
        }));

      const gurugramIndex = filteredList.findIndex((c) => c.id === GURUGRAM_CITY_ID);
      
      if (gurugramIndex !== -1) {
        try {
          const [res1, res2, res3] = await Promise.all([
            getPropertiesCountApiHandler({ cityId: GURUGRAM_CITY_ID, page: "1", limit: "1" }),
            getPropertiesCountApiHandler({ cityId: GURGAON_CITY_ID, page: "1", limit: "1" }),
            getPropertiesCountApiHandler({ cityId: EXTRA_CITY_ID, page: "1", limit: "1" }),
          ]);

          const totalSum = Number(res1?.count ?? 0) + Number(res2?.count ?? 0) + Number(res3?.count ?? 0);
          
          if (totalSum > 0) {
            filteredList[gurugramIndex].propertyCount = totalSum;
          }
        } catch (err) {
          console.error("Failed to fetch merged city counts:", err);
        }
      }

      return filteredList;
    },
  });

  return (
    <div>
      <SectionHeader
        isInView={isInView}
        heading="Explore Real Estate Across Top Cities"
        subHeading="Discover verified opportunities in prime urban markets."
        hideButton={true}
      />
      <div className="mt-10 -mr-4" ref={ref}>
        <div className="lg:hidden">
          <Swiper
            spaceBetween={12} 
            slidesPerView={2.1} 
            breakpoints={{
              640: {
                slidesPerView: 2.2,
              },
            }}
            className="pb-5"
          >
            {cities.map((exploreDetail) => (
              <SwiperSlide key={exploreDetail.name}>
                <ExploreCard
                  id={exploreDetail.id}
                  name={exploreDetail.name}
                  image={exploreDetail.imageUrl}
                  properties={exploreDetail.propertyCount}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden lg:block">
          {/* First Row */}
          <motion.div
            className="grid grid-cols-3 gap-4 will-change-transform"
            variants={leftRowVariant}
            animate={isInView ? "visible" : "hidden"}
          >
            {cities.slice(0, 3).map((exploreDetail) => (
              <ExploreCard
                key={exploreDetail.name}
                id={exploreDetail.id}
                name={exploreDetail.name}
                image={exploreDetail.imageUrl}
                properties={exploreDetail.propertyCount}
              />
            ))}
          </motion.div>

          {/* Second Row */}
          <motion.div
            className="grid grid-cols-2 gap-4 mt-4 will-change-transform"
            variants={rightRowVariant}
            animate={isInView ? "visible" : "hidden"}
          >
            {cities.slice(3).map((exploreDetail) => (
              <ExploreCard
                key={exploreDetail.name}
                id={exploreDetail.id}
                name={exploreDetail.name}
                image={exploreDetail.imageUrl}
                properties={exploreDetail.propertyCount}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}