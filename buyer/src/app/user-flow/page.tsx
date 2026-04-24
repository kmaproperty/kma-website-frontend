import ContentLayout from "@/components/channelParterner/contentLayout";
import InfoSection from "@/components/channelParterner/infoSection";
import LoginCard from "@/components/channelParterner/loginCard";
import LoginOtpCard from "@/components/channelParterner/loginOtpCard";
import MainLayout from "@/components/channelParterner/mainLayout";
import EndUserSignupOtpCard from "@/components/channelParterner/endUserSignupOtpCard";
import EndUserLoginOtpCard from "@/components/channelParterner/endUserLoginOtpCard";
import SignUpCard from "@/components/channelParterner/signUpCard";
import SignupOtpCard from "@/components/channelParterner/signupOtpCard";

interface UserFlowPageProps {
  searchParams: Promise<{
    isLogin?: string;
    isOtp?: string;
    flow?: string;
  }>;
}

export default async function UserFlowPage({ searchParams }: UserFlowPageProps) {
  const params = await searchParams;
  const isLogin = params?.isLogin === "true";
  const isOtp = params?.isOtp === "true";
  const flow = params?.flow;

  let cardContent = <SignUpCard />;
  if (isLogin && !isOtp) {
    cardContent = <LoginCard />;
  }
  if (isOtp && flow === "login") {
    cardContent = <LoginOtpCard />;
  }
  if (isOtp && flow === "enduser-login") {
    cardContent = <EndUserLoginOtpCard />;
  }
  if (isOtp && flow === "enduser-signup") {
    cardContent = <EndUserSignupOtpCard />;
  }
  if (isOtp && flow === "signup") {
    cardContent = <SignupOtpCard />;
  }

  const isLoginView = isLogin || (isOtp && (flow === "login" || flow === "enduser-login"));

  return (
    <MainLayout>
      <ContentLayout
        cardContent={cardContent}
        infoContent={
          <InfoSection
            titlePrefix={isLoginView ? "Welcome Back" : "Find Your Dream Home"}
            title={isLoginView ? "Login To Your Account" : "Create An Account"}
          />
        }
      />
    </MainLayout>
  );
}
