import { InputBase, MenuItem, Select } from "@mui/material";
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

const INDIAN_BANKS = [
  "State Bank of India",
  "Punjab National Bank",
  "Bank of Baroda",
  "Bank of India",
  "Canara Bank",
  "Union Bank of India",
  "Indian Bank",
  "Central Bank of India",
  "Indian Overseas Bank",
  "UCO Bank",
  "Bank of Maharashtra",
  "Punjab & Sind Bank",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "IndusInd Bank",
  "Yes Bank",
  "IDBI Bank",
  "Federal Bank",
  "South Indian Bank",
  "RBL Bank",
  "Bandhan Bank",
  "IDFC First Bank",
  "Jammu & Kashmir Bank",
  "Karnataka Bank",
  "Karur Vysya Bank",
  "City Union Bank",
  "Tamilnad Mercantile Bank",
  "DCB Bank",
  "Dhanlaxmi Bank",
  "Lakshmi Vilas Bank",
  "Nainital Bank",
  "CSB Bank",
  "AU Small Finance Bank",
  "Equitas Small Finance Bank",
  "Ujjivan Small Finance Bank",
  "Jana Small Finance Bank",
  "Other",
];

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export default function BankDetails({isPopup = false, onClose}: {isPopup?: boolean; onClose?: (success: boolean) => void}) {
  const router = useRouter()
  const isProduction = process.env.NEXT_PUBLIC_SUREPASS_ENV === "production";

  const [formData, setFormData] = useState({
    holderName: "",
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
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

    if (!formData.holderName || !formData.holderName.trim()) {
      hasError = true;
      updatedError.holderName = "Bank account holder name is required";
    } else if (formData.holderName.trim().length < 3) {
      hasError = true;
      updatedError.holderName = "Name must be at least 3 characters";
    }

    if (!formData.bankName || !formData.bankName.trim()) {
      hasError = true;
      updatedError.bankName = "Please select your bank";
    }

    if (!formData.accountNumber || !formData.accountNumber.trim()) {
      hasError = true;
      updatedError.accountNumber = "Account number is required";
    } else if (formData.accountNumber.length < 9 || formData.accountNumber.length > 18) {
      hasError = true;
      updatedError.accountNumber = "Account number must be 9-18 digits";
    }

    if (!formData.confirmAccountNumber || formData.confirmAccountNumber !== formData.accountNumber) {
      hasError = true;
      updatedError.confirmAccountNumber = "Account numbers do not match";
    }

    if (!formData.ifscCode || !formData.ifscCode.trim()) {
      hasError = true;
      updatedError.ifscCode = "IFSC code is required";
    } else if (!IFSC_REGEX.test(formData.ifscCode.toUpperCase())) {
      hasError = true;
      updatedError.ifscCode = "Invalid IFSC format (e.g. SBIN0032224)";
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
      if(isPopup){
        onClose?.(true)
      }else{
        router.push('/kyc?tabName=Agreement Signature')
      }
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
      return resposne;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const [verifying, setVerifying] = useState(false);

  const handleSubmit = async () => {
    if (validateForm()) {
      return;
    }

    setVerifying(true);
    try {
      const res = await fetch("/api/verify-bank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_number: formData.accountNumber,
          ifsc: formData.ifscCode.toUpperCase(),
          beneficiary_name: formData.holderName,
        }),
      });
      const result = await res.json();

      if (result?.success && result?.data?.account_exists) {
        toast.success("Bank account verified successfully");
      } else {
        if (isProduction) {
          toast.error(result?.message || "Bank account verification failed. Please check your details and try again.");
          setVerifying(false);
          return;
        }
        toast.warning("Bank verification could not confirm your account. Details will be reviewed manually.");
      }
    } catch {
      if (isProduction) {
        toast.error("Bank verification service unavailable. Please try again later.");
        setVerifying(false);
        return;
      }
      toast.warning("Bank verification service unavailable. Details will be reviewed manually.");
    }
    setVerifying(false);

    const payload = {
      account_number: formData.accountNumber,
      ifsc_code: formData.ifscCode.toUpperCase(),
      bank_name: formData.bankName,
      account_holder_name: formData.holderName,
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
          confirmAccountNumber: data.account_number,
          ifscCode: data.ifsc_code,
        }));
      }
    }
  }, [bankDetails]);

  const handleCancel = () => {
    if(isPopup){
      onClose?.(false)
    }else{
      router.push('/user-dashboard')
    }
  }

  return (
    <>
      {detailsLoader ? (
        <FullscreenSpinner />
      ) : (
        <div className={isPopup ? '' : "w-[50%]"}>
          <p className="required-label text-sm 1xl:text-base text-text-black py-2">
            Bank account holder name
          </p>
          <div>
            <InputBase
              placeholder="Enter full name as per bank records"
              fullWidth
              value={formData.holderName}
              onChange={(e) => {
                const value = e.target.value;
                handleChange("holderName", value);
                setErrors((pre: any) => ({ ...pre, holderName: "" }));
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
            Select your bank
          </p>
          <div>
            <Select
              fullWidth
              value={formData.bankName}
              onChange={(e) => {
                handleChange("bankName", e.target.value);
                setErrors((pre: any) => ({ ...pre, bankName: "" }));
              }}
              displayEmpty
              className={`${dynamicClass(errors.bankName)} !rounded-full`}
              sx={{
                borderRadius: '9999px',
                height: '47.81px',
                '.MuiSelect-select': { padding: '8px 16px' },
                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}
            >
              <MenuItem value="" disabled>
                <span className="text-text-gray/80">Select bank</span>
              </MenuItem>
              {INDIAN_BANKS.map((bank) => (
                <MenuItem key={bank} value={bank}>
                  {bank}
                </MenuItem>
              ))}
            </Select>
            {errors.bankName && (
              <p className="pt-1 text-red-500 text-xs">{errors.bankName}</p>
            )}
          </div>

          <p className="required-label text-sm 1xl:text-base text-text-black py-2">
            Enter your account number
          </p>
          <div>
            <InputBase
              placeholder="Enter 9-18 digit account number"
              fullWidth
              value={formData.accountNumber ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                const isOnlyDigits = /^\d*$/.test(value);
                if (!isOnlyDigits || value.length > 18) return;
                handleChange("accountNumber", value);
                setErrors((pre: any) => ({ ...pre, accountNumber: "" }));
              }}
              className={dynamicClass(errors.accountNumber)}
              inputProps={{
                className: "placeholder-gray",
                inputMode: "numeric",
              }}
            />
            {errors.accountNumber && (
              <p className="pt-1 text-red-500 text-xs">
                {errors.accountNumber}
              </p>
            )}
          </div>

          <p className="required-label text-sm 1xl:text-base text-text-black py-2">
            Confirm account number
          </p>
          <div>
            <InputBase
              placeholder="Re-enter account number"
              fullWidth
              value={formData.confirmAccountNumber ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                const isOnlyDigits = /^\d*$/.test(value);
                if (!isOnlyDigits || value.length > 18) return;
                handleChange("confirmAccountNumber", value);
                setErrors((pre: any) => ({ ...pre, confirmAccountNumber: "" }));
              }}
              className={dynamicClass(errors.confirmAccountNumber)}
              inputProps={{
                className: "placeholder-gray",
                inputMode: "numeric",
              }}
            />
            {errors.confirmAccountNumber && (
              <p className="pt-1 text-red-500 text-xs">
                {errors.confirmAccountNumber}
              </p>
            )}
          </div>

          <p className="required-label text-sm 1xl:text-base text-text-black py-2">
            Enter the IFSC code
          </p>
          <div>
            <InputBase
              placeholder="e.g. SBIN0032224"
              fullWidth
              value={formData.ifscCode}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                if (value.length > 11) return;
                handleChange("ifscCode", value);
                setErrors((pre: any) => ({ ...pre, ifscCode: "" }));
              }}
              className={dynamicClass(errors.ifscCode)}
              inputProps={{
                className: "placeholder-gray",
                style: { textTransform: 'uppercase' },
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
              disabled={bankLoader || verifying}
            >
              <span className="gap-3 relative flex justify-center">
                <p className={`text-nowrap`}>{verifying ? "Verifying..." : "Submit"}</p>
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
