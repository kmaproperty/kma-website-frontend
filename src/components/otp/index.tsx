import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import OtpInput from "../common/optInput";

export default function Otp() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <div className="">
            <div className="flex justify-end w-full">
              <Image
                src="/assets/close-icon.png"
                alt="close"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-start w-[400px] p-2">
              <p className="text-text-black font-semibold text-xl 2xl:text-2xl pb-1">
                Verify Your Mobile Number
              </p>
              <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray pb-6">
                We've sent a 4-digit OTP to{" "}
                <span className="text-sm lg:text-sm 2xl:text-lg text-blue cursor-pointer font-medium">
                  +91 7425030807
                </span>
                .
              </p>
              <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray pb-6">
                Enter it below to access your property dashboard, post listings,
                and connect with verified owners.
              </p>
              <OtpInput />
              <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray pb-6 pt-6">
                Didn't get it?{" "}
                <span className="text-sm lg:text-sm 2xl:text-lg text-blue cursor-pointer font-medium">
                  Resent in 26s
                </span>{" "}
                or{" "}
                <span className="text-sm lg:text-sm 2xl:text-lg font-medium underline text-blue cursor-pointer">
                  Chagne Number
                </span>
              </p>
              <div className="flex justify-start flex-col md:flex-row gap-4 items-center">
                <button className="w-full md:w-auto animated-button px-12 py-3 border border-blue text-center cursor-pointer">
                  <span className="gap-3 relative">
                    <p className="text-nowrap">Continue</p>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
