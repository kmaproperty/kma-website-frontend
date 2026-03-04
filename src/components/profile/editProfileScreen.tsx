import Image from "next/image";

const inputClassName =
  "h-[42px] w-full rounded-full border border-border bg-white px-4 text-sm text-text-black outline-none placeholder:text-text-gray/80 focus:border-blue";

export default function EditProfileScreen() {
  return (
    <section className="w-full rounded-2xl bg-white p-4 sm:p-6 lg:p-8 shadow-[0_8px_30px_rgba(17,24,39,0.08)]">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full rounded-xl border border-border bg-[#FAFAFA] p-4 lg:w-[260px]">
          <div className="flex flex-col items-center border-b border-border pb-4">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-light-purple text-lg font-semibold text-blue">
              KP
            </div>
            <p className="mt-2 text-sm text-text-gray">+91-7425030807</p>
          </div>

          <div className="pt-4">
            <button className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm text-text-black hover:bg-[#f2f3ff]">
              <span>My Activity</span>
              <span className="text-base text-text-gray">{">"}</span>
            </button>
            <button className="mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-text-black hover:bg-[#f2f3ff]">
              <Image src="/assets/review-blue.svg" width={14} height={14} alt="reviews" />
              <span>My Reviews</span>
            </button>

            <div className="mt-3 border-t border-border pt-3">
              <button className="flex w-full items-center gap-2 rounded-lg border-l-2 border-blue bg-[#f2f3ff] px-2 py-2 text-left text-sm font-medium text-blue">
                <Image src="/assets/edit-pen-blue.svg" width={14} height={14} alt="edit profile" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          <button className="mt-5 flex h-[40px] w-full items-center justify-center rounded-lg border border-border text-sm font-medium text-text-black hover:bg-[#f7f7f7]">
            Logout
          </button>
        </aside>

        <div className="flex-1">
          <h2 className="text-[28px] font-semibold leading-none text-text-black">Edit Profile</h2>

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
              <h3 className="text-[28px] font-semibold leading-none text-text-black">Change Mobile Number</h3>
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
      </div>
    </section>
  );
}
