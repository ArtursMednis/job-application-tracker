import { NavLink, useNavigate, useParams } from "react-router";
import { useEffect, useState, type ChangeEvent } from "react";
import {
  createEmptyJobApplication,
  type JobApplicationDetails,
} from "../../models/JobApplicationDetails";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { jobApplicationApi } from "../../api/jobApplicationApi";
import { validateJobApplication } from "./jobApplicationValidation";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function JobApplicationForm() {
  const { id } = useParams();

  const [jobApplication, setJobApplication] =
    useState<JobApplicationDetails | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [backendError, setBackendError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      jobApplicationApi
        .getJobApplicationById(id)
        .then((data) => setJobApplication(data))
        .catch((errror) => setBackendError(errror.message));
    } else {
      setJobApplication(createEmptyJobApplication());
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (jobApplication) {
      setJobApplication({
        ...jobApplication,
        [name]: value,
      });
    }
  };

  const saveData = () => {
    setBackendError("");
    if (!jobApplication) return;

    const validationErrors = validateJobApplication(jobApplication);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    jobApplicationApi
      .saveJobApplication(id, jobApplication)
      .then(() => {
        navigate("/applications");
      })
      .catch((err) => setBackendError(err.message));
  };

  const deleteApp = () => {
    setBackendError("");
    if (!id) return;

    jobApplicationApi
      .deleteJobApplication(id)
      .then(() => {
        navigate("/applications");
      })
      .catch((err) => setBackendError(err.message));
  };

  if (!jobApplication) {
    return (
      <>
        {backendError ? (
          <div style={{ color: "red" }}>{backendError}</div>
        ) : (
          <div>Loading form...</div>
        )}
      </>
    );
  }

  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="8"
      >
        <Typography variant="h5">Job Application Details</Typography>

        <Box
          component="form"
          width="100%"
          display="flex"
          flexDirection="column"
          gap={3}
          marginY={3}
        >
          {backendError && <div style={{ color: "red" }}>{backendError}</div>}

          <TextField
            fullWidth
            name="company"
            value={jobApplication.company}
            label="Company name"
            onChange={handleChange}
            error={!!errors.company}
            helperText={errors.company}
          />

          <TextField
            fullWidth
            name="position"
            value={jobApplication.position}
            label="Position"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="salary"
            value={jobApplication.salary}
            label="Salary"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="jobAdvertisementLink"
            value={jobApplication.jobAdvertisementLink}
            label="Link"
            onChange={handleChange}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              name="appliedDate"
              label="Applied date"
              value={
                jobApplication.appliedDate
                  ? new Date(jobApplication.appliedDate)
                  : null
              }
              onChange={(e) => {
                const dateString = e?.toDateString() ?? "";

                if (jobApplication) {
                  setJobApplication({
                    ...jobApplication,
                    appliedDate: dateString,
                  });
                }
              }}
            />
          </LocalizationProvider>

          <TextField
            fullWidth
            multiline
            minRows={5}
            maxRows={10}
            name="requirements"
            value={jobApplication.requirements}
            label="Requirements"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            multiline
            minRows={5}
            maxRows={10}
            name="notes"
            value={jobApplication.notes}
            label="Notes"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            select
            name="status"
            value={jobApplication.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem key={"Pending"} value={"Pending"}>
              {"Pending"}
            </MenuItem>
            <MenuItem key={"Rejected"} value={"Rejected"}>
              {"Rejected"}
            </MenuItem>
            <MenuItem key={"Interviewing"} value={"Interviewing"}>
              {"Interviewing"}
            </MenuItem>
            <MenuItem key={"GotOffer"} value={"GotOffer"}>
              {"Got Offer"}
            </MenuItem>
          </TextField>

          <div>
            <Button variant="contained" onClick={saveData} color="success">
              <Typography sx={{ color: "inherit", textDecoration: "none" }}>
                Save
              </Typography>
            </Button>

            <Button variant="contained">
              <Typography
                component={NavLink}
                to={`/applications`}
                sx={{ color: "inherit", textDecoration: "none" }}
              >
                Close
              </Typography>
            </Button>
          </div>

          <div>
            <Button variant="contained" onClick={deleteApp} color="error">
              <Typography sx={{ color: "inherit", textDecoration: "none" }}>
                Delete job application
              </Typography>
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
}
