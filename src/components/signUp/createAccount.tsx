"use client";
import { InputBase } from "@mui/material";
import React from "react";
import MobileInput from "../common/mobileInput";
import StateSelect from "../common/asyncSelect";
import ResponsiveDialog from "../singIn";
import Otp from "../otp";
import ContactInformation from "../contactInformation";

export default function CreateAccount() {
  return (
    <div
      className="bg-white relative w-full md:min-w-96 h-auto rounded-b-xl rounded-tr-xl"
      style={{ boxShadow: "0px 4px 20px 0px #0000000D", flexGrow: "11" }}
    >
      <div className="absolute rounded-full w-[90%] -top-[32px] rounded-[100px] bg-white h-[60px]"></div>
      <div className="pt-4 px-5">
        <div className="relative flex flex-wrap w-[90%] -top-[35px] text-sm gap-4 bg-white px-2 rounded-full">
          <p className="text-text-black font-semibold text-xl 2xl:text-2xl">
            Create Your Account
          </p>
        </div>
        <div className="relative -top-[35px] px-2 flex flex-col gap-6  md:gap-12 w-full">
          <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray">
            Create your free account and get started
          </p>
          <div className="flex flex-col gap-3">
            <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black font-medium">
              Full Name
            </p>
            <InputBase
              placeholder="Enter your full name"
              fullWidth
              className="box-border h-[47.81px] px-4 py-2 text-text-gray text-sm rounded-full border border-border focus:outline-none focus:border-blue"
              inputProps={{
                className: "placeholder-gray",
              }}
            />
            <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black font-medium">
              Email Address
            </p>
            <InputBase
              placeholder="Enter your email"
              fullWidth
              className="box-border h-[47.81px] px-4 py-2 text-text-gray text-sm rounded-full border border-border focus:outline-none focus:border-blue"
              inputProps={{
                className: "placeholder-gray",
              }}
            />
            <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black font-medium">
              Mobile Number
            </p>
            <MobileInput />
            <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black font-medium">
              Channel Partner Code
            </p>
            <InputBase
              placeholder="Enter your mobile number"
              fullWidth
              className="box-border h-[47.81px] px-4 py-2 text-text-gray text-sm rounded-full border border-border focus:outline-none focus:border-blue"
              inputProps={{
                className: "placeholder-gray",
              }}
            />
            <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black font-medium">
              Experience
            </p>
            <InputBase
              placeholder="Enter your experience (1.5 years)"
              fullWidth
              className="box-border h-[47.81px] px-4 py-2 text-text-gray text-sm rounded-full border border-border focus:outline-none focus:border-blue"
              inputProps={{
                className: "placeholder-gray",
              }}
            />
            <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black font-medium">
              City
            </p>
            <StateSelect />
            <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black font-medium">
              About Your Self
            </p>
            <InputBase
              placeholder="Description..."
              multiline
              fullWidth
              minRows={4}
              className="box-border text-sm text-text-gray rounded-xl border border-border focus:outline-none focus:border-blue"
              sx={{
                "& .MuiInputBase-input": {
                  padding: "1rem",
                },
              }}
            />
            <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray">
              Don't have a code?{" "}
              <span className="text-sm lg:text-sm 2xl:text-lg font-semibold underline text-text-black cursor-pointer">
                Click Here
              </span>{" "}
              to get help from our support team.
            </p>
          </div>

          <div className="flex justify-start flex-col md:flex-row gap-4 items-center">
            <button className="w-full md:w-auto animated-button px-12 py-3 border border-blue text-center cursor-pointer">
              <span className="gap-3 relative">
                <p className="text-nowrap">Create Account</p>
              </span>
            </button>
            <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray">
              Already have an account?{" "}
              <span className="text-sm lg:text-sm 2xl:text-lg font-semibold underline text-text-black cursor-pointer">
                Login Here
              </span>
            </p>
          </div>
        </div>
      </div>
      <ContactInformation/>
    </div>
  );
}
