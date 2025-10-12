import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

export default function ContactInformation() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="md"
        fullWidth
        PaperProps={{
          className: "rounded-xl overflow-hidden",
        }}
      >
        <DialogContent className="p-0">
          <div className="grid md:grid-cols-2 grid-cols-1 h-full w-full">
            {/* Left Side: Contact Info */}
            <div className=" bg-blue text-white p-8 relative rounded-xl">
              <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
              <p className="mb-6">Say something to start a live chat!</p>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-center gap-4">
                <div className="rounded-full border border-whtie p-2">
                  <Image alt='phone' src='/assets/phone-white.svg' width={20} height={20} />
                </div>
                  <p>+00 (123) 456 789 012</p>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-whtie p-2">
                  <Image alt='phone' src='/assets/email-white.svg' width={20} height={20} />
                </div>
                  <p>infomail123@domain.com</p>
                </div>

                {/* Address */}
                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-whtie p-2">
                  <Image alt='phone' src='/assets/location-white.svg' width={20} height={20} />
                </div>
                  <p>West 2nd lane, Inner circular road, New York City</p>
                </div>
              </div>

              {/* Background Circles */}
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl z-0"></div>
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl z-0"></div>
            </div>

            {/* Right Side: Form */}
            <div className="bg-white p-8 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                ✕
              </button>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold">First Name<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      className="mt-1 w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Last Name<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      className="mt-1 w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold">Email Address</label>
                    <input
                      type="email"
                      className="mt-1 w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Phone Number<span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      className="mt-1 w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold">Message</label>
                  <textarea
                    className="mt-1 w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    rows={4}
                    placeholder="Write your message"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 bg-[#06054B] text-white px-6 py-2 rounded-full hover:bg-indigo-900 transition duration-300"
                >
                  Send Message
                </button>
              </form>

              {/* Paper plane image at bottom right */}
              <div className="absolute bottom-4 right-4">
                <Image
                  src="/c194d47b-6599-406c-be8f-724621806cd1.png"
                  alt="Paper Plane"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
