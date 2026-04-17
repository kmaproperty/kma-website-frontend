import AboutUsComponent from "@/components/about-us";
import { fetchPropertyCitiesData, fetchPropertyMasterData } from "../api/home";

export const dynamic = 'force-dynamic';

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