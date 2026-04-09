import { redirect } from "next/navigation";

export default function SignUpPage() {
  redirect("/user-flow?isLogin=true");
}
