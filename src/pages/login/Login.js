import React, { useState } from "react";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Container, Heading, MainWindow } from "../../styled-components";
import { formStyling } from "../../styled-components/login";
import SignInButton from "../../components/buttons/SignIn";
import { signInUser } from "../../services/userServices";
import { useGlobalState } from "../../config/globalStore";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckChange = (event) => {
    setRememberMe(!rememberMe);
  };

  const initialFormValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  // =======================================================
  // Change out this logic for auth later
  function handleSubmit(event) {
    event.preventDefault();
    signInUser(formValues).then((profile) => {
      dispatch({ type: "setProfile", data: profile });
      navigate("/home");
    }).catch((error) => {
      console.log(`error caught in login handle submit:`, error);
      setErrorMessage("Incorrect email or password");
    });
  }

  return (
    <MainWindow verticalMiddle>
      {errorMessage && <p>{errorMessage}</p>}
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField
            id="standard-basic"
            label="Email"
            style={formStyling}
            onChange={handleChange}
            name="email"
          />
          <TextField
            id="standard-basic"
            label="Password"
            style={formStyling}
            onChange={handleChange}
            name="password"
          />

          <FormControlLabel
            label="Remember Me"
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleCheckChange}
                name="checked"
                color="primary"
              />
            }
            style={formStyling}
          />
          <SignInButton />
          <p style={{ marginTop: "50px" }}>Forgot Password? Reset Password</p>
          <p>Don't have an account? Register</p>
        </Container>
      </form>
    </MainWindow>
  );
};
