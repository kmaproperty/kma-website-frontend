import { redirect } from "next/navigation";

export default function VerifyOtpPage() {
  redirect("/user-flow?isLogin=true");
}
