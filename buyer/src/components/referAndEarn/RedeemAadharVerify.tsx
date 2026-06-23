'use client';

import FullscreenSpinner from "../common/spinner/fullScreenSpinner";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { aadharVerifyApiHandler, aadharVerifyGetApiHandler, AadharVerifyGetApiHandler, AadharVerifyPayload, AadharVerifyResponse } from "@/services/kycService";
import { toast } from "react-toastify";

interface RedeemAadharVerifyProps {
  onVerificationSuccess: () => void; // 🎯 Parent modal state generator trigger
  onCancel: () => void;
}

export default function RedeemAadharVerify({ onVerificationSuccess, onCancel }: RedeemAadharVerifyProps) {
  const [token, setToken] = useState<string | null>(null);
  const [showVerifyBtn, setShowVerifyBtn] = useState<boolean>(false);
  const [verificationStart, setVerificationStart] = useState<boolean>(false);

  // 📡 EXISTING REUSED MUTATION LAYER
  const { mutate: handleAdharVerify, isPending: loader } = useMutation({
    mutationFn: async (payload: AadharVerifyPayload): Promise<AadharVerifyResponse> => {
      return await aadharVerifyApiHandler(payload);
    },
    onSuccess: (response: AadharVerifyResponse) => {
      toast.success(response.message);
      // 🔥 SUCCESS: Target forward call to update dynamic wizard state to Step 2
      onVerificationSuccess();
    },
    onError: (error: any) => {
      setVerificationStart(false);
      if (Array.isArray(error.message)) {
        error.message.map((item: string) => toast.error(item));
      } else {
        toast.error(error.message);
      }
    },
  });

  // 📋 FETCH USER SPECIFIC IDENTIFICATION DATA METRICS
  const { data: aadharDetails, isLoading: detailsLoader } = useQuery({
    queryKey: ["aadhar-details"],
    queryFn: async (): Promise<AadharVerifyGetApiHandler> => {
      return aadharVerifyGetApiHandler();
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const fetchToken = async () => {
    try {
      const res = await fetch("/api/initilize-surepass");
      const data = await res.json();
      if (data?.data?.token) {
        setToken(data.data.token);
      }
    } catch (err) {
      console.error("Token initialisation runtime crash:", err);
    }
  };

  const fetchAadhar = async (id: string) => {
    const res = await fetch(`/api/get-aadhar-details/${id}`);
    const data = await res.json();
    
    if (data?.status_code == 200) {
      const aadharData = data?.data;

      const payload = {
        digilocker_metadata: aadharData?.digilocker_metadata,
        isVerified: true,
        digilocker_clientid: id,
        aadhaar_number: aadharData?.aadhaar_xml_data?.masked_aadhaar // Safe formatting string mask payload [Aadhaar Redacted]
      };

      handleAdharVerify(payload);
    } else if (data?.status_code == 422) {
      toast.error(data?.message ?? 'Re-verify Identity Credentials');
      setVerificationStart(false);
    }
  };

  // Dynamically load external global script wrappers safely
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/surepassio/surepass-digiboost-web-sdk@latest/index.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (aadharDetails && !aadharDetails?.aadhaar_verified) {
      fetchToken();
      setShowVerifyBtn(true);
    } else if (aadharDetails?.aadhaar_verified) {
      // Agar background state already pass ho chuki hai, direct callback forward fire karo
      onVerificationSuccess();
    }
  }, [aadharDetails]);

  useEffect(() => {
    if (!token || !(window as any).DigiboostSdk) return;

    (window as any).DigiboostSdk({
      gateway: process.env.NEXT_PUBLIC_SUREPASS_ENV || "sandbox",
      token,
      selector: "#surepass-modal-button",
      style: {
        backgroundColor: "#010048", // Exact matching layout theme color
        color: "#ffffff",
        padding: "14px 45px",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
        width: "100%",
        textAlign: "center"
      },
      onSuccess: (data: any) => {
        const clientId = data?.client_id;
        setVerificationStart(true);
        if (!clientId) {
          toast.error("Verification parameters tracking context missing");
          setVerificationStart(false);
          return;
        }
        fetchAadhar(clientId);
      },
      onFailure: (error: any) => {
        console.error("Verification failed:", error);
        toast.error("Identification checkpoint processing failed. Retry again.");
      },
    });
  }, [token]);

  if (detailsLoader || verificationStart) {
    return (
      <div className="w-full py-12 flex flex-col items-center justify-center gap-3">
        <FullscreenSpinner />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">Initializing Security Gateways...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full p-4 animate-fade-in">
      <div className="text-center space-y-2">
        <h4 className="text-lg font-black tracking-tight text-[#010048]">Identity Verification Checkpoint</h4>
        <p className="text-xs text-gray-400 max-w-sm mx-auto font-medium leading-relaxed">
          Please clear the multi-factor DigiLocker authorization token window to confirm financial compliance parameters.
        </p>
      </div>

      {showVerifyBtn && (
        <div className="w-full max-w-xs pt-2">
          <button
            disabled={loader}
            id="surepass-modal-button"
            className="w-full min-h-[48px] bg-[#010048] rounded-xl text-white font-bold transition hover:bg-[#010048]/90"
          ></button>
        </div>
      )}

      {/* Control Layout Footers */}
      <div className="flex w-full gap-3 pt-6 border-t border-gray-100">
        <button
          disabled={loader}
          onClick={onCancel}
          className="w-full py-3 text-center border border-gray-200 text-gray-500 font-bold text-sm rounded-xl hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}