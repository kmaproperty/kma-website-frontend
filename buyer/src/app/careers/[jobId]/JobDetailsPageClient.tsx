"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Paperclip } from "lucide-react";
import { toast } from "react-toastify";
import HomdeHeader from "@/components/header/homeHeader";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import {
  getFileUploadUrlApiHandler,
  uploadFileToS3ApiHandler,
} from "@/services/masterService";
import {
  CareerJob,
  fetchCareerJobById,
  submitCareerJobApplication,
} from "@/services/jobsService";

export default function JobDetailsPageClient({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<CareerJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    coverLetter: "",
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const response = await fetchCareerJobById(jobId);
      setJob(response);
      setLoading(false);
    };
    load();
  }, [jobId]);

  const salaryText =
    job?.salaryVisibility === false
      ? "Salary hidden"
      : `${job?.salaryMin ?? ""}${job?.salaryMax ? ` - ${job.salaryMax}` : ""}` || "As per discussion";
  const skillsText =
    job?.skillsText ||
    (Array.isArray(job?.skills) ? job?.skills.join(", ") : job?.skills) ||
    "No additional skills listed.";

  const handleSubmit = async () => {
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    if (!fullName) {
      toast.error("Please enter your full name");
      return;
    }
    if (!form.email.trim()) {
      toast.error("Please enter email address");
      return;
    }
    if (!form.phone.trim()) {
      toast.error("Please enter phone number");
      return;
    }

    setSubmitting(true);
    try {
      let resumeKey: string | undefined;
      if (resumeFile) {
        const uploadUrlResponse = await getFileUploadUrlApiHandler({
          filename: resumeFile.name,
          contentType: resumeFile.type,
          folder: `${process.env.NEXT_PUBLIC_AWS_FOLDER || "uploads"}/job-resumes`,
          expiresIn: 3600,
        });
        await uploadFileToS3ApiHandler({
          url: uploadUrlResponse.data.url,
          file: resumeFile,
        });
        resumeKey = uploadUrlResponse.data.key;
      }

      const response = await submitCareerJobApplication(jobId, {
        fullName,
        email: form.email.trim(),
        phoneNumber: form.phone.trim(),
        coverLetter: form.coverLetter.trim() || undefined,
        resumeUrl: resumeKey,
      });
      toast.success(response.message || "Application submitted successfully");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        experience: "",
        coverLetter: "",
      });
      setResumeFile(null);
      setResumeFileName("");
    } catch (error: any) {
      const message = Array.isArray(error?.message)
        ? error.message.join(", ")
        : error?.message || "Could not submit application";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-w-0 bg-[#f3f4f6]">
      <div className="pointer-events-none fixed left-0 right-0 z-[60] flex justify-center">
        <div className="pointer-events-auto flex w-full justify-center">
          <HomdeHeader />
        </div>
      </div>
      <section className="relative overflow-hidden rounded-b-[42px] bg-[#010048] pb-12 pt-28 text-white md:pt-32">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-white/90">
            <ArrowLeft className="h-4 w-4" /> Back to Careers
          </Link>
          {!loading && job && (
            <div className="mt-10 text-center">
              <div className="text-sm text-white/80">{job.companyName || "KMA Hiring Partner"}</div>
              <h1 className="mt-2 text-3xl font-semibold">{job.title}</h1>
            </div>
          )}
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6">
        {loading && (
          <div className="rounded-2xl bg-white p-8 text-sm text-slate-500">Loading job details...</div>
        )}
        {!loading && !job && (
          <div className="rounded-2xl bg-white p-8 text-sm text-slate-500">Job not found.</div>
        )}
        {!loading && job && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-2xl bg-white p-6 md:p-8">
              <h2 className="text-[28px] font-semibold text-[#1f2937]">{job.title}</h2>
              <div className="text-sm text-slate-500">{job.companyName || "KMA Hiring Partner"}</div>
              <div className="mt-5 border-t border-slate-200 pt-4">
                <h3 className="text-base font-semibold text-slate-800">Details</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p><span className="font-semibold">Experience:</span> {job.experienceLabel || "N/A"}</p>
                  <p><span className="font-semibold">Industry:</span> {(job.categories || []).map((c) => c.name).join(", ") || "N/A"}</p>
                  <p><span className="font-semibold">Location:</span> {job.location || job.city || "N/A"}</p>
                  <p><span className="font-semibold">Employment Type:</span> {job.jobType || "N/A"}</p>
                  <p><span className="font-semibold">Salary:</span> {salaryText}</p>
                </div>
              </div>

              <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-800">Job Description:</h3>
                  <p>{job.description || "No job description available."}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-800">Responsibilities</h3>
                  <p>{job.responsibilities || "No responsibilities listed."}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-800">Requirements</h3>
                  <p>{job.requirements || "No requirements listed."}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-800">Nice to Have</h3>
                  <p>{skillsText}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-800">Benefits</h3>
                  <p>{job.benefits || "No benefits listed."}</p>
                </div>
              </div>
            </div>

            <div className="h-fit rounded-2xl bg-[#ececec] p-5">
              <h3 className="text-2xl font-semibold text-slate-900">Apply from here</h3>
              <p className="mt-1 text-xs text-slate-500">Fill the below details and our team will contact you.</p>
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none" placeholder="First name" value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} />
                  <input className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none" placeholder="Last name" value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none" placeholder="Email address" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
                  <input className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none" placeholder="Phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
                </div>
                <input className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none" placeholder="Location" value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} />
                <input className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none" placeholder="Experience" value={form.experience} onChange={(e) => setForm((p) => ({ ...p, experience: e.target.value }))} />
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#9b96d5] bg-white px-4 py-6 text-center text-xs text-slate-500">
                  <Paperclip className="mb-1 h-4 w-4" />
                  Drag here to attach <span className="text-[#4f46e5]">upload</span>
                  <span className="mt-1 text-[10px]">Max size 10MB</span>
                  {resumeFileName && (
                    <span className="mt-2 text-[11px] font-medium text-slate-700">{resumeFileName}</span>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setResumeFile(file || null);
                      setResumeFileName(file?.name || "");
                    }}
                  />
                </label>
                <textarea className="h-24 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none" placeholder="Cover letter" value={form.coverLetter} onChange={(e) => setForm((p) => ({ ...p, coverLetter: e.target.value }))} />
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="rounded-full bg-[#010048] px-8 py-2.5 text-sm font-medium text-white disabled:opacity-70"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center bg-text-black">
        <AboutusDataSync />
        <HomeFooter tab={1} />
      </div>
    </div>
  );
}
