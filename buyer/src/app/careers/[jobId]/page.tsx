import type { Metadata } from "next";
import JobDetailsPageClient from "./JobDetailsPageClient";

export const metadata: Metadata = {
  title: "Job Details | KMA Global Properties",
  description: "View role details and apply for the opportunity.",
};

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  return <JobDetailsPageClient jobId={jobId} />;
}
