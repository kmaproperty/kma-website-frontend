"use client";

import Image from "next/image";
import { useState } from "react";
import MyActivityScreen from "./myActivityScreen";
import MyReviewsScreen from "./myReviewsScreen";

type ProfileTab = "activity" | "reviews" | "edit";

const inputClassName =
  "h-[42px] w-full rounded-full border border-border bg-white px-4 text-sm text-text-black outline-none placeholder:text-text-gray/80 focus:border-blue";

function EditProfileContent() {
  return (
    <div className="rounded-xl bg-white p-4 sm:p-5">
      <h2 className="text-[30px] font-semibold leading-none text-text-black">Edit Profile</h2>

      <div className="mt-6 flex flex-col gap-8">
        <div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full bg-light-purple text-xl font-semibold text-blue">
              KP
            </div>
            <div className="w-full max-w-[520px] space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-text-black">Name</label>
                <input className={inputClassName} placeholder="Enter your full name" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-text-black">Email</label>
                <input className={inputClassName} placeholder="Enter your email address" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-start sm:justify-end sm:pr-[40px]">
            <button className="animated-button px-8 py-2.5 text-sm">
              <span className="relative">Save changes</span>
            </button>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-[30px] font-semibold leading-none text-text-black">Change Mobile Number</h3>
          <div className="mt-4 w-full max-w-[520px]">
            <label className="mb-1 block text-sm font-medium text-text-black">Mobile Number</label>
            <input className={inputClassName} placeholder="+91" />
          </div>
          <div className="mt-4">
            <button className="animated-button px-10 py-2.5 text-sm">
              <span className="relative">Send OTP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("activity");

  const renderContent = () => {
    if (activeTab === "activity") return <MyActivityScreen />;
    if (activeTab === "reviews") return <MyReviewsScreen />;
    return <EditProfileContent />;
  };

  return (
    <section className="w-full rounded-2xl bg-[#F5F5F5] p-3 sm:p-5 lg:p-6 shadow-[0_8px_30px_rgba(17,24,39,0.08)]">
      <div className="flex flex-col gap-5 lg:flex-row">
        <aside className="w-full rounded-2xl bg-[#EFEFEF] p-4 lg:w-[240px]">
          <div className="flex flex-col items-center border-b border-border pb-5">
            <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-white text-lg font-semibold text-text-black shadow-sm">
              P
            </div>
            <p className="mt-3 text-sm font-medium text-text-black">Preeti</p>
            <p className="mt-1 text-xs text-text-gray">+91-7425030807</p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setActiveTab("activity")}
              className={`relative flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm transition ${
                activeTab === "activity"
                  ? "bg-white font-medium text-blue shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
                  : "text-text-black hover:bg-white/70"
              }`}
            >
              {activeTab === "activity" ? (
                <span className="absolute -left-4 top-2.5 h-5 w-[2.5px] rounded-r-sm bg-blue" />
              ) : null}
              <span>My Activity</span>
              <Image src="/assets/right-arrow-blue.svg" width={12} height={12} alt="open activity" />
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`relative mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-sm transition ${
                activeTab === "reviews"
                  ? "bg-white font-medium text-blue shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
                  : "text-text-black hover:bg-white/70"
              }`}
            >
              {activeTab === "reviews" ? (
                <span className="absolute -left-4 top-2.5 h-5 w-[2.5px] rounded-r-sm bg-blue" />
              ) : null}
              <Image src="/assets/review-blue.svg" width={14} height={14} alt="reviews" />
              <span>My Reviews</span>
            </button>

            <div className="mt-3 border-t border-border pt-3">
              <button
                onClick={() => setActiveTab("edit")}
                className={`relative flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-sm transition ${
                  activeTab === "edit"
                    ? "bg-white font-medium text-blue shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
                    : "text-text-black hover:bg-white/70"
                }`}
              >
                {activeTab === "edit" ? (
                  <span className="absolute -left-4 top-2.5 h-5 w-[2.5px] rounded-r-sm bg-blue" />
                ) : null}
                <Image src="/assets/edit-pen-blue.svg" width={14} height={14} alt="edit profile" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          <button className="mt-7 flex h-[42px] w-full items-center justify-center rounded-lg border border-border bg-white text-sm font-medium text-text-black transition hover:bg-[#F9FAFB]">
            Logout
          </button>
        </aside>

        <div className="flex-1">{renderContent()}</div>
      </div>
    </section>
  );
}
