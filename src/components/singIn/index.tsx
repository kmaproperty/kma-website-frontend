import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import MobileInput from "../common/mobileInput";

export default function SignIn() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

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
            <Image src='/assets/close-icon.png' alt='close' width={24} height={24} className="cursor-pointer"/>
            </div>
            <div className="flex flex-col items-center gap-4 xl:gap-6 w-[400px] p-2">
              <Image
                alt="Login-icon"
                src="/assets/login-logo.svg"
                width={50}
                height={50}
                style={{ width: "287px", height: "210px" }}
              />
              <div className="content-start w-full">
                <p className="text-text-black font-semibold text-xl 2xl:text-2xl pb-1">
                  Welcome Back 👋
                </p>
                <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray">
                  Log in to explore exclusive properties and connect with
                  trusted owners & partners.
                </p>
              </div>
              <div className="w-full content-start">
                <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black font-medium pb-1">
                  Mobile Number
                </p>
                <MobileInput />
              </div>
              <div className="flex justify-start flex-col md:flex-row gap-4 items-center">
                <button className="w-full md:w-auto animated-button px-12 py-3 border border-blue text-center cursor-pointer">
                  <span className="gap-3 relative">
                    <p className="text-nowrap">Continue</p>
                  </span>
                </button>
                <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray">
                  New Here?{" "}
                  <span className="text-sm lg:text-sm 2xl:text-lg font-semibold underline text-text-black cursor-pointer">
                    Create an Account
                  </span>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
