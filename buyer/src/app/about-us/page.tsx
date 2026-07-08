// import AboutUsComponent from "@/components/about-us";
// import { fetchPropertyCitiesData, fetchPropertyMasterData } from "../api/home";


// export default async function AboutUs(){
//     let propertyMasterData: any = await fetchPropertyMasterData();
//       if (propertyMasterData?.success) {
//         propertyMasterData = propertyMasterData.data;
//       } else {
//         propertyMasterData = []
//       }
    
//       let propertyCitiesData: any = await fetchPropertyCitiesData();
//     return(
//         <>
//         <AboutUsComponent propertyMasterData={propertyMasterData} propertyCitiesData={propertyCitiesData}/>
//         </>
//     )
// }

import AboutUsComponent from "@/components/about-us";
import { fetchPropertyCitiesData, fetchPropertyMasterData } from "../api/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | KMA Global Properties — Gurgaon Real Estate",
  description: "Learn about KMA Global Properties - Gurgaon's broker-friendly real estate consultancy offering verified listings, investment advisory, and end-to-end property support.",
  alternates: {
    canonical: "https://kmaglobalproperty.com/about-us", 
  },
};


export default async function AboutUs(){
    let propertyMasterData: any = await fetchPropertyMasterData();
      if (propertyMasterData?.success) {
        propertyMasterData = propertyMasterData.data;
      } else {
        propertyMasterData = []
      }
    
      let propertyCitiesData: any = await fetchPropertyCitiesData();
    return(
        <>
        <AboutUsComponent propertyMasterData={propertyMasterData} propertyCitiesData={propertyCitiesData}/>
        </>
    )
}
