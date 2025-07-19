import type { JobApplicationDetails } from "../models/JobApplicationDetails";
import type { JobApplicationSummary } from "../models/JobApplicationSummary";
import { apiBaseUrl } from "./apiBaseUrl";
import { parseErrorResponse } from "./parseErrorResponse";

const getJobApplications = async (): Promise<JobApplicationSummary[]> => {
  const response = await fetch(`${apiBaseUrl}/JobApplications/`, {
    credentials: "include",
  });
  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }
  return response.json();
};

const getJobApplicationById = async (
  id: string
): Promise<JobApplicationDetails> => {
  const response = await fetch(`${apiBaseUrl}/JobApplications/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
};

const saveJobApplication = async (
  id: string | undefined,
  data: JobApplicationDetails
) => {
  const idUrlPart = id ? `/${id}` : "";
  const response = await fetch(`${apiBaseUrl}/JobApplications${idUrlPart}`, {
    method: id ? "PUT" : "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }
};

const deleteJobApplication = async (id: string) => {
  const response = await fetch(`${apiBaseUrl}/JobApplications/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }
};

export const jobApplicationApi = {
  getJobApplications,
  getJobApplicationById,
  saveJobApplication,
  deleteJobApplication,
};
