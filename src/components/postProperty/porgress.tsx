"use client";
import { useStepProgress } from "@/hooks/useStepProgress";
import { STEP_PROGRESS_PERCENTAGE } from "@/lib/enums";
import {
  getActiveStep,
  selectTotalProgress,
  updateStepProgress,
} from "@/store/postPropertyProgress";
import { RootState } from "@/store/store";
import styled from "@emotion/styled";
import { LinearProgress, linearProgressClasses } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#A6A6A67D",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#C27423",
  },
}));

export default function Progress() {
  const { calculateProgress, totalProgress } = useStepProgress()
  // const totalProgress = useSelector((state: RootState) =>
  //   selectTotalProgress(state.postPropertyProgress)
  // );
  const activeStep = useSelector(getActiveStep);
  const dispatch = useDispatch();

  // const calculateProgress = () => {
  //   const fieldElements = Array.from(document.querySelectorAll<HTMLElement>("[data-field]"));
  //   const visibleFields = fieldElements.filter(
  //     (el) => el.offsetParent !== null
  //   );
  //   const total = visibleFields.length;

  //   if (total === 0) {
  //     dispatch(updateStepProgress({ step: activeStep, progress: 0 }));
  //     return;
  //   }

  //   // Count fields that have data-has-value="true"
  //   const filled = visibleFields.filter(
  //     (el) => el.dataset.hasValue === "true"
  //   ).length;

  //   // Calculate percentage
  //   const newProgress = ((filled / total) * STEP_PROGRESS_PERCENTAGE[activeStep]).toFixed(2);
  //   console.log('newProgress',newProgress)
  //   dispatch(
  //     updateStepProgress({
  //       step: activeStep,
  //       progress: Number(newProgress),
  //     })
  //   );
  // };

  useEffect(() => {
    // calculateProgress();
    // // Recalculate when attributes or visibility change
    // const observer = new MutationObserver(calculateProgress);
    // observer.observe(document.body, {
    //   attributes: true,
    //   subtree: true,
    //   attributeFilter: ["data-has-value", "style", "class"],
    // });

    // return () => observer.disconnect();
  }, []);

  return (
    <div className="flex w-[100%] flex-col gap-[2px]">
      <p className="text-xs font-semibold lg:text-sm text-text-black text-end">
        {totalProgress}%
      </p>  
      <BorderLinearProgress variant="determinate" value={totalProgress} />
    </div>
  );
}
