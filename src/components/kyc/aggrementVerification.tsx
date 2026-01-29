import {
  ChannelPartnerAgreementApiHandler,
  ChannelPartnerAgreementResponse,
} from "@/services/userService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../common/spinner";
import { DocusignResponse, docuSingStatusApiHanlder } from "@/services/kycService";

export default function AggrementVerification({event}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState('Pending')
  const [isSignDone, setIsSignDone] = useState(false)
  const [canRetry, setCanRetry] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const { mutate: handleSignChannelPartnerAgreement, isPending } = useMutation({
    mutationFn: async (
      url: string
    ): Promise<ChannelPartnerAgreementResponse> => {
      return await ChannelPartnerAgreementApiHandler(url);
    },
    onSuccess: (response: ChannelPartnerAgreementResponse) => {
      if (response.url) {
        window.open(response.url, "_blank");
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

  const handleSignDocument = () => {
    const domainUrl = `${window.location.origin}/user-dashboard`;
    handleSignChannelPartnerAgreement(domainUrl);
  };

  const { data: documentDetails, isLoading: detailsLoader } = useQuery({
    queryKey: ["docusign details"],
    queryFn: async (): Promise<DocusignResponse> => {
      return docuSingStatusApiHanlder();
    },
    select: (resposne: DocusignResponse) => {
      return resposne;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  useEffect(() => {
    if(documentDetails){
        if(documentDetails?.docusign_agreement_signed){
            setStatus('Completed')
            setIsSignDone(true)
        }
    }
  },[documentDetails])

  useEffect(() => {
    if (!event) return;

    switch (event) {
      case "signing_complete":
        setMessage("Document signed successfully");
        toast.success("Document signed successfully");
        setNavigate(true);
        break;
      case "decline":
        setMessage("Document was declined");
        setCanRetry(true);
        break;
      case "view":
        setMessage("Document viewed");
        setCanRetry(true);
        break;
      case "cancel":
        setMessage("Document sign canceled");
        setCanRetry(true);
        break;
      default:
        setMessage("Document sign not completed");
        setCanRetry(true);
    }
  }, [event]);

  const handleCancel = () => {
    router.push('/profile')
  }
  
  return (
    <div>
      <p className="font-bold text-text-gray">
        Status: <span className="text-blue">{status}</span>
      </p>
      {message && <p>{message}</p>}

      <div className="flex flex-wrap justify-center gap-2 mt-8">
        <button onClick={handleCancel} className="w-full md:w-[130px] text-sm 1xl:text-base px-12 py-3 border border-blue text-center cursor-pointer rounded-full bg-light-purple">
          <span className="gap-3 relative flex justify-center">
            <p className={`text-nowrap font-medium`}>Cancel</p>
          </span>
        </button>

        {!isSignDone && <button
          disabled={isPending}
          className="cursor-pointer w-full md:w-[160px] px-12 py-3 animated-button border border-blue"
          onClick={() => {
            handleSignDocument();
          }}
        >
          <span className="gap-3 relative flex justify-center">
            {!isPending ? (
                <p className={`text-nowrap`}>{canRetry ? 'Retry Again' : 'Sign Document'}</p>
              ) : (
                <Spinner size={20} className="h-[24px]"/>
              )}
          </span>
        </button>}
      </div>
    </div>
  );
}
