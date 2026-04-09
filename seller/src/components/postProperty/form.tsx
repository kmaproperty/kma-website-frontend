"use client";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { useDispatch, useSelector } from "react-redux";
import { getActiveStep, setActiveStep } from "@/store/postPropertyProgress";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserDashboardDetailsApiHandler, UserDashboardDetailsResponse } from "@/services/userService";
import { step1PostPropertyDetailsApiHandler, Step1DetailsResponse } from "@/services/postProperty";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { PROPERTY_FORM_MODE, USER_TYPE } from "@/lib/enums";

export default function PostPropertyForm({mode}: {mode: string}) {
const activeStep = useSelector(getActiveStep);
  const containerRef = useRef(null);
  const router = useRouter()
  const dispatch = useDispatch()
  const params = useParams()
  const hasRestoredStepRef = useRef(false);

  const { data: userDashboardDetails } = useQuery({
    queryKey: ["user-dashboard-details-to-verify-count"],
    queryFn: async (): Promise<UserDashboardDetailsResponse> => {
      return UserDashboardDetailsApiHandler();
    },
    select: (resposne: UserDashboardDetailsResponse) => {
      return resposne;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeStep, containerRef]);

  useEffect(() => {
    if(userDashboardDetails && mode != PROPERTY_FORM_MODE.EDIT){
      if(userDashboardDetails?.role == USER_TYPE.OWNER){
        if(userDashboardDetails.freeListings.remaining == 0){
          router.replace('/user-dashboard')
        }
      }else if(userDashboardDetails.role == USER_TYPE.CHANNEL_PARTNER){
        if(!userDashboardDetails?.kycStatus?.kyc_completed){
          router.replace('/kyc')
        }
      }
    }
  },[userDashboardDetails])

  // Restore step from completionStep on initial page load (only once, persists across step navigation)
  const { data: step1DetailsForRestore } = useQuery({
    queryKey: ["step1-restore-step", params?.propertyId],
    queryFn: (): Promise<Step1DetailsResponse> =>
      step1PostPropertyDetailsApiHandler(String(params?.propertyId ?? "")),
    enabled: !!params?.propertyId,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!hasRestoredStepRef.current && step1DetailsForRestore?.completionStep && step1DetailsForRestore.completionStep >= 1) {
      hasRestoredStepRef.current = true;
      const nextStep = Math.min(step1DetailsForRestore.completionStep + 1, 4);
      dispatch(setActiveStep({ step: nextStep }));
    }
  }, [step1DetailsForRestore, dispatch]);

  return (
    <div>
      {activeStep == 1 && <Step1 containerRef={containerRef}/>}
      {activeStep == 2 && <Step2 containerRef={containerRef}/>}
      {activeStep == 3 && <Step3 containerRef={containerRef}/>}
      {activeStep == 4 && <Step4 containerRef={containerRef}/>}
    </div>
  );
}
