"use client";

import { useEffect, useState } from "react";

export default function NewLaunchStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-[#010048]/96 backdrop-blur border-t border-cyan-400/15 px-4 md:px-12 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <p className="text-sm text-white/70 font-medium text-center sm:text-left">
        <strong className="text-white">12+ New Launch Projects in Gurgaon</strong> — Pre-launch prices available. Speak to an expert today.
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={() => scrollTo("newLaunchProjects")}
          className="px-5 py-2.5 border border-cyan-400/30 text-white/70 rounded-full text-[10px] font-bold tracking-wider uppercase hover:text-cyan-300 hover:border-cyan-400 transition-all cursor-pointer"
        >
          View Projects
        </button>
        <button
          onClick={() => scrollTo("newLaunchCta")}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-[10px] font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          Get Free Advice →
        </button>
      </div>
    </div>
  );
}
