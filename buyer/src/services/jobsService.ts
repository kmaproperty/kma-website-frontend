import { axiosInstance } from "./axiosService";

export interface JobCategory {
  id: string;
  name: string;
  code?: string;
}

export interface CareerJob {
  id: string;
  title: string;
  companyName?: string;
  location?: string;
  city?: string;
  state?: string;
  country?: string;
  jobType?: string;
  workMode?: string;
  salaryType?: string;
  salaryMin?: string | number;
  salaryMax?: string | number;
  salaryVisibility?: boolean;
  featured?: boolean;
  applicationDeadline?: string;
  status?: string;
  categories?: JobCategory[];
}

export interface GetJobsPayload {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  location?: string;
  jobType?: string;
  workMode?: string;
  status?: string;
}

export interface GetJobsResponse {
  success?: boolean;
  data?: CareerJob[];
  jobs?: CareerJob[];
  total?: number;
  page?: number;
  limit?: number;
}

const normalizeJobList = (raw: GetJobsResponse | CareerJob[] | any): CareerJob[] => {
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.data)) return raw.data;
  if (Array.isArray(raw?.jobs)) return raw.jobs;
  return [];
};

const normalizeCategories = (raw: any): JobCategory[] => {
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.data)) return raw.data;
  if (Array.isArray(raw?.categories)) return raw.categories;
  return [];
};

export const fetchCareerJobCategories = async (): Promise<JobCategory[]> => {
  try {
    const response = await axiosInstance.get("end-user/job-categories");
    return normalizeCategories(response.data);
  } catch {
    const fallback = await axiosInstance.get("admin/job-categories");
    return normalizeCategories(fallback.data);
  }
};

export const fetchCareerJobs = async (payload: GetJobsPayload = {}) => {
  const params = {
    page: payload.page ?? 1,
    limit: payload.limit ?? 10,
    search: payload.search || undefined,
    categoryId: payload.categoryId || undefined,
    location: payload.location || undefined,
    jobType: payload.jobType || undefined,
    workMode: payload.workMode || undefined,
    status: payload.status || "PUBLISHED",
  };

  try {
    const response = await axiosInstance.get<GetJobsResponse>("end-user/jobs", { params });
    const list = normalizeJobList(response.data);
    return {
      jobs: list,
      total: response.data?.total ?? list.length,
    };
  } catch {
    const fallback = await axiosInstance.get<GetJobsResponse>("admin/jobs", { params });
    const list = normalizeJobList(fallback.data);
    return {
      jobs: list,
      total: fallback.data?.total ?? list.length,
    };
  }
};

export const fetchCareerJobById = async (id: string): Promise<CareerJob | null> => {
  try {
    const response = await axiosInstance.get(`end-user/jobs/${id}`);
    return response.data?.data ?? response.data?.job ?? response.data ?? null;
  } catch {
    try {
      const fallback = await axiosInstance.get(`admin/jobs/${id}`);
      return fallback.data?.data ?? fallback.data?.job ?? fallback.data ?? null;
    } catch {
      return null;
    }
  }
};
