import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Container, Heading } from "../../styled-components";
import { formStyling } from "../../styled-components/login";

export const SignIn = (props) => {
  const [state, setState] = React.useState({ checked: true });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [membershipID, setMembershipID] = useState("");
  const [login, setLogin] = useState(false);

  // =======================================================
  // Change out this logic for auth later
  function handleSubmit(event) {
    event.preventDefault();
    setLogin(true);
  }

  return (
    <Container>
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField
            id="standard-basic"
            label="Membership ID"
            style={formStyling}
          />
          <TextField id="standard-basic" label="Password" style={formStyling} />

          <FormControlLabel
            control={
              <Checkbox
                checked={state.checked}
                onChange={handleChange}
                name="checked"
                color="primary"
              />
            }
            style={formStyling}
            label="Remember Me"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ExitToAppIcon />}
            style={{ height: "55px" }}
          >
            Sign In
          </Button>
        </Container>
      </form>
    </Container>
  );
};
