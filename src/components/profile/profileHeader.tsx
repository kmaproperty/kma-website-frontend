"use client";

import { useEffect, useState } from "react";
import HomeHeader from "@/components/header/homeHeader";
import UserHeader from "@/components/header/userHeader";
import { USER_TYPE } from "@/lib/enums";

export default function ProfileHeader() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const parsed = JSON.parse(user);
        setRole(parsed.role);
      }
    } catch {
      // ignore
    }
  }, []);

  if (role === USER_TYPE.OWNER || role === USER_TYPE.CHANNEL_PARTNER) {
    return (
      <div className="absolute w-full flex justify-center 2md:top-6 z-20">
        <UserHeader />
      </div>
    );
  }

  return <HomeHeader />;
}
