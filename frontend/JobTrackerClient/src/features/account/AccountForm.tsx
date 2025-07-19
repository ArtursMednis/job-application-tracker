import { useEffect, useState } from "react";
import { accountApi } from "../../api/accountApi";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Button, Typography } from "@mui/material";
import { getStringPropertyIfExists } from "../../utilities/utilities";

export default function AccountForm() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null | undefined>(null);
  const [backendError, setBackendError] = useState<string>("");

  useEffect(() => {
    accountApi
      .getUserInfo()
      .then((data) => setUserEmail(data?.email))
      .catch((error) => {
        setBackendError(getStringPropertyIfExists(error, "message") ?? "");
        console.error("Fetching user info failed:", error);
      });
  }, []);

  const logOut = () => {
    setBackendError("");
    if (!userEmail) return;

    accountApi
      .logout()
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((err) => setBackendError(err.message));
  };

  return (
    <div>
      {backendError && <div style={{ color: "red" }}>{backendError}</div>}

      <Typography variant="h5">User email: {userEmail}</Typography>

      <Button variant="contained" onClick={logOut} color="error">
        <Typography sx={{ color: "inherit", textDecoration: "none" }}>
          LogOut
        </Typography>
      </Button>
    </div>
  );
}
