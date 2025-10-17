import ContentLayout from "@/components/signUp/contentLayout";
import CreateAccountOtp from "@/components/signUp/createAccountOtp";
import InfoSection from "@/components/signUp/infoSection";
import MainLayout from "@/components/signUp/mainLayout";

export default function VerifyOtpPage() {
  return (
    <MainLayout>
      <ContentLayout cardContent={<CreateAccountOtp />} infoContent={<InfoSection />} />
    </MainLayout>
  );
}
