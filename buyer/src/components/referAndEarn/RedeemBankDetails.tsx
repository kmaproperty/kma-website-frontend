"use client";

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

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

type VerifiedDetails = {
  full_name: string;
  bank_name: string;
  branch_name: string;
  city: string;
};

interface RedeemBankDetailsProps {
  onVerificationSuccess: () => void; 
  onCancel: () => void;
}

export default function RedeemBankDetails({ onVerificationSuccess, onCancel }: RedeemBankDetailsProps) {
  const [formData, setFormData] = useState({
    accountNumber: "",
    ifscCode: "",
  });

  const [errors, setErrors] = useState<{ accountNumber?: string; ifscCode?: string }>({});
  const [verified, setVerified] = useState<VerifiedDetails | null>(null);
  const [verifying, setVerifying] = useState(false);

  const dynamicClass = (flag: string | undefined) =>
    `box-border h-[47.81px] px-4 py-2 text-sm rounded-xl border focus:outline-none w-full ${
      flag ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#010048]"
    } text-gray-700`;

  const handleChange = (field: "accountNumber" | "ifscCode", value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (verified) setVerified(null);
  };

  const validateInputs = () => {
    const e: { accountNumber?: string; ifscCode?: string } = {};
    if (!formData.accountNumber.trim()) e.accountNumber = "Account number is required";
    else if (formData.accountNumber.length < 9 || formData.accountNumber.length > 18) e.accountNumber = "Account number must be 9-18 digits";
    if (!formData.ifscCode.trim()) e.ifscCode = "IFSC code is required";
    else if (!IFSC_REGEX.test(formData.ifscCode.toUpperCase())) e.ifscCode = "Invalid IFSC format (e.g. SBIN0032224)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleVerify = async () => {
    if (!validateInputs()) return;
    setVerifying(true);
    try {
      const res = await fetch("/api/verify-bank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_number: formData.accountNumber,
          ifsc: formData.ifscCode.toUpperCase(),
          beneficiary_name: "",
        }),
      });
      const result = await res.json();

      if (result?.success && result?.data?.account_exists) {
        const ifscDetails = result.data.ifsc_details ?? {};
        setVerified({
          full_name: result.data.full_name ?? "",
          bank_name: ifscDetails.bank ?? "",
          branch_name: ifscDetails.branch ?? "",
          city: ifscDetails.city ?? "",
        });
        toast.success("Account verified — please confirm the details below");
      } else {
        toast.error(result?.data?.remarks || result?.message || "Could not verify account.");
      }
    } catch {
      toast.error("Bank verification service unavailable.");
    }
    setVerifying(false);
  };

  const { mutate: handleBankDetails, isPending: bankLoader } = useMutation({
    mutationFn: async (payload: BankDetailsPayload): Promise<BankDetailsResponse> => bankDetailsApiHandler(payload),
    onSuccess: (response) => {
      toast.success(response.message);
      onVerificationSuccess();
    },
    onError: (error: any) => {
      if (Array.isArray(error.message)) error.message.map((m: string) => toast.error(m));
      else toast.error(error.message);
    },
  });

  const { data: bankDetails, isLoading: detailsLoader } = useQuery({
    queryKey: ["bank details"],
    queryFn: async (): Promise<BankDetailsGetResponse> => bankDetailsGetApiHandler(),
    staleTime: 0,
    refetchOnMount: true,
  });

  useEffect(() => {
    const data = bankDetails?.bank_details;
    if (data) {
      setFormData({
        accountNumber: data.account_number,
        ifscCode: data.ifsc_code,
      });
      setVerified({
        full_name: data.account_holder_name,
        bank_name: data.bank_name,
        branch_name: data.branch_name ?? "",
        city: "",
      });
    }
  }, [bankDetails]);

  const handleSubmit = () => {
    if (!verified) {
      toast.error("Please verify your account details first");
      return;
    }
    handleBankDetails({
      account_number: formData.accountNumber,
      ifsc_code: formData.ifscCode.toUpperCase(),
      bank_name: verified.bank_name,
      account_holder_name: verified.full_name,
      branch_name: verified.branch_name,
    });
  };

  if (detailsLoader || verifying) {
    return (
      <div className="w-full py-8 flex flex-col items-center justify-center gap-2">
        <FullscreenSpinner />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">Syncing Settlement...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 text-left animate-fade-in">
      <div>
        <p className="text-sm font-bold text-[#010048] pb-1">Account number</p>
        <InputBase
          placeholder="Enter 9-18 digit account number"
          fullWidth
          value={formData.accountNumber}
          onChange={(e) => {
            const v = e.target.value;
            if (!/^\d*$/.test(v) || v.length > 18) return;
            handleChange("accountNumber", v);
            setErrors((p) => ({ ...p, accountNumber: undefined }));
          }}
        //   className={dynamicClass(errors.accountNumber)}
        sx={{
    boxBorder: "border-box",
    height: "47.81px",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "8px",
    paddingBottom: "8px",
    fontSize: "0.875rem",
    borderRadius: "12px",
    border: errors.accountNumber ? "1px solid #ef4444" : "1px solid #e5e7eb",
    "&.Mui-focused": {
      borderColor: errors.accountNumber ? "#ef4444" : "#010048",
    },
    color: "#374151",
    width: "100%",
  }}
          inputProps={{ className: "placeholder-gray", inputMode: "numeric" }}
        />
        {errors.accountNumber && <p className="pt-1 text-red-500 text-xs font-semibold">{errors.accountNumber}</p>}
      </div>

      <div>
        <p className="text-sm font-bold text-[#010048] pb-1">IFSC code</p>
        <InputBase
          placeholder="e.g. SBIN0032224"
          fullWidth
          value={formData.ifscCode}
          onChange={(e) => {
            const v = e.target.value.toUpperCase();
            if (v.length > 11) return;
            handleChange("ifscCode", v);
            setErrors((p) => ({ ...p, ifscCode: undefined }));
          }}
        //   className={dynamicClass(errors.ifscCode)}
        sx={{
    boxSizing: "border-box",
    height: "47.81px",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "8px",
    paddingBottom: "8px",
    fontSize: "0.875rem",
    borderRadius: "9999px",
    border: errors.ifscCode ? "1px solid #ef4444" : "1px solid #e5e7eb",
    "&.Mui-focused": {
      borderColor: errors.ifscCode ? "#ef4444" : "#010048",
    },
    color: "#374151",
    width: "100%",
  }}
          inputProps={{ className: "placeholder-gray", style: { textTransform: "uppercase" } }}
        />
        {errors.ifscCode && <p className="pt-1 text-red-500 text-xs font-semibold">{errors.ifscCode}</p>}
      </div>

      {!verified ? (
        <div className="flex w-full gap-3 pt-6 border-t border-gray-100">
          <button
            onClick={onCancel}
            type="button"
            className="w-1/2 py-3 border border-gray-200 text-gray-500 font-bold text-sm rounded-xl hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleVerify}
            className="w-1/2 bg-[#010048] text-white font-bold text-sm py-3 rounded-xl shadow-sm hover:bg-[#010048]/90 cursor-pointer"
          >
            Verify Account
          </button>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 space-y-3 border-dashed">
          <p className="text-xs font-black text-emerald-800 uppercase tracking-wider">Confirm Beneficiary Details:</p>
          <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-gray-600">
            <div>
              <p className="text-gray-400 text-[10px] uppercase">Account holder</p>
              <p className="text-[#010048] font-bold">{verified.full_name || "—"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase">Bank</p>
              <p className="text-[#010048] font-bold">{verified.bank_name || "—"}</p>
            </div>
          </div>

          <div className="flex w-full gap-3 pt-4 border-t border-emerald-100/60">
            <button
              type="button"
              onClick={() => setVerified(null)}
              className="w-1/3 py-2 border border-gray-200 text-gray-500 text-xs font-bold rounded-lg bg-white cursor-pointer"
            >
              Re-enter
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={bankLoader}
              className="w-2/3 bg-[#010048] text-white font-bold text-xs py-2 rounded-lg shadow-sm hover:bg-[#010048]/90 cursor-pointer disabled:opacity-50"
            >
              {bankLoader ? "Saving Node..." : "Confirm & Submit Details"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}