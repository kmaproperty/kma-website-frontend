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
import { backdropClasses, InputBase } from "@mui/material";
import { useCitySearch } from "@/hooks/useCitySearch";
import { useEffect, useState } from "react";
import { useBuildingSearch } from "@/hooks/useBuildingSearch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BhkResponse, getBhkApiHandler, getPropertyCategoryApiHandler, getPropertyListApiHandler, getPropertyTypeApiHandler, PropertyCategoryResponse, PropertyListResponse, PropertyTypePayload, PropertyTypeResponse } from "@/services/masterService";
import { PropertyCategory, PropertyList, PropertyType } from "@/types/postProperty";
import CustomOptionField from "../common/addCustomOption";
import { generateBHKAmeneties, generateBHKList } from "@/lib/helper";
import DynamicSelect from "../common/select";
import { AREA_UNIT_LIST, FACING_LIST, FIELD_NAME, OWNERSHIP_LIST, PROPERTY_CONSTRUCTION_STATUS, PROPERTY_POSSESSION_STATUS, TRANSACTION_TYPE_LIST } from "@/lib/enums";
import { useDispatch, useSelector } from "react-redux";
import { getActiveStep, setActiveStep } from "@/store/postPropertyProgress";
import { Step1DetailsPayload, Step1DetailsResponse, step1PostPropertyCreateApiHandler, step1PostPropertyDetailsApiHandler, Step1PostPropertyPayload, Step1PostPropertyResponse } from "@/services/postProperty";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useStepProgress } from "@/hooks/useStepProgress";

function CityPlaceholder() {
  return (
    <div className="flex gap-2">
      <Image alt="search" src={"/assets/search.svg"} width={14} height={14} />
      <p className="text-text-gray text-[16px]">Search City</p>
    </div>
  );
}

export default function Step1() {
  const { loadCities  } = useCitySearch();
  const { loadBuildings } = useBuildingSearch();
  const { calculateProgress } = useStepProgress()

  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams();

  const activeStep = useSelector(getActiveStep);
  const dispatch = useDispatch()

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
    propertyPossessionStatus: null,
    propertyAge: null,
    possesionDate: null,
    bathRooms: null,
    bedRooms: null,
    balconies: null,
    ownership: null,
    facing: null,
    plotArea: null,
    selectAreaUnit: null,
    plotLength: null,
    plotWidth: null,
    widthOfFacingRoad: null,
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
        'Rent': '/assets/rent-blue.svg',
        'Sale': '/assets/sell-blue.svg'
      }
      return data.map((item) => ({
        icon: iconList[item.name] ?? '',
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
        'Commercial': '/assets/commercial-blue.svg',
        'Residential': '/assets/residential-blue.svg'
      }
      return data.map((item) => ({
        icon: iconList[item.name] ?? '',
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
        'res-sale-flat': ApartmentIcon,
        'res-rent-flat': ApartmentIcon,
        'res-sale-house': IndependentHouse,
        'res-rent-house': IndependentHouse,
        'res-sale-duplex': Duplex,
        'res-rent-duplex': Duplex,
        'res-sale-builder-floor': IndependentFloor,
        'res-rent-builder-floor': IndependentFloor,
        'res-sale-villa': Villa,
        'res-rent-villa': Villa,
        'res-sale-penthouse': Penthouse,
        'res-rent-penthouse': Penthouse,
        'res-sale-studio': Studio,
        'res-rent-studio': Studio,
        'res-sale-farmhouse': FarmHouse,
        'res-rent-farmhouse': FarmHouse,
        'res-sale-plot': Plot,
        'res-sale-agri-land': Agriculture,
      }
      return data.propertyTypes.map((item) => ({
        icon: iconList[item.code] ?  iconList[item.code] : Studio,
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

  //Show Hide the field based on condition
  const renderShowField = (fieldName: string) => {

    if(fieldName == FIELD_NAME.PROPERTY_TYPE){
      if(basicStaticDetails.propertyListFor && basicStaticDetails.propertyCategory){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BHK){
      if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code != 'res-sale-plot' && basicStaticDetails.propertyType?.code != 'res-sale-agri-land') && (!renderOptionalField(FIELD_NAME.SOCIETY) || basicStaticDetails.society)){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.OTHERBHK){
      if(dynamicFieldDetails.bhk?.id == 'other' && (basicStaticDetails.propertyType?.code != 'res-sale-plot' && basicStaticDetails.propertyType?.code != 'res-sale-agri-land')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BUILT_UP_AREA){
      if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code != 'res-sale-plot' && basicStaticDetails.propertyType?.code != 'res-sale-agri-land') && (!renderOptionalField(FIELD_NAME.SOCIETY) || basicStaticDetails.society) && (dynamicFieldDetails.bhk?.isCustom || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.CARPET_AREA){
      if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code != 'res-sale-plot' && basicStaticDetails.propertyType?.code != 'res-sale-agri-land') && (!renderOptionalField(FIELD_NAME.SOCIETY) || basicStaticDetails.society) && (dynamicFieldDetails.bhk?.isCustom || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.TRANSACTION_TYPE){
      // if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code == 'res-sale-plot' || basicStaticDetails.propertyType?.code == 'res-sale-agri-land')){
      //   return true
      // }else 
      if(basicStaticDetails.propertyListFor?.name == 'Sale' && basicStaticDetails.propertyType && (!renderOptionalField(FIELD_NAME.SOCIETY) || basicStaticDetails.society) && (dynamicFieldDetails.bhk || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.PROPERTY_CONSTRUCTION_STATUS){
      if(basicStaticDetails.propertyListFor?.name == 'Sale' && basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code != 'res-sale-plot' && basicStaticDetails.propertyType?.code != 'res-sale-agri-land') && (!renderOptionalField(FIELD_NAME.SOCIETY) || basicStaticDetails.society) && (dynamicFieldDetails.bhk || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    // if(fieldName == FIELD_NAME.PROPERTY_POSSESSTION_STATUS){
    //   if(basicStaticDetails.propertyListFor?.name == 'Sale' && basicStaticDetails.propertyType  && (basicStaticDetails.propertyType?.code == 'res-sale-plot' || basicStaticDetails.propertyType?.code == 'res-sale-agri-land')){
    //     return true
    //   }
    //   return false
    // }

    if(fieldName == FIELD_NAME.AGE_OF_PROPERTY){
      // if(basicStaticDetails.propertyListFor?.name == 'Sale' && (basicStaticDetails.propertyType?.code == 'res-sale-plot' || basicStaticDetails.propertyType?.code == 'res-sale-agri-land') && dynamicFieldDetails.propertyPossessionStatus == 'Immediate'){
      //   return true
      // }
      if(((basicStaticDetails.propertyListFor?.name == 'Sale' && dynamicFieldDetails.propertyConstructionStatus == 'ready_to_move') || basicStaticDetails.propertyListFor?.name == 'Rent') && basicStaticDetails.propertyType && (!renderOptionalField(FIELD_NAME.SOCIETY) || basicStaticDetails.society) && (dynamicFieldDetails.bhk || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.POSSESION_DATE){
      // if(basicStaticDetails.propertyListFor?.name == 'Sale' && (basicStaticDetails.propertyType?.code == 'res-sale-plot' || basicStaticDetails.propertyType?.code == 'res-sale-agri-land') && dynamicFieldDetails.propertyPossessionStatus == 'In Future'){
      //   return true
      // }
      if(basicStaticDetails.propertyListFor?.name == 'Sale' && dynamicFieldDetails.propertyConstructionStatus == 'under_construction' && basicStaticDetails.propertyType && (!renderOptionalField(FIELD_NAME.SOCIETY) || basicStaticDetails.society) && (dynamicFieldDetails.bhk || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BATHTROOMS){
      if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code != 'res-sale-plot' && basicStaticDetails.propertyType?.code != 'res-sale-agri-land') && (!renderOptionalField(FIELD_NAME.SOCIETY) || basicStaticDetails.society) && (dynamicFieldDetails.bhk?.isCustom || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BALCONIES){
      if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code != 'res-sale-plot' && basicStaticDetails.propertyType?.code != 'res-sale-agri-land') && (!renderOptionalField(FIELD_NAME.SOCIETY) || basicStaticDetails.society) && (dynamicFieldDetails.bhk?.isCustom || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BEDROOMS){
      if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code != 'res-sale-plot' && basicStaticDetails.propertyType?.code != 'res-sale-agri-land') && (!renderOptionalField(FIELD_NAME.SOCIETY) || basicStaticDetails.society) && (dynamicFieldDetails.bhk?.isCustom || dynamicFieldDetails.otherBhk || (dynamicFieldDetails.isStaticBhkDetails && !dynamicFieldDetails.staticBhKDetails))){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.FACING){
      if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code != 'res-sale-plot' && basicStaticDetails.propertyType?.code != 'res-sale-agri-land')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.OWNERSHIP){
      if(basicStaticDetails.propertyType && basicStaticDetails.propertyCategory == 'commercial' && (basicStaticDetails.propertyType?.code != 'res-sale-plot' && basicStaticDetails.propertyType?.code != 'res-sale-agri-land')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.PLOT_AREA){
      if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code == 'res-sale-plot' || basicStaticDetails.propertyType?.code == 'res-sale-agri-land')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.LENGTH_WIDTH){
      if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code == 'res-sale-plot' || basicStaticDetails.propertyType?.code == 'res-sale-agri-land')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.WIDTH_FACING_ROAD){
      if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code == 'res-sale-plot' || basicStaticDetails.propertyType?.code == 'res-sale-agri-land')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.WIDTH_FACING_ROAD){
      if(basicStaticDetails.propertyType && (basicStaticDetails.propertyType?.code == 'res-sale-plot' || basicStaticDetails.propertyType?.code == 'res-sale-agri-land')){
        return true
      }
      return false
    }

  }

  const renderOptionalField = (fieldName: string) => {
    if(fieldName == FIELD_NAME.SOCIETY){
      if(['res-rent-villa', 'res-sale-villa', 'res-sale-house', 'res-rent-house', 'res-sale-duplex', 'res-rent-duplex', 'res-rent-penthouse', 'res-sale-penthouse', 'res-sale-studio', 'res-rent-studio', 'res-rent-farmhouse', 'res-sale-farmhouse', 'res-sale-plot', 'res-rent-builder-floor', 'res-sale-builder-floor', 'res-sale-agri-land'].includes(basicStaticDetails.propertyType?.code)){
        return false
      }
      return true
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

    if(renderOptionalField(FIELD_NAME.SOCIETY) && !basicStaticDetails.society){
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

    if(renderShowField(FIELD_NAME.PROPERTY_POSSESSTION_STATUS) && !dynamicFieldDetails.propertyPossessionStatus){
      updatedError.propertyPossessionStatus = 'Please select possession status'
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

    if(renderShowField(FIELD_NAME.PLOT_AREA) && (!dynamicFieldDetails.plotArea || Number(dynamicFieldDetails.plotArea ?? 0) < 10 || Number(dynamicFieldDetails.plotArea) > 100000)){
      updatedError.plotArea = 'Plot area should be between 10 and 100000'
      hasError = true
    }
    
    if(renderShowField(FIELD_NAME.PLOT_AREA) && (dynamicFieldDetails.plotArea && dynamicFieldDetails.plotLength && dynamicFieldDetails.plotWidth && ( (Number(dynamicFieldDetails.plotLength) * Number(dynamicFieldDetails.plotWidth)) > Number(dynamicFieldDetails.plotArea)))){
      updatedError.plotArea = 'Plot Area value is not as per the value of the dimensions'
      hasError = true
    }

    if(renderShowField(FIELD_NAME.LENGTH_WIDTH) && (!dynamicFieldDetails.plotLength || Number(dynamicFieldDetails.plotLength ?? 0) < 1 || Number(dynamicFieldDetails.plotLength) > 10000)){
      updatedError.plotLength = 'Length should be between 1 and 10000'
      hasError = true
    } 

    if(renderShowField(FIELD_NAME.LENGTH_WIDTH) && (!dynamicFieldDetails.plotWidth || Number(dynamicFieldDetails.plotWidth ?? 0) < 1 || Number(dynamicFieldDetails.plotWidth) > 10000)){
      updatedError.plotWidth = 'Width should be between 1 and 10000'
      hasError = true
    }

    if(renderShowField(FIELD_NAME.WIDTH_FACING_ROAD) && (!dynamicFieldDetails.widthOfFacingRoad || Number(dynamicFieldDetails.widthOfFacingRoad ?? 0) < 50 || Number(dynamicFieldDetails.widthOfFacingRoad) > 500)){
      updatedError.widthOfFacingRoad = 'Facing with should be between 50 and 500'
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

  const generatePayload = ():Step1PostPropertyPayload => {
    let bhk = {}
    if(dynamicFieldDetails.bhk?.isCustom){
      bhk = {
        id: dynamicFieldDetails.bhk?.id && dynamicFieldDetails.bhk?.id.length > 3 ? dynamicFieldDetails.bhk?.id : null ,
        name: dynamicFieldDetails.bhk.name,
        buildUpAreaSqFt: dynamicFieldDetails.builtUpArea,
        carpetAreaSqFt: dynamicFieldDetails.carpetArea,
        noOfBathrooms: dynamicFieldDetails.bathRooms,
        noOfBedrooms: dynamicFieldDetails.bedRooms,
        balconies: dynamicFieldDetails.balconies,
      }
    }else if(dynamicFieldDetails.bhk?.id == 'other'){
      bhk = {
        id: dynamicFieldDetails.otherBhk?.id && dynamicFieldDetails.otherBhk?.id.length > 3 ? dynamicFieldDetails.otherBhk?.id : null ,
        name: dynamicFieldDetails.otherBhk.name,
        buildUpAreaSqFt: dynamicFieldDetails.builtUpArea,
        carpetAreaSqFt: dynamicFieldDetails.carpetArea,
        noOfBathrooms: dynamicFieldDetails.bathRooms,
        noOfBedrooms: dynamicFieldDetails.bedRooms,
        balconies: dynamicFieldDetails.balconies,
      }
    }else if(dynamicFieldDetails.isStaticBhkDetails){
      bhk = {
        id: dynamicFieldDetails.staticBhKDetails?.id && dynamicFieldDetails.staticBhKDetails?.id.length > 3 ? dynamicFieldDetails.staticBhKDetails?.id : null ,
        name: dynamicFieldDetails.staticBhKDetails?.name,
        buildUpAreaSqFt: dynamicFieldDetails.builtUpArea,
        carpetAreaSqFt: dynamicFieldDetails.carpetArea,
        noOfBathrooms: dynamicFieldDetails.bathRooms,
        noOfBedrooms: dynamicFieldDetails.bedRooms,
        balconies: dynamicFieldDetails.balconies,
      }
    }else if(dynamicFieldDetails.bhk?.name){
      bhk = {
        id: dynamicFieldDetails.bhk?.id && dynamicFieldDetails.bhk?.id.length > 3 ? dynamicFieldDetails.bhk?.id : null ,
        name: dynamicFieldDetails?.bhk?.name,
        buildUpAreaSqFt: dynamicFieldDetails.builtUpArea,
        carpetAreaSqFt: dynamicFieldDetails.carpetArea,
        noOfBathrooms: dynamicFieldDetails.bathRooms,
        noOfBedrooms: dynamicFieldDetails.bedRooms,
        balconies: dynamicFieldDetails.balconies,
      }
    }

    return {
      ...(params?.propertyId ? {propertyId: String(params?.propertyId)} : {}),
      listingTypeId: basicStaticDetails.propertyListFor?.id,
      categoryId: basicStaticDetails.propertyCategory?.id,
      propertyTypeId: basicStaticDetails.propertyType?.id,
      
      city: {
        name: basicStaticDetails.city?.name,
        ...(basicStaticDetails.city?.id ? {longitude: basicStaticDetails.city?.id} : {}),
        ...(basicStaticDetails.city?.state ? {longitude: basicStaticDetails.city?.state} : {}),
        ...(basicStaticDetails.city?.latitude ? {longitude: basicStaticDetails.city?.latitude} : {}),
        ...(basicStaticDetails.city?.longitude ? {longitude: basicStaticDetails.city?.longitude} : {}),
      },

      society : {
        name: basicStaticDetails.society?.name,
        localityName: basicStaticDetails.locality?.label,
        ...(basicStaticDetails.society?.id ? {longitude: basicStaticDetails.society?.id} : {}),
        ...(basicStaticDetails.society?.address ? {longitude: basicStaticDetails.society?.address} : {}),
        ...(basicStaticDetails.society?.latitude ? {longitude: basicStaticDetails.society?.latitude} : {}),
        ...(basicStaticDetails.society?.longitude ? {longitude: basicStaticDetails.society?.longitude} : {}),
      },

      locality: {
        name: basicStaticDetails.locality?.label,
        ...(basicStaticDetails.locality?.id ? {
          id: basicStaticDetails.locality?.id,
          sector: basicStaticDetails.locality?.sector,
          latitude: basicStaticDetails.locality?.sector,
          longitude: basicStaticDetails.locality?.longitude
        } : {})
      },

      bhk: bhk,

      transactionType: dynamicFieldDetails.transactionType,
      constructionStatus: dynamicFieldDetails.propertyConstructionStatus,
      ageOfProperty: dynamicFieldDetails.propertyAge,
      possessionTime: dynamicFieldDetails.possesionDate,
      facing: dynamicFieldDetails.facing,
      status: 'draft',
      plotArea: dynamicFieldDetails.plotArea,
      plotAreaUnit: dynamicFieldDetails.selectAreaUnit,
      plotLength: dynamicFieldDetails.plotLength,
      plotWidth: dynamicFieldDetails.plotWidth,
      plotFacingRoadWidth: dynamicFieldDetails.widthOfFacingRoad,
    }
  }

  const { mutate: handleStep1Submit, isPending: ownerLoader } = useMutation({
    mutationFn: async (
      payload: Step1PostPropertyPayload
    ): Promise<Step1PostPropertyResponse> => {
      return await step1PostPropertyCreateApiHandler(payload);
    },
    onSuccess: (response: Step1PostPropertyResponse) => {
      console.log("create owner response", response);
      let propertyId = response.id
      dispatch(setActiveStep({step: activeStep + 1}))
      router.push(`/post-property/${propertyId}`)
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

  const { data: step1Details } = useQuery({
    queryKey: ["step1-details", params?.propertyId],
    queryFn: async (): Promise<Step1DetailsResponse> => {
      return step1PostPropertyDetailsApiHandler(String(params?.propertyId ?? ''));
    },
    select: (resposne: Step1DetailsResponse) => {
      console.log('Step1DetailsResponse',resposne)
      return resposne
    },
    enabled: params?.propertyId ? true : false,
    staleTime: 0,
    refetchOnMount: true
  });

  useEffect(() => {
    if(step1Details){
      setBasicStaticDetails((pre) => ({
          ...pre,
          propertyListFor: step1Details?.listingType,
          propertyCategory: step1Details?.category,
          propertyType: step1Details?.propertyType,
          city: {...step1Details?.city, value: step1Details?.city?.id || step1Details?.city?.name, label: step1Details?.city?.name},
          society: {...step1Details?.society, value: step1Details?.society?.id || step1Details?.society?.name, label: step1Details?.society?.name},
          locality: {...step1Details?.locality, value: step1Details?.locality?.id || step1Details?.locality?.name, label: step1Details?.locality?.name}
      }))

      let num = step1Details?.bhk?.name.match(/[\d.]+/)?.[0] || "2"
      setDynamicFieldDetails((pre) => ({
        ...pre,
        ...(step1Details?.bhk?.name ? {bhk: {...step1Details?.bhk, bhk: Math.ceil(Number(num)), isCustom: true}} : ''),
        otherBhk: null,
        isStaticBhkDetails: false,
        staticBhKDetails: null,
        builtUpArea: step1Details?.bhk?.buildUpAreaSqFt,
        carpetArea: step1Details?.bhk?.carpetAreaSqFt,
        bathRooms: step1Details?.bhk?.noOfBathrooms,
        bedRooms: step1Details?.bhk?.noOfBedrooms,
        balconies: step1Details?.bhk?.balconies,
        facing: step1Details?.facing,

        plotArea: step1Details?.plotArea,
        selectAreaUnit: step1Details?.plotAreaUnit,
        plotLength: step1Details?.plotLength,
        plotWidth: step1Details?.plotWidth,
        widthOfFacingRoad: step1Details?.plotFacingRoadWidth,

        transactionType: TRANSACTION_TYPE_LIST.find(item => item.value == step1Details.transactionType)?.value,
        propertyConstructionStatus: PROPERTY_CONSTRUCTION_STATUS.find(item => item.value == step1Details.constructionStatus)?.value,
        propertyAge: step1Details?.ageOfProperty,
        possesionDate: step1Details?.possessionTime,
      }))
    }
  },[step1Details])

  useEffect(() => {
    calculateProgress()
  }, [dynamicFieldDetails, basicStaticDetails])

  return (
    <>
    <div className="flex flex-col gap-4">
      <p className="text-text-black font-semibold text-lg 2md:text-xl pb-2">
        Basic Details
      </p>

      <div data-field={FIELD_NAME.LISTING_FOR} data-has-value={!!basicStaticDetails.propertyListFor}>
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
                    setDynamicFieldDetails({
                      bhk: null,
                      otherBhk: null,
                      isStaticBhkDetails: false,
                      staticBhKDetails: null,
                      builtUpArea: null,
                      carpetArea: null,
                      transactionType: null,
                      propertyConstructionStatus: null,
                      propertyPossessionStatus: null,
                      propertyAge: null,
                      possesionDate: null,
                      bathRooms: null,
                      bedRooms: null,
                      balconies: null,
                      ownership: null,
                      facing: null,
                      plotArea: null,
                      selectAreaUnit: null,
                      plotLength: null,
                      plotWidth: null,
                      widthOfFacingRoad: null,
                    })
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

      <div data-field={FIELD_NAME.PROPERTY_CATEGORY} data-has-value={!!basicStaticDetails.propertyCategory}>
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
                    setDynamicFieldDetails({
                      bhk: null,
                      otherBhk: null,
                      isStaticBhkDetails: false,
                      staticBhKDetails: null,
                      builtUpArea: null,
                      carpetArea: null,
                      transactionType: null,
                      propertyConstructionStatus: null,
                      propertyPossessionStatus: null,
                      propertyAge: null,
                      possesionDate: null,
                      bathRooms: null,
                      bedRooms: null,
                      balconies: null,
                      ownership: null,
                      facing: null,
                      plotArea: null,
                      selectAreaUnit: null,
                      plotLength: null,
                      plotWidth: null,
                      widthOfFacingRoad: null,
                    })
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

      {renderShowField(FIELD_NAME.PROPERTY_TYPE) && <div data-field={FIELD_NAME.PORPERTY_TYPE} data-has-value={!!basicStaticDetails.propertyType}>
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

      <div data-field={FIELD_NAME.CITY} data-has-value={!!basicStaticDetails.city}>
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

      <div data-field={FIELD_NAME.SOCIETY} data-has-value={!!basicStaticDetails.society}>
        <FieldLabel
          label="Building / Apartment / Society Name"
          customClass="pb-2"
          required={renderOptionalField(FIELD_NAME.SOCIETY)}
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
        {renderOptionalField(FIELD_NAME.SOCIETY) && errors?.society && <p className="pt-1 text-red-500 text-xs">{errors.society}</p>}
      </div>

      <div data-field={FIELD_NAME.LOCALITY} data-has-value={!!basicStaticDetails.locality}>
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
          loadOptions={async() => []}
          value={basicStaticDetails.locality}
          minHeight={"40px"}
          enableAddManually={true}
          menualAddItem={{ value: "__add_manually__",
          label: `Can't find your Locality / Sector? Add Manually`,}}
        />
        {errors?.locality && <p className="pt-1 text-red-500 text-xs">{errors.locality}</p>}
      </div>

      {renderShowField(FIELD_NAME.BHK) && <div data-field={FIELD_NAME.BHK} data-has-value={!!dynamicFieldDetails.bhk}>
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

      {renderShowField(FIELD_NAME.OTHERBHK) && <div data-field={FIELD_NAME.OTHERBHK} data-has-value={!!dynamicFieldDetails.otherBhk}>
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

      {Array.isArray(dynamicBhkList) && dynamicBhkList.length > 0 && Array.isArray(dynamicFieldDetails.bhk?.builtUpAreas) && dynamicFieldDetails.bhk?.builtUpAreas.length > 0 && <div>
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
      
      {renderShowField(FIELD_NAME.BUILT_UP_AREA) && <div data-field={FIELD_NAME.BUILT_UP_AREA} data-has-value={!!dynamicFieldDetails.builtUpArea}>
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

      {renderShowField(FIELD_NAME.CARPET_AREA) && <div data-field={FIELD_NAME.CARPET_AREA} data-has-value={!!dynamicFieldDetails.carpetArea}>
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

      {renderShowField(FIELD_NAME.TRANSACTION_TYPE) && <div data-field={FIELD_NAME.TRANSACTION_TYPE} data-has-value={!!dynamicFieldDetails.transactionType}>
        <FieldLabel label="Transaction Type" customClass="pb-2" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
           {
            TRANSACTION_TYPE_LIST.map((item) => {
              return(
                <ChipTag
                  checked={item.value == dynamicFieldDetails.transactionType}
                  label={item.name}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({...pre, transactionType: item.value}))
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

      {renderShowField(FIELD_NAME.PROPERTY_CONSTRUCTION_STATUS) && <div data-field={FIELD_NAME.PROPERTY_CONSTRUCTION_STATUS} data-has-value={!!dynamicFieldDetails.propertyConstructionStatus}>
        <FieldLabel label="Construction Status" customClass="pb-2" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
           {
            PROPERTY_CONSTRUCTION_STATUS.map((item) => {
              return(
                <ChipTag
                  checked={item.value == dynamicFieldDetails.propertyConstructionStatus}
                  label={item.name}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({...pre, propertyConstructionStatus: item.value}))
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

      {renderShowField(FIELD_NAME.PROPERTY_POSSESSTION_STATUS) && <div data-field={FIELD_NAME.PROPERTY_POSSESSTION_STATUS} data-has-value={!!dynamicFieldDetails.propertyPossessionStatus}>
        <FieldLabel label="Possession Status" customClass="pb-2" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
           {
            PROPERTY_POSSESSION_STATUS.map(item => {
              return(
                <ChipTag
                  checked={item.value == dynamicFieldDetails.propertyPossessionStatus}
                  label={item.name}
                  onChagne={() => {
                    setDynamicFieldDetails((pre) => ({...pre, propertyPossessionStatus: item.value}))
                    setErrors((pre) => ({...pre, propertyPossessionStatus: ''}))
                  }}
                  value={dynamicFieldDetails.propertyPossessionStatus}
                  isIcon={false}
                  containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
                />
              )
            })
           }
        </div>
        {errors?.propertyPossessionStatus && <p className="pt-1 text-red-500 text-xs">{errors.propertyPossessionStatus}</p>}
      </div>}

     {renderShowField(FIELD_NAME.AGE_OF_PROPERTY) && <div data-field={FIELD_NAME.AGE_OF_PROPERTY} data-has-value={!!dynamicFieldDetails.propertyAge || dynamicFieldDetails.propertyAge === 0}>
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
              if(Number(input) > 99) return
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
        <div data-field={FIELD_NAME.POSSESION_DATE} data-has-value={!!dynamicFieldDetails.possesionDate}>
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

      {renderShowField(FIELD_NAME.BATHTROOMS) && <div data-field={FIELD_NAME.BATHTROOMS} data-has-value={!!dynamicFieldDetails.bathRooms}>
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

      {renderShowField(FIELD_NAME.BEDROOMS) && <div data-field={FIELD_NAME.BEDROOMS} data-has-value={!!dynamicFieldDetails.bedRooms}>
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

      {renderShowField(FIELD_NAME.BALCONIES) && <div data-field={FIELD_NAME.BALCONIES} data-has-value={!!dynamicFieldDetails.balconies || dynamicFieldDetails.balconies === 0}>
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
      
      {renderShowField(FIELD_NAME.OWNERSHIP) && <div data-field={FIELD_NAME.OWNERSHIP} data-has-value={!!dynamicFieldDetails.ownership}>
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
      </div>}

      {renderShowField(FIELD_NAME.FACING) && <div data-field={FIELD_NAME.FACING} data-has-value={!!dynamicFieldDetails.facing}>
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
      </div>}

      {renderShowField(FIELD_NAME.PLOT_AREA) && <div data-field={FIELD_NAME.PLOT_AREA} data-has-value={!!dynamicFieldDetails.plotArea}>
        <FieldLabel label="Plot Area" customClass="pb-2" required={true}/>
        <DynamicInput
           placeHolder='Enter Plot Area'
           options={AREA_UNIT_LIST}
           onChange={(value: string, dropdownValue: string) => {
            const isOnlyDigits = /^\d*$/.test(value);
            if(!isOnlyDigits) return;
            setDynamicFieldDetails((pre) => ({...pre, plotArea: value,selectAreaUnit: dropdownValue}))
            let isPloatAreaError = errors?.plotArea
            if(value && (Number(dynamicFieldDetails.plotLength) * Number(dynamicFieldDetails.plotWidth)) > Number(value)){
              isPloatAreaError = 'Plot Area value is not as per the value of the dimensions'
            }else{
              isPloatAreaError = ''
            }
            setErrors((pre) => ({...pre, plotArea: isPloatAreaError}))
           }}
           value={dynamicFieldDetails.plotArea ?? ''}
           dropdownValue={dynamicFieldDetails.selectAreaUnit ?? AREA_UNIT_LIST[0].value}
           />
          {errors?.plotArea && <p className="pt-1 text-red-500 text-xs">{errors.plotArea}</p>}
      </div>}

      {renderShowField(FIELD_NAME.LENGTH_WIDTH) && <div className="grid grid-cols-1 2md:grid-cols-2 gap-3">
        <div data-field={'LENGTH'} data-has-value={!!dynamicFieldDetails.plotLength}>
          <FieldLabel
            label="Length"
            customClass="pb-2"
            required={true}
          />
          <InputBase
            placeholder="Enter Plot Length"
            fullWidth
            value={dynamicFieldDetails.plotLength ?? ''}
            onChange={(e) => {
              const input = e.target.value;
              const isOnlyDigits = /^\d*$/.test(input);
              if (isOnlyDigits){
                setDynamicFieldDetails((pre) => ({...pre, plotLength: input}))
                let isPloatAreaError = errors?.plotArea
                if(dynamicFieldDetails.plotArea && (Number(input) * Number(dynamicFieldDetails.plotWidth)) > dynamicFieldDetails.plotArea){
                  isPloatAreaError = 'Plot Area value is not as per the value of the dimensions'
                }else if(!dynamicFieldDetails.plotArea){
                  isPloatAreaError = 'Plot area should be between 10 and 100000'
                }else{
                  isPloatAreaError = ''
                }
                setErrors((pre) => ({...pre, plotLength: '', plotArea: isPloatAreaError}))
              };
            }}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.plotLength && <p className="pt-1 text-red-500 text-xs">{errors.plotLength}</p>}
        </div>

        <div data-field={'WIDTH'} data-has-value={!!dynamicFieldDetails.plotWidth}>
          <FieldLabel label="Width" customClass="pb-2" required={true} />
          <InputBase
            placeholder="Enter Plot Width"
            fullWidth
            value={dynamicFieldDetails.plotWidth ?? ''}
            onChange={(e) => {
              const input = e.target.value;
              const isOnlyDigits = /^\d*$/.test(input);
              if (!isOnlyDigits) return;
              setDynamicFieldDetails((pre) => ({...pre, plotWidth: input}))
              let isPloatAreaError = errors?.plotArea
              if(dynamicFieldDetails.plotArea && (Number(input) * Number(dynamicFieldDetails.plotLength)) > dynamicFieldDetails.plotArea){
                isPloatAreaError = 'Plot Area value is not as per the value of the dimensions'
              }else if(!dynamicFieldDetails.plotArea){
                isPloatAreaError = 'Plot area should be between 10 and 100000'
              }else{
                isPloatAreaError = ''
              }
              setErrors((pre) => ({...pre, plotWidth: '', plotArea: isPloatAreaError}))
            }}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.plotWidth && <p className="pt-1 text-red-500 text-xs">{errors.plotWidth}</p>}
        </div>
      </div>}

      {renderShowField(FIELD_NAME.WIDTH_FACING_ROAD) && <div data-field={FIELD_NAME.WIDTH_FACING_ROAD} data-has-value={!!dynamicFieldDetails.widthOfFacingRoad}>
          <FieldLabel label="Width of Facing Road" customClass="pb-2" required={true}/>
          <InputBase
            placeholder="Enter Plot Facing Road"
            fullWidth
            type="number"
            value={dynamicFieldDetails.widthOfFacingRoad ?? ''}
            onChange={(event) => {
              const input = event.target.value;
              const isOnlyDigits = /^\d*$/.test(input);
              if(!isOnlyDigits) return
              setDynamicFieldDetails((pre) => ({...pre, widthOfFacingRoad: input}))
              setErrors((pre) => ({...pre, widthOfFacingRoad: ''}))
            }}
            className='box-border h-[40px] px-4 py-2 text-sm rounded-full border border-border text-text-gray'
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.widthOfFacingRoad && <p className="pt-1 text-red-500 text-xs">{errors.widthOfFacingRoad}</p>}
      </div> }

    </div>
      <hr className="text-[#D9D9D9] mt-6"></hr>
      <CustomOptionField open={openCustomFieldPopup} onClose={() => handleOpenAddCustomLocation('')} label={customFieldLabel} onSubmit={handleAddCustomLocation}/>
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
              handleStep1Submit(payload)
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
