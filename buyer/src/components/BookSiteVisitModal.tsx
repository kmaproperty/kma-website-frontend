"use client";

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Calendar, Clock, Users, X, CheckCircle2, Phone, User, MessageSquare } from "lucide-react";
import Spinner from "@/components/common/spinner";

interface BookSiteVisitModalProps {
  open: boolean;
  onClose: () => void;
  propertyTitle?: string;
  propertyId?: string;
}

const timeSlotOptions = [
  "Morning (10:00 AM - 01:00 PM)",
  "Afternoon (01:00 PM - 04:00 PM)",
  "Evening (04:00 PM - 07:00 PM)",
];

export default function BookSiteVisitModal({
  open,
  onClose,
  propertyTitle = "",
  propertyId = "",
}: BookSiteVisitModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState(timeSlotOptions[0]);
  const [visitors, setVisitors] = useState("1");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setPreferredDate("");
    setPreferredTime(timeSlotOptions[0]);
    setVisitors("1");
    setMessage("");
    setErrorMsg("");
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!preferredDate) {
      setErrorMsg("Please select your preferred visit date.");
      return;
    }

    setLoading(true);

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      preferredDate,
      preferredTime,
      visitors,
      message: message.trim(),
      propertyTitle,
      propertyId,
    };

    try {
      const scriptUrl =
        process.env.NEXT_PUBLIC_GOOGLE_SHEET_SITE_VISIT_URL ||
        "https://script.google.com/macros/s/AKfycbx_YOUR_FALLBACK/exec";

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg("Failed to book site visit. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "1rem",
            padding: 0,
            overflow: "hidden",
          },
        },
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <div className="bg-white p-5 sm:p-7">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#010048]/10 text-[#010048]">
                <Calendar className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Book a Site Visit</h3>
                <p className="text-xs text-gray-500">Pick a convenient date and time to visit this property</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Site Visit Requested!</h4>
              <p className="mx-auto max-w-sm text-sm text-gray-600 leading-relaxed">
                Thank you! Our team will call you shortly to confirm the visit and arrange assistance.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-[#010048] px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0A0E67] cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {errorMsg ? (
                <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-200">
                  {errorMsg}
                </div>
              ) : null}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-[#010048] focus:ring-1 focus:ring-[#010048]"
                  />
                </div>
              </div>

              {/* Phone Number with +91 Auto */}
              <div>
                <label className="block text-xs font-semibold text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1 flex">
                  <span className="inline-flex items-center gap-1 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-gray-600">
                    <Phone className="h-3.5 w-3.5" /> +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="10 digit mobile number"
                    className="w-full rounded-r-xl border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-[#010048] focus:ring-1 focus:ring-[#010048]"
                  />
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-[#010048] focus:ring-1 focus:ring-[#010048] cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700">
                    Preferred Time Slot <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-[#010048] focus:ring-1 focus:ring-[#010048] bg-white cursor-pointer"
                    >
                      {timeSlotOptions.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Number of Visitors */}
              <div>
                <label className="block text-xs font-semibold text-gray-700">
                  Number of Visitors (Optional)
                </label>
                <div className="relative mt-1">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={visitors}
                    onChange={(e) => setVisitors(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-[#010048] focus:ring-1 focus:ring-[#010048] bg-white cursor-pointer"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4+">4+ Persons</option>
                  </select>
                </div>
              </div>

              {/* Message (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700">
                  Special Request / Message (Optional)
                </label>
                <div className="relative mt-1">
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any specific requirement or query..."
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-900 outline-none focus:border-[#010048] focus:ring-1 focus:ring-[#010048] resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center rounded-full bg-[#010048] py-3 text-sm font-semibold text-white transition hover:bg-[#0A0E67] disabled:opacity-70 cursor-pointer shadow-md"
              >
                {loading ? <Spinner size={18} /> : "Confirm Site Visit"}
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}