'use client'

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import InfoSection from "./infoSection";

export default function ContentLayout({
  cardContent,
  params
}: {
  cardContent: React.ReactNode;
  params: any;
}) {
  const formData = useSelector((state: RootState) => state.form);
  const isLogin = params?.isLogin === "true";
  const isOtp = params?.isOtp === "true";
  const flow = params?.flow;
  const isPostProperty = params?.postProperty === "true";
  const isLoginView = isLogin || (isOtp && flow === "login");
  const isPostPropertyView = isPostProperty && !isOtp;
  console.log(isLoginView)

  const postPropertyTitle = formData.userType === "OWNER" ? 'List Your Property in 3 Simple Steps' : 'Scale Your Business with Gurgaon’s Smartest Network'
  const postPropertySubHeading = (formData.userType === "OWNER" && !isOtp) ? 'Quick, verified, and 100% free. Experience the new way of closing deals in Gurgaon with our 80/20 support model.' : ''

  return (
    <div className="w-full grid grid-cols-1 md:flex md:flex-wrap justify-between items-start gap-10">
      <div style={{ flex: "2.6 1 " }}>
        <InfoSection
            titlePrefix={isPostPropertyView ? "Create An Account" : isLoginView ? "Welcome Back" : isOtp ? "" : "New To KMA?"}
            title={isPostPropertyView ? postPropertyTitle : isLoginView ? "Login To Your Account" : isOtp ? "Join Gurgaon's Smartest Property Network" : "Create An Account"}
            subHeading={postPropertySubHeading}
            params={params}
          />
      </div>
      <div style={{ flex: "1.5 1 " }} className="mt-2 md:mt-[4.5rem]">
        {cardContent}
      </div>
    </div>
  );
}
