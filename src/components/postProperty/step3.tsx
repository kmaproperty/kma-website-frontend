import ChipTag from "../common/chipTag";
import FieldLabel from "./fieldLabel";
import AmenitiesCard from "../common/amenities";
import Amenities from "./amenities";
import CustomCheckbox from "../common/checkbox";
const QuillEditor = dynamic(() => import("../common/editor"), { ssr: false });
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useStepProgress } from "@/hooks/useStepProgress";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getActiveStep, setActiveStep } from "@/store/postPropertyProgress";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Step1DetailsResponse,
  step1PostPropertyDetailsApiHandler,
  Step3DetailsResponse,
  step3PostPropertyCreateApiHandler,
  step3PostPropertyDetailsApiHandler,
  Step3PostPropertyPayload,
  Step3PostPropertyResponse,
} from "@/services/postProperty";
import {
  ADDITIONAL_ROOM,
  FIELD_NAME,
  FURNISH_TYPE,
  FURNISHING_LIST,
  POWER_BACKUP,
  TRUTY_LIST,
  WATER_SOURCE,
} from "@/lib/enums";
import { toast } from "react-toastify";

export default function Step3() {
  const { calculateProgress } = useStepProgress();

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const activeStep = useSelector(getActiveStep);
  const dispatch = useDispatch();

  const [basicStaticDetail, setBasicStaticDetail] = useState({
    propertyListFor: null,
    propertyCategory: null,
    propertyType: null,
  });

  const [dynamicFieldDetails, setDynamicFieldDetails] = useState<any>({
    additionalRoom: [],
    coveredParking: 0,
    openParking: 0,
    powerBackup: null,
    waterSource: null,
    liftAvalability: null,
    propertyDescription: null,
    furnishType: null,
    furnishingsCounts: [],
    amenities: [],
  });

  const [errors, setErrors] = useState<any>({});
  const [popupOpen, setPopupOpen] = useState(false);
  console.log('step3', dynamicFieldDetails,errors)

  const handleUpdateFurnishedCount = (name: string, value: number) => {
    let updatedData = [...dynamicFieldDetails.furnishingsCounts];
    updatedData = updatedData.map((item) => {
      if (item.name == name) {
        return { ...item, count: value };
      }
      return item;
    });
    const isIncluded = updatedData.find((item) => item.name == name);
    if (!isIncluded) {
      updatedData = [...updatedData, { name: name, count: value }];
    }
    if (isIncluded && isIncluded.count == 0) {
      updatedData = updatedData.filter((item) => item.name != name);
    }
    setDynamicFieldDetails((pre) => ({
      ...pre,
      furnishingsCounts: updatedData,
    }));
    setErrors((pre) => ({...pre, furnishingsCounts: ''}))
  };

  const handleAddFurnished = (name: string) => {
    let updatedData = [...dynamicFieldDetails.furnishingsCounts];
    const isIncluded = updatedData.find((item) => item.name == name);
    if (!isIncluded) {
      updatedData = [...updatedData, { name: name, count: 1 }];
      setDynamicFieldDetails((pre) => ({
        ...pre,
        furnishingsCounts: updatedData,
      }));
    } else {
      updatedData = updatedData.filter((item) => item.name != name);
      setDynamicFieldDetails((pre) => ({
        ...pre,
        furnishingsCounts: updatedData,
      }));
    }
    setErrors((pre) => ({...pre, furnishingsCounts: ''}))
  };

  const handleAddRemoveAmenitise = (value: string) => {
    let updatedData = [...dynamicFieldDetails.amenities];

    let isIncluded = updatedData.find((item) => item == value);
    if (isIncluded) {
      updatedData = updatedData.filter((item) => item != value);
    } else {
      updatedData = [...updatedData, value];
    }
    setDynamicFieldDetails((pre) => ({ ...pre, amenities: updatedData }));
  };

  //Show Hide the field based on condition
  const renderShowField = (fieldName: string) => {
    const isResidential = basicStaticDetail.propertyCategory?.code == 'residential'
    const isRent = basicStaticDetail.propertyListFor?.code == 'rent'
    const isSell = basicStaticDetail.propertyListFor?.code == 'sale'

    if(fieldName == FIELD_NAME.ADDITIONAL_ROOM){
      if(isResidential &&  ['res-rent-flat', 'res-sale-flat', 'res-rent-villa', 'res-sale-villa', 'res-rent-house', 'res-sale-house', 'res-rent-duplex', 'res-sale-duplex', 'res-rent-builder-floor', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-rent-penthouse', 'res-rent-studio', 'res-sale-studio', 'res-rent-farmhouse', 'res-sale-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.RESERVED_PARKING){
      if(isResidential &&  ['res-rent-flat', 'res-sale-flat', 'res-rent-villa', 'res-sale-villa', 'res-rent-house', 'res-sale-house', 'res-rent-duplex', 'res-sale-duplex', 'res-rent-builder-floor', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-rent-penthouse', 'res-rent-studio', 'res-sale-studio', 'res-rent-farmhouse', 'res-sale-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.POWER_BACKUP){
      if(isResidential &&  ['res-rent-flat', 'res-sale-flat', 'res-rent-villa', 'res-sale-villa', 'res-rent-house', 'res-sale-house', 'res-rent-duplex', 'res-sale-duplex', 'res-rent-builder-floor', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-rent-penthouse', 'res-rent-studio', 'res-sale-studio', 'res-rent-farmhouse', 'res-sale-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.WATER_SOURCE){
      if(isResidential &&  ['res-rent-villa', 'res-sale-villa', 'res-rent-house', 'res-sale-house', 'res-rent-duplex', 'res-sale-duplex', 'res-rent-builder-floor', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-rent-penthouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.LIFT_AVAILABILITY){
      if(isResidential &&  ['res-rent-villa', 'res-sale-villa', 'res-rent-builder-floor', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-rent-penthouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.FURNISH_TYPE){
      if(isResidential &&  ['res-rent-flat', 'res-sale-flat', 'res-rent-villa', 'res-sale-villa', 'res-rent-house', 'res-sale-house', 'res-rent-duplex', 'res-sale-duplex', 'res-rent-builder-floor', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-rent-penthouse', 'res-rent-studio', 'res-sale-studio', 'res-rent-farmhouse', 'res-sale-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.PROPERTY_DESCRRIPTION){
      if(isResidential &&  ['res-rent-flat', 'res-sale-flat', 'res-rent-villa','res-sale-villa', 'res-rent-house', 'res-sale-house', 'res-rent-duplex', 'res-sale-duplex', 'res-rent-builder-floor', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-rent-penthouse', 'res-rent-studio', 'res-sale-studio', 'res-rent-farmhouse', 'res-sale-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }


    return true
  }

  //Validation
  const validate = () => {
    let hasError = false;
    let updatedError: any = {}

    if(renderShowField(FIELD_NAME.FURNISH_TYPE) && !dynamicFieldDetails.furnishType){
      updatedError.furnishType = 'Please select the furnish type'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.FURNISH_TYPE) && dynamicFieldDetails.furnishType == 'Furnished' && dynamicFieldDetails.furnishingsCounts.length < 3){
      updatedError.furnishingsCounts = 'Please add atleast 3 flat furnishings to continue'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.FURNISH_TYPE) && dynamicFieldDetails.furnishType == 'Semi-Furnished' && dynamicFieldDetails.furnishingsCounts.length < 1){
      updatedError.furnishingsCounts = 'Please add atleast 1 flat furnishings to continue'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.WATER_SOURCE) && !dynamicFieldDetails.waterSource){
      updatedError.waterSource = 'Please select water source'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.LIFT_AVAILABILITY) && !dynamicFieldDetails.liftAvalability){
      updatedError.liftAvalability = 'Please select lift availability'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.PROPERTY_DESCRRIPTION) && (!dynamicFieldDetails.propertyDescription || dynamicFieldDetails.propertyDescription == '<p><br></p>')){
      updatedError.propertyDescription = 'Please add property description'
      hasError = true;
    }

    setErrors(updatedError)
    return hasError
  }

  const { data: step1Details } = useQuery({
    queryKey: ["step1-details", params?.propertyId],
    queryFn: async (): Promise<Step1DetailsResponse> => {
      return step1PostPropertyDetailsApiHandler(
        String(params?.propertyId ?? "")
      );
    },
    select: (resposne: Step1DetailsResponse) => {
      return resposne;
    },
    enabled: params?.propertyId ? true : false,
    staleTime: 0,
    refetchOnMount: true,
  });

  const { data: step2Details } = useQuery({
  queryKey: ["step2-details", params?.propertyId],
  queryFn: async (): Promise<Step3DetailsResponse> => {
    return step3PostPropertyDetailsApiHandler(String(params?.propertyId ?? ''));
  },
  select: (resposne: Step3DetailsResponse) => {
    console.log('Step1DetailsResponse',resposne)
    return resposne
  },
  enabled: params?.propertyId ? true : false,
  staleTime: 0,
  refetchOnMount: true
});

  const generatePayload = () => {
    let furnishingsCounts = dynamicFieldDetails.furnishingsCounts.map(item => ({item: item.name, count: item.count}))
    return {
      propertyId: String(params?.propertyId),
      additionalRooms: dynamicFieldDetails?.additionalRoom,
      reservedParkingCovered: Number(dynamicFieldDetails.coveredParking),
      reservedParkingOpen: Number(dynamicFieldDetails.openParking),
      powerBackup: dynamicFieldDetails.powerBackup,
      furnishType: dynamicFieldDetails.furnishType,
      furnishingsCounts: furnishingsCounts,
      amenities: dynamicFieldDetails.amenities,
      propertyDescription: dynamicFieldDetails.propertyDescription && dynamicFieldDetails.propertyDescription != '' ? dynamicFieldDetails.propertyDescription : null,
      waterSource: dynamicFieldDetails.waterSource,
      isLiftAvailable: dynamicFieldDetails.liftAvalability == 'yes' ? true : false
    }
  }

  const { mutate: handleStep3Submit, isPending: ownerLoader } = useMutation({
    mutationFn: async (
      payload: Step3PostPropertyPayload
    ): Promise<Step3PostPropertyResponse> => {
      return await step3PostPropertyCreateApiHandler(payload);
    },
    onSuccess: (response: Step3PostPropertyResponse) => {
      console.log("create owner response", response);
      dispatch(setActiveStep({step: activeStep + 1}))
    },
    onError: (error: any) => {
      console.log("owner create error", error);
      if(Array.isArray(error.message)){
        error.message.map((item: string) => {
          toast.error(item)
        })
      }else{
        toast.error(error.message)
      }
    },
  });

  useEffect(() => {
    if(step2Details){
      let furnishing = step2Details.furnishingsCounts.map(item => ({name: item.item, count: item.count}))
      setDynamicFieldDetails((pre) => ({
        ...pre,
        additionalRoom: step2Details?.additionalRooms,
        coveredParking: Number(step2Details?.reservedParkingCovered),
        openParking: Number(step2Details?.reservedParkingOpen),
        powerBackup: step2Details?.powerBackup,
        waterSource: step2Details?.waterSource,
        liftAvalability: step2Details?.isLiftAvailable,
        propertyDescription: step2Details?.propertyDescription,
        amenities: step2Details?.amenities,
        furnishType: step2Details?.furnishType,
        furnishingsCounts: furnishing
      }))
    }

  },[step2Details])

  useEffect(() => {
    if (step1Details) {
      setBasicStaticDetail((pre) => ({
        ...pre,
        propertyListFor: step1Details?.listingType,
        propertyCategory: step1Details?.category,
        propertyType: step1Details?.propertyType,
      }));
    }
  }, [step1Details]);

  useEffect(() => {
    calculateProgress();
  }, [dynamicFieldDetails, basicStaticDetail]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-text-black font-semibold text-lg 2md:text-xl pb-2">
          Amenities & Description
        </p>

        {renderShowField(FIELD_NAME.ADDITIONAL_ROOM) && <div>
          <FieldLabel label="Additional Rooms" />
          <div className="flex flex-wrap gap-3 pt-2 flex-wrap">
            {ADDITIONAL_ROOM.map((item) => {
              let isIncluded = dynamicFieldDetails.additionalRoom.includes(item)
              return (
                <ChipTag
                  checked={isIncluded}
                  label={item}
                  onChagne={() => {
                    if(isIncluded){
                      let uddated = dynamicFieldDetails.additionalRoom.filter(additional => additional != item)
                      setDynamicFieldDetails((pre) => ({
                        ...pre,
                        additionalRoom: uddated,
                      }));
                    }else{
                      setDynamicFieldDetails((pre) => ({
                        ...pre,
                        additionalRoom: [...dynamicFieldDetails.additionalRoom, item],
                      }));
                    }
                    
                  }}
                  value={item}
                  isIcon={false}
                  containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
                />
              );
            })}
          </div>
        </div>}

        {renderShowField(FIELD_NAME.RESERVED_PARKING) &&<div>
          <FieldLabel label="Reserved Parking (Optional)" />
          <div className="flex flex-col 2md:flex-row gap-6 pt-2">
            <div className="flex items-center justify-start gap-3">
              <p className="text-sm text-text-gray">Covered Parking</p>
              <div className="flex gap-2 items-center">
                <div
                  onClick={() => {
                    setDynamicFieldDetails((pre) => ({
                      ...pre,
                      coveredParking:
                        Number(dynamicFieldDetails.coveredParking) > 0
                          ? Number(dynamicFieldDetails.coveredParking) - 1
                          : 0,
                    }));
                  }}
                  className="select-none cursor-pointer font-light border border-border rounded-full w-6 h-6 text-[20px] leading-[20px] text-center"
                >
                  –
                </div>
                <p>{dynamicFieldDetails?.coveredParking}</p>
                <div
                  onClick={() => {
                    setDynamicFieldDetails((pre) => ({
                      ...pre,
                      coveredParking:
                        Number(dynamicFieldDetails.coveredParking) < 100
                          ? Number(dynamicFieldDetails.coveredParking) + 1
                          : 100,
                    }));
                  }}
                  className="select-none cursor-pointer font-light border border-border rounded-full w-6 h-6 text-[20px] leading-[20px] text-center"
                >
                  +
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start gap-3">
              <p className="text-sm text-text-gray">Open Parking</p>
              <div className="flex gap-2 items-center">
                <div
                  onClick={() => {
                    setDynamicFieldDetails((pre) => ({
                      ...pre,
                      openParking:
                        Number(dynamicFieldDetails.openParking) > 0
                          ? Number(dynamicFieldDetails.openParking) - 1
                          : 0,
                    }));
                  }}
                  className="select-none cursor-pointer font-light border border-border rounded-full w-6 h-6 text-[20px] leading-[20px] text-center"
                >
                  –
                </div>
                <p>{dynamicFieldDetails?.openParking}</p>
                <div
                  onClick={() => {
                    setDynamicFieldDetails((pre) => ({
                      ...pre,
                      openParking:
                        Number(dynamicFieldDetails.openParking) < 100
                          ? Number(dynamicFieldDetails.openParking) + 1
                          : 100,
                    }));
                  }}
                  className="select-none cursor-pointer font-light border border-border rounded-full w-6 h-6 text-[20px] leading-[20px] text-center"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>}

        {renderShowField(FIELD_NAME.POWER_BACKUP) &&<div>
          <FieldLabel label="Power Back-up" />
          <div className="flex flex-wrap gap-3 pt-2">
            {POWER_BACKUP.map((item) => {
              return (
                <ChipTag
                  checked={item == dynamicFieldDetails.powerBackup}
                  label={item}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({
                      ...pre,
                      powerBackup: item,
                    }));
                  }}
                  value={item}
                  isIcon={false}
                  containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
                />
              );
            })}
          </div>
        </div>}

        {renderShowField(FIELD_NAME.WATER_SOURCE) && <div data-field={FIELD_NAME.WATER_SOURCE} data-has-value={!!dynamicFieldDetails.waterSource}>
          <FieldLabel label="Water Source" required={true}/>
          <div className="flex flex-wrap gap-3 pt-2">
            {
              WATER_SOURCE.map(item => {
                return(
                  <ChipTag
                    checked={item.value == dynamicFieldDetails.waterSource}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, waterSource: item.value}))
                    }}
                    value={dynamicFieldDetails.waterSource}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                  />
                )
              })
            }
          </div>
            {errors?.waterSource && <p className="pt-1 text-red-500 text-xs">{errors.waterSource}</p>}
        </div>}

        {renderShowField(FIELD_NAME.LIFT_AVAILABILITY) && <div data-field={FIELD_NAME.LIFT_AVAILABILITY} data-has-value={!!dynamicFieldDetails.liftAvalability}>
          <FieldLabel label="Lift Availability" required={true}/>
          <div className="flex flex-wrap gap-3 pt-2">
            {
              TRUTY_LIST.map(item => {
                return(
                  <ChipTag
                    checked={item.value == dynamicFieldDetails.liftAvalability}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, liftAvalability: item.value}))
                    }}
                    value={dynamicFieldDetails.liftAvalability}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                  />
                )
              })
            }
          </div>
            {errors?.liftAvalability && <p className="pt-1 text-red-500 text-xs">{errors.liftAvalability}</p>}
        </div>}

        {renderShowField(FIELD_NAME.FURNISH_TYPE) &&<div className="bg-background-gray rounded-[10px] p-3">
          <FieldLabel label="Furnish Type" customClass="text-base!" required={true}/>
          <div className="flex flex-wrap gap-3 pt-2">
            {FURNISH_TYPE.map((item) => {
              return (
                <ChipTag
                  checked={item.value == dynamicFieldDetails.furnishType}
                  label={item.name}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({
                      ...pre,
                      furnishType: item.value,
                    }));
                    setErrors((pre) => ({...pre, furnishType: ''}))
                  }}
                  value={item.value}
                  isIcon={false}
                  containerStyle="flex flex-1 justify-center gap-2 min-w-[150px]"
                />
              );
            })}
          </div>
          {errors?.furnishType && (
            <p className="pt-1 text-red-500 text-xs">{errors.furnishType}</p>
          )}

          <FieldLabel
            label="Select Furnishings Amenities"
            customClass="pt-3 pb-2"
          />
          <div
            className={`w-fit px-10 h-[40px]  flex items-center justify-center py-[10px] cursor-pointer border border-border rounded-full
                    `}
            onClick={() => setPopupOpen(!popupOpen)}
          >
            <span className={`text-sm leading-[24px] text-center`}>
              {"+ Add Furnishings / Amenities"}
            </span>
          </div>
          {errors?.furnishingsCounts && (
            <p className="pt-1 text-red-500 text-xs">{errors.furnishingsCounts}</p>
          )}

          <div className="flex gap-3 flex-wrap pt-2">
            {dynamicFieldDetails.furnishingsCounts.map((item, index) => {
              let findIcon = FURNISHING_LIST.find(
                (furnish) => furnish.label == item.name
              );
              return (
                <AmenitiesCard
                  checked={Number(item.count) > 0}
                  icon={findIcon.icon}
                  label={item.name}
                  count={Number(item.count)}
                  handleAddFurnished={handleAddFurnished}
                  handleUpdateFurnishedCount={handleUpdateFurnishedCount}
                />
              );
            })}
          </div>
        </div>}

        {renderShowField(FIELD_NAME.FURNISH_TYPE) &&<div className="bg-background-gray rounded-[10px] p-3">
          <FieldLabel label="Amenities" customClass="text-base!" />

          {dynamicFieldDetails.amenities.length > 0 && <div className="flex gap-4 flex-wrap pt-2">
            {dynamicFieldDetails.amenities.map((item) => {
              return (
                <div className="flex-1">
                  <CustomCheckbox
                    label={item}
                    value={item}
                    checked={true}
                    onClick={handleAddRemoveAmenitise}
                  />
                </div>
              );
            })}
          </div>}
        </div>}

        {renderShowField(FIELD_NAME.PROPERTY_DESCRRIPTION) &&<div>
          <FieldLabel label="Property Description" required={true}/>
          <FieldLabel
            label="Please write a detailed description about property so clients can understand property better or generate using our AI tool."
            customClass="text-text-gray font-normal! text-xs!"
          />

          <div className="pt-2">
            <QuillEditor 
              value={dynamicFieldDetails.propertyDescription} 
              onChange={(value) => {
                
                setDynamicFieldDetails((pre) => ({...pre, propertyDescription: value}))
                setErrors((pre) => ({...pre, propertyDescription: ''}))
              }}
            />
            {errors?.propertyDescription && (
            <p className="pt-1 text-red-500 text-xs">{errors.propertyDescription}</p>
          )}
          </div>
        </div>}
      </div>
      <div className="flex justify-end w-full">
        <div className="flex flex-wrap justify-start flex-row gap-2 items-center mt-8">
          <button onClick={() => {
            if(activeStep != 1){
                dispatch(setActiveStep({step: activeStep - 1}))
            }
          }} className="w-full md:w-[130px] text-sm 1xl:text-base px-12 py-3 border border-blue text-center cursor-pointer rounded-full bg-light-purple">
            <span className="gap-3 relative flex justify-center">
              <p className={`text-nowrap font-medium`}>Back</p>
            </span>
          </button>
          <button onClick={() => {
            if(activeStep != 4){
              if(validate()){
                return
              }
              let payload = generatePayload()
              handleStep3Submit(payload)
            }
          }} className="w-full md:w-[130px] text-sm 1xl:text-base animated-button px-12 py-3 border border-blue text-center cursor-pointer">
            <span className="gap-3 relative flex justify-center">
              <p className={`text-nowrap font-medium`}>{activeStep == 4 ? 'Submit' : 'Next'}</p>
            </span>
          </button>
        </div>
    </div>

      <Amenities
        open={popupOpen}
        onHide={() => setPopupOpen(!popupOpen)}
        setDynamicFieldDetails={setDynamicFieldDetails}
        dynamicFieldDetails={dynamicFieldDetails}
        handleAddFurnished={handleAddFurnished}
        handleUpdateFurnishedCount={handleUpdateFurnishedCount}
        handleAddRemoveAmenitise={handleAddRemoveAmenitise}
      />
    </>
  );
}
