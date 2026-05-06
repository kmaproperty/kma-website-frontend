"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Wallet,
  BriefcaseBusiness,
  Building2,
  ArrowLeft,
} from "lucide-react";
import HomdeHeader from "@/components/header/homeHeader";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import { CareerJob, fetchCareerJobById } from "@/services/jobsService";

export default function JobDetailsPageClient({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<CareerJob | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const response = await fetchCareerJobById(jobId);
      setJob(response);
      setLoading(false);
    };
    load();
  }, [jobId]);

  return (
    <div className="min-w-0 bg-[#f8fafc]">
      <div className="pointer-events-none fixed left-0 right-0 z-[60] flex justify-center">
        <div className="pointer-events-auto flex w-full justify-center">
          <HomdeHeader />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-32 md:px-6">
        <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-[#010048]">
          <ArrowLeft className="h-4 w-4" /> Back to Careers
        </Link>
        {loading && (
          <div className="mt-6 rounded-2xl bg-white p-8 text-sm text-slate-500">Loading job details...</div>
        )}
        {!loading && !job && (
          <div className="mt-6 rounded-2xl bg-white p-8 text-sm text-slate-500">Job not found.</div>
        )}
        {!loading && job && (
          <div className="mt-6 rounded-2xl bg-white p-6 md:p-8">
            <h1 className="text-2xl font-semibold text-slate-900">{job.title}</h1>
            <div className="mt-2 text-sm text-slate-500">{job.companyName || "KMA Hiring Partner"}</div>
            <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-600 md:grid-cols-2">
              <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location || job.city || "N/A"}</div>
              <div className="inline-flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4" /> {job.jobType || "N/A"}</div>
              <div className="inline-flex items-center gap-2"><Building2 className="h-4 w-4" /> {job.workMode || "N/A"}</div>
              <div className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : "Open"}</div>
              <div className="inline-flex items-center gap-2 md:col-span-2"><Wallet className="h-4 w-4" /> {job.salaryVisibility === false ? "Salary hidden" : `${job.salaryMin ?? ""}${job.salaryMax ? ` - ${job.salaryMax}` : ""}` || "As per discussion"}</div>
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
