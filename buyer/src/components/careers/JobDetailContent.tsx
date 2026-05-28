"use client";

import { useRef, useState } from "react";
import { UploadCloud, Trash2, Paperclip } from "lucide-react";

const responsibilities = [
  "Develop and maintain responsive web applications using React and TypeScript.",
  "Collaborate with designers and backend engineers to implement new features.",
  "Write clean, maintainable, and well-documented code.",
  "Participate in code reviews and mentor junior developers.",
  "Optimize application performance and ensure cross-browser compatibility.",
];

const requirements = [
  "5+ years of experience in frontend development.",
  "Strong proficiency in React, TypeScript, and modern CSS.",
  "Experience with state management libraries (Redux, Zustand, etc.).",
  "Solid understanding of web performance optimization.",
  "Excellent problem-solving and communication skills.",
];

const niceToHave = [
  "Experience with Next.js or similar frameworks.",
  "Knowledge of testing frameworks (Jest, React Testing Library).",
  "Familiarity with CI/CD pipelines.",
  "DevOps.",
];

const benefits = [
  "Competitive salary and equity package.",
  "Flexible remote work arrangements.",
  "Health, dental, and vision insurance.",
  "Professional development budget.",
  "Unlimited PTO policy.",
];

type ResumeFile = { name: string; size: string } | null;

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-[#888888] text-[15px] leading-relaxed">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="text-slate-400 mt-2 shrink-0 w-1 h-1 rounded-full bg-slate-400" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionTitle({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h3 className="font-display font-bold text-[#0D1520] text-xl md:text-2xl mb-4" data-testid={id}>
      {children}
    </h3>
  );
}

export default function JobDetailContent() {
  const [resume, setResume] = useState<ResumeFile>({
    name: "image-resume-frontend.png",
    size: "",
  });
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      setResume({ name: files[0].name, size: `${(files[0].size / 1024).toFixed(0)} KB` });
    }
  };

  return (
    <section className="bg-white relative pb-20" data-testid="job-detail-content">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-12 pt-12 md:pt-16">
        <div>
          <h2 className="font-display font-extrabold text-[#0D1520] text-2xl md:text-3xl" data-testid="jd-content-title">
            Senior Frontend Developer
          </h2>
          <p className="text-[#888888] mt-1.5 text-sm md:text-base">Wilson Engineering Solutions</p>
          <hr className="border-slate-200 my-6" />

          <SectionTitle id="jd-details">Details</SectionTitle>
          <ul className="space-y-2 text-[15px] text-[#888888]">
            <li><span className="font-bold text-[#0D1520]">Experience:</span> 4-7 Years</li>
            <li><span className="font-bold text-[#0D1520]">Industry:</span> IT / Software Development</li>
            <li><span className="font-bold text-[#0D1520]">Location:</span> 120 Center st #300</li>
            <li><span className="font-bold text-[#0D1520]">Employment Type:</span> Full-time</li>
          </ul>

          <div className="mt-10">
            <SectionTitle id="jd-description">Job Description:</SectionTitle>
            <p className="text-[#888888] text-[15px] leading-relaxed">
              We are seeking a talented Senior Product Designer to join our growing design team. In this role, you will be
              responsible for creating intuitive and engaging user experiences for our flagship products. You&apos;ll collaborate
              closely with product managers, engineers, and other designers to define and implement innovative solutions
              that delight our users. The ideal candidate has a strong portfolio demonstrating expertise in user-centered
              design, interaction design, and visual design.
            </p>
          </div>

          <div className="mt-10">
            <SectionTitle id="jd-resp">Responsibilities</SectionTitle>
            <Bullets items={responsibilities} />
          </div>

          <div className="mt-10">
            <SectionTitle id="jd-req">Requirements</SectionTitle>
            <Bullets items={requirements} />
          </div>

          <div className="mt-10">
            <SectionTitle id="jd-nice">Nice to Have</SectionTitle>
            <Bullets items={niceToHave} />
          </div>

          <div className="mt-10">
            <SectionTitle id="jd-benefits">Benefits</SectionTitle>
            <Bullets items={benefits} />
          </div>
        </div>

        <aside>
          <div className="bg-[#f6f6f8] rounded-3xl p-6 md:p-7 sticky top-28" data-testid="apply-form-card">
            <h3 className="font-display font-extrabold text-[#0D1520] text-2xl">Apply from here</h3>
            <p className="text-[#888888] text-sm mt-1.5">Fill the below details and our team will contact you.</p>

            <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-white border border-slate-200 rounded-full px-5 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#1e1b7a]"
                  data-testid="apply-first-name"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full bg-white border border-slate-200 rounded-full px-5 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#1e1b7a]"
                  data-testid="apply-last-name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="E-mail address"
                  className="w-full bg-white border border-slate-200 rounded-full px-5 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#1e1b7a]"
                  data-testid="apply-email"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full bg-white border border-slate-200 rounded-full px-5 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#1e1b7a]"
                  data-testid="apply-phone"
                />
              </div>
              <input
                type="text"
                placeholder="Location"
                className="w-full bg-white border border-slate-200 rounded-full px-5 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#1e1b7a]"
                data-testid="apply-location"
              />

              <div className="pt-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Resume</label>
                {resume && (
                  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-full px-4 py-2.5 mb-3" data-testid="resume-existing">
                    <div className="flex items-center gap-2 text-sm text-slate-700 truncate">
                      <Paperclip size={14} className="shrink-0" />
                      <span className="truncate">{resume.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResume(null)}
                      className="text-slate-400 hover:text-red-500 transition shrink-0 ml-2"
                      aria-label="Remove resume"
                      data-testid="resume-remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )}

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    handleFiles(e.dataTransfer.files);
                  }}
                  onClick={() => inputRef.current?.click()}
                  className={`rounded-2xl border-2 border-dashed text-center px-4 py-6 cursor-pointer transition ${
                    dragActive ? "border-[#1e1b7a] bg-[#eeecff]" : "border-[#c8c5ec] bg-white"
                  }`}
                  data-testid="resume-dropzone"
                >
                  <UploadCloud size={22} className="mx-auto text-[#1e1b7a]" />
                  <p className="text-sm text-[#888888] mt-2">
                    Drop here to attach or{" "}
                    <span className="text-[#1e1b7a] font-semibold underline underline-offset-2">upload</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Max size: 5MB</p>
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>
              </div>

              <textarea
                placeholder="Cover letter"
                rows={5}
                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#1e1b7a] resize-none"
                data-testid="apply-cover-letter"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#1e1b7a] hover:bg-[#29259c] text-white font-semibold rounded-full px-7 py-3.5 text-sm transition"
                  data-testid="apply-submit"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </section>
  );
}

