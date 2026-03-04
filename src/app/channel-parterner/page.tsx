import ContentLayout from "@/components/channelParterner/contentLayout";
import InfoSection from "@/components/channelParterner/infoSection";
import LoginCard from "@/components/channelParterner/loginCard";
import LoginOtpCard from "@/components/channelParterner/loginOtpCard";
import MainLayout from "@/components/channelParterner/mainLayout";
import SignUpCard from "@/components/channelParterner/signUpCard";
import SignupOtpCard from "@/components/channelParterner/signupOtpCard";

interface ChannelParternerPageProps {
  searchParams: Promise<{
    isLogin?: string;
    isOtp?: string;
    flow?: string;
  }>;
}

export default async function ChannelParternerPage({ searchParams }: ChannelParternerPageProps) {
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
  if (isOtp && flow !== "login") {
    cardContent = <SignupOtpCard />;
  }

  const isLoginView = isLogin || (isOtp && flow === "login");

  return (
    <MainLayout>
      <ContentLayout
        cardContent={cardContent}
        infoContent={
          <InfoSection
            titlePrefix={isLoginView ? "Welcome Back" : "New To KMA?"}
            title={isLoginView ? "Login To Your Account" : "Create An Account"}
          />
        }
      />
    </MainLayout>
  );
}
