import React, { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Container,
  Heading,
  MainWindow,
  TextLink,
} from "../../styled-components";
import { formStyling } from "../../styled-components/login";
import { useGlobalState } from "../../config/globalStore";
import { signUpUser } from "../../services/userServices";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export const Register = (props) => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();

  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  const { signup } = useAuth();
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleCheckChange = (event) => {
    setRememberMe(!rememberMe);
  };

  const handleFormChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const initialFormValues = {
    firstName: "",
    lastName: "",
    membershipNumber: 0,
    email: "",
    password: "",
    passwordConfirm: "",
    showPassword: false,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleClickShowPassword = () => {
    setFormValues({
      ...formValues,
      showPassword: !formValues.showPassword,
    });
  };

  function navigateToLogin() {
    navigate("/auth/login");
  }

  // Prevents passwording being reset when toggle visibility is clicked.
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //sign up user and console log profile -> save to state later
  async function handleSubmit(event) {
    console.log(
      "clicked! ",
      "Email: ",
      formValues.email,
      "Password: ",
      formValues.password
    );
    event.preventDefault();

    if (formValues.password !== formValues.passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      // same thing?
      // setDisableSubmit(true);

      await signup(formValues.email, formValues.password);
      history.push("/home");
    } catch {
      setError("Failed to create an account");
    }

    // Same as line 90?
    const response = await signUpUser(formValues);

    setLoading(false);
    // setDisableSubmit(false);

    //console.log("profile", response);

    if (response.error) {
      setErrorMsg(response.error);
    } else {
      dispatch({ type: "setProfile", data: response });
      setErrorMsg("");
      navigate("/welcome");
    }
  }

  function displayPassword(show) {
    return show ? <VisibilityOff /> : <Visibility />;
  }

  return (
    <MainWindow verticalMiddle>
      <Heading>Register Account</Heading>
      {error && (
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
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      )}
      {/* {errorMsg && <h3>{errorMsg}</h3>} */}
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField
            label="First Name"
            style={formStyling}
            onChange={handleFormChange}
            name="firstName"
            value={formValues.firstName}
            required
          />
          <TextField
            label="Last Name"
            style={formStyling}
            onChange={handleFormChange}
            name="lastName"
            value={formValues.lastName}
            required
          />
          <TextField
            required
            type="number"
            label="Membership ID"
            style={formStyling}
            onChange={handleFormChange}
            name="membershipNumber"
            value={formValues.membershipNumber}
          />
          <TextField
            required
            label="Email"
            style={formStyling}
            onChange={handleFormChange}
            type="email"
            name="email"
            value={formValues.email}
          />
          <OutlinedInput
            required
            placeholder="Password *"
            style={formStyling}
            onChange={handleFormChange}
            type={formValues.showPassword ? "text" : "password"}
            name="password"
            value={formValues.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {displayPassword(formValues.showPassword)}
                </IconButton>
              </InputAdornment>
            }
          />
          <OutlinedInput
            required
            placeholder="Confirm Password *"
            style={formStyling}
            onChange={handleFormChange}
            type={formValues.showPassword ? "text" : "password"}
            name="passwordConfirm"
            value={formValues.passwordConfirm}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {displayPassword(formValues.showPassword)}
                </IconButton>
              </InputAdornment>
            }
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            style={{ height: "55px", width: "200px" }}
            // disabled={disableSubmit}
            disabled={loading}
          >
            Create Account
          </Button>
          <Container direction="row" mt="20px">
            <p>Already have an account?</p>
            <TextLink mt="0" p="0 10px" onClick={navigateToLogin}>
              Login
            </TextLink>
          </Container>
        </Container>
      </form>
    </MainWindow>
  );
};
