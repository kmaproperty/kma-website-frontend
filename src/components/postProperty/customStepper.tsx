"use client";
import { getActiveStep, getStepList, step } from "@/store/postPropertyProgress";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useSelector } from "react-redux";


const StepContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
}));

const StepItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "1rem",
  position: "relative",
  // height: "100%",
}));

const Circle = styled("div")<{ active?: boolean }>(({ active }) => ({
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: active ? "var(--color-blue)" : "#01004840",
  color: "var(--color-white)",
  fontWeight: 600,
  boxShadow: active
    ? "0 0 8px rgba(10, 4, 60, 0.3)"
    : "0 0 4px rgba(0, 0, 0, 0.1)",
  position: "relative",
}));

const Line = styled("div")<{ isLast?: boolean; active?: boolean }>(
  ({ active }) => ({
    position: "absolute",
    left: "calc(50% - 1.5px)",
    borderImage: active
      ? `repeating-linear-gradient(
    to bottom,
    var(--color-blue) 0,
    var(--color-blue) 8px,
    transparent 8px,
  ) 1`
      : `repeating-linear-gradient(
    to bottom,
    #B0B0C4 0,
    #B0B0C4 8px, 
    transparent 8px,
    transparent 16px
  ) 1`,
    borderWidth: "1.5px",
  })
);

const CleanAccordion = styled(Accordion)(() => ({
  background: "transparent",
  boxShadow: "none",
  "&::before": { display: "none" },
  "& .MuiAccordionSummary-root": {
    minHeight: "0 !important",
    padding: 0,
    margin: 0,
  },
  "& .MuiAccordionSummary-content": {
    margin: "0 !important",
    padding: 0,
  },
  "& .MuiAccordionDetails-root": {
    padding: 0,
    margin: 0,
    marginTop: "20px",
  },
}));

function Stepper({activeStep, stepList}: {activeStep: number, stepList: step[]}) {
  return (
    <StepContainer className="flex-col">
      {stepList.map((step, index) => {
        const active = activeStep > index;
        const isCurrent = activeStep == index + 1;
        const isLast = index === stepList.length - 1;
        return (
          <StepItem key={index} className="flex-row h-[120px] sm:h-[90px] 2md:h-auto">
            <div
              className="relative flex flex-col items-center "
              style={{ height: "100%" }}
            >
              <div className="bg-[#0100481A] p-[3px] lg:p-[4px] rounded-full">
                <Circle
                  className="w-[25px] h-[25px] lg:w-[35px] lg:h-[35px] text-xs lg:text-sm"
                  active={active}
                >
                  {step.number}
                </Circle>
              </div>
              {!isLast && (
                <Line
                  className={`${active ? "top-[28px]" : "top-[30px]"} ${active ? 'lg:top-[28px]' : 'lg:top-[43px]'} ${active ? 'h-[calc(100%-28px)]' : 'h-[calc(100%-30px)]'} ${active ? 'lg:h-[calc(100%-28px)]' : 'lg:h-[calc(100%-43px)]'}`}
                  isLast={isLast}
                  active={active}
                />
              )}
            </div>

            <div className="pt-2 gap-1 flex justify-start flex-col pb-[20px]">
              <p className="font-medium text-blue text-base">
                {step.title}
              </p>
              <p className="text-gray-500 text-sm mb-1">
                {step.desc}
              </p>
              <p
                className={`text-xs lg:text-sm font-medium underline ${
                  isCurrent ? 'text-[#FF901D]' : activeStep <= index ? 'text-[#8090FF]' : 'text-[#4cac0b]'
                }`}
              >
                {isCurrent ? 'In Progress' : activeStep <= index ? 'Pending' : 'Completed'}
              </p>
            </div>
          </StepItem>
        );
      })}
    </StepContainer>
  );
}

export default function StepperCustom() {
  const activeStep = useSelector(getActiveStep);
  const stepList = useSelector(getStepList)

  return (
    <div className="bg-[#F4F4F4] rounded-[10px] px-[0.75rem] py-[1rem] h-fit">
      <div className="2md:hidden">
        <CleanAccordion className="bg-none">
          <AccordionSummary
            expandIcon={
              <Image
                alt="Arrow"
                src="/assets/down-arrow-outline-black.svg"
                width={18}
                height={18}
              />
            }
          >
            <p className="text-sm text-text-black">
              Step {activeStep} of 4:{" "}
              <span className="text-text-black font-medium">{}</span>
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <Stepper activeStep={activeStep} stepList={stepList}/>
          </AccordionDetails>
        </CleanAccordion>
      </div>
      <div className="hidden 2md:flex">
        <Stepper activeStep={activeStep} stepList={stepList}/>
      </div>
    </div>
  );
}
