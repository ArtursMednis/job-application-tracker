import { Button, TableCell, TableRow, Typography } from "@mui/material";
import type { JobApplicationSummary } from "../../models/JobApplicationSummary";
import { NavLink } from "react-router";

type Props = {
  jobApplication: JobApplicationSummary;
};

export default function JobApplicationLine({ jobApplication }: Props) {
  return (
    <TableRow
      key={jobApplication.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {" "}
        {jobApplication.company}{" "}
      </TableCell>
      <TableCell align="right">{jobApplication.position}</TableCell>
      <TableCell align="right">{jobApplication.status}</TableCell>
      <TableCell align="right">{jobApplication.appliedDate}</TableCell>

      <TableCell align="right">
        <Button variant="contained">
          <Typography
            component={NavLink}
            to={`/applications/${jobApplication.id}`}
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Open
          </Typography>
        </Button>
      </TableCell>
    </TableRow>
  );
}
