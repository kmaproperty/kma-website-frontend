import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";

const exploreDetails = [
  {
    name: "Vaishali Nagar",
    properties: 300,
    image: "/assets/estateCity/vaishali_nagar.jpeg",
  },
  {
    name: "Mansarovar",
    properties: 300,
    image: "/assets/estateCity/mansarovar.jpeg",
  },
  {
    name: "Jagatpura",
    properties: 300,
    image: "/assets/estateCity/jagatpura.jpeg",
  },
  {
    name: "Malviya Nagar",
    properties: 300,
    image: "/assets/estateCity/malviya_nagar.jpeg",
  },
  {
    name: "Tonk Road",
    properties: 300,
    image: "/assets/estateCity/tonk_road.jpeg",
  },
];
function ExploreCard({ name, properties, image }) {
  return (
    <div className="relative flex-1 rounded-[8px] overflow-hidden shadow-md group">
      <Image
        src={`${image}`}
        alt={name}
        width={300}
        height={400}
        className="w-full h-45 object-fit transform transition-transform ease-in-out duration-800 group-hover:scale-150"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-base font-semibold">{name}</h3>
        <p className="text-xs">{properties} Properties</p>
      </div>
      <button className="cursor-pointer absolute bottom-4 right-4 bg-white rounded-full p-1 shadow">
        <Image
          src={"/assets/navigate-arrow-blue.svg"}
          width={15}
          height={15}
          alt="navigate"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
}

export default function RealEstateSection() {
  return (
    <div>
      <SectionHeader
        heading="Explore Top Real Estate Opportunities Across India"
        subHeading="Smart property choices in India's leading cities."
      />
      <div className="mt-10">
        {/* First Row */}
        <div className="flex gap-4">
          {exploreDetails.slice(0, 3).map((exploreDetail, index) => (
            <ExploreCard key={exploreDetail.name} {...exploreDetail} />
          ))}
        </div>
        {/* Second Row */}
        <div className="flex mt-4 gap-4">
          {exploreDetails.slice(3).map((exploreDetail, index) => (
            <ExploreCard key={exploreDetail.name} {...exploreDetail} />
          ))}
        </div>
      </div>
    </div>
  );
}
