"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const steps = [
  {
    number: 1,
    title: "Basic Details",
    desc: "Tell us what type of property you're listing.",
    status: "In Progress",
  },
  {
    number: 2,
    title: "Property Details",
    desc: "Share extra info to help buyers understand better.",
    status: "Pending",
  },
  {
    number: 3,
    title: "Amenities & Description",
    desc: "Set your expected price and payment preferences.",
    status: "Pending",
  },
  {
    number: 4,
    title: "Photo & Video",
    desc: "Upload clear photos and videos to attract more interest.",
    status: "Pending",
  },
];

const StepContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
}));

const StepItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "1rem",
  position: "relative",
  height: "-webkit-fill-available",
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

function Stepper() {
  return (
    <StepContainer className="flex-col">
      {steps.map((step, index) => {
        const active = index === 0 || index === 1;
        const isLast = index === steps.length - 1;
        return (
          <StepItem key={index} className="flex-row">
            <div
              className="relative flex flex-col items-center "
              style={{ height: "inherit" }}
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
              <p className="font-medium text-blue text-sm lg:text-base">
                {step.title}
              </p>
              <p className="text-gray-500 text-xs lg:text-sm mb-1">
                {step.desc}
              </p>
              <p
                className={`text-xs lg:text-sm font-medium underline ${
                  active ? "text-[#FF901D]" : "text-[#8090FF]"
                }`}
              >
                {step.status}
              </p>
            </div>
          </StepItem>
        );
      })}
    </StepContainer>
  );
}

export default function StepperCustom() {
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
              Step 1 of 4:{" "}
              <span className="text-text-black font-medium">Basic Details</span>
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <Stepper />
          </AccordionDetails>
        </CleanAccordion>
      </div>
      <div className="hidden 2md:flex">
        <Stepper />
      </div>
    </div>
  );
}
