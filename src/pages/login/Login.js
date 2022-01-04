import React, { useState } from "react";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Container,
  Heading,
  MainWindow,
  TextLink,
} from "../../styled-components";
import { formStyling } from "../../styled-components/login";
import SignInButton from "../../components/buttons/SignIn";
import { signInUser } from "../../services/userServices";
import { useGlobalState } from "../../config/globalStore";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

// import { useAuth } from "../../contexts/AuthContext";

export const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // const { login } = useAuth();
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      // await login(formValues.email, formValues.password);
      navigate("/overview");
    } catch {
      setError("Incorrect email or password");
    }

    setLoading(false);
  }

  // ================================  Original code with handleSubmit ================================

  //   signInUser(formValues)
  //     .then((profile) => {
  //       dispatch({ type: "setProfile", data: profile });
  //       setErrorMessage("");
  //       navigate("/overview");
  //     })
  //     .catch((error) => {
  //       console.log(`error caught in login handle submit:`, error);
  //       setErrorMessage("Incorrect email or password");
  //     });
  // }

  function displayPassword(show) {
    return show ? <VisibilityOff /> : <Visibility />;
  }

  return (
    <MainWindow verticalMiddle>
      {/* {errorMessage && <p>{errorMessage}</p>} */}
      <Heading>Login</Heading>
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
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField
            id="standard-basic"
            label="Email"
            style={formStyling}
            onChange={handleChange}
            name="email"
            type="email"
          />
          <OutlinedInput
            placeholder="Password"
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
                sx={{ '& .MuiSvgIcon-root': { fontSize: 36 } }}
              />
            }
            style={formStyling}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<LoginIcon />}
            style={{ height: "55px" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            Sign In
          </Button>
          {/* <SignInButton disabled={loading} /> */}
          <p style={{ marginTop: "50px", display: "flex" }}>
            Forgot Password?
            <TextLink mt="0" p="0 10px" onClick={forgotPassword}>
              Reset Password
            </TextLink>
          </p>
          <p style={{ display: "flex" }}>
            Don't have an account?
            <TextLink mt="0" p="0 10px" onClick={navigateToRegister}>
              Register
            </TextLink>
          </p>
        </Container>
      </form>
    </MainWindow>
  );
};
