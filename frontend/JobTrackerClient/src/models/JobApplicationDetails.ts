export type JobApplicationDetails = {
  company: string;
  position: string;
  salary: string;
  jobAdvertisementLink: string;
  requirements: string;
  notes: string;
  status: string;
  appliedDate: string;
};

export function createEmptyJobApplication(): JobApplicationDetails {
  return {
    company: "",
    position: "",
    salary: "",
    jobAdvertisementLink: "",
    requirements: "",
    notes: "",
    status: "",
    appliedDate: "",
  };
}
