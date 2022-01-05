import React, { useState } from "react";

import { Alert, Button, Collapse, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  Container,
  Heading,
  MainWindow,
  TextLink,
} from "../../styled-components";
import { formStyling } from "../../styled-components/login";

// import { useAuth } from "../contexts/AuthContext";

export const ForgotPassword = () => {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialFormValues = {
    email: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleFormChange = (event) => {
    setFormValues({...formValues, [event.target.name]: event.target.value});
  };

function timeout(delay) {
  return new Promise ( res => setTimeout(res, delay));
}

  async function handleSubmit(e) {
    e.preventDefault();


    try {
      setMessage("");
      setError("");
      setLoading(true);

      // ADD LOGIC TO CONNECT TO BACKEND
      // ====================================================================
      //   await resetPassword(formValues.email);
      // ====================================================================


      
      setMessage("Please check your inbox for further instructions");
      await timeout(5000);
      navigate("/auth/login");
    } catch {
      setError("Failed to reset password");
    }
    if (error || message ) setOpen(true);
    setLoading(false);


  }

  function navigateToRegister() {
    navigate("/register");
  }

  function login() {
    navigate("/auth/login");
  }

  return (
    <MainWindow verticalMiddle>
      <Container>
        <Heading>Password Reset</Heading>
        {error && (
          <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="regular"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            }
          >
            {error}
          </Alert>
          </Collapse>
        )}
        {message && (
          <Collapse in={open}>
          <Alert
            
            severity="success"
            variant="standard"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="regular"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            }
          >
            {message}
          </Alert>
          </Collapse>
          
        )}

        <p style={{ width: "75%", marginBottom: "50px" }}>
          Don't worry! Just fill in your email and we'll send you a link to
          reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <Container>
            <TextField
              required
              id="standard-basic"
              label="Email"
              style={formStyling}
              onChange={handleFormChange}
              name="email"
              type="email"
            />
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              size="large"
              sx={{ height: "55px", mb: "50px", mt: "15px" }}
              onClick={handleSubmit}
            >
              Reset Password
            </Button>
          </Container>
        </form>

        <Container>
          <TextLink mt="0" p="0 10px" onClick={login}>
            Back to Login
          </TextLink>
          <p style={{ display: "flex" }}>
            Don't have an account?
            <TextLink mt="0" p="0 10px" onClick={navigateToRegister}>
              Register
            </TextLink>
          </p>
        </Container>
      </Container>
    </MainWindow>
  );
};
