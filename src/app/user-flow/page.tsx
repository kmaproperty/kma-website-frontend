import ContentLayout from "@/components/channelParterner/contentLayout";
import InfoSection from "@/components/channelParterner/infoSection";
import LoginCard from "@/components/channelParterner/loginCard";
import LoginOtpCard from "@/components/channelParterner/loginOtpCard";
import MainLayout from "@/components/channelParterner/mainLayout";
import SignUpCard from "@/components/channelParterner/signUpCard";
import SignupOtpCard from "@/components/channelParterner/signupOtpCard";
import SignUp from "@/components/signUp/signUp";

interface UserFlowPageProps {
  searchParams: Promise<{
    isLogin?: string;
    isOtp?: string;
    flow?: string;
    postProperty?: string;
  }>;
}

export default async function UserFlowPage({ searchParams }: UserFlowPageProps) {
  const params = await searchParams;
  const isLogin = params?.isLogin === "true";
  const isOtp = params?.isOtp === "true";
  const flow = params?.flow;
  const isPostProperty = params?.postProperty === "true";

  let cardContent = <SignUpCard />;
  if (isPostProperty && !isOtp) {
    cardContent = <SignUp />;
  } else if (isLogin && !isOtp) {
    cardContent = <LoginCard />;
  }
  if (isOtp && flow === "login") {
    cardContent = <LoginOtpCard />;
  }
  if (isOtp && flow !== "login") {
    cardContent = <SignupOtpCard />;
  }

  const isLoginView = isLogin || (isOtp && flow === "login");
  const isPostPropertyView = isPostProperty && !isOtp;

  return (
    <MainLayout>
      <ContentLayout
        cardContent={cardContent}
        infoContent={
          <InfoSection
            titlePrefix={isPostPropertyView ? "Upload Your Property in 3 Easy Steps" : isLoginView ? "Welcome Back" : "New To KMA?"}
            title={isPostPropertyView ? "" : isLoginView ? "Login To Your Account" : "Create An Account"}
          />
        }
      />
    </MainLayout>
  );
}
