"use client";

import { useEffect, useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { useDispatch, useSelector } from "react-redux";
import { getActiveStep, setActiveStep } from "@/store/postPropertyProgress";

const MAX_PROGRESS = 35; // configurable
export default function PostPropertyForm() {
const activeStep = useSelector(getActiveStep);
const dispatch = useDispatch()

  return (
    <div>
      {activeStep == 1 && <Step1 />}
      {activeStep == 2 && <Step2 />}
      {activeStep == 3 && <Step3 />}
      {activeStep == 4 && <Step4 />}

      {activeStep != 1 && <div className="flex justify-end w-full">
        <div className="flex flex-wrap justify-start flex-row gap-2 items-center mt-8">
          <button onClick={() => {
            if(activeStep != 1){
                // setActiveStep(activeStep - 1)
                dispatch(setActiveStep({step: activeStep - 1}))
            }
          }} className="w-full md:w-[130px] text-sm 1xl:text-base px-12 py-3 border border-blue text-center cursor-pointer rounded-full bg-light-purple">
            <span className="gap-3 relative flex justify-center">
              <p className={`text-nowrap font-medium`}>Back</p>
            </span>
          </button>
          <button onClick={() => {
            if(activeStep != 4){
                // setActiveStep(activeStep + 1)
                dispatch(setActiveStep({step: activeStep + 1}))
            }
          }} className="w-full md:w-[130px] text-sm 1xl:text-base animated-button px-12 py-3 border border-blue text-center cursor-pointer">
            <span className="gap-3 relative flex justify-center">
              <p className={`text-nowrap font-medium`}>{activeStep == 4 ? 'Submit' : 'Next'}</p>
            </span>
          </button>
        </div>
      </div>}
    </div>
  );
}
