import type { Metadata } from "next";
import CareersDetailPageClient from "./CareersDetailPageClient";

export const metadata: Metadata = {
  title: "Career Detail | KMA Global Properties",
  description: "Role details and application information for KMA careers.",
};

export default function CareersDetailPage() {
  return <CareersDetailPageClient />;
}

