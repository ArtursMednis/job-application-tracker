import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { accountApi } from "../../api/accountApi";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

export default function RegisterForm() {
  const [backendError, setBackendError] = useState<string>("");

  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validate = (email: string) => {
    const newErrors: Record<string, string> = {};
    if (!email?.trim()) newErrors.email = "Email is required.";
    return newErrors;
  };

  const submitLoginForm = async () => {
    const validationErrors = validate(emailInput);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    accountApi
      .register(emailInput, passwordInput)
      .then(() => {
        alert("Account created. Now you can login.");
        navigate("/login");
      })
      .catch((errror) => setBackendError(errror.message));
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="8"
      >
        <LockOutlined sx={{ mt: 3, color: "secondary.main", fontSize: 40 }} />
        <Typography variant="h5">Register</Typography>

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
            label="Email"
            autoFocus
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmailInput(event.target.value);
            }}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPasswordInput(event.target.value);
            }}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button variant="contained" type="button" onClick={submitLoginForm}>
            Register
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?
            <Typography
              sx={{ ml: 2 }}
              component={Link}
              to="/login"
              color="primary"
            >
              Login
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
