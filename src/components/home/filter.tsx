"use client";
import Image from "next/image";
import DynamicAsyncAutocomplete from "../common/dynamicAsyncSelectMui";
import { InputBase } from "@mui/material";
import PropertyTypeMenu from "./propertyTypeMenu";
import { useState } from "react";
import PriceRangeMenu from "./budgetTypeMenu";

export default function Filter() {
  const [budgetAnchorEl, setBudgetAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [typeAnchorEl, setTypeAnchorEl] = useState<null | HTMLElement>(null);
  const openBudget = Boolean(budgetAnchorEl);
  const openType = Boolean(typeAnchorEl);

  const handleBudgetClick = (event: React.MouseEvent<HTMLElement>) => {
    setBudgetAnchorEl(event.currentTarget);
  };

  const handleBudgetClose = () => {
    setBudgetAnchorEl(null);
  };

  const handleTypeClick = (event: React.MouseEvent<HTMLElement>) => {
    setTypeAnchorEl(event.currentTarget);
  };

  const handleTypeClose = () => {
    setTypeAnchorEl(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center font-medium text-blue overflow-auto no-scrollbar">
        <button className="w-fit 2md:w-[110px] flex-shrink-0 animated-button-white px-5 2md:px-8 py-1 2md:py-2 border border-transparent text-center cursor-pointer">
          <span className="gap-3 relative flex justify-center">
            <p className={`text-nowrap text-xs 2md:text-sm 1xl:text-base`}>
              For Buy
            </p>
          </span>
        </button>
        <button className="2md:w-[110px] flex-shrink-0 ml-2 animated-button-white px-5 2md:px-8 py-1 2md:py-2 border border-transparent text-center cursor-pointer">
          <span className="gap-3 relative flex justify-center">
            <p className={`text-nowrap text-xs 2md:text-sm 1xl:text-base`}>
              Rental
            </p>
          </span>
        </button>
        <button className="2md:w-[110px] flex-shrink-0 ml-2 animated-button-white px-5 2md:px-8 py-1 2md:py-2 border border-transparent text-center cursor-pointer">
          <span className="gap-3 relative flex justify-center">
            <p className={`text-nowrap text-xs 2md:text-sm 1xl:text-base`}>
              Projects
            </p>
          </span>
        </button>
        <button className="2md:w-[110px] flex-shrink-0 ml-2 animated-button-white px-5 2md:px-8 py-1 2md:py-2 border border-transparent text-center cursor-pointer">
          <span className="gap-3 relative flex justify-center">
            <p className={`text-nowrap text-xs 2md:text-sm 1xl:text-base`}>
              Plot & Land
            </p>
          </span>
        </button>
        <button className="2md:w-[110px] flex-shrink-0 ml-2 animated-button-white px-5 2md:px-8 py-1 2md:py-2 border border-transparent text-center cursor-pointer">
          <span className="gap-3 relative flex justify-center">
            <p className={`text-nowrap text-xs 2md:text-sm 1xl:text-base`}>
              Commercial
            </p>
          </span>
        </button>
      </div>
      <div className="flex flex-col rounded-[10px] bg-white mt-1 p-4">
        <div className="hidden 2md:flex h-[35px] 2md:h-[40px]">
          <div className="flex-1">
            <DynamicAsyncAutocomplete
              isMulti={false}
              isError={false}
              placeholder={"City"}
              onChange={(value) => {}}
              loadOptions={async () => []}
              value={null}
              minHeight={"35px"}
              styles={{
                "& .MuiOutlinedInput-root": {
                  borderTopLeftRadius: "9999px",
                  borderBottomLeftRadius: "9999px",
                  boxShadow: "none",
                  height: "40px",
                  "& fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                    borderWidth: "1px",
                  },
                  "&.MuiOutlinedInput-root.Mui-focused": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "var(--color-text-gray)",
                  opacity: 1,
                  fontSize: "14px",
                  fontWeight: "500 !important",
                },
              }}
            />
          </div>
          <div className="flex justify-between items-center px-4 flex-3 border-r border-t border-b border-border rounded-r-full">
            <div className="flex w-full">
              <Image
                src="/assets/search-gray.svg"
                width={16}
                height={16}
                alt="search"
              />
              <InputBase
                placeholder="Search by Project, Locality, or Builder"
                fullWidth
                onChange={(event) => {}}
                className="w-full h-full px-3 text-xs rounded-full"
                inputProps={{
                  className:
                    "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
                }}
              />
            </div>
            <div>
              <Image
                src="/assets/blue-location-tracker.svg"
                width={20}
                height={20}
                alt="Location finder"
              />
            </div>
          </div>
          <div className="flex-1">
            <button className="animated-button px-[30px] py-[9px] cursor-pointer ml-2 h-full w-[calc(100%-0.5rem)]">
              <span className="flex items-center justify-center gap-[6px] relative z-11">
                <Image
                  src="/assets/white-search.svg"
                  width={16}
                  height={16}
                  alt="Search"
                />
                <p className="text-nowrap font-medium text-xs lg:text-sm">
                  Search
                </p>
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 2md:hidden">
          <div className="flex-1">
            <DynamicAsyncAutocomplete
              isMulti={false}
              isError={false}
              placeholder={"City"}
              onChange={(value) => {}}
              loadOptions={async () => []}
              value={null}
              minHeight={"35px"}
              styles={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "9999px",
                  boxShadow: "none",
                  height: "35px",
                  "& fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                    borderWidth: "1px",
                  },
                  "&.MuiOutlinedInput-root.Mui-focused": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "var(--color-text-gray)",
                  opacity: 1,
                  fontSize: "14px",
                  fontWeight: "500 !important",
                },
              }}
            />
          </div>
          <div className="flex justify-between items-center px-4 flex-3 border border-border rounded-full">
            <div className="flex w-full">
              <Image
                src="/assets/search-gray.svg"
                width={16}
                height={16}
                alt="search"
              />
              <InputBase
                placeholder="Search by Project, Locality, or Builder"
                fullWidth
                onChange={(event) => {}}
                className="w-full h-full px-3 text-xs rounded-full"
                inputProps={{
                  className:
                    "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
                }}
              />
            </div>
            <div>
              <Image
                src="/assets/blue-location-tracker.svg"
                width={20}
                height={20}
                alt="Location finder"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-3 pt-2 2md:pt-3">
          <div
            onClick={handleBudgetClick}
            className="text-sm rounded-full cursor-pointer px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-2"
          >
            Budget
            <Image
              src={"/assets/small-up-arrow-blue.svg"}
              width={12}
              height={12}
              alt="arrow"
              className="mt-1"
            />
          </div>
          <div
            onClick={handleTypeClick}
            className="text-sm rounded-full cursor-pointer px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-2"
          >
            Property Type
            <Image
              src={"/assets/small-up-arrow-blue.svg"}
              width={12}
              height={12}
              alt="arrow"
              className="mt-1"
            />
          </div>
        </div>
        <div className="2md:hidden flex-1 mt-2">
            <button className="animated-button px-[30px] py-[9px] cursor-pointer ml-2 h-full w-[calc(100%-0.5rem)]">
              <span className="flex items-center justify-center gap-[6px] relative z-11">
                <Image
                  src="/assets/white-search.svg"
                  width={16}
                  height={16}
                  alt="Search"
                />
                <p className="text-nowrap font-medium text-xs lg:text-sm">
                  Search
                </p>
              </span>
            </button>
          </div>
      </div>
      <PriceRangeMenu
        open={openBudget}
        onClose={handleBudgetClose}
        anchorEl={budgetAnchorEl}
      />
      <PropertyTypeMenu
        open={openType}
        handleClose={handleTypeClose}
        anchorEl={typeAnchorEl}
      />
    </div>
  );
}
