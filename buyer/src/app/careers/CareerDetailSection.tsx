"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Send,
  UserCheck,
  MessageSquare,
  Award,
  Rocket,
  TrendingUp,
  Quote,
  ArrowRight,
  Share2,
  Compass,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function CareerDetailSection() {

  const hiringSteps = [
    { step: "01", title: "Send your resume", icon: Send },
    { step: "02", title: "We check your profile", icon: UserCheck },
    { step: "03", title: "One discussion or interview", icon: MessageSquare },
    { step: "04", title: "If it fits, you get selected", icon: Award },
    { step: "05", title: "You join and start work", icon: Rocket },
  ];

  const benefits = [
    "Basic training when you join",
    "Help from team members when needed",
    "Real client exposure early",
    "Learning sales and CRM work by doing it",
    "Responsibility increases with time",
    "Growth depends on performance",
    "Team support when workload increases",
  ];

  const testimonials = [
    {
      quote:
        "I didn’t know much about real estate when I joined. Slowly, I started handling clients on my own.",
      role: "Sales Executive",
    },
    {
      quote:
        "It’s straightforward here. You do your work, and if it’s good, you get better opportunities.",
      role: "Business Development Executive",
    },
    {
      quote:
        "I moved into CRM after asking for it. My manager actually helped me learn the system.",
      role: "CRM Team Member",
    },
  ];

  return (
    <div className="w-full bg-white text-slate-900 py-12 px-4 md:px-8 lg:px-16 font-sans">
      <div className="max-w-6xl mx-auto space-y-20">
        <section className="relative bg-[#02013b] text-white rounded-3xl p-8 md:p-14 shadow-2xl overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                    Careers at KMA Global Properties
                </span>
                </div> */}

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Join the KMA Team
            </h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
              We are usually looking for people who are serious about working
              and improving over time. When you join, you don’t sit in a corner
              learning theory for weeks. You start working. Talking to clients.
              Following up leads. Understanding requirements. Sometimes, even
              handling small deals early on.
            </p>

            <div className="pt-2 flex items-center gap-3 text-blue-300 text-xs md:text-sm font-medium bg-white/5 border border-white/10 p-4 rounded-2xl">
              <TrendingUp className="w-5 h-5 shrink-0 text-blue-400" />
              <span>
                You’ll make mistakes in the beginning. That’s normal. There are
                seniors around, so you won’t be lost, but most learning happens
                while doing actual work.
              </span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-4">
            {/* <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
              Work Environment
            </span> */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#02013b]">
              What Makes KMA Global Properties a Great Place to Work?
            </h2>
            <div className="w-16 h-1 bg-[#02013b] rounded-full" />
          </div>

          <div className="md:col-span-7 bg-blue-50/50 border border-blue-100 p-6 md:p-8 rounded-2xl space-y-4 text-slate-700 text-sm leading-relaxed">
            <p>
              <strong>It’s not a fancy setup. It’s a working setup.</strong>{" "}
              People learn fast here because they’re involved in real estate
              work from the start — not just training sessions.
            </p>
            <p>
              You’ll deal with clients, property discussions, follow-ups, and
              sometimes pressure when things get busy.
            </p>
            <p className="font-semibold text-[#02013b]">
              But that’s also where most growth happens. If you perform, you
              move ahead. If you don’t, you improve and try again. Simple.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                {/* <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
                  Perks & Growth
                </span> */}
                <h2 className="text-2xl  font-bold text-[#02013b] mt-1">
                  What Benefits Are Waiting for You?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Nothing complicated here.
                </p>
              </div>

              <div className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue shrink-0" />
                    <span className="text-sm text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-bold text-[#02013b] uppercase tracking-wider">
              You basically learn the job by doing the job.
            </div>
          </div>

          {/* Life Into Life At KMA */}
          <div className="bg-[#02013b] text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />

            <div className="space-y-6 relative z-10">
              <div>
                {/* <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                  Culture
                </span> */}
                <h2 className="text-2xl  font-bold text-white mt-1">
                  A Glimpse Into Life at KMA
                </h2>
              </div>

              <div className="space-y-4 text-slate-300 text-sm font-light leading-relaxed">
                <p>Work here is active most of the time.</p>
                <p>
                  You’ll be on calls, replying to clients, coordinating with
                  team members, and tracking leads.
                </p>
                <p>Some days feel busy. Some days are normal.</p>
                <p>
                  In real estate, things change quickly, so you adjust as you
                  go.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <p className="text-xs text-blue-200 font-medium italic">
                “People who stay usually get used to this pace and start
                improving without even realizing it.”
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-2">
            {/* <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
              Testimonials
            </span> */}
            <h2 className="text-2xl sm:text-3xl  font-bold text-[#02013b]">
              Hear From Our Team
            </h2>
            <p className="text-xs text-slate-500">
              Nothing exaggerated. Just real progress over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative"
              >
                <Quote className="w-8 h-8 text-blue-100 absolute top-4 right-4" />
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed italic relative z-10 mb-6">
                  “{item.quote}”
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-[#02013b]">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-50/60 border border-blue-100 rounded-3xl p-8 md:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl  font-bold text-[#02013b]">
              How to Become a Part of KMA
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-900">
              Step-by-Step Hiring Process
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {hiringSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center space-y-3 shadow-sm hover:border-blue-400 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#02013b] text-white flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                    {s.step}
                  </div>
                  <Icon className="w-6 h-6 text-blue-600" />
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    {s.title}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs font-bold text-[#02013b] uppercase tracking-wider">
            We try not to complicate things.
          </p>
        </section>
      </div>
      <div className="w-full bg-white text-slate-900 pb-16 px-4 md:px-8 lg:px-16 font-sans py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <section className="bg-blue-50/60 border border-blue-100 rounded-3xl p-8 md:p-10 space-y-4">
            {/* <div className="inline-flex items-center gap-2 bg-blue-100 px-3.5 py-1 rounded-full text-xs font-semibold text-blue-800">
            <Share2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Social Media</span>
          </div> */}

            <h2 className="text-2xl md:text-3xl font-bold text-[#02013b]">
              Stay Connected, Follow Our Journey on Social Media
            </h2>

            <div className="space-y-2 text-slate-700 text-sm md:text-base leading-relaxed">
              <p>
                If you want to see what we do daily, you can follow us online.
              </p>
              <p>We post updates, team moments, and sometimes company news.</p>
              <p className="font-semibold text-[#02013b]">
                It gives a better idea of how the workplace actually feels.
              </p>
            </div>
          </section>

          <section className="bg-[#02013b] text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
            {/* <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1 rounded-full text-xs font-semibold text-blue-200">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>Careers at KMA</span>
          </div> */}

            <h2 className="text-2xl md:text-3xl font-bold text-white">
              There Must Be a Reason You're Here
            </h2>

            <div className="space-y-3 text-slate-200 text-sm md:text-base font-light leading-relaxed">
              <p>
                Maybe you’re looking for your first job. Maybe you want
                something better than what you have right now. Or maybe you’re
                just exploring real estate careers.
              </p>
              <p className="text-blue-200 font-medium">
                Whatever the reason, you landed here.
              </p>
              <p>
                If you’re willing to work and learn over time, you can apply.
              </p>
              <p className="text-white font-semibold pt-1">
                We usually figure things out step by step once people join.
              </p>
            </div>
          </section>
        </div>
        <div className="pt-10 space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-[#010048] tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
          </div>

          <div className="space-y-3.5 pt-2">
            {[
              {
                q: "Do you hire freshers?",
                a: "Yes. Freshers are welcome if they’re willing to learn.",
              },
              {
                q: "Do I need real estate experience?",
                a: "Not always. Some roles need experience, many don’t.",
              },
              {
                q: "What kind of work will I do?",
                a: "Mostly client calls, follow-ups, coordination, and learning property processes.",
              },
              {
                q: "Is this a field job or an office job?",
                a: "Depends on the role. Some are client-facing, some are support roles.",
              },
              {
                q: "How does growth happen here?",
                a: "If you work consistently and improve, you slowly get more responsibility.",
              },
              {
                q: "How do I apply?",
                a: "Just send your resume through the careers page.",
              },
              {
                q: "What roles are open?",
                a: "Sales, CRM, business development, marketing, operations, and support roles.",
              },
              {
                q: "Why should I join KMA?",
                a: "Because you actually get real work experience, not just theory or observation.",
              },
            ].map((faq, index) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <div
                  key={index}
                  className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/40 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 font-semibold text-sm md:text-base text-[#010048] hover:bg-gray-50 transition-all outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 p-1 rounded-full bg-white text-[#010048] shadow-sm border border-gray-100/50">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen
                        ? "max-h-[500px] opacity-100 border-t border-gray-50 bg-white"
                        : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="p-5 text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}