import type { JobApplicationDetails } from "../../models/JobApplicationDetails";

export const validateJobApplication = (
  jobApplication: JobApplicationDetails
) => {
  const newErrors: Record<string, string> = {};
  if (!jobApplication?.company.trim())
    newErrors.company = "Company name is required.";
  return newErrors;
};
