import { InputBase } from "@mui/material";
import FullscreenSpinner from "../common/spinner/fullScreenSpinner";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  bankDetailsApiHandler,
  bankDetailsGetApiHandler,
  BankDetailsGetResponse,
  BankDetailsPayload,
  BankDetailsResponse,
} from "@/services/kycService";
import { toast } from "react-toastify";
import { useRouter } from "nextjs-toploader/app";

export default function BankDetails() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    holderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const [errors, setErrors] = useState<any>({});
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

  const handleChange = (fieldName: string, value: string) => {
    setFormData((pre) => ({ ...pre, [fieldName]: value }));
  };

  const validateForm = () => {
    let hasError = false;
    let updatedError: any = {};

    if (!formData.holderName && !formData.holderName.trim()) {
      hasError = true;
      updatedError.holderName = "Bank account holder name is required";
    }
    if (!formData.bankName && !formData.bankName.trim()) {
      hasError = true;
      updatedError.bankName = "Bank name is required";
    }

    if (!formData.accountNumber && !formData.accountNumber.trim()) {
      hasError = true;
      updatedError.accountNumber = "Account number is required";
    }

    if (!formData.ifscCode && !formData.ifscCode.trim()) {
      hasError = true;
      updatedError.ifscCode = "IFSC code is required";
    }

    setErrors(updatedError);
    return hasError;
  };

  const { mutate: handleBankDetails, isPending: bankLoader } = useMutation({
    mutationFn: async (
      payload: BankDetailsPayload
    ): Promise<BankDetailsResponse> => {
      return await bankDetailsApiHandler(payload);
    },
    onSuccess: (response: BankDetailsResponse) => {
      toast.success(response.message);
    },
    onError: (error: any) => {
      if (Array.isArray(error.message)) {
        error.message.map((item: string) => {
          toast.error(item);
        });
      } else {
        toast.error(error.message);
      }
    },
  });

  const { data: bankDetails, isLoading: detailsLoader } = useQuery({
    queryKey: ["bank details"],
    queryFn: async (): Promise<BankDetailsGetResponse> => {
      return bankDetailsGetApiHandler();
    },
    select: (resposne: BankDetailsGetResponse) => {
      console.log("uploadDetails", resposne);
      return resposne;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const handleSubmit = () => {
    if (validateForm()) {
      return;
    }

    const payload = {
      account_number: formData.accountNumber,
      ifsc_code: formData.ifscCode,
      bank_name: formData.bankName,
      account_holder_name: formData.accountNumber,
    };

    handleBankDetails(payload);
  };

  useEffect(() => {
    if (bankDetails) {
      let data = bankDetails?.bank_details;
      if (data) {
        setFormData(() => ({
          holderName: data.account_holder_name,
          bankName: data.bank_name,
          accountNumber: data.account_number,
          ifscCode: data.ifsc_code,
        }));
      }
    }
  }, [bankDetails]);

  const handleCancel = () => {
    router.push('/profile')
  }

  return (
    <>
      {detailsLoader ? (
        <FullscreenSpinner />
      ) : (
        <div className="w-[50%]">
          <p className="required-label text-sm 1xl:text-base text-text-black py-2">
            Bank account holder name
          </p>
          <div>
            <InputBase
              placeholder="name"
              fullWidth
              value={formData.holderName}
              onChange={(e) => {
                const value = e.target.value;
                handleChange("holderName", value);
                setErrors((pre) => ({ ...pre, holderName: "" }));
              }}
              className={dynamicClass(errors.holderName)}
              inputProps={{
                className: "placeholder-gray",
              }}
            />
            {errors.holderName && (
              <p className="pt-1 text-red-500 text-xs">{errors.holderName}</p>
            )}
          </div>
          <p className="required-label text-sm 1xl:text-base text-text-black py-2">
            Enter your bank name
          </p>
          <div>
            <InputBase
              placeholder="Bank Name"
              fullWidth
              value={formData.bankName}
              onChange={(e) => {
                handleChange("bankName", e.target.value);
                setErrors((pre) => ({ ...pre, bankName: "" }));
              }}
              className={dynamicClass(errors.bankName)}
              inputProps={{
                className: "placeholder-gray",
              }}
            />
            {errors.bankName && (
              <p className="pt-1 text-red-500 text-xs">{errors.bankName}</p>
            )}
          </div>
          <p className="required-label text-sm 1xl:text-base text-text-black py-2">
            Enter your account number
          </p>
          <div>
            <InputBase
              placeholder="Account Number"
              fullWidth
              value={formData.accountNumber ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                const isOnlyDigits = /^\d*$/.test(value);
                if (!isOnlyDigits) return;
                handleChange("accountNumber", value);
                setErrors((pre) => ({ ...pre, accountNumber: "" }));
              }}
              className={dynamicClass(errors.accountNumber)}
              inputProps={{
                className: "placeholder-gray",
              }}
            />
            {errors.accountNumber && (
              <p className="pt-1 text-red-500 text-xs">
                {errors.accountNumber}
              </p>
            )}
          </div>
          <p className="required-label text-sm 1xl:text-base text-text-black py-2">
            Enter the IFSC code
          </p>
          <div>
            <InputBase
              placeholder="IFSC Code"
              fullWidth
              value={formData.ifscCode}
              onChange={(e) => {
                const value = e.target.value;
                handleChange("ifscCode", value);
                setErrors((pre) => ({ ...pre, ifscCode: "" }));
              }}
              className={dynamicClass(errors.ifscCode)}
              inputProps={{
                className: "placeholder-gray",
              }}
            />
            {errors.ifscCode && (
              <p className="pt-1 text-red-500 text-xs">{errors.ifscCode}</p>
            )}
          </div>

          {/* Submit / Cancel */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button onClick={handleCancel} className="w-full md:w-[130px] text-sm 1xl:text-base px-12 py-3 border border-blue text-center cursor-pointer rounded-full bg-light-purple">
              <span className="gap-3 relative flex justify-center">
                <p className={`text-nowrap font-medium`}>Cancel</p>
              </span>
            </button>

            <button
              className="cursor-pointer w-full md:w-[130px] px-12 py-3 animated-button border border-blue"
              onClick={() => {
                handleSubmit();
              }}
              disabled={bankLoader}
            >
              <span className="gap-3 relative flex justify-center">
                <p className={`text-nowrap`}>Submit</p>
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
