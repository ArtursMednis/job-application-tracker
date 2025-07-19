import {
  AppBar,
  Box,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user } = useAuth();

  const isAuthenticated = !!user;

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            component={NavLink}
            to=""
            variant="h6"
            sx={{ color: "inherit" }}
          >
            Job application tracker
          </Typography>
        </Box>

        <Box>
          {isAuthenticated
            ? AuthenticatedUserMenu(user.email)
            : UnauthenticatedUserMenu()}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function AuthenticatedUserMenu(email: string) {
  return (
    <List sx={{ display: "flex" }}>
      <ListItem
        component={NavLink}
        to="/applications"
        key="/applications"
        sx={{ color: "inherit", typography: "h6", minWidth: 200 }}
      >
        Job applications
      </ListItem>
      <ListItem
        component={NavLink}
        to="/account"
        key="/account"
        sx={{ color: "inherit", typography: "h6" }}
      >
        {email}
      </ListItem>
    </List>
  );
}

function UnauthenticatedUserMenu() {
  return (
    <List sx={{ display: "flex" }}>
      <ListItem
        component={NavLink}
        to="/login"
        key="/login"
        sx={{ color: "inherit", typography: "h6" }}
      >
        Login
      </ListItem>
    </List>
  );
}
