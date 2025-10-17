import ContentLayout from "@/components/signUp/contentLayout";
import InfoSection from "@/components/signUp/infoSection";
import MainLayout from "@/components/signUp/mainLayout";
import SignUp from "@/components/signUp/signUp";

export default function SignUpPage() {
  return (
    <MainLayout>
      <ContentLayout cardContent={<SignUp />} infoContent={<InfoSection />} />
    </MainLayout>
  );
}
