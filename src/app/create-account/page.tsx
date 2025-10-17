import ContentLayout from "@/components/signUp/contentLayout";
import CreateAccount from "@/components/signUp/createAccount";
import InfoSection from "@/components/signUp/infoSection";
import MainLayout from "@/components/signUp/mainLayout";

export default function SignUpPage() {
  return (
    <MainLayout>
      <ContentLayout cardContent={<CreateAccount step={1}/>} infoContent={<InfoSection />} />
    </MainLayout>
  );
}
