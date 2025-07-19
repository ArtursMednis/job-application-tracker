import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import JobApplicationLine from "./JobApplicationLine";
import { useEffect, useState } from "react";
import type { JobApplicationSummary } from "../../models/JobApplicationSummary";
import { jobApplicationApi } from "../../api/jobApplicationApi";
import { NavLink } from "react-router";

export default function JobApplicationList() {
  const [jobApplications, setJobApplications] = useState<
    JobApplicationSummary[]
  >([]);

  useEffect(() => {
    jobApplicationApi
      .getJobApplications()
      .then((data) => setJobApplications(data));
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Application status</TableCell>
              <TableCell align="right">Applied</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobApplications.map((jobApplication) => (
              <JobApplicationLine
                jobApplication={jobApplication}
              ></JobApplicationLine>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <Button variant="contained">
          <Typography
            component={NavLink}
            to={`/applications/new`}
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Create new
          </Typography>
        </Button>
      </div>
    </>
  );
}
