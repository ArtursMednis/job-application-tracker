import "./App.css";
import { Container } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <NavBar />

      <Container maxWidth="xl" sx={{ mt: 14 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
