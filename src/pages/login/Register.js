import React, { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Container, Heading, MainWindow, TextLink } from "../../styled-components";
import { formStyling } from "../../styled-components/login";
import { useGlobalState } from "../../config/globalStore";
import { signUpUser } from "../../services/userServices";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import BasicButton from "../../components/buttons/BasicButton";

export const Register = (props) => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();

  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

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

  // Prevents passwording being reset when toggle visibility is clicked.
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //sign up user and console log profile -> save to state later
  async function handleSubmit(event) {
    console.log("clicked!");
    event.preventDefault();
    setDisableSubmit(true);
    const response = await signUpUser(formValues);
    setDisableSubmit(false);
    //console.log("profile", response);
    if (response.error) {
      setErrorMsg(response.error);
    } else {
      if (rememberMe) {
        window.localStorage.setItem('uid', response.userId);
      }
      dispatch({ type: "setProfile", data: response });
      setErrorMsg("");
      navigate("/overview");
    }
  }

  function displayPassword(show) {
    return show ? <VisibilityOff /> : <Visibility />;
  }

  function navigateLogin () {
    navigate("/auth/login")
  }

  return (
    <MainWindow verticalMiddle>
      <Heading>Register Account</Heading>
      {errorMsg && <h3>{errorMsg}</h3>}
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField
            required
            label="First Name"
            style={formStyling}
            onChange={handleFormChange}
            name="firstName"
          />
          <TextField
          required
            label="Last Name"
            style={formStyling}
            onChange={handleFormChange}
            name="lastName"
          />
          <TextField
          required
            label="Membership ID"
            style={formStyling}
            onChange={handleFormChange}
            name="membershipNumber"
          />
          <TextField
          required
            label="Email"
            style={formStyling}
            onChange={handleFormChange}
            name="email"
          />
          <OutlinedInput
          required
            placeholder="Password *"
            style={formStyling}
            onChange={handleFormChange}
            name="password"
            type={formValues.showPassword ? "text" : "password"}
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
            name="passwordConfirm"
            type={formValues.showPassword ? "text" : "password"}
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
                size="large"
              />
            }
            style={formStyling}
          />

            <BasicButton type="submit" text="Create Account" sx={{ my: 0 }} disabled={disableSubmit} />

          {/* <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            style={{ height: "55px", width: "200px" }}
            disabled={disableSubmit}
          >
            Create Account
          </Button> */}

          <p style={{ marginTop: "50px", display: "flex"}}>
            Already have an account?
            <TextLink mt="0" p="0 10px" onClick={navigateLogin}>Login</TextLink>
          </p>

        </Container>
      </form>
    </MainWindow>
  );
};
