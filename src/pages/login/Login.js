import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Container,
  Heading,
  TextLink,
} from "../../styled-components";
import { formStyling } from "../../styled-components/login";
import { signInUser } from "../../services/userServices";
import { useGlobalState } from "../../config/globalStore";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { RegisterLink } from "../../components/RegisterLink";
import LoginIcon from "@mui/icons-material/Login";
// import BasicButton from "../../components/buttons/BasicButton";
import { LoadButton } from "../../components/buttons/LoadButton";
import { ReusableAlert } from "../../components/ReusableAlert";

export const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  function navigateToRegister() {
    navigate("/register");
  }

  function forgotPassword() {
    navigate("/forgot-password");
  }

  const handleFormChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

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
    showPassword: false,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    signInUser(formValues)
      .then((profile) => {
        if(rememberMe) window.localStorage.setItem("uid", profile.userId);
        dispatch({ type: "setProfile", data: profile });
        dispatch({ type: "setNotification", data: "Successfully Logged In" });
        setErrorMessage("");
        setLoading(false);
        navigate("/overview");
      })
      .catch((error) => {
        console.log(`error caught in login handle submit:`, error);
        setLoading(false);
        setErrorMessage("Incorrect email or password");
      });
  }

  function displayPassword(show) {
    return show ? <VisibilityOff /> : <Visibility />;
  }

  return (
    <>
      {errorMessage && (
        <ReusableAlert
          text={errorMessage}
          open={open}
          btnFunction={() => {
            setOpen(false);
          }}
        />
      )}
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField
            required
            id="standard-basic"
            label="Email"
            style={formStyling}
            onChange={handleChange}
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

          <LoadButton
            type="submit"
            text={loading ? "Logging In" : "Sign In"}
            sx={{ my: 0 }}
            startIcon={<LoginIcon />}
            loading={loading}
            loadPosition="start"
            onClick={() => setOpen(true)}
          />

          <p style={{ marginTop: "50px", display: "flex" }}>
            Forgot Password?
            <TextLink mt="0" p="0 10px" onClick={forgotPassword}>
              Reset Password
            </TextLink>
          </p>

          <RegisterLink navigateLink={navigateToRegister} />
        </Container>
      </form>
    </>
  );
};
