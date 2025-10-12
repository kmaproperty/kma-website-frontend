import ContentLayout from "@/components/signUp/contentLayout";
import CreateAccount from "@/components/signUp/createAccount";
import InfoSection from "@/components/signUp/infoSection";
import MainLayout from "@/components/signUp/mainLayout";
import Otp from "@/components/signUp/createAccountOtp";
import SignIn from "@/components/signUp/signUp";

export default function Home() {
  return (
    <>
    <MainLayout>
      <ContentLayout cardContent={<CreateAccount/>} infoContent={<InfoSection/>} />
    </MainLayout>
    </>
  );
}
