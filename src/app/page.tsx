import Home from "@/components/home";
import { fetchPropertyMasterData } from "./api/home";

export default async function HomeDashboard() {
  let propertyMasterData: any = await fetchPropertyMasterData();
  if (propertyMasterData?.success) {
    propertyMasterData = propertyMasterData.data;
  } else {
    propertyMasterData = [];
  }

  
  return <Home propertyMasterData={propertyMasterData} />;
}
