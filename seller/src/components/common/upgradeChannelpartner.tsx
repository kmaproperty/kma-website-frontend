"use client";
import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { InputBase } from "@mui/material";

export default function UpgradeChannelPartner({open, onClose, onSubmit, isCloseNotRequired = false} : {open: boolean,onClose: () => void, onSubmit: (payload: any) => void, isCloseNotRequired?: boolean}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
const dateRef = React.useRef<HTMLInputElement | null>(null)

  const [code, setCode] = React.useState<string>('')
  const [firmName, setFirmName] = React.useState<string>('')
  const [about, setAbout] = React.useState<string>('')
  const [date, setDate] = React.useState(null)

  const [error, setError] = React.useState<any>({})

  const handleClose: DialogProps["onClose"] = (event, reason) => {
      if (reason === "backdropClick" || reason === "escapeKeyDown") return;
      setCode('')
      onClose()
    };

    const validate = () => {
        let hasError = false;
        let errors: any = {}

        if(!code){
            errors.code = 'Channel partner code is required';
            hasError = true
        }

        if(!firmName){
            errors.firmName = 'Firm name is required';
            hasError = true
        }

        if(!date){
            errors.date = 'Bussiness since date is required';
            hasError = true
        }

        setError(errors)
        return hasError
    }

    const handleSubmit = () => {
        if(validate()){
            return
        }
        if(onSubmit){
            let payload = {
              channelPartnerCode: code,
              firmName: firmName,
              businessSince: date,
              aboutYourSelf: about,
            }
            onSubmit(payload)
            if(!isCloseNotRequired){
              onClose()
            }
        }
    }

      const dynamicClass = (flag: string) => {
    return `
                  box-border h-[47.81px] px-4 py-2 text-sm rounded-full 
                  border focus:outline-none
                  ${
                    Boolean(flag)
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-blue"
                  }
                  text-text-gray
                `;
  };

  React.useEffect(() => {
    if(open){
      setCode('')
    }
  },[open])

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        slotProps={{
          paper: {
            sx: {
              borderRadius: fullScreen ? '' : "1rem",
            },
          },
        }}
      >
        <DialogContent>
          <div >
            <div className="flex justify-end w-full">
              <Image
                onClick={() => {
                  setCode('')
                  setFirmName('')
                  setAbout('')
                  setDate(null)
                   onClose()
                }}
                src="/assets/close-icon.svg"
                alt="close"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-[400px] p-1">
                <p className="required-label text-base text-text-black">
                  Channel partner code
                </p>
                <div>
                <InputBase
                placeholder={`Enter channel partner code`}
                fullWidth
                value={code}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    setCode(event.target.value)
                    setError((pre) => ({...pre, code: ''}))
                }}
                className={dynamicClass(error.code)}
                inputProps={{
                    className: "placeholder-gray",
                }}
                />
                {error?.code && (
                <p className="pt-1 text-red-500 text-xs">
                    {error?.code}
                </p>
                )}

                <p className="required-label text-sm 1xl:text-base text-text-black py-2">
                    Firm Name
                </p>
                <div>
                    <InputBase
                    placeholder="Enter firm name"
                    fullWidth
                    value={firmName}
                    onChange={(e) => {
                        setFirmName(e.target.value)
                        setError((pre) => ({...pre, firmName: ''}))
                    }}
                    inputProps={{
                        className: "placeholder-gray",
                    }}
                    className={dynamicClass(error.firmName)}
                    />
                    {error?.firmName && (
                    <p className="pt-1 text-red-500 text-xs">
                        {error?.firmName}
                    </p>
                    )}
                    </div>

                    <p className="required-label text-sm 1xl:text-base text-text-black py-2 ">
                        In Bussiness Since
                    </p>
                    <div onClick={() => {dateRef.current?.showPicker()}}>
                        <InputBase
                        inputRef={dateRef}
                        placeholder="Selct"
                        type="date"
                        fullWidth
                        onChange={(e) => {
                            setDate(e.target.value)
                            setError((pre) => ({...pre, date: ''}))
                        }}
                        value={date ?? ''}
                        className={dynamicClass(error.date)}
                        inputProps={{
                            className: "placeholder-gray",
                            max: new Date().toISOString().split('T')[0],
                        }}
                        />
                        {error.date && (
                        <p className="pt-1 text-red-500 text-xs">
                            {error.date}
                        </p>
                        )}
                    </div>

                    <p className="text-sm text-sm 1xl:text-base text-text-black py-2">
                        About Your Self
                    </p>
                    <InputBase
                        placeholder="Description..."
                        multiline
                        fullWidth
                        minRows={4}
                        value={about}
                        onChange={(e) => {
                            setAbout(e.target.value)
                        }}
                        className="box-border text-sm text-text-gray rounded-xl border border-border focus:outline-none focus:border-blue"
                        sx={{
                        "& .MuiInputBase-input": {
                            padding: "1rem",
                        },
                        }}
                    />
            </div>
              <div className="pt-4 flex justify-start flex-col md:flex-row gap-4 items-center w-full">
                <button onClick={handleSubmit} className="w-full animated-button px-12 py-3 border border-blue text-center cursor-pointer">
                  <span className="gap-3 relative">
                    <p className="text-nowrap">Submit</p>
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
