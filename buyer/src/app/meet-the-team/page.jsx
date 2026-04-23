import { fetchPropertyCitiesData, fetchPropertyMasterData } from '../api/home';
import MeetTheTeamPage from '@/components/meet-the-team';

const MeetTheTeam = async () => {
  let propertyMasterData = await fetchPropertyMasterData();
  if (propertyMasterData?.success) {
    propertyMasterData = propertyMasterData.data;
  } else {
    propertyMasterData = [];
  }

  const propertyCitiesData = await fetchPropertyCitiesData();

  return (
    <MeetTheTeamPage
      propertyMasterData={propertyMasterData}
      propertyCitiesData={propertyCitiesData}
    />
  );
};

export default MeetTheTeam;