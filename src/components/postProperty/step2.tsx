import { InputBase } from "@mui/material";
import FieldLabel from "./fieldLabel";
import ChipTag from "../common/chipTag";
import { useEffect, useRef, useState } from "react";
import { BACHELOR_PREFERENCE, BROKRAGE_CHARGE, CONSTRUCTION_TYPE, CUSTOM_SECTION_NAME, FACING_LIST, FIELD_NAME, LOCK_IN_PERIOD, MAINTENANCE_CHARGES, PROPERTY_POSSESSION_STATUS, RENT_AVAILABEL_FROM, RENT_SUITABLE_FOR, SECURITY_CHARGES, TRANSACTION_TYPE_LIST, TRUTY_LIST } from "@/lib/enums";
import DynamicSelect from "../common/select";
import { generateFloors, generateLockInPeriod } from "@/lib/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Step1DetailsResponse, step1PostPropertyDetailsApiHandler, Step2DetailsResponse, step2PostPropertyCreateApiHandler, step2PostPropertyDetailsApiHandler, Step2PostPropertyPayload, Step2PostPropertyResponse } from "@/services/postProperty";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import CustomCheckbox from "../common/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getActiveStep, setActiveStep, setTotalProgress } from "@/store/postPropertyProgress";
import { useStepProgress } from "@/hooks/useStepProgress";
import DynamicInput from "../common/dynamicInputLeft";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
const QuillEditor = dynamic(() => import("../common/editor"), { ssr: false });


const RenderSectionName = ({data, secNumber}) => {

  return(
    <div className={`flex flex-col pb-3 ${secNumber == 2 ? 'pt-3' : ''}`}>
        <div className="flex items-center gap-2">
          <div className=" border-r-3 border-text-blue rounded-r-[10px] h-[23px]"></div>
          <p className="text-text-black font-semibold text-base 2md:text-lg ">
            {data.name}
          </p>
        </div>

        <p className="text-sm text-text-gray pt-1">
          {data.subName}
        </p>
      </div>
  )

}
export default function Step2() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams();
  const { calculateProgress } = useStepProgress()

  const activeStep = useSelector(getActiveStep);
  const dispatch = useDispatch()
  const possessionDateref = useRef<HTMLInputElement | null>(null);
  const availabelDateref = useRef<HTMLInputElement | null>(null);

  const [basicStaticDetail, setBasicStaticDetail] = useState({
    propertyListFor: null,
    propertyCategory: null,
    propertyType: null,
  })

  const [dynamicFieldDetails, setDynamicFieldDetails] = useState<any>({
    floorNumber: null,
    totalFloor: null,
    towerNumber: null,
    flatNumber: null,
    villaNumber: null,
    houseNumber: null,
    propertyArea: null,
    ploatArea: null,
    rentSuitableFor: [],
    rentPreference: null,
    rentAvailabelFrom: null,
    rentAvailableDate: null,
    rent: null,
    price: null,
    maintenanceCharges: null,
    otherMaintenanceCharges: null,
    securityDeposite: null,
    otherSecurityDeposite: null,
    lockInPeriod: null,
    otherLockInPeriod: null,
    brokerageCharge: null,
    otherBrokerageCharge: null,
    isBrokerageNegotiable: false,

    facing: null,
    plotNumber: null,
    isBoundary: null,
    openSide: null,
    floorConstruction: null,
    constructionDone: null,
    typeOfConstruction: null,
    cornerProperty: null,
    propertyDescription: null,

    transactionType: null,
    propertyPossessionStatus: null,
    propertyAge: null, //missing
    possesionDate: null,
    plotPrice: null,
    loanAvailable: null,
  })

  const [errors, setErrors] = useState<any>({})

  console.log('step-2', dynamicFieldDetails, errors)

  const renderFirstSectionLabel = () => {
    const isResidential = basicStaticDetail.propertyCategory?.code == 'residential'
    const isRent = basicStaticDetail.propertyListFor?.code == 'rent'
    const isSell = basicStaticDetail.propertyListFor?.code == 'sale'
    const propertyType = basicStaticDetail.propertyType?.code

    if(isRent && isResidential && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse'].includes(propertyType)){
      return CUSTOM_SECTION_NAME.FLOOR
    }

    if(isSell && isResidential && ['res-sale-flat', 'res-sale-villa', 'res-sale-house', 'res-sale-duplex', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse'].includes(propertyType)){
      return CUSTOM_SECTION_NAME.FLOOR
    }

    if(isSell && isResidential && ['res-sale-plot', 'res-sale-agri-land'].includes(propertyType)){
      return CUSTOM_SECTION_NAME.PLOT
    }
    return ''
  }

  const renderSecondSectionLabel = () => {
    const isResidential = basicStaticDetail.propertyCategory?.code == 'residential'
    const isRent = basicStaticDetail.propertyListFor?.code == 'rent'
    const isSell = basicStaticDetail.propertyListFor?.code == 'sale'
    const propertyType = basicStaticDetail.propertyType?.code

    if(isRent && isResidential && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse'].includes(propertyType)){
      return CUSTOM_SECTION_NAME.RENT
    }

    if(isSell && isResidential && ['res-sale-flat', 'res-sale-villa', 'res-sale-house', 'res-sale-duplex', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse', 'res-sale-plot', 'res-sale-agri-land'].includes(propertyType)){
      return CUSTOM_SECTION_NAME.PRICE
    }
    return ''
  }

  //Show Hide the field based on condition
  const renderShowField = (fieldName: string) => {
    const isResidential = basicStaticDetail.propertyCategory?.code == 'residential'
    const isRent = basicStaticDetail.propertyListFor?.code == 'rent'
    const isSell = basicStaticDetail.propertyListFor?.code == 'sale'
    const propertyType = basicStaticDetail.propertyType?.code
    if(fieldName == FIELD_NAME.TOTAL_FLOOR){
      if(isResidential && (isRent || isSell) && ['res-rent-flat', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse', 'res-sale-flat', 'res-sale-duplex', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.FLOOR_NUMBER){
      if(isResidential && (isRent || isSell) && ['res-rent-flat', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse', 'res-sale-flat', 'res-sale-duplex', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BLOCK_NO){
      if(isResidential && (isRent || isSell) && ['res-rent-flat', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse', 'res-sale-flat', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.FLAT_NUMBER){
      if(isResidential && (isRent || isSell) && ['res-rent-flat', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse', 'res-sale-flat', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.VILLA_NUMBER){
      if(isResidential && (isRent || isSell) && ['res-rent-villa', 'res-sale-villa'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.HOUSE_NUMBER){
      if(isResidential && (isRent || isSell) && ['res-rent-house', 'res-sale-house'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.DUPLEX_NUMBER){
      if(isResidential && (isRent || isSell) && ['res-rent-duplex', 'res-sale-duplex'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.PROPERTY_AREA){
      if(isResidential && (isRent || isSell) && ['res-rent-flat', 'res-rent-builder-floor', 'res-sale-flat'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.PLOT_AREA){
      if(isResidential &&  (isRent || isSell) && ['res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse', 'res-sale-villa', 'res-sale-house', 'res-sale-duplex', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.FACING){
      if(isResidential &&  isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.PLOT_NUMBER){
      if(isResidential &&  isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.IS_BOUNDARY){
      if(isResidential &&  isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.OPEN_SIDE){
      if(isResidential &&  isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.FLOOR_CONSTRUCTION){
      if(isResidential &&  isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.CONSTRUCTION_DONE){
      if(isResidential &&  isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.TYPE_OF_CONSTRUCTION){
      if(isResidential &&  isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '') && dynamicFieldDetails.constructionDone == 'yes'){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.CORNER_PROPERTY){
      if(isResidential &&  isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.PROPERTY_DESCRRIPTION){
      if(isResidential &&  isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.RENT_SUITABLE){
      if(isResidential && isRent && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BECHLOR_PREFERENCE){
      if(isResidential && isRent && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', , 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '') && dynamicFieldDetails.rentSuitableFor.includes('bachelors')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.RENT_AVAILABEL_FROM){
      if(isResidential && isRent && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', , 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.RENT_AVAILABEL_DATE){
      if(isResidential && isRent && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '') && dynamicFieldDetails.rentAvailabelFrom == 'later'){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.RENT){
      if(isResidential && isRent && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.PRICE_COST){
      if(isResidential && isSell && ['res-sale-flat', 'res-sale-villa', 'res-sale-house', 'res-sale-duplex', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.PLOT_PRICE){
      if(isResidential && isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.MAINTENANCE_CHARGE){
      if(isResidential && (isRent || isSell) && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse', 'res-sale-flat', 'res-sale-villa', 'res-sale-house', 'res-sale-duplex', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse', 'res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.MAINTENANCE_CHARGE_VALUE){
      if(isResidential && (isRent || isSell) && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse', 'res-sale-flat', 'res-sale-villa', 'res-sale-house', 'res-sale-duplex', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse', 'res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '') && dynamicFieldDetails.maintenanceCharges == 'separate'){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.SECURITY_DEPOSITE){
      if(isResidential && isRent && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.CUSTOM_SECURITY_DEPOSITE){
      if(isResidential && isRent && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '') && dynamicFieldDetails.securityDeposite == 'custom'){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.LOCK_IN_PERIOD){
      if(isResidential && isRent && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.CUSTOM_LOCK_IN_PERIOD){
      if(isResidential && isRent && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse'].includes(basicStaticDetail.propertyType?.code ?? '') && dynamicFieldDetails.lockInPeriod == 'custom'){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BROKERAGE_CHARGE){
      if(isResidential && (isRent || isSell) && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse', 'res-sale-flat', 'res-sale-villa', 'res-sale-house', 'res-sale-duplex', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse', 'res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.BROKERAGE_CHARGE_VALUE){
      if(isResidential && (isRent || isSell) && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse', 'res-sale-flat', 'res-sale-villa', 'res-sale-house', 'res-sale-duplex', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse', 'res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '') && dynamicFieldDetails.brokerageCharge == 'custom'){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.NEGOTIABLE_BROKERAGE){
      if(isResidential && (isRent || isSell) && ['res-rent-flat', 'res-rent-villa', 'res-rent-house', 'res-rent-duplex', 'res-rent-builder-floor', 'res-rent-penthouse', 'res-rent-studio', 'res-rent-farmhouse', 'res-sale-flat', 'res-sale-villa', 'res-sale-house', 'res-sale-duplex', 'res-sale-builder-floor', 'res-sale-penthouse', 'res-sale-studio', 'res-sale-farmhouse', 'res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.LOAN_AVAILABLE){
      if(isResidential && isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.TRANSACTION_TYPE){
      if(isResidential && isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.PROPERTY_POSSESSTION_STATUS){
      if(isResidential && isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '')){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.AGE_OF_PROPERTY){
      if(isResidential && isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '') && dynamicFieldDetails.propertyPossessionStatus == 'immediate'){
        return true
      }
      return false
    }

    if(fieldName == FIELD_NAME.POSSESION_DATE){
      if(isResidential && isSell && ['res-sale-plot', 'res-sale-agri-land'].includes(basicStaticDetail.propertyType?.code ?? '') && dynamicFieldDetails.propertyPossessionStatus == 'future'){
        return true
      }
      return false
    }

  }

  const renderOptionalField = (fieldName: string) => {
    if(renderShowField(FIELD_NAME.BECHLOR_PREFERENCE) && !dynamicFieldDetails.rentSuitableFor.includes('bachelors')){
      return false
    }
    return true
  }

  //Validation
  const validate = () => {
    let hasError = false;
    let updatedError: any = {}

    if(renderShowField(FIELD_NAME.TOTAL_FLOOR) && (!dynamicFieldDetails.totalFloor || dynamicFieldDetails.totalFloor == 0)){
      updatedError.totalFloor = 'Please enter valid total floor'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.FLOOR_NUMBER) && (!dynamicFieldDetails.floorNumber || dynamicFieldDetails.floorNumber == 0)){
      updatedError.floorNumber = 'Please select floor number'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.FLOOR_NUMBER) && (dynamicFieldDetails.floorNumber || dynamicFieldDetails.floorNumber == 0) && !['-2', '-1', 'Ground'].includes(dynamicFieldDetails.floorNumber?.value) && Number(dynamicFieldDetails.floorNumber?.value) > Number(dynamicFieldDetails.totalFloor)){
      updatedError.floorNumber = "Floor no. can't be more than total floors"
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.BECHLOR_PREFERENCE) && dynamicFieldDetails.rentSuitableFor.includes('bachelors') && !dynamicFieldDetails.rentPreference){
      updatedError.rentPreference = 'Please select preference for bachelors'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.RENT_AVAILABEL_FROM) && !dynamicFieldDetails.rentAvailabelFrom){
      updatedError.rentAvailabelFrom = 'Please select rent availabel'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.RENT_AVAILABEL_DATE) && !dynamicFieldDetails.rentAvailableDate){
      updatedError.rentAvailableDate = 'Please select rent availabel date'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.RENT) && (!dynamicFieldDetails.rent || (Number(dynamicFieldDetails.rent) < 1500) || (Number(dynamicFieldDetails.rent) > 2000000))){
      updatedError.rent = 'Rent should be between 1500 and 20 Lakhs'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.PRICE_COST) && (!dynamicFieldDetails.price || (Number(dynamicFieldDetails.price) < 100000) || (Number(dynamicFieldDetails.price) > 2000000000))){
      updatedError.rent = 'Price should be between 1 Lakh and 200 Crore'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.MAINTENANCE_CHARGE) && !dynamicFieldDetails?.maintenanceCharges){
      updatedError.maintenanceCharges = 'Please select the maintenance'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.MAINTENANCE_CHARGE_VALUE) && !dynamicFieldDetails?.otherMaintenanceCharges){
      updatedError.otherMaintenanceCharges = 'Please enter the maintenance charges'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.MAINTENANCE_CHARGE_VALUE) && dynamicFieldDetails?.otherMaintenanceCharges){
      if(renderShowField(FIELD_NAME.PRICE_COST) && dynamicFieldDetails.price){
        if(((Number(dynamicFieldDetails.price) * 50) / 100) < Number(dynamicFieldDetails?.otherMaintenanceCharges)){
          updatedError.otherMaintenanceCharges = `Maintenance charge should less then 50% of price`
          hasError = true;
        }
      }
      if(renderShowField(FIELD_NAME.RENT) && dynamicFieldDetails.rent){
        if(((Number(dynamicFieldDetails.rent) * 50) / 100) < Number(dynamicFieldDetails?.otherMaintenanceCharges)){
          updatedError.otherMaintenanceCharges = `Maintenance charge should less then 50% of rent`
          hasError = true;
        }
      }
      if(renderShowField(FIELD_NAME.PLOT_PRICE) && dynamicFieldDetails.plotPrice){
        if(((Number(dynamicFieldDetails.plotPrice) * 50) / 100) < Number(dynamicFieldDetails?.otherMaintenanceCharges)){
          updatedError.otherMaintenanceCharges = `Maintenance charge should less then 50% of plot price`
          hasError = true;
        }
      }
      
    }

    if(renderShowField(FIELD_NAME.SECURITY_DEPOSITE) && !dynamicFieldDetails?.securityDeposite){
      updatedError.securityDeposite = 'Please select the security deposit'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.CUSTOM_SECURITY_DEPOSITE) && !dynamicFieldDetails?.otherSecurityDeposite){
      updatedError.otherSecurityDeposite = 'Please enter the security deposit'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.LOCK_IN_PERIOD) && !dynamicFieldDetails?.lockInPeriod){
      updatedError.lockInPeriod = 'Please select the lock-in period'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.CUSTOM_LOCK_IN_PERIOD) && !dynamicFieldDetails?.otherLockInPeriod){
      updatedError.otherLockInPeriod = 'Please Select Lock in Period'
      hasError = true;
    }

     if(renderShowField(FIELD_NAME.BROKERAGE_CHARGE) && !dynamicFieldDetails?.brokerageCharge){
      updatedError.brokerageCharge = 'Please select the brokerage'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.BROKERAGE_CHARGE_VALUE) && !dynamicFieldDetails?.otherBrokerageCharge){
      updatedError.otherBrokerageCharge = 'Please enter brokerage charge'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.OPEN_SIDE) && !dynamicFieldDetails?.openSide){
      updatedError.openSide = 'Please Select the No. of Open Sides'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.TYPE_OF_CONSTRUCTION) && dynamicFieldDetails.constructionDone == 'yes' && !dynamicFieldDetails?.typeOfConstruction){
      updatedError.typeOfConstruction = 'Please Select the type of construction been done'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.TRANSACTION_TYPE) && !dynamicFieldDetails?.transactionType){
      updatedError.transactionType = 'Please select the transaction type'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.PROPERTY_POSSESSTION_STATUS) && !dynamicFieldDetails?.propertyPossessionStatus){
      updatedError.propertyPossessionStatus = 'Please select the possession status'
      hasError = true;
    }

    if(renderShowField(FIELD_NAME.AGE_OF_PROPERTY) && !dynamicFieldDetails.propertyAge){
      updatedError.propertyAge = 'Please add Age of property'
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
    if(renderShowField(FIELD_NAME.PLOT_PRICE) && (!dynamicFieldDetails.plotPrice || (Number(dynamicFieldDetails.plotPrice) < 100000) || (Number(dynamicFieldDetails.plotPrice) > 2000000000))){
      updatedError.plotPrice = 'Plot price should be between 1 Lakh and 200 Crore'
      hasError = true;
    }

    setErrors(updatedError)
    return hasError
  }

  const generatePayload = ():Step2PostPropertyPayload => { 
    return {
      propertyId: String(params?.propertyId),
      floorNumber: dynamicFieldDetails?.floorNumber ? dynamicFieldDetails?.floorNumber?.value : null,
      totalFloors: dynamicFieldDetails?.totalFloor,
      flatNumber: dynamicFieldDetails?.flatNumber,
      towerBlock: dynamicFieldDetails?.towerNumber,
      propertyAreaAcre: dynamicFieldDetails?.propertyArea,
      tenantType: dynamicFieldDetails?.rentSuitableFor.lenght > 0 ? dynamicFieldDetails?.rentSuitableFor.join(', ') : null,
      companyOccupancy: dynamicFieldDetails?.rentPreference,
      rentAvailability: dynamicFieldDetails?.rentAvailabelFrom,
      availableFromDate: dynamicFieldDetails?.rentAvailableDate,
      monthlyRent: dynamicFieldDetails?.rent,
      maintenanceType: dynamicFieldDetails?.maintenanceCharges,
      maintenanceChargeAmount: dynamicFieldDetails?.otherMaintenanceCharges,
      securityDepositType: dynamicFieldDetails?.securityDeposite,
      securityDepositAmount: dynamicFieldDetails?.otherSecurityDeposite,
      lockInType: dynamicFieldDetails?.lockInPeriod,
      lockInMonths: dynamicFieldDetails?.otherLockInPeriod ? dynamicFieldDetails?.otherLockInPeriod?.value : null,
      brokerageType:  dynamicFieldDetails?.brokerageCharge,
      brokerageAmount: dynamicFieldDetails?.otherBrokerageCharge,
      isBrokerageNegotiable: dynamicFieldDetails?.isBrokerageNegotiable,
      price: dynamicFieldDetails?.price,
      plotArea: dynamicFieldDetails?.ploatArea,
      plotAreaUnit: 'sqft',
      plotNumber: dynamicFieldDetails.plotNumber,
      houseNumber: dynamicFieldDetails?.houseNumber,
      villaNumber: dynamicFieldDetails?.villaNumber,
      transactionType: dynamicFieldDetails?.transactionType,
      possessionStatus: dynamicFieldDetails?.propertyPossessionStatus,
      ageOfProperty: dynamicFieldDetails?.propertyAge,
      possessionDate: dynamicFieldDetails?.possesionDate,
      plotPrice: dynamicFieldDetails?.plotPrice,
      loanAvailable: dynamicFieldDetails?.loanAvailable,
      facing: dynamicFieldDetails?.facing,
      boundaryWall: dynamicFieldDetails?.isBoundary,
      noOfOpenSides: dynamicFieldDetails?.openSide,
      floorsAllowedForConstruction: dynamicFieldDetails?.floorConstruction,
      constructionDone: dynamicFieldDetails?.constructionDone,
      constructionType: dynamicFieldDetails?.typeOfConstruction,
      cornerProperty: dynamicFieldDetails?.cornerProperty,
      propertyDescription: dynamicFieldDetails?.propertyDescription
    }
  }

  const { mutate: handleStep2Submit, isPending: ownerLoader } = useMutation({
    mutationFn: async (
      payload: Step2PostPropertyPayload
    ): Promise<Step2PostPropertyResponse> => {
      return await step2PostPropertyCreateApiHandler(payload);
    },
    onSuccess: (response: Step2PostPropertyResponse) => {
      console.log("create owner response", response);
      const propertyType = basicStaticDetail.propertyType?.code
      const isStep3Skipped = ['res-sale-plot', 'res-sale-agri-land'].includes(propertyType ?? '')
      if(isStep3Skipped){
        dispatch(setActiveStep({step: activeStep + 2}))
      }else{
        dispatch(setActiveStep({step: activeStep + 1}))
      }
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
    queryKey: ["step1-in-2-details", params?.propertyId],
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

  const { data: step2Details } = useQuery({
    queryKey: ["step2-details", params?.propertyId],
    queryFn: async (): Promise<Step2DetailsResponse> => {
      return step2PostPropertyDetailsApiHandler(String(params?.propertyId ?? ''));
    },
    select: (resposne: Step2DetailsResponse) => {
      console.log('Step1DetailsResponse',resposne)
      return resposne
    },
    enabled: params?.propertyId ? true : false,
    staleTime: 0,
    refetchOnMount: true
  });

  useEffect(() => {
      if(step1Details){
        setBasicStaticDetail((pre) => ({
            ...pre,
            propertyListFor: step1Details?.listingType,
            propertyCategory: step1Details?.category,
            propertyType: step1Details?.propertyType,
        }))
        dispatch(setTotalProgress({progress: step1Details.progressPercentage}))
      }
    },[step1Details])

    useEffect(() => {
      if(step2Details){
        setDynamicFieldDetails((pre) => ({...pre, 
          floorNumber: step2Details?.floorNumber ? {value: step2Details?.floorNumber, label: step2Details?.floorNumber} : null,
          totalFloor: step2Details?.totalFloors,
          towerNumber: step2Details?.towerBlock,
          flatNumber: step2Details?.flatNumber,
          villaNumber: step2Details?.villaNumber,
          houseNumber: step2Details?.houseNumber,
          propertyArea: step2Details?.propertyAreaAcre,
          ploatArea: step2Details?.plotArea,
          rentSuitableFor: step2Details?.tenantType ? step2Details?.tenantType.split(','): [],
          rentPreference: step2Details?.companyOccupancy,
          rentAvailabelFrom: step2Details?.rentAvailability,
          rentAvailableDate: step2Details?.availableFromDate,
          rent: step2Details?.monthlyRent,
          price: step2Details?.price,
          maintenanceCharges: step2Details?.maintenanceType,
          otherMaintenanceCharges: step2Details?.maintenanceChargeAmount,
          securityDeposite: step2Details?.securityDepositType,
          otherSecurityDeposite: step2Details?.securityDepositAmount,
          lockInPeriod: step2Details?.lockInType,
          otherLockInPeriod: step2Details?.lockInMonths ? {value: step2Details?.lockInMonths, label: step2Details?.lockInMonths} : null,
          brokerageCharge: step2Details?.brokerageType,
          otherBrokerageCharge: step2Details?.brokerageAmount,
          isBrokerageNegotiable: step2Details?.isBrokerageNegotiable ?? false,

          facing: step2Details?.facing,
          plotNumber: step2Details?.plotNumber,
          isBoundary: step2Details?.boundaryWall,
          openSide: step2Details?.noOfOpenSides,
          floorConstruction: step2Details?.floorsAllowedForConstruction,
          constructionDone: step2Details?.constructionDone,
          typeOfConstruction: step2Details?.constructionType,
          cornerProperty: step2Details?.cornerProperty,
          propertyDescription: step2Details?.propertyDescription,

          transactionType: step2Details?.transactionType,
          propertyPossessionStatus: step2Details?.possessionStatus,
          propertyAge: step2Details?.ageOfProperty,
          possesionDate: step2Details?.possessionDate,
          plotPrice: step2Details?.plotPrice,
          loanAvailable: step2Details?.loanAvailable,
        }))
      } 
    },[step2Details])

    // useEffect(() => {
    //     calculateProgress()
    //   }, [dynamicFieldDetails])

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-text-black font-semibold text-lg 2md:text-xl pb-2">
          Property Details
        </p>

        {!!renderFirstSectionLabel() && <RenderSectionName secNumber={1} data={renderFirstSectionLabel()}/>}

        {(renderShowField(FIELD_NAME.TOTAL_FLOOR) || renderShowField(FIELD_NAME.FLOOR_NUMBER)) && <div className="grid grid-cols-1 2md:grid-cols-2 gap-3">
          
          {renderShowField(FIELD_NAME.TOTAL_FLOOR) && <div data-field={FIELD_NAME.TOTAL_FLOOR} data-has-value={!!dynamicFieldDetails.totalFloor}>
            <FieldLabel label="Total Floor Count" customClass="pb-2" required={true} />
            <InputBase
              placeholder="Enter total floor count"
              fullWidth
              value={dynamicFieldDetails.totalFloor ?? ''}
              onChange={(e) => {
                const input = e.target.value;
                const isOnlyDigits = /^\d*$/.test(input);
                if (!isOnlyDigits) return;
                setDynamicFieldDetails((pre) => ({...pre, totalFloor: input}))
                setErrors((pre) => ({...pre, totalFloor: ''}))
              }}
              className={
                "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
              }
              inputProps={{
                className: "placeholder-gray",
              }}
            />
            {errors?.totalFloor && <p className="pt-1 text-red-500 text-xs">{errors.totalFloor}</p>}
          </div>}

          {renderShowField(FIELD_NAME.FLOOR_NUMBER) && <div data-field={FIELD_NAME.FLOOR_NUMBER} data-has-value={!!dynamicFieldDetails.floorNumber}>
            <FieldLabel
              label="Property on Floor / Floor Number"
              customClass="pb-2"
              required={true}
            />
            <DynamicSelect
              isMulti={false}
              isError={false}
              placeholder={'Select Floor'}
              onChange={(value) => {
                setDynamicFieldDetails((pre) => ({...pre, floorNumber: value}))
                setErrors((pre) => ({...pre, floorNumber: ''}))
              }}
              options={generateFloors(dynamicFieldDetails.totalFloor)}
              value={dynamicFieldDetails.floorNumber}
              minHeight={"40px"}
            />
            {errors?.floorNumber && <p className="pt-1 text-red-500 text-xs">{errors.floorNumber}</p>}
          </div>}
        </div>}

        {renderShowField(FIELD_NAME.BLOCK_NO) && <div data-field={FIELD_NAME.BLOCK_NO} data-has-value={!!dynamicFieldDetails.towerNumber}>
          <FieldLabel label="Tower / Block No" customClass="pb-2" />
          <InputBase
            placeholder="Enter tower / block no."
            fullWidth
            value={dynamicFieldDetails.towerNumber}
            onChange={(e) => {
              const input = e.target.value;
              setDynamicFieldDetails((pre) => ({...pre, towerNumber: input}))
              setErrors((pre) => ({...pre, towerNumber: ''}))
            }}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.towerNumber && <p className="pt-1 text-red-500 text-xs">{errors.towerNumber}</p>}
        </div>}

        {renderShowField(FIELD_NAME.FLAT_NUMBER) && <div data-field={FIELD_NAME.FLAT_NUMBER} data-has-value={!!dynamicFieldDetails.flatNumber}>
          <FieldLabel label="Flat Number" customClass="pb-2" />
          <InputBase
            placeholder="Enter flat number"
            fullWidth
            value={dynamicFieldDetails.flatNumber}
            onChange={(e) => {
              const input = e.target.value;
              setDynamicFieldDetails((pre) => ({...pre, flatNumber: input}))
              setErrors((pre) => ({...pre, flatNumber: ''}))
            }}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.flatNumber && <p className="pt-1 text-red-500 text-xs">{errors.flatNumber}</p>}
        </div>}

        {renderShowField(FIELD_NAME.VILLA_NUMBER) && <div data-field={FIELD_NAME.VILLA_NUMBER} data-has-value={!!dynamicFieldDetails.villaNumber}>
          <FieldLabel label="Villa Number / Plot Number" customClass="pb-2" />
          <InputBase
            placeholder="Enter villa number / plot number"
            fullWidth
            value={dynamicFieldDetails.villaNumber}
            onChange={(e) => {
              const input = e.target.value;
              setDynamicFieldDetails((pre) => ({...pre, villaNumber: input}))
              setErrors((pre) => ({...pre, villaNumber: ''}))
            }}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.villaNumber && <p className="pt-1 text-red-500 text-xs">{errors.villaNumber}</p>}
        </div>}

        {renderShowField(FIELD_NAME.HOUSE_NUMBER) && <div data-field={FIELD_NAME.HOUSE_NUMBER} data-has-value={!!dynamicFieldDetails.houseNumber}>
          <FieldLabel label="House Number / Plot Number" customClass="pb-2" />
          <InputBase
            placeholder="Enter house number / plot number"
            fullWidth
            value={dynamicFieldDetails.houseNumber}
            onChange={(e) => {
              const input = e.target.value;
              setDynamicFieldDetails((pre) => ({...pre, houseNumber: input}))
              setErrors((pre) => ({...pre, houseNumber: ''}))
            }}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.houseNumber && <p className="pt-1 text-red-500 text-xs">{errors.houseNumber}</p>}
        </div>}

        {renderShowField(FIELD_NAME.DUPLEX_NUMBER) && <div data-field={FIELD_NAME.DUPLEX_NUMBER} data-has-value={!!dynamicFieldDetails.houseNumber}>
          <FieldLabel label="House Number / Duplex Unit" customClass="pb-2" />
          <InputBase
            placeholder="Enter house number / duplex unit"
            fullWidth
            value={dynamicFieldDetails.houseNumber}
            onChange={(e) => {
              const input = e.target.value;
              setDynamicFieldDetails((pre) => ({...pre, houseNumber: input}))
              setErrors((pre) => ({...pre, houseNumber: ''}))
            }}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.houseNumber && <p className="pt-1 text-red-500 text-xs">{errors.houseNumber}</p>}
        </div>}

        {renderShowField(FIELD_NAME.PROPERTY_AREA) && <div data-field={FIELD_NAME.PROPERTY_AREA} data-has-value={!!dynamicFieldDetails.propertyArea}>
          <FieldLabel label="Property Area (Acres)" customClass="pb-2" />
          <InputBase
            placeholder="Acres "
            fullWidth
            value={dynamicFieldDetails.propertyArea}
            onChange={(e) => {
              const input = e.target.value;
              const isOnlyDigits = /^\d*$/.test(input);
              if (!isOnlyDigits) return;
              setDynamicFieldDetails((pre) => ({...pre, propertyArea: input}))
              setErrors((pre) => ({...pre, propertyArea: ''}))
            }}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.propertyArea && <p className="pt-1 text-red-500 text-xs">{errors.propertyArea}</p>}
        </div>}

        {renderShowField(FIELD_NAME.PLOT_AREA) && <div data-field={FIELD_NAME.PLOT_AREA} data-has-value={!!dynamicFieldDetails.ploatArea}>
          <FieldLabel label="Plot Area (Acres)" customClass="pb-2" />
          <InputBase
            placeholder="Acres "
            fullWidth
            value={dynamicFieldDetails.ploatArea ?? ''}
            onChange={(e) => {
              const input = e.target.value;
              const isOnlyDigits = /^\d*$/.test(input);
              if (!isOnlyDigits) return;
              setDynamicFieldDetails((pre) => ({...pre, ploatArea: input}))
              setErrors((pre) => ({...pre, ploatArea: ''}))
            }}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.ploatArea && <p className="pt-1 text-red-500 text-xs">{errors.ploatArea}</p>}
        </div>}

        {/* Seal Plot start*/}
        
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

        {renderShowField(FIELD_NAME.PLOT_NUMBER) && <div data-field={FIELD_NAME.PLOT_NUMBER} data-has-value={!!dynamicFieldDetails.plotNumber}>
          <FieldLabel label="Plot Number" customClass="pb-2" />
          <InputBase
            placeholder="Enter plot number"
            fullWidth
            value={dynamicFieldDetails.plotNumber}
            onChange={(e) => {
              const input = e.target.value;
              setDynamicFieldDetails((pre) => ({...pre, plotNumber: input}))
              setErrors((pre) => ({...pre, plotNumber: ''}))
            }}
            className={
              "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
            }
            inputProps={{
              className: "placeholder-gray",
            }}
          />
          {errors?.plotNumber && <p className="pt-1 text-red-500 text-xs">{errors.plotNumber}</p>}
        </div>}

        {renderShowField(FIELD_NAME.IS_BOUNDARY) && <div data-field={FIELD_NAME.IS_BOUNDARY} data-has-value={!!dynamicFieldDetails.isBoundary}>
          <FieldLabel label="Is There a Boundary Wall Around the Property?" />
          <div className="flex flex-wrap gap-3 pt-2">
            {
              TRUTY_LIST.map(item => {
                return(
                  <ChipTag
                    checked={item.value == dynamicFieldDetails.isBoundary}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, isBoundary: item.value}))
                    }}
                    value={dynamicFieldDetails.isBoundary}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                  />
                )
              })
            }
          </div>
        </div>}

        {renderShowField(FIELD_NAME.OPEN_SIDE) && <div data-field={FIELD_NAME.OPEN_SIDE} data-has-value={!!dynamicFieldDetails.openSide}>
          <FieldLabel label="Number Of Open Side" required={true}/>
          <div className="flex flex-wrap gap-3 pt-2">
            {
              ['1','2','3','4', '5+'].map(item => {
                return(
                  <ChipTag
                    checked={item == dynamicFieldDetails.openSide}
                    label={item}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, openSide: item}))
                      setErrors((pre) => ({...pre, openSide: ''}))
                    }}
                    value={dynamicFieldDetails.openSide}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                  />
                )
              })
            }
          </div>
            {errors?.openSide && <p className="pt-1 text-red-500 text-xs">{errors.openSide}</p>}
        </div>}

        {renderShowField(FIELD_NAME.FLOOR_CONSTRUCTION) && <div data-field={FIELD_NAME.FLOOR_CONSTRUCTION} data-has-value={!!dynamicFieldDetails.floorConstruction}>
            <FieldLabel label="Floor Allow for constuction" customClass="pb-2"/>
            <InputBase
              placeholder="No of floor"
              fullWidth
              value={dynamicFieldDetails.floorConstruction ?? ''}
              onChange={(e) => {
                const input = e.target.value;
                const isOnlyDigits = /^\d*$/.test(input);
                if (!isOnlyDigits) return;
                if(Number(input) > 99) return
                setDynamicFieldDetails((pre) => ({...pre, floorConstruction: input}))
                setErrors((pre) => ({...pre, floorConstruction: ''}))
              }}
              className={
                "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
              }
              inputProps={{
                className: "placeholder-gray",
              }}
            />
            {errors?.floorConstruction && <p className="pt-1 text-red-500 text-xs">{errors.floorConstruction}</p>}
        </div>}

        {renderShowField(FIELD_NAME.CONSTRUCTION_DONE) && <div data-field={FIELD_NAME.CONSTRUCTION_DONE} data-has-value={!!dynamicFieldDetails.constructionDone}>
          <FieldLabel label="Any Construction Done On This Property?" />
          <div className="flex flex-wrap gap-3 pt-2">
            {
              TRUTY_LIST.map(item => {
                return(
                  <ChipTag
                    checked={item.value == dynamicFieldDetails.constructionDone}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, constructionDone: item.value}))
                    }}
                    value={dynamicFieldDetails.constructionDone}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                  />
                )
              })
            }
          </div>
        </div>}

        {renderShowField(FIELD_NAME.TYPE_OF_CONSTRUCTION) && <div data-field={FIELD_NAME.TYPE_OF_CONSTRUCTION} data-has-value={!!dynamicFieldDetails.typeOfConstruction}>
          <FieldLabel label="Any Construction Done On This Property?" required={true}/>
          <div className="flex flex-wrap gap-3 pt-2">
            {
              CONSTRUCTION_TYPE.map(item => {
                return(
                  <ChipTag
                    checked={item.value == dynamicFieldDetails.typeOfConstruction}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, typeOfConstruction: item.value}))
                    }}
                    value={dynamicFieldDetails.typeOfConstruction}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                  />
                )
              })
            }
          </div>
            {errors?.typeOfConstruction && <p className="pt-1 text-red-500 text-xs">{errors.typeOfConstruction}</p>}
        </div>}

        {renderShowField(FIELD_NAME.CORNER_PROPERTY) && <div data-field={FIELD_NAME.CORNER_PROPERTY} data-has-value={!!dynamicFieldDetails.cornerProperty}>
          <FieldLabel label="Corner Property" />
          <div className="flex flex-wrap gap-3 pt-2">
            {
              TRUTY_LIST.map(item => {
                return(
                  <ChipTag
                    checked={item.value == dynamicFieldDetails.cornerProperty}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, cornerProperty: item.value}))
                    }}
                    value={dynamicFieldDetails.cornerProperty}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                  />
                )
              })
            }
          </div>
        </div>}

        {renderShowField(FIELD_NAME.PROPERTY_DESCRRIPTION) && <div data-field={FIELD_NAME.PROPERTY_DESCRRIPTION} data-has-value={!!dynamicFieldDetails.propertyDescription}>
            <FieldLabel label="Property Description" customClass="pb-2"/>
            <QuillEditor value={dynamicFieldDetails.propertyDescription} 
            onChange={(value) => {
              setDynamicFieldDetails((pre) => ({...pre, propertyDescription: value}))
            }}
            />
        </div>}

        {/* Seal Plot end*/}

        {!!renderSecondSectionLabel() && <RenderSectionName secNumber={2} data={renderSecondSectionLabel()}/>}

        {renderShowField(FIELD_NAME.RENT_SUITABLE) && <div data-field={FIELD_NAME.RENT_SUITABLE} data-has-value={dynamicFieldDetails.rentSuitableFor.length > 0}>
          <FieldLabel label="Rent Suitable For/ Preferred Tenant Type" />
          <div className="flex flex-wrap gap-3 pt-2">
            {
              RENT_SUITABLE_FOR.map(item => {
                return(
                  <ChipTag
                    checked={dynamicFieldDetails.rentSuitableFor.includes(item.value)}
                    label={item.name}
                    onChagne={() => {
                      if(dynamicFieldDetails.rentSuitableFor.includes(item.value)){
                        let newData = dynamicFieldDetails.rentSuitableFor.filter(preItem => preItem != item.value)
                        setDynamicFieldDetails((pre) => ({...pre, rentSuitableFor: newData}))
                      }else{
                        setDynamicFieldDetails((pre) => ({...pre, rentSuitableFor: [...dynamicFieldDetails.rentSuitableFor, item.value]}))
                      }
                      setErrors((pre) => ({...pre, rentSuitableFor: ''}))
                    }}
                    value={item.value}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
                  />
                )
              })
            }
          </div>
        </div>}

        {renderShowField(FIELD_NAME.BECHLOR_PREFERENCE) && <div data-field={FIELD_NAME.BECHLOR_PREFERENCE} data-has-value={!!dynamicFieldDetails.rentPreference}>
          <FieldLabel label="Select your preference for bachelors" required={renderOptionalField(FIELD_NAME.BECHLOR_PREFERENCE)}/>
          <div className="flex flex-wrap gap-3 pt-2">
            {
              BACHELOR_PREFERENCE.map((item) => {
                return(
                  <ChipTag
                    checked={dynamicFieldDetails.rentPreference == item.value}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, rentPreference: item.value}))
                      setErrors((pre) => ({...pre, rentPreference: ''}))
                    }}
                    value={dynamicFieldDetails.rentPreference}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
                  />
                )
              })
            }
          </div>
          {errors?.rentPreference && <p className="pt-1 text-red-500 text-xs">{errors.rentPreference}</p>}
        </div>}

        {renderShowField(FIELD_NAME.RENT_AVAILABEL_FROM) && <div data-field={FIELD_NAME.RENT_AVAILABEL_FROM} data-has-value={!!dynamicFieldDetails.rentAvailabelFrom}>
          <FieldLabel label="Rent Available From" required={true}/>
          <div className="flex flex-wrap gap-3 pt-2">
            {
              RENT_AVAILABEL_FROM.map(item => {
                return(
                  <ChipTag
                      checked={dynamicFieldDetails.rentAvailabelFrom == item.value}
                      label={item.name}
                      onChagne={() => {
                        setDynamicFieldDetails((pre) => ({...pre, rentAvailabelFrom: item.value, rentAvailableDate: null}))
                        setErrors((pre) => ({...pre, rentAvailabelFrom: ''}))
                      }}
                      value={dynamicFieldDetails.rentAvailabelFrom}
                      isIcon={false}
                      containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
                    />
                )
              })
            }
          </div>
          {errors?.rentAvailabelFrom && <p className="pt-1 text-red-500 text-xs">{errors.rentAvailabelFrom}</p>}
        </div>}

        {renderShowField(FIELD_NAME.RENT_AVAILABEL_DATE) && <div data-field={FIELD_NAME.RENT_AVAILABEL_DATE} data-has-value={!!dynamicFieldDetails.rentAvailableDate}>
          <FieldLabel label="Available Date" required={true} />
          <div className="flex gap-3 pt-2" onClick={() => {availabelDateref.current?.showPicker()}}>
            <InputBase
              inputRef={availabelDateref}
              placeholder="Enter Available Date"
              type="date"
              fullWidth
              onChange={(e) =>{
                setDynamicFieldDetails((pre) => ({...pre, rentAvailableDate: e.target.value}))
                setErrors((pre) => ({...pre, rentAvailableDate: ''}))
              }}
              value={dynamicFieldDetails.rentAvailableDate}
              className={'box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]'}
              inputProps={{
              className: "placeholder-gray",
              }}
          />
          </div>
          {errors?.rentAvailableDate && <p className="pt-1 text-red-500 text-xs">{errors.rentAvailableDate}</p>}
        </div>}

        {renderShowField(FIELD_NAME.RENT) && <div data-field={FIELD_NAME.RENT} data-has-value={!!dynamicFieldDetails.rent}>
          <FieldLabel label="Rent" required={true} customClass="pb-2"/>
          <DynamicInput
            placeHolder="Enter monthly rent"
            options={[{label: 'Per month', value: 'Per month'}]}
            onChange={(value: string, dropdownValue: string) => {
            setDynamicFieldDetails((pre) => ({...pre, rent: value,}))
            setErrors((pre) => ({...pre, rent: ''}))
            }}
            value={dynamicFieldDetails.rent}
            dropdownValue={'Per month'}
            disabled={true}
           />
          {errors?.rent && <p className="pt-1 text-red-500 text-xs">{errors.rent}</p>}
        </div>}

        {/* Seal plot start*/}

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
                      setDynamicFieldDetails((pre) => ({...pre, propertyPossessionStatus: item.value, propertyAge: null,possesionDate: null}))
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
            <div onClick={() => {possessionDateref.current?.showPicker()}}>
              <InputBase
                inputRef={possessionDateref}
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

        {renderShowField(FIELD_NAME.PLOT_PRICE) && <div data-field={FIELD_NAME.PLOT_PRICE} data-has-value={!!dynamicFieldDetails.plotPrice}>
          <FieldLabel label="Plot Price" required={true} customClass="pb-2"/>
           <InputBase
              placeholder="Plot price"
              fullWidth
              value={dynamicFieldDetails.plotPrice ?? ''}
              onChange={(e) => {
                const input = e.target.value;
                const isOnlyDigits = /^\d*$/.test(input);
                if (!isOnlyDigits) return;
                setDynamicFieldDetails((pre) => ({...pre, plotPrice: input,}))
                setErrors((pre) => ({...pre, plotPrice: ''}))
              }}
              className={
                "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
              }
              inputProps={{
                className: "placeholder-gray",
              }}
            />
          {errors?.plotPrice && <p className="pt-1 text-red-500 text-xs">{errors.plotPrice}</p>}
        </div>}

        {/* Seal plot end*/}

        {renderShowField(FIELD_NAME.PRICE_COST) && <div data-field={FIELD_NAME.PRICE_COST} data-has-value={!!dynamicFieldDetails.price}>
          <FieldLabel label="Price/Cost" required={true} customClass="pb-2"/>
          <DynamicInput
            placeHolder="Enter price / cost"
            options={[{label: 'Per month', value: 'Per month'}]}
            onChange={(value: string, dropdownValue: string) => {
              const isOnlyDigits = /^\d*$/.test(value);
              if(!isOnlyDigits) return
            setDynamicFieldDetails((pre) => ({...pre, price: value,}))
            setErrors((pre) => ({...pre, price: ''}))
            }}
            value={dynamicFieldDetails.price ?? ''}
            dropdownValue={'Per month'}
            disabled={true}
           />
          {errors?.price && <p className="pt-1 text-red-500 text-xs">{errors.price}</p>}
        </div>}

        {renderShowField(FIELD_NAME.MAINTENANCE_CHARGE) && <div>
          <FieldLabel label="Maintenance Charges" required={true}/>
          <div className="flex flex-wrap gap-3 py-2" data-field={FIELD_NAME.MAINTENANCE_CHARGE} data-has-value={!!dynamicFieldDetails.maintenanceCharges}>
            {
              MAINTENANCE_CHARGES.map(item => {
                return(
                  <ChipTag
                    checked={dynamicFieldDetails.maintenanceCharges == item.value}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, maintenanceCharges: item.value, otherMaintenanceCharges: null,}))
                      setErrors((pre) => ({...pre, maintenanceCharges: ''}))
                    }}
                    value={1}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[150px]"
                  />
                )
              })
            }
          </div>
          {errors?.maintenanceCharges && <p className="pt-1 text-red-500 text-xs">{errors.maintenanceCharges}</p>}
          {renderShowField(FIELD_NAME.MAINTENANCE_CHARGE_VALUE) && <div data-field={FIELD_NAME.MAINTENANCE_CHARGE_VALUE} data-has-value={!!dynamicFieldDetails.otherMaintenanceCharges}>
            <DynamicInput 
              placeHolder="Enter Maintenance Charge (Per Month)"
              options={[{label: 'Per month', value: 'Per month'}]}
              onChange={(value: string, dropdownValue: string) => {
                const isOnlyDigits = /^\d*$/.test(value);
                if (!isOnlyDigits) return;
              setDynamicFieldDetails((pre) => ({...pre, otherMaintenanceCharges: value,}))
              setErrors((pre) => ({...pre, otherMaintenanceCharges: ''}))
              }}
              value={dynamicFieldDetails.otherMaintenanceCharges ?? ''}
              dropdownValue={'Per month'}
              disabled={true}
            />
          {errors?.otherMaintenanceCharges && <p className="pt-1 text-red-500 text-xs">{errors.otherMaintenanceCharges}</p>}
          </div>}
        </div>}

        {renderShowField(FIELD_NAME.SECURITY_DEPOSITE) && <div>
          <FieldLabel label="Security Deposit" required={true}/>
          <div className="flex flex-wrap gap-3 py-2" data-field={FIELD_NAME.SECURITY_DEPOSITE} data-has-value={!!dynamicFieldDetails.securityDeposite}>
            {
              SECURITY_CHARGES.map(item => {
                return(
                  <ChipTag
                    checked={item.value == dynamicFieldDetails.securityDeposite}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, securityDeposite: item.value, otherSecurityDeposite: null,}))
                      setErrors((pre) => ({...pre, securityDeposite: ''}))
                    }}
                    value={dynamicFieldDetails.securityDeposite}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
                  />
                )
              })
            }
          </div>
          {errors?.securityDeposite && <p className="pt-1 text-red-500 text-xs">{errors.securityDeposite}</p>}
        {renderShowField(FIELD_NAME.CUSTOM_SECURITY_DEPOSITE) &&  <div data-field={FIELD_NAME.CUSTOM_SECURITY_DEPOSITE} data-has-value={!!dynamicFieldDetails.otherSecurityDeposite}>
            <DynamicInput 
              placeHolder="Enter Security Deposit"
              options={[{label: 'Per month', value: 'Per month'}]}
              onChange={(value: string, dropdownValue: string) => {
                const isOnlyDigits = /^\d*$/.test(value);
                if (!isOnlyDigits) return;
              setDynamicFieldDetails((pre) => ({...pre, otherSecurityDeposite: value,}))
              setErrors((pre) => ({...pre, otherSecurityDeposite: ''}))
              }}
              value={dynamicFieldDetails.otherSecurityDeposite ?? ''}
              dropdownValue={'Per month'}
              disabled={true}
            />
            {errors?.otherSecurityDeposite && <p className="pt-1 text-red-500 text-xs">{errors.otherSecurityDeposite}</p>}
          </div>}
        </div>}

        {renderShowField(FIELD_NAME.LOCK_IN_PERIOD) && <div >
          <FieldLabel label="Lock-in Period" required={true}/>
          <div className="flex flex-wrap gap-3 py-2" data-field={FIELD_NAME.LOCK_IN_PERIOD} data-has-value={!!dynamicFieldDetails.lockInPeriod}>
            {
              LOCK_IN_PERIOD.map(item => {
                return(
                  <ChipTag
                    checked={item.value == dynamicFieldDetails.lockInPeriod}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, lockInPeriod: item.value, otherLockInPeriod: null,}))
                      setErrors((pre) => ({...pre, lockInPeriod: ''}))
                    }}
                    value={dynamicFieldDetails.lockInPeriod}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
                  />
                )
              })
            }
          </div>
          {errors?.lockInPeriod && <p className="pt-1 text-red-500 text-xs">{errors.lockInPeriod}</p>}
          {renderShowField(FIELD_NAME.CUSTOM_LOCK_IN_PERIOD) && <div data-field={FIELD_NAME.CUSTOM_LOCK_IN_PERIOD} data-has-value={!!dynamicFieldDetails.otherLockInPeriod}>
            <DynamicSelect
              isMulti={false}
              isError={false}
              placeholder={'Enter Lock in Period (Per Month)'}
              onChange={(value) => {
                setDynamicFieldDetails((pre) => ({...pre, otherLockInPeriod: value}))
                setErrors((pre) => ({...pre, otherLockInPeriod: ''}))
              }}
              options={generateLockInPeriod(36)}
              value={dynamicFieldDetails.otherLockInPeriod}
              minHeight={"40px"}
            />
          {errors?.otherLockInPeriod && <p className="pt-1 text-red-500 text-xs">{errors.otherLockInPeriod}</p>}
          </div>}
          
        </div>}

        {renderShowField(FIELD_NAME.BROKERAGE_CHARGE) && <div>
          <FieldLabel label="Do you charge brokerage?" required={true}/>
          <div className="flex flex-wrap gap-3 py-2" data-field={FIELD_NAME.BROKERAGE_CHARGE} data-has-value={!!dynamicFieldDetails.brokerageCharge}>
            {
              BROKRAGE_CHARGE.map(item => {
                return(
                  <ChipTag
                    checked={item.value == dynamicFieldDetails.brokerageCharge}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, brokerageCharge: item.value, otherBrokerageCharge: null,}))
                      setErrors((pre) => ({...pre, brokerageCharge: ''}))
                    }}
                    value={dynamicFieldDetails.brokerageCharge}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[100px] 2md:min-w-[150px]"
                  />
                )
              })
            }
          </div>  
          {errors?.brokerageCharge && <p className="pt-1 text-red-500 text-xs">{errors.brokerageCharge}</p>}
          {renderShowField(FIELD_NAME.BROKERAGE_CHARGE_VALUE) && <div data-field={FIELD_NAME.BROKERAGE_CHARGE_VALUE} data-has-value={!!dynamicFieldDetails.otherBrokerageCharge}>
            <InputBase
              placeholder="Enter brokerage (Per Month)"
              fullWidth
              value={dynamicFieldDetails.otherBrokerageCharge ?? ''}
              onChange={(e) => {
                const input = e.target.value;
                const isOnlyDigits = /^\d*$/.test(input);
                if (!isOnlyDigits) return;
                setDynamicFieldDetails((pre) => ({...pre, otherBrokerageCharge: input}))
                setErrors((pre) => ({...pre, otherBrokerageCharge: ''}))
              }}
              className={
                "box-border px-4 py-2 text-sm rounded-full border focus:outline-none border-border text-text-gray h-[40px]"
              }
              inputProps={{
                className: "placeholder-gray",
              }}
            />  
          {errors?.otherBrokerageCharge && <p className="pt-1 text-red-500 text-xs">{errors.otherBrokerageCharge}</p>}
            </div>}
          {renderShowField(FIELD_NAME.NEGOTIABLE_BROKERAGE) && <div className="mt-2" onClick={() => {
            setDynamicFieldDetails((pre) => ({...pre, isBrokerageNegotiable: dynamicFieldDetails.isBrokerageNegotiable ? false : true}))
          }}>
            <CustomCheckbox label={'Brokerage Negotiable'} value={''} checked={dynamicFieldDetails.isBrokerageNegotiable}/>  
          </div>}
        </div>}

          {renderShowField(FIELD_NAME.LOAN_AVAILABLE) && <div data-field={FIELD_NAME.LOAN_AVAILABLE} data-has-value={!!dynamicFieldDetails.loanAvailable}>
          <FieldLabel label="Lone Available" />
          <div className="flex flex-wrap gap-3 pt-2">
            {
              TRUTY_LIST.map(item => {
                return(
                  <ChipTag
                    checked={item.value == dynamicFieldDetails.loanAvailable}
                    label={item.name}
                    onChagne={() => {
                      setDynamicFieldDetails((pre) => ({...pre, loanAvailable: item.value}))
                    }}
                    value={dynamicFieldDetails.loanAvailable}
                    isIcon={false}
                    containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
                  />
                )
              })
            }
          </div>
        </div>}

      </div>
        <hr className="text-[#D9D9D9] mt-6"></hr>
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
                handleStep2Submit(payload)
                // dispatch(setActiveStep({step: activeStep + 1}))
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
