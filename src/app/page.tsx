import Home from "@/components/home";
import { fetchPropertyCitiesData, fetchPropertyMasterData } from "./api/home";

export default async function HomeDashboard() {
  let propertyMasterData: any = await fetchPropertyMasterData();
  if (propertyMasterData?.success) {
    propertyMasterData = propertyMasterData.data;
  } else {
    propertyMasterData = [];
  }

  let propertyCitiesData: any = await fetchPropertyCitiesData();
  return <Home propertyMasterData={propertyMasterData} propertyCitiesData={propertyCitiesData}/>;
}
