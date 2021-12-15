import React, { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Container, Heading, MainWindow } from "../../styled-components";
import { formStyling } from "../../styled-components/login";
import { useGlobalState } from "../../config/globalStore"

export const Register = (props) => {
  const navigate = useNavigate();
  const {store, dispatch} = useGlobalState();
  console.log(store);

  const [state, setState] = React.useState({ checked: true });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [membershipID, setMembershipID] = useState("");
  const [login, setLogin] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/welcome");
  }

  return (
    <MainWindow>
      <Heading>Register Account</Heading>
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField
            id="standard-basic"
            label="First Name"
            style={formStyling}
          />
          <TextField
            id="standard-basic"
            label="Last Name"
            style={formStyling}
          />
          <TextField
            id="standard-basic"
            label="Membership ID"
            style={formStyling}
          />
          <TextField id="standard-basic" label="Email" style={formStyling} />
          <TextField id="standard-basic" label="Password" style={formStyling} />
          <TextField
            id="standard-basic"
            label="Confirm Password"
            style={formStyling}
          />

          <FormControlLabel
            label="Remember Me"
            control={
              <Checkbox
                checked={state.checked}
                onChange={handleChange}
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
          >
            Create Account
          </Button>
        </Container>
      </form>
    </MainWindow>
  );
};
