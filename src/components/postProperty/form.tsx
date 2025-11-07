"use client";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { useSelector } from "react-redux";
import { getActiveStep } from "@/store/postPropertyProgress";

export default function PostPropertyForm() {
const activeStep = useSelector(getActiveStep);

  return (
    <div>
      {activeStep == 1 && <Step1 />}
      {activeStep == 2 && <Step2 />}
      {activeStep == 3 && <Step3 />}
      {activeStep == 4 && <Step4 />}
    </div>
  );
}
