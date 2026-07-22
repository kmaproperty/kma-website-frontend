"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxXPifk5rs2Bv93qK6thrWMa6uVV0zYiu_QfyWvbjHngKOeMUgEEgBPX8LpN7u2Kq8/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({ email }),
      });

      setLoading(false);
      setEmail("");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 5000);

    } catch (error) {
      console.error("Subscription Error:", error);
      setLoading(false);
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <section className="relative w-full bg-[#02013b] py-16 px-4 md:px-8 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1px] bg-amber-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400">
                  Stay Ahead of the Market
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-white leading-tight">
                Get Gurgaon Property Insights In Your Inbox
              </h2>

              <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed max-w-lg">
                One email a week — price movements, new RERA approvals, and infrastructure updates that actually move property values. No spam, unsubscribe anytime.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
                
                <div className="relative w-full">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/15 focus:border-amber-400/60 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-lg shadow-amber-400/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>

              </form>
            </div>

          </div>

        </div>

      </div>

      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center flex flex-col items-center gap-4 transform animate-in zoom-in-95 duration-200">
            
            <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xl font-extrabold text-[#02013b]">
                Subscribed Successfully!
              </h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Thank you for joining. You will receive the latest real estate insights directly in your inbox.
              </p>
            </div>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 w-full bg-[#02013b] hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Got It
            </button>

          </div>
        </div>
      )}

    </section>
  );
}