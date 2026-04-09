"use client";

import UserHeader from "@/components/header/userHeader";

export default function ProfileHeader() {
  return (
    <div className="absolute w-full flex justify-center 2md:top-6 z-20">
      <UserHeader />
    </div>
  );
}
