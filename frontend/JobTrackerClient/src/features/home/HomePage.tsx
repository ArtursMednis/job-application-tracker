import { FiberManualRecord } from "@mui/icons-material";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

export default function HomePage() {
  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="8"
      >
        <Typography variant="h5">
          Welcome to JobTrackr — Your Personal Job Application Tracker
        </Typography>

        <Box
          component="form"
          width="100%"
          display="flex"
          flexDirection="column"
          gap={3}
          marginY={3}
        >
          <Typography variant="body1" color="text.secondary">
            Looking for a new job? Keep your search organized and stress-free
            with JobTrackr, a simple tool to manage all your job applications in
            one place.
          </Typography>

          <List>
            {[
              "Track companies, positions, and application dates",
              "Stay on top of your progress with status updates",
              "See everything at a glance — no spreadsheets needed",
              "Your data stays private and secure",
            ].map((text, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <FiberManualRecord fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}
