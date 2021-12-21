import React, { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Container, Heading, MainWindow } from "../../styled-components";
import { formStyling } from "../../styled-components/login";
import { useGlobalState } from "../../config/globalStore"
import { signUpUser } from "../../services/userServices";

export const Register = (props) => {
  const navigate = useNavigate();
  const {dispatch} = useGlobalState();

  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  const handleCheckChange = (event) => {
    setRememberMe(!rememberMe);
  };
  
  const handleFormChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name] : event.target.value
    });
  }

  const initialFormValues = {
    firstName: "",
    lastName: "",
    membershipNumber: 0,
    email: "",
    password: "",
    passwordConfirm: ""
  }

  const [formValues, setFormValues] = useState(initialFormValues);

  //use global state or local storage for this
  //const [login, setLogin] = useState(false);

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
      dispatch({type: "setProfile", data: response});
      setErrorMsg("");
      navigate("/welcome");
    }
  }

  return (
    <MainWindow verticalMiddle>
      <Heading>Register Account</Heading>
      {errorMsg && <h3>{errorMsg}</h3>}
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField
            id="standard-basic"
            label="First Name"
            style={formStyling}
            onChange={handleFormChange}
            name="firstName"
          />
          <TextField
            id="standard-basic"
            label="Last Name"
            style={formStyling}
            onChange={handleFormChange}
            name="lastName"
          />
          <TextField
            id="standard-basic"
            label="Membership ID"
            style={formStyling}
            onChange={handleFormChange}
            name="membershipNumber"
          />
          <TextField 
            id="standard-basic" 
            label="Email" style={formStyling} 
            onChange={handleFormChange} 
            name="email" 
          />
          <TextField 
            id="standard-basic" 
            label="Password" 
            style={formStyling} 
            onChange={handleFormChange} 
            name="password" 
          />
          <TextField
            id="standard-basic"
            label="Confirm Password"
            style={formStyling}
            onChange={handleFormChange}
            name="passwordConfirm"
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
            disabled={disableSubmit}
          >
            Create Account
          </Button>
        </Container>
      </form>
    </MainWindow>
  );
};
