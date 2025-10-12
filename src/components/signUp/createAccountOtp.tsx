"use client";
import React, { useState } from "react";
import OtpInput from "../common/optInput";
import { matchIsNumeric } from "@/lib/commonValidator";

export default function CreateAccountOtp() {
  const [otp, setOtp] = useState<string>("");

  const handleChange = (val: string) => {
    setOtp(val);
  };

  const handleComplete = (val: string) => {
    console.log("OTP Complete:", val);
  };
  return (
    <div
      className="bg-white relative w-full md:min-w-96 h-auto rounded-b-xl rounded-tr-xl mt-0 md:mt-20"
      style={{ boxShadow: "0px 4px 20px 0px #0000000D", flexGrow: "11" }}
    >
      <div className="absolute rounded-full w-[90%] -top-[32px] rounded-[100px] bg-white h-[60px]"></div>
      <div className="pt-4 px-5">
        <div className="relative flex flex-wrap w-[90%] -top-[32px] text-sm gap-4 bg-white p-2 rounded-full">
          <p className="text-text-black font-semibold text-xl 2xl:text-2xl">
            Verify Your Mobile Number
          </p>
        </div>
        <div className="relative -top-[32px] p-2 flex flex-col gap-6 md:gap-10 w-full">
          <div>
            <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray">
              We've sent a 4-digit OTP to your mobile number{" "}
              <span className="text-blue">+91-7425030807</span>
            </p>
            <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray">
              Not your number?{" "}
              <span className="text-blue italic underline cursor-pointer">Change</span>
            </p>
          </div>
          <div>
            <p className="text-sm lg:text-base 2xl:text-lg text-text-black font-medium pb-3">
              Enter the OTP below to continue
            </p>
            <OtpInput
              length={4}
              value={otp}
              onChange={handleChange}
              onComplete={handleComplete}
              validateChar={matchIsNumeric}
            />
          </div>
          <div className="flex flex-col justify-center gap-4 items-start">
              <button className="animated-button px-12 py-3 border border-blue text-center cursor-pointer">
                <span className="gap-3 relative">
                  <p className="text-nowrap">Verify OTP</p>
                </span>
              </button>
              <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray">
                Didn't get the code?
                <span className="text-sm lg:text-sm 2xl:text-lg text-text-black ml-1 cursor-pointer">
                Resent OTP in 0:21
                </span>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}
