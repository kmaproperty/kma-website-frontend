"use client";
import Image from "next/image";
import DynamicAsyncSelect, { OptionType } from "../common/asyncSelect";
import ChipTag from "../common/chipTag";
import FieldLabel from "./fieldLabel";
import ApartmentIcon from "@/assets/apartment-transparent.svg";
import IndependentHouse from "@/assets/independent-house-transparent.svg";
import Duplex from "@/assets/duplex-transparent.svg";
import IndependentFloor from "@/assets/independent-floor-transparent.svg";
import Villa from "@/assets/villa-transparent.svg";
import Penthouse from "@/assets/penthouse-transparent.svg";
import Studio from "@/assets/studio-transparent.svg";
import FarmHouse from "@/assets/farm-house-transparent.svg";
import Plot from "@/assets/plot-transparent.svg";
import Agriculture from "@/assets/agriculture-transparent.svg";
import DynamicInput from "../common/dynamicInput";
import { InputBase } from "@mui/material";
import { useCitySearch } from "@/hooks/useCitySearch";
import { useState } from "react";
import { useBuildingSearch } from "@/hooks/useBuildingSearch";
import { useQuery } from "@tanstack/react-query";
import { BhkResponse, getBhkApiHandler, getPropertyCategoryApiHandler, getPropertyListApiHandler, getPropertyTypeApiHandler, PropertyCategoryResponse, PropertyListResponse, PropertyTypePayload, PropertyTypeResponse } from "@/services/masterService";
import { PropertyCategory, PropertyList, PropertyType } from "@/types/postProperty";
import CustomOptionField from "../common/addCustomOption";
import { generateBHKAmeneties, generateBHKList } from "@/lib/helper";
import DynamicSelect from "../common/select";
import { AREA_UNIT_LIST, FACING_LIST, FIELD_NAME, OWNERSHIP_LIST, PROPERTY_CONSTRUCTION_STATUS, TRANSACTION_TYPE_LIST } from "@/lib/enums";

function CityPlaceholder() {
  return (
    <div className="flex gap-2">
      <Image alt="search" src={"/assets/search.svg"} width={14} height={14} />
      <p className="text-text-gray text-[16px]">Search City</p>
    </div>
  );
}

export default function Step1({setActiveStep, activeStep}: {activeStep: number, setActiveStep?: (state: number) => void}) {
  const { loadCities  } = useCitySearch();
  const { loadBuildings } = useBuildingSearch();

  const [openCustomFieldPopup, setOpenCustomFieldPopup] = useState<boolean>(false)
  const [customFieldLabel, setCustomFieldLabel] = useState<string>('')

  const [basicStaticDetails, setBasicStaticDetails] = useState({
    propertyListFor: null,
    propertyCategory: null,
    propertyType: null,
    city: null,
    society: null,
    locality: null,
  })

  const [dynamicFieldDetails, setDynamicFieldDetails] = useState<any>({
    bhk: null,
    otherBhk: null,
    isStaticBhkDetails: false,
    staticBhKDetails: null,
    builtUpArea: null,
    carpetArea: null,
    transactionType: null,
    propertyConstructionStatus: null,
    propertyAge: null,
    possesionDate: null,
    bathRooms: null,
    bedRooms: null,
    balconies: null,
    ownership: null,
    facing: null,
  })
  const [errors, setErrors] = useState<any>({})

  //Other list
  const [bhkList, setBhkList] = useState(generateBHKList(false))

  console.log('details', basicStaticDetails, dynamicFieldDetails, errors)

  //Master APIS
  const { data: propertyTypeList } = useQuery({
    queryKey: ["propertyList"],
    queryFn: getPropertyListApiHandler,
    select: (data: PropertyListResponse[]): PropertyType[] => {
      const iconList = {
        '5471c8e4-2d1d-4bdc-8e33-6cf005940c93': '/assets/rent-blue.svg',
        '84d108af-39c2-464e-8798-07cfe3cfca70': '/assets/sell-blue.svg'
      }
      return data.map((item) => ({
        icon: iconList[item.id] ?? '',
        ...item,
      }));
    },
    staleTime: 1000 * 60 * 20,
  });

  const { data: propertyCategoryList } = useQuery({
    queryKey: ["propertyCategory"],
    queryFn: getPropertyCategoryApiHandler,
    select: (data: PropertyListResponse[]): PropertyCategory[] => {
      const iconList = {
        'b86c063c-a484-4c16-8224-7faa16231f5e': '/assets/commercial-blue.svg',
        'e4b09cc9-92c2-4d97-854d-74be2a1e76c8': '/assets/residential-blue.svg'
      }
      return data.map((item) => ({
        icon: iconList[item.id] ?? '',
        ...item,
      }));
    },
    staleTime: 1000 * 60 * 20,
  });

  const { data: propertyList } = useQuery({
    queryKey: ["propertyList", basicStaticDetails.propertyCategory?.code, basicStaticDetails.propertyListFor?.code],
    queryFn: () : Promise<PropertyTypeResponse> => getPropertyTypeApiHandler({propertyListType: basicStaticDetails.propertyListFor?.code, propertyCategory: basicStaticDetails.propertyCategory?.code}),
    select: (data: PropertyTypeResponse): PropertyList[] => {
      const iconList = {
        '5912cafb-eef6-4d4f-baf1-0baf8333c936': ApartmentIcon,
        'b6045c9e-990b-4df2-8886-96d0fc67d200': ApartmentIcon,
        '9d58df72-14bc-4ba6-b216-eed0174eca55': IndependentHouse,
        'd1c675b5-8c04-48f1-9902-ee3411d24953': IndependentHouse,
        '1998d7ac-1bbe-4425-acc0-7109eace115d': Duplex,
        '0f4ae099-c39a-45f9-9628-811f1897cf11': Duplex,
        '61917c8a-976a-4cd0-90a5-9cacdf182020': IndependentFloor,
        '6915dc1a-6909-4151-984d-f1213e2112a1': IndependentFloor,
        '22b6c673-82c2-4a53-b5e7-b46c24276a87': Villa,
        '80f2f5f1-99c4-45be-91a6-8a6ab9f14076': Villa,
        'ee5e8bc4-e5e7-4afc-9abf-71f191e954ad': Penthouse,
        'bac448fd-9945-4526-9d7f-303f070c8446': Penthouse,
        '89194365-150c-4b7d-b745-8ec16dec410c': Studio,
        '0bb609d5-e042-41e3-926f-e026d13eb279': Studio,
        '30359953-449b-4a37-9be2-5e98cb8247db': FarmHouse,
        '88675f19-9394-44c3-8b37-0dc27b5cd081': FarmHouse,
        '6b58361a-dfc9-4a11-86da-8cbdd4af47e7': Plot,
        '04d8c60c-54b1-413a-a1ad-5c54c4a5a796': Agriculture,
      }
      return data.propertyTypes.map((item) => ({
        icon: iconList[item.id] ?  iconList[item.id] : Studio,
        ...item,
      }));
    },
    enabled: basicStaticDetails.propertyCategory?.code && basicStaticDetails.propertyListFor?.code ? true : false,
    staleTime: 1000 * 60 * 20,
  });
  
  const { data: dynamicBhkList } = useQuery({
    queryKey: ["propertyList", basicStaticDetails.society?.id, basicStaticDetails.propertyType?.id ],
    queryFn: () : Promise<BhkResponse[]> => getBhkApiHandler({societyId: basicStaticDetails.society?.id, propertyTypeId: basicStaticDetails.propertyType?.id}),
    select: (data: BhkResponse[]): BhkResponse[] => {
      if(Array.isArray(data) && data.length > 0){
        const otherBhk = {
          id: 'other',
          name: 'Other',
          code: 'other',
          sortOrder: data.length,
          builtUpAreas: [],
          bhk: '0',
        }
        data = data.map(item => {
          let num = item.name.match(/[\d.]+/)?.[0] || "2"
          return {...item, bhk: Math.ceil(Number(num))}
        })
         return [...data,otherBhk]
      }
      return []
    },
    enabled: basicStaticDetails.society?.name && basicStaticDetails.society?.source == 'database' ? true : false,
  });

  const returnBhkList = () => {
    if(basicStaticDetails?.society?.source == 'database' && Array.isArray(dynamicBhkList) && dynamicBhkList.length > 0){
      return dynamicBhkList
    }
    return bhkList
  }

  const renderOtherBhk = () => {
    let bhkList = generateBHKList(true)
    bhkList = bhkList.map((item) => {
      return {value: item.name, label: item.name, ...item}
    })
    return bhkList as unknown as OptionType[]
  }

  const renderBHKAmeneties = () => {
    if(dynamicFieldDetails.bhk?.id == 'other' && dynamicFieldDetails.otherBhk?.value){
      return generateBHKAmeneties(dynamicFieldDetails.otherBhk?.bhk)
    }else{
      return generateBHKAmeneties(dynamicFieldDetails.bhk?.bhk)
    }
  }

  const renderShowField = (fieldName: string) => {

    if(fieldName == FIELD_NAME.PROPERTY_TYPE){
      if(basicStaticDetails.propertyListFor && basicStaticDetails.propertyCategory){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BHK){
      if(basicStaticDetails.propertyType && basicStaticDetails.society){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.OTHERBHK){
      if(dynamicFieldDetails.bhk?.id == 'other'){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BUILT_UP_AREA){
      if(basicStaticDetails.propertyType && basicStaticDetails.society && (dynamicFieldDetails.bhk?.isCustom || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.CARPET_AREA){
      if(basicStaticDetails.propertyType && basicStaticDetails.society && (dynamicFieldDetails.bhk?.isCustom || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.TRANSACTION_TYPE){
      if(basicStaticDetails.propertyListFor?.name == 'Sale' && basicStaticDetails.propertyType && basicStaticDetails.society && (dynamicFieldDetails.bhk || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.PROPERTY_CONSTRUCTION_STATUS){
      if(basicStaticDetails.propertyListFor?.name == 'Sale' && basicStaticDetails.propertyType && basicStaticDetails.society && (dynamicFieldDetails.bhk || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.AGE_OF_PROPERTY){
      if(((basicStaticDetails.propertyListFor?.name == 'Sale' && dynamicFieldDetails.propertyConstructionStatus == 'Ready to Move') || basicStaticDetails.propertyListFor?.name == 'Rent') && basicStaticDetails.propertyType && basicStaticDetails.society && (dynamicFieldDetails.bhk || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.POSSESION_DATE){
      if(basicStaticDetails.propertyListFor?.name == 'Sale' && dynamicFieldDetails.propertyConstructionStatus == 'Under Construction' && basicStaticDetails.propertyType && basicStaticDetails.society && (dynamicFieldDetails.bhk || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BATHTROOMS){
      if(basicStaticDetails.propertyType && basicStaticDetails.society && (dynamicFieldDetails.bhk?.isCustom || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BALCONIES){
      if(basicStaticDetails.propertyType && basicStaticDetails.society && (dynamicFieldDetails.bhk?.isCustom || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BEDROOMS){
      if(basicStaticDetails.propertyType && basicStaticDetails.society && (dynamicFieldDetails.bhk?.isCustom || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }
  }

  //Validation
  const validate = () => {
    let hasError = false;
    let updatedError: any = {}

    //Common Validation
    if(!basicStaticDetails.propertyListFor){
      updatedError.propertyListFor = 'Please select the property listing for'
      hasError = true;
    }

    if(!basicStaticDetails.propertyCategory){
      updatedError.propertyCategory = 'Please select the property category'
      hasError = true;
    }

    if(!basicStaticDetails.propertyType){
      updatedError.propertyType = 'Please select the property type'
      hasError = true;
    }

    if(!basicStaticDetails.city){
      updatedError.city = 'Please provide the city name'
      hasError = true;
    }

    if(!basicStaticDetails.society){
      updatedError.society = 'Please provide the details'
      hasError = true;
    }

    if(!basicStaticDetails.locality){
      updatedError.locality = 'Please provide the locality details'
      hasError = true;
    }

    //Dynamic Validation
    if(renderShowField(FIELD_NAME.BHK) && !dynamicFieldDetails.bhk){
      updatedError.bhk = 'Please select the BHK'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.OTHERBHK) && !dynamicFieldDetails.otherBhk){
      updatedError.otherBhk = 'Please select other BHK'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.BUILT_UP_AREA) && !dynamicFieldDetails.builtUpArea){
      updatedError.builtUpArea = 'Please enter a built up area'
      hasError = true
    }

    let currentBhk = Number(dynamicFieldDetails.bhk?.bhk ?? 0)
    let otherBhk = Number(dynamicFieldDetails.otherBhk?.bhk ?? 0)
    if(renderShowField(FIELD_NAME.BUILT_UP_AREA) && dynamicFieldDetails.builtUpArea && (dynamicFieldDetails.builtUpArea > ((currentBhk || otherBhk || 1) * 1500) || dynamicFieldDetails.builtUpArea < (currentBhk || otherBhk || 1) * 150)){
      updatedError.builtUpArea = `Builup area should be between ${(currentBhk || otherBhk || 1) * 150} and ${(currentBhk || otherBhk || 1) * 1500}`
      hasError = true
    }

    if(renderShowField(FIELD_NAME.CARPET_AREA) && !dynamicFieldDetails.carpetArea){
      updatedError.carpetArea = 'Please enter a carpet area'
      hasError = true
    }

    if(renderShowField(FIELD_NAME.CARPET_AREA) && dynamicFieldDetails.carpetArea && (Number(dynamicFieldDetails.carpetArea) > Number(dynamicFieldDetails.builtUpArea))){
      updatedError.carpetArea = 'Carpet area should be less than built up area'
      hasError = true
    }

    if(renderShowField(FIELD_NAME.AGE_OF_PROPERTY) && !dynamicFieldDetails.propertyAge){
      updatedError.propertyAge = 'Please add Age of property details'
      hasError = true
    }

    if(renderShowField(FIELD_NAME.TRANSACTION_TYPE) && !dynamicFieldDetails.transactionType){
      updatedError.transactionType = 'Please select transaction type'
      hasError = true
    }

    if(renderShowField(FIELD_NAME.PROPERTY_CONSTRUCTION_STATUS) && !dynamicFieldDetails.propertyConstructionStatus){
      updatedError.propertyConstructionStatus = 'Please select construction status'
      hasError = true
    }

    if(renderShowField(FIELD_NAME.AGE_OF_PROPERTY) && dynamicFieldDetails.propertyAge && (Number(dynamicFieldDetails.propertyAge) < 0 || Number(dynamicFieldDetails.propertyAge) > 99)){
      updatedError.propertyAge = 'Age of property should be between 0 and 99'
      hasError = true
    }

    if(renderShowField(FIELD_NAME.POSSESION_DATE) && !dynamicFieldDetails.possesionDate){
      updatedError.possesionDate = 'Please select possession date'
      hasError = true
    }

    if(renderShowField(FIELD_NAME.BATHTROOMS) && !dynamicFieldDetails.bathRooms){
      updatedError.bathRooms = 'Please select the bathroom count'
      hasError = true
    }

    if(renderShowField(FIELD_NAME.BEDROOMS) && !dynamicFieldDetails.bedRooms){
      updatedError.bedRooms = 'Please select the bedroom count'
      hasError = true
    }

    if(renderShowField(FIELD_NAME.BALCONIES) && (!dynamicFieldDetails.balconies && dynamicFieldDetails.balconies != 0)){
      updatedError.balconies = 'Please select the balconies count'
      hasError = true
    }

    setErrors(updatedError)
    return hasError;
  }

  const handleOpenAddCustomLocation = (label: string) => {
    setOpenCustomFieldPopup(!openCustomFieldPopup)
    setCustomFieldLabel(label)
  }

  const handleAddCustomLocation = (value: string, label: string) => {
    if(label == 'Society'){
      setBasicStaticDetails((pre) => ({...pre, society: {value: value, label: value}}))
      setErrors((pre) => ({...pre, society: ''}))
    }
    if(label == 'Locality'){
      setBasicStaticDetails((pre) => ({...pre, locality: {value: value, label: value}}))
      setErrors((pre) => ({...pre, locality: ''}))
    }
  }

  return (
    <>
    <div className="flex flex-col gap-4">
      <p className="text-text-black font-semibold text-lg 2md:text-xl pb-2">
        Basic Details
      </p>

      <div>
        {Array.isArray(propertyTypeList) && <FieldLabel label="Property Listing For"  required={true}/>}
        <div className="flex flex-wrap gap-3 pt-2">
          {Array.isArray(propertyTypeList) &&
            propertyTypeList.map((item: PropertyType) => {
              return(
                <ChipTag
                  checked={item.code == basicStaticDetails.propertyListFor?.code}
                  label={item.name}
                  onChagne={() => {
                    setBasicStaticDetails((pre) => ({...pre, propertyListFor: item}))
                    setErrors((pre) => ({...pre, propertyListFor: ''}))
                  }}
                  value={item.id}
                  iconSrc={item.icon}
                  isIcon={true}
                  containerStyle="flex flex-1 2md:flex-none justify-start gap-2 min-w-[100px] 2md:min-w-[180px]"
                />
              )
            })
          }
        </div>
        {errors?.propertyListFor && <p className="pt-1 text-red-500 text-xs">{errors.propertyListFor}</p>}
      </div>

      <div>
        {Array.isArray(propertyCategoryList) && <FieldLabel label="Property Category" required={true}/>}
        <div className="flex flex-wrap gap-3 pt-2">
          {Array.isArray(propertyCategoryList) && 
            propertyCategoryList.map((item: PropertyCategory) => {
              return(
                <ChipTag
                  checked={item.code == basicStaticDetails.propertyCategory?.code}
                  label={item.name}
                  onChagne={() => {
                    setBasicStaticDetails((pre) => ({...pre, propertyCategory: item}))
                    setErrors((pre) => ({...pre, propertyCategory: ''}))
                  }}
                  value={item.id}
                  iconSrc={item.icon}
                  isIcon={true}
                  containerStyle="flex flex-1 2md:flex-none justify-start gap-2 min-w-[100px] 2md:min-w-[180px]"
                />
              )
            })
          }
        </div>
        {errors?.propertyCategory && <p className="pt-1 text-red-500 text-xs">{errors.propertyCategory}</p>}
      </div>

      {renderShowField(FIELD_NAME.PROPERTY_TYPE) && <div>
        <FieldLabel label="Property Type" customClass="pb-2" required={true}/>
        <div className="flex flex-wrap gap-3">
          {Array.isArray(propertyList) && propertyList.map((item, index) => {
            return (
              <button
                className={`cursor-pointer min-w-[120px] 2md:w-[120px] px-3 pt-3 min-h-[90px] flex flex-1 2md:flex-none flex-col items-center gap-1 border border-border border-1 rounded-[10px] ${
                  item.id == basicStaticDetails.propertyType?.id ? "bg-light-purple font-medium" : "text-[#888888]"
                }`}
                onClick={() => {
                  setBasicStaticDetails((pre) => ({...pre, propertyType: item}))
                  setErrors((pre) => ({...pre, propertyType: ''}))
                }}
                key={item.id}
              >
                <item.icon className="w-6 h-6" />
                <p className="text-text-black text-sm text-center">
                  {item.name}
                </p>
              </button>
            );
          })}
        </div>
        {errors?.propertyType && <p className="pt-1 text-red-500 text-xs">{errors.propertyType}</p>}
      </div>}

      <div>
        <FieldLabel label="City" customClass="pb-2" required={true}/>
        <DynamicAsyncSelect
          isMulti={false}
          isError={false}
          placeholder={<CityPlaceholder />}
          onChange={(value) => {
            setBasicStaticDetails((pre) => ({...pre, city: value, locality: null, society: null}))
            setErrors((pre) => ({...pre, city: ''}))
          }}
          loadOptions={loadCities}
          value={basicStaticDetails.city}
          minHeight={"40px"}
        />
        {errors?.city && <p className="pt-1 text-red-500 text-xs">{errors.city}</p>}
      </div>

      <div>
        <FieldLabel
          label="Building / Apartment / Society Name"
          customClass="pb-2"
          required={true}
        />
        <DynamicAsyncSelect
          isMulti={false}
          isError={false}
          placeholder={"Enter Building / Apartment / Society Name"}
          onChange={(value) => {
            if(!Array.isArray(value) && (value as OptionType)?.value == '__add_manually__'){
              handleOpenAddCustomLocation('Society')
              return
            }
            setBasicStaticDetails((pre) => ({...pre, society: value, locality: !Array.isArray(value) && value && "localityName" in value && value.localityName ? {value: value?.localityName, label: value?.localityName} : null}))
            setErrors((pre) => ({...pre, society: '', locality: !Array.isArray(value) && value && "localityName" in value && value.localityName ?  '' : errors?.localityName ?? ''}))
            setBhkList(generateBHKList(false))
            setDynamicFieldDetails((pre) => ({...pre, bhk: null, otherBhk: null}))
          }}
          loadOptions={(inputSearch: string) => loadBuildings({query: inputSearch, cityId: basicStaticDetails.city?.id ?? '', cityName: basicStaticDetails.city?.name})}
          value={basicStaticDetails.society}
          minHeight={"40px"}
          enableAddManually={true}
          menualAddItem={{ value: "__add_manually__",
          label: `Can't find your Building / Apartment / Society? Add Manually`,}}
        />
        {errors?.society && <p className="pt-1 text-red-500 text-xs">{errors.society}</p>}
      </div>

      <div>
        <FieldLabel label="Locality / Sector" customClass="pb-2" required={true}/>
        <DynamicAsyncSelect
          isMulti={false}
          isError={false}
          placeholder={"Enter Locality / Sector"}
          onChange={(value) => {
            if(!Array.isArray(value) && (value as OptionType)?.value == '__add_manually__'){
              handleOpenAddCustomLocation('Locality')
              return
            }
            setBasicStaticDetails((pre) => ({...pre, locality: value, society: !value ? null : basicStaticDetails.society}))
            setErrors((pre) => ({...pre, locality: ''}))
          }}
          loadOptions={loadCities}
          value={basicStaticDetails.locality}
          minHeight={"40px"}
          enableAddManually={true}
          menualAddItem={{ value: "__add_manually__",
          label: `Can't find your Locality / Sector? Add Manually`,}}
        />
        {errors?.locality && <p className="pt-1 text-red-500 text-xs">{errors.locality}</p>}
      </div>

      {renderShowField(FIELD_NAME.BHK) && <div>
        <FieldLabel label="Rooms / BHK" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          {returnBhkList().map((item) => {
            return(
              <ChipTag
                checked={item.name == dynamicFieldDetails.bhk?.name}
                label={item.name}
                onChagne={() => {
                  if(item?.isPlusItem){
                    setBhkList(generateBHKList(true))
                    return
                  }else{
                    setDynamicFieldDetails((pre) => ({...pre, bhk: item, otherBhk: null, bathRooms: null, bedRooms: null, balconies: null}))
                    setErrors((pre) => ({...pre, bhk: ''}))
                  }
                }}
                value={item.id}
                isIcon={false}
                containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[130px]"
              />
            )
          })
          }
        </div>
          {errors?.bhk && <p className="pt-1 text-red-500 text-xs">{errors.bhk}</p>}
      </div>}

      {renderShowField(FIELD_NAME.OTHERBHK) && <div>
        <FieldLabel label="Choose BHK" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          <DynamicSelect
            isMulti={false}
            isError={false}
            placeholder={'Select BHK'}
            onChange={(value) => {
              setDynamicFieldDetails((pre) => ({...pre, otherBhk: value, bathRooms: null, bedRooms: null, balconies: null}))
            setErrors((pre) => ({...pre, otherBhk: ''}))
            }}
            options={renderOtherBhk()}
            value={dynamicFieldDetails.otherBhk}
            minHeight={"40px"}
          />
        </div>
          {errors?.otherBhk && <p className="pt-1 text-red-500 text-xs">{errors.otherBhk}</p>}
      </div>}

      {Array.isArray(dynamicFieldDetails.bhk?.builtUpAreas) && dynamicFieldDetails.bhk?.builtUpAreas.length > 0 && <div>
        <div className="flex flex-wrap gap-3 pt-2 items-stretch">
          {
            dynamicFieldDetails.bhk?.builtUpAreas.map((item) => {
              return(
                <div onClick={() => {
                  setDynamicFieldDetails((pre) => ({
                    ...pre, isStaticBhkDetails: true, staticBhKDetails: item, builtUpArea: item?.superBuiltUpArea, carpetArea: item?.carpetArea, bathRooms: item?.noOfBathrooms, bedRooms: item?.noOfBedrooms, balconies: item?.balconies, 
                  }))
                  setErrors((pre) => ({...pre, builtUpArea: ''}))
                }} className={`flex flex-1 min-w-[240px] justify-between cursor-pointer ${(dynamicFieldDetails.isStaticBhkDetails && (dynamicFieldDetails.staticBhKDetails?.id == item?.id)) ? 'bg-light-purple' : ''} p-3 border border-border border-1 rounded-[10px] gap-5`}>
                  <div className="flex flex-col justify-between">
                      <p className="font-medium text-sm text-text-black">{item.superBuiltUpArea} Sq Ft</p>
                      <p className="text-sm text-text-gray">Super Builtup Area</p>
                      <p className="text-sm text-text-black">{item.noOfBathrooms} Bathrooms</p>
                  </div>
                  <Image alt="home" src='assets/squre-home.svg' width={75} height={75} />
                </div>
              )
            })
          }
            <div onClick={() => {
              setDynamicFieldDetails((pre) => ({...pre, isStaticBhkDetails: true, staticBhKDetails: null}))
            }}  className={`flex flex-1 min-w-[240px] flex-col justify-center cursor-pointer p-3 border border-border border-1 rounded-[10px] text-center ${(dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails) ? 'bg-light-purple' : ''} `}>
              <p className="font-medium text-sm text-text-black">+ Add Here</p>
              <p className="text-sm text-text-gray">My unit is not listed</p>
            </div>
        </div>
      </div>}
      
      {renderShowField(FIELD_NAME.BUILT_UP_AREA) && <div>
        <FieldLabel label="Built Up Area" customClass="pb-2" required={true}/>
        <DynamicInput
           placeHolder='Enter built up area'
           options={AREA_UNIT_LIST}
           onChange={(value: string, dropdownValue: string) => {
            setDynamicFieldDetails((pre) => ({...pre, builtUpArea: value,}))
            setErrors((pre) => ({...pre, builtUpArea: ''}))
           }}
           value={dynamicFieldDetails.builtUpArea}
           dropdownValue={AREA_UNIT_LIST[0].value}
           />
          {errors?.builtUpArea && <p className="pt-1 text-red-500 text-xs">{errors.builtUpArea}</p>}
      </div>}

      {renderShowField(FIELD_NAME.CARPET_AREA) && <div>
        <FieldLabel label="Carpet Area" customClass="pb-2" required={true}/>
        <DynamicInput
           placeHolder='Enter carpet area'
           options={AREA_UNIT_LIST}
            onChange={(value: string, dropdownValue: string) => {
            setDynamicFieldDetails((pre) => ({...pre, carpetArea: value,}))
            setErrors((pre) => ({...pre, carpetArea: ''}))
           }}
           value={dynamicFieldDetails.carpetArea}
           dropdownValue={AREA_UNIT_LIST[0].value}
           />
          {errors?.carpetArea && <p className="pt-1 text-red-500 text-xs">{errors.carpetArea}</p>}
      </div>}

      {renderShowField(FIELD_NAME.TRANSACTION_TYPE) && <div>
        <FieldLabel label="Transaction Type" customClass="pb-2" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
           {
            TRANSACTION_TYPE_LIST.map(item => {
              return(
                <ChipTag
                  checked={item == dynamicFieldDetails.transactionType}
                  label={item}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({...pre, transactionType: item}))
                    setErrors((pre) => ({...pre, transactionType: ''}))
                  }}
                  value={dynamicFieldDetails.transactionType}
                  isIcon={false}
                  containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
                />
              )
            })
           }
        </div>
        {errors?.transactionType && <p className="pt-1 text-red-500 text-xs">{errors.transactionType}</p>}
      </div>}
      {renderShowField(FIELD_NAME.PROPERTY_CONSTRUCTION_STATUS) && <div>
        <FieldLabel label="Construction Status" customClass="pb-2" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
           {
            PROPERTY_CONSTRUCTION_STATUS.map(item => {
              return(
                <ChipTag
                  checked={item == dynamicFieldDetails.propertyConstructionStatus}
                  label={item}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({...pre, propertyConstructionStatus: item}))
                    setErrors((pre) => ({...pre, propertyConstructionStatus: ''}))
                  }}
                  value={dynamicFieldDetails.propertyConstructionStatus}
                  isIcon={false}
                  containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
                />
              )
            })
           }
        </div>
        {errors?.propertyConstructionStatus && <p className="pt-1 text-red-500 text-xs">{errors.propertyConstructionStatus}</p>}
      </div>}

     {renderShowField(FIELD_NAME.AGE_OF_PROPERTY) && <div>
          <FieldLabel label="Age of Property ( in Years)" customClass="pb-2" required={true}/>
          <InputBase
            placeholder="Enter property age"
            fullWidth
            type="number"
            value={dynamicFieldDetails.propertyAge}
            onChange={(event) => {
              const input = event.target.value;
              const isOnlyDigits = /^\d*$/.test(input);
              if(!isOnlyDigits) return
              setDynamicFieldDetails((pre) => ({...pre, propertyAge: input}))
              setErrors((pre) => ({...pre, propertyAge: ''}))
            }}
            className='box-border h-[40px] px-4 py-2 text-sm rounded-full border border-border text-text-gray'
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.propertyAge && <p className="pt-1 text-red-500 text-xs">{errors.propertyAge}</p>}
      </div> }

      {renderShowField(FIELD_NAME.POSSESION_DATE) &&
        <div>
          <FieldLabel label="Possession Date" customClass="pb-2" required={true}/>
          <div>
            <InputBase
              placeholder="Selct"
              type="date"
              fullWidth
              onChange={(e) =>{
                setDynamicFieldDetails((pre) => ({...pre, possesionDate: e.target.value}))
                setErrors((pre) => ({...pre, possesionDate: ''}))
              }
              }
              value={dynamicFieldDetails.possesionDate}
              className={'box-border h-[47.81px] px-4 py-2 text-sm rounded-full border border-border focus:border-blue text-text-gray'}
              inputProps={{
                className: "placeholder-gray",
              }}
            />
            {errors.possesionDate && (
              <p className="pt-1 text-red-500 text-xs">
                {errors.possesionDate}
              </p>
            )}
          </div>
        </div>
      }

      {renderShowField(FIELD_NAME.BATHTROOMS) && <div>
        <FieldLabel label="Bathrooms" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          {
            renderBHKAmeneties().map(item => {
              return(
                <ChipTag
                  checked={item == dynamicFieldDetails.bathRooms}
                  label={item}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({...pre, bathRooms: item}))
                    setErrors((pre) => ({...pre, bathRooms: ''}))
                  }}
                  value={item}
                  isIcon={false}
                  containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                />
              )
            })
          }
        </div>
          {errors?.bathRooms && <p className="pt-1 text-red-500 text-xs">{errors.bathRooms}</p>}
      </div>}

      {renderShowField(FIELD_NAME.BEDROOMS) && <div>
        <FieldLabel label="Bedroom" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          {
            renderBHKAmeneties().map(item => {
              return(
                <ChipTag
                  checked={item == dynamicFieldDetails.bedRooms}
                  label={item}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({...pre, bedRooms: item}))
                    setErrors((pre) => ({...pre, bedRooms: ''}))
                  }}
                  value={item}
                  isIcon={false}
                  containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                />
              )
            })
          }
        </div>
          {errors?.bedRooms && <p className="pt-1 text-red-500 text-xs">{errors.bedRooms}</p>}
      </div>}

      {renderShowField(FIELD_NAME.BALCONIES) && <div>
        <FieldLabel label="Balconies" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={0 == dynamicFieldDetails.balconies}
            label={'0'}
            onChagne={() => {
              setDynamicFieldDetails((pre) => ({...pre, balconies: 0}))
              setErrors((pre) => ({...pre, balconies: ''}))
            }}
            value={0}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          {
            renderBHKAmeneties().map(item => {
              return(
                <ChipTag
                  checked={item == dynamicFieldDetails.balconies}
                  label={item}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({...pre, balconies: item}))
                    setErrors((pre) => ({...pre, balconies: ''}))
                  }}
                  value={item}
                  isIcon={false}
                  containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                />
              )
            })
          }
        </div>
          {errors?.balconies && <p className="pt-1 text-red-500 text-xs">{errors.balconies}</p>}
      </div>}
      
      <div>
        <FieldLabel label="OwnerShip"/>
        <div className="flex flex-wrap gap-3 pt-2">
          {
            OWNERSHIP_LIST.map(item => {
              return(
                <ChipTag
                  checked={item == dynamicFieldDetails.ownership}
                  label={item}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({...pre, ownership: item}))
                  }}
                  value={dynamicFieldDetails.ownership}
                  isIcon={false}
                  containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
                />
              )
            })
          }
        </div>
      </div>

      <div>
        <FieldLabel label="Facing" />
        <div className="flex flex-wrap gap-3 pt-2">
          {
            FACING_LIST.map(item => {
              return(
                <ChipTag
                  checked={item == dynamicFieldDetails.facing}
                  label={item}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({...pre, facing: item}))
                  }}
                  value={dynamicFieldDetails.facing}
                  isIcon={false}
                  containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                />
              )
            })
          }
        </div>
      </div>
    </div>
      <hr className="text-[#D9D9D9] mt-6"></hr>
      <CustomOptionField open={openCustomFieldPopup} onClose={() => handleOpenAddCustomLocation('')} label={customFieldLabel} onSubmit={handleAddCustomLocation}/>
    <div className="flex justify-end w-full">
        <div className="flex flex-wrap justify-start flex-row gap-2 items-center mt-8">
          <button onClick={() => {
            if(activeStep != 1){
                setActiveStep(activeStep - 1)
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
              setActiveStep(activeStep + 1)
            }
          }} className="w-full md:w-[130px] text-sm 1xl:text-base animated-button px-12 py-3 border border-blue text-center cursor-pointer">
            <span className="gap-3 relative flex justify-center">
              <p className={`text-nowrap font-medium`}>{activeStep == 4 ? 'Submit' : 'Next'}</p>
            </span>
          </button>
        </div>
      </div>
      </>
  );
} 
