"use client";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { useSelector } from "react-redux";
import { getActiveStep } from "@/store/postPropertyProgress";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserDashboardDetailsApiHandler, UserDashboardDetailsResponse } from "@/services/userService";
import { useRouter } from "next/navigation";
import { PROPERTY_FORM_MODE } from "@/lib/enums";

export default function PostPropertyForm({mode}: {mode: string}) {
const activeStep = useSelector(getActiveStep);
  const containerRef = useRef(null);
  const router = useRouter()

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
      if(userDashboardDetails.freeListings.remaining == 0){
        router.replace('/user-dashboard')
      }
    }
  },[userDashboardDetails])

  return (
    <div>
      {activeStep == 1 && <Step1 containerRef={containerRef}/>}
      {activeStep == 2 && <Step2 containerRef={containerRef}/>}
      {activeStep == 3 && <Step3 containerRef={containerRef}/>}
      {activeStep == 4 && <Step4 containerRef={containerRef}/>}
    </div>
  );
}
