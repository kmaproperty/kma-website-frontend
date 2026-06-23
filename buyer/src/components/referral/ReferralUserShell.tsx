// "use client";

// import LoginCard from "@/components/channelParterner/loginCard";
// import LoginOtpCard from "@/components/channelParterner/loginOtpCard";
// import HomeFooter from "@/components/footer/homeFooter";
// import AboutusDataSync from "@/components/footer/AboutusDataSync";
// import HomeHeader from "@/components/header/homeHeader";
// import ReferralSubNav from "@/components/referral/ReferralSubNav";
// import { closeReferralLoginDialog } from "@/lib/referral/openLoginDialog";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "nextjs-toploader/app";

// type ReferralUserShellProps = {
//   title: string;
//   description?: string;
//   breadcrumb?: string;
//   showSubNav?: boolean;
//   children: React.ReactNode;
// };

// export default function ReferralUserShell({
//   title,
//   description,
//   breadcrumb = "Home1 / Refer and Earn",
//   showSubNav = true,
//   children,
// }: ReferralUserShellProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const isLoginParam = searchParams.get("isLogin") === "true";
//   const isOtpParam = searchParams.get("isOtp") === "true";
//   const flowParam = searchParams.get("flow");
//   /** Owner/CP uses flow=login; "User" role uses flow=enduser-login after OTP is sent (see LoginCard). */
//   const isOtpStep =
//     isOtpParam && (flowParam === "login" || flowParam === "enduser-login");
//   const isLoginDialogOpen = isLoginParam || isOtpStep;

//   return (
//     <div className="bg-[#F8FAFC] min-h-screen">
//       <div className="fixed left-0 right-0 z-[60] flex justify-center pointer-events-none">
//         <div className="pointer-events-auto w-full flex justify-center">
//           <HomeHeader />
//         </div>
//       </div>

//       <div className="relative pt-[25px] min-h-[280px] rounded-b-[60px] bg-[#010048]">
//         <div className="w-[90%] max-w-[1100px] mx-auto mt-[120px] pb-[100px] text-white">
//           <p className="text-sm opacity-90">{breadcrumb}</p>
//           <h1 className="text-[26px] md:text-[36px] leading-[1.15] font-semibold mt-2">{title}</h1>
//           {description ? <p className="text-sm md:text-base mt-3 max-w-[720px] opacity-95">{description}</p> : null}
//           <p>You need to submit the referral before the deal to be eligible for the referral reward. Claims made after the deal will not be accepted.</p>
//           {showSubNav ? <ReferralSubNav /> : null}
//         </div>
//       </div>

//       <div className="w-[90%] max-w-[1100px] mx-auto mt-[72px] pb-[90px]">{children}</div>

//       <div className="bg-text-black flex justify-center">
//         <AboutusDataSync />
//         <HomeFooter tab={1} />
//       </div>

//       <Dialog
//         open={isLoginDialogOpen}
//         onClose={() => closeReferralLoginDialog(router)}
//         slotProps={{
//           paper: {
//             sx: {
//               borderRadius: "0.75rem",
//             },
//           },
//         }}
//       >
//         <DialogContent sx={{ padding: 0 }}>
//           <div className="relative w-full rounded-xl bg-white sm:w-[460px]">
//             <button
//               type="button"
//               onClick={() => closeReferralLoginDialog(router)}
//               className="absolute right-4 top-4 z-10 rounded-full p-1 text-[#1E2236] transition hover:bg-black/5"
//               aria-label="Close login dialog"
//             >
//               ✕
//             </button>
//             {isOtpStep ? <LoginOtpCard /> : <LoginCard />}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

"use client";

import LoginCard from "@/components/channelParterner/loginCard";
import LoginOtpCard from "@/components/channelParterner/loginOtpCard";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HomeHeader from "@/components/header/homeHeader";
import ReferralSubNav from "@/components/referral/ReferralSubNav";
import { closeReferralLoginDialog } from "@/lib/referral/openLoginDialog";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

type ReferralUserShellProps = {
  title: string;
  description?: string;
  breadcrumb?: string;
  showSubNav?: boolean;
  children: React.ReactNode;
};

export default function ReferralUserShell({
  title,
  description,
  breadcrumb = "Home1 / Refer and Earn",
  showSubNav = true,
  children,
}: ReferralUserShellProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLoginParam = searchParams.get("isLogin") === "true";
  const isOtpParam = searchParams.get("isOtp") === "true";
  const flowParam = searchParams.get("flow");
  /** Owner/CP uses flow=login; "User" role uses flow=enduser-login after OTP is sent (see LoginCard). */
  const isOtpStep =
    isOtpParam && (flowParam === "login" || flowParam === "enduser-login");
  const isLoginDialogOpen = isLoginParam || isOtpStep;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="fixed left-0 right-0 z-[60] flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full flex justify-center">
          <HomeHeader />
        </div>
      </div>

      <div className="relative pt-[25px] min-h-[280px] rounded-b-[60px] bg-[#010048]">
        <div className="w-[90%] max-w-[1100px] mx-auto mt-[120px] pb-[100px] text-white text-center">
          <p className="text-sm opacity-90">{breadcrumb}</p>
          {/* <h1 className="text-[26px] md:text-[36px] leading-[1.15] font-semibold mt-2">{title}</h1> */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-center">
            <span className="font-bold font-serif italic tracking-wide block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white leading-snug">
              Refer & <span className="text-[#FFD166]">Earn</span>
            </span>
            <span className="font-serif font-bold italic tracking-wide block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
              with KMA
            </span>
          </h1>
          {/* {description ? <p className="text-sm md:text-base mt-3 max-w-[720px] opacity-95">{description}</p> : null} */}
          <p className="text-sm md:text-base mt-3 max-w-[720px] mx-auto opacity-95">
            Help friends discover the right property with KMA and earn rewards.
            1 coin = ₹1000 — Residential, Commercial & Luxury across India's
            trusted platform.
          </p>
          {/* <p>You need to submit the referral before the deal to be eligible for the referral reward. Claims made after the deal will not be accepted.</p> */}
          {showSubNav ? <ReferralSubNav /> : null}
        </div>
      </div>

      <div className="w-[90%] max-w-[1100px] mx-auto mt-[72px] pb-[90px]">
        {children}
      </div>

      {/* <div className="bg-text-black flex justify-center">
        <AboutusDataSync />
        <HomeFooter tab={1} />
      </div> */}

      <Dialog
        open={isLoginDialogOpen}
        onClose={() => closeReferralLoginDialog(router)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "0.75rem",
            },
          },
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          <div className="relative w-full rounded-xl bg-white sm:w-[460px]">
            <button
              type="button"
              onClick={() => closeReferralLoginDialog(router)}
              className="absolute right-4 top-4 z-10 rounded-full p-1 text-[#1E2236] transition hover:bg-black/5"
              aria-label="Close login dialog"
            >
              ✕
            </button>
            {isOtpStep ? <LoginOtpCard /> : <LoginCard />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
