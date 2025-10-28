"use client";
import Image from "next/image";
import DynamicAsyncSelect from "../common/asyncSelect";
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
import DynamicInput from "../common/dynamicInput";
import { InputBase } from "@mui/material";

function CityPlaceholder() {
  return (
    <div className="flex gap-2">
      <Image alt="search" src={"/assets/search.svg"} width={14} height={14} />
      <p className="text-text-gray text-[16px]">Search City</p>
    </div>
  );
}

const propertyType = [
  {
    icon: ApartmentIcon,
    label: "Apartment/Flat",
  },
  {
    icon: IndependentHouse,
    label: "Independent House",
  },
  {
    icon: Duplex,
    label: "Duplex",
  },
  {
    icon: IndependentFloor,
    label: "Independent Floor",
  },
  {
    icon: Villa,
    label: "Villa",
  },
  {
    icon: Penthouse,
    label: "Penthouse",
  },
  {
    icon: Studio,
    label: "Studio",
  },
  {
    icon: FarmHouse,
    label: "Farm House",
  },
];

export default function Step1() {
  const loadCities = async (input: string) => {
    return [];
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="text-text-black font-semibold text-lg 2md:text-xl pb-2">
        Basic Details
      </p>

      <div>
        <FieldLabel label="Property Listing For"  required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={true}
            label="Sell"
            onChagne={() => {}}
            value={1}
            iconSrc="/assets/sell-blue.svg"
            isIcon={true}
            containerStyle="flex flex-1 2md:flex-none justify-start gap-2 min-w-[100px] 2md:min-w-[180px]"
          />
          <ChipTag
            checked={false}
            label="Rent/Lease"
            onChagne={() => {}}
            value={1}
            iconSrc="/assets/rent-blue.svg"
            isIcon={true}
            containerStyle="flex flex-1 2md:flex-none justify-start gap-2 min-w-[100px] 2md:min-w-[180px]"
          />
        </div>
      </div>

      <div>
        <FieldLabel label="Property Category" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={false}
            label="Residential"
            onChagne={() => {}}
            value={1}
            iconSrc="/assets/residential-blue.svg"
            isIcon={true}
            containerStyle="flex flex-1 2md:flex-none justify-start gap-2 min-w-[100px] 2md:min-w-[180px]"
          />
          <ChipTag
            checked={true}
            label="Commercial"
            onChagne={() => {}}
            value={1}
            iconSrc="/assets/commercial-blue.svg"
            isIcon={true}
            containerStyle="flex flex-1 2md:flex-none justify-start gap-2 min-w-[100px] 2md:min-w-[180px]"
          />
        </div>
      </div>

      <div>
        <FieldLabel label="City" customClass="pb-2" required={true}/>
        <DynamicAsyncSelect
          isMulti={false}
          isError={false}
          placeholder={<CityPlaceholder />}
          onChange={(value) => {}}
          loadOptions={loadCities}
          value={null}
          minHeight={"40px"}
        />
      </div>

      <div>
        <FieldLabel
          label="Building / Apartment / Society Name:"
          customClass="pb-2"
          required={true}
        />
        <DynamicAsyncSelect
          isMulti={false}
          isError={false}
          placeholder={"Jaipuria Sunrise Greens, Nabha, Zirakpur"}
          onChange={(value) => {}}
          loadOptions={loadCities}
          value={null}
          minHeight={"40px"}
        />
      </div>

      <div>
        <FieldLabel label="Locality / Sector" customClass="pb-2" required={true}/>
        <DynamicAsyncSelect
          isMulti={false}
          isError={false}
          placeholder={"Jaipuria Sunrise Greens, Nabha, Zirakpur"}
          onChange={(value) => {}}
          loadOptions={loadCities}
          value={null}
          minHeight={"40px"}
        />
      </div>

      <div>
        <FieldLabel label="Property Type" customClass="pb-2" required={true}/>
        <div className="flex flex-wrap gap-3">
          {propertyType.map((item, index) => {
            return (
              <div
                className={`min-w-[130px] 2md:w-[130px] p-3 h-[90px] flex flex-1 2md:flex-none flex-col items-center gap-2 border border-border border-1 rounded-[10px] ${
                  index == 1 ? "bg-light-purple font-medium" : "text-[#888888]"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <p className="text-text-black text-sm text-center">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <FieldLabel label="Rooms / BHK" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={true}
            label="1 BHK"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
          />
          <ChipTag
            checked={false}
            label="2 BHK"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
          />
          <ChipTag
            checked={false}
            label="3 BHK"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
          />
          <ChipTag
            checked={false}
            label="Other"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
          />
        </div>
      </div>

      <div>
        <div className="flex flex-wrap gap-3 pt-2 items-stretch">
            <div className="flex flex-1 min-w-[240px] justify-between cursor-pointer bg-light-purple p-3 border border-border border-1 rounded-[10px] gap-5">
                    <div className="flex flex-col justify-between">
                        <p className="font-medium text-sm text-text-black">1288 Sq Ft</p>
                        <p className="text-sm text-text-gray">Super Builtup Area</p>
                        <p className="text-sm text-text-black">2 Bathrooms</p>
                    </div>  
                    <Image alt="home" src='assets/squre-home.svg' width={75} height={75} />
            </div>
            <div className="flex flex-1 min-w-[240px] justify-between cursor-pointer p-3 border border-border border-1 rounded-[10px] gap-5">
                    <div className="flex flex-col justify-between">
                        <p className="font-medium text-sm text-text-black">1288 Sq Ft</p>
                        <p className="text-sm text-text-gray">Super Builtup Area</p>
                        <p className="text-sm text-text-black">2 Bathrooms</p>
                    </div>  
                    <Image alt="home" src='assets/squre-home.svg' width={75} height={75} />
            </div>
            <div className="flex flex-1 min-w-[240px] justify-between cursor-pointer p-3 border border-border border-1 rounded-[10px] gap-5">
                    <div className="flex flex-col justify-between">
                        <p className="font-medium text-sm text-text-black">1288 Sq Ft</p>
                        <p className="text-sm text-text-gray">Super Builtup Area</p>
                        <p className="text-sm text-text-black">2 Bathrooms</p>
                    </div>
                    <Image alt="home" src='assets/squre-home.svg' width={75} height={75} />
            </div>
            <div className="flex flex-1 min-w-[240px] flex-col justify-center cursor-pointer p-3 border border-border border-1 rounded-[10px] text-center">
                        <p className="font-medium text-sm text-text-black">+ Add Here</p>
                        <p className="text-sm text-text-gray">My unit is not listed</p>
            </div>
        </div>
      </div>

      <div>
        <FieldLabel label="Built Up Area" customClass="pb-2" required={true}/>
        <DynamicInput placeHolder='600 Sq. Ft.'/>
      </div>

      <div>
        <FieldLabel label="Carpet Area" customClass="pb-2" required={true}/>
        <DynamicInput placeHolder='600 Sq. Ft.'/>
      </div>

      <div>
          <FieldLabel label="Carpet Area" customClass="pb-2" required={true}/>
          <InputBase
            placeholder="14"
            fullWidth
            className='box-border h-[40px] px-4 py-2 text-sm rounded-full border border-border text-text-gray'
            inputProps={{
              className: "placeholder-gray",
            }}
          />
      </div> 

      <div>
        <FieldLabel label="OwnerShip" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={true}
            label="Freehold"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
          />
          <ChipTag
            checked={false}
            label="Leasehold"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
          />
          <ChipTag
            checked={false}
            label="Co-operative society"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
          />
          <ChipTag
            checked={false}
            label="Power of Attorney"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[180px]"
          />
        </div>
      </div>

      <div>
        <FieldLabel label="Bathrooms" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={true}
            label="1"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="2"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="3"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="4"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
           <ChipTag
            checked={false}
            label="5"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
           <ChipTag
            checked={false}
            label="6"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
        </div>
      </div>

      <div>
        <FieldLabel label="Bedroom" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={true}
            label="1"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="2"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="3"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="4"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
           <ChipTag
            checked={false}
            label="5"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
           <ChipTag
            checked={false}
            label="6"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
        </div>
      </div>

      <div>
        <FieldLabel label="Balconies" required={true}/>
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={true}
            label="1"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="2"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="3"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="4"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
           <ChipTag
            checked={false}
            label="5"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
           <ChipTag
            checked={false}
            label="6"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
        </div>
      </div>

      <div>
        <FieldLabel label="Facing" />
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={true}
            label="North"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="East"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="West"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="South"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
           <ChipTag
            checked={false}
            label="North - East"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
           <ChipTag
            checked={false}
            label="North - West"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
          <ChipTag
            checked={false}
            label="South - East"
            onChagne={() => {}}
            value={1}
           isIcon={false}
            containerStyle="flex flex-1 2md:flex-none justify-center gap-2 min-w-[80px]"
          />
        </div>
      </div>
      <hr className="text-[#D9D9D9]"></hr>
    </div>
  );
}
