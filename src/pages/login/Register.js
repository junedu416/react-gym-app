import React, { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Container, Heading } from "../../styled-components";
import { formStyling } from "../../styled-components/login";

export const Register = (props) => {
  const navigate = useNavigate();
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
    <Container>
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
    </Container>
  );
};
