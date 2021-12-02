import React, { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Container } from "../../styled-components";

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
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="First Name"
          style={{ width: 300 }}
        />
        <TextField
          id="standard-basic"
          label="Last Name"
          style={{ width: 300 }}
        />
        <TextField
          id="standard-basic"
          label="Membership ID"
          style={{ width: 300 }}
        />
        <TextField
          id="standard-basic"
          label="Email"
          style={{ width: 300 }}
        />
        <TextField
          id="standard-basic"
          label="Password"
          style={{ width: 300 }}
        />
        <TextField
          id="standard-basic"
          label="Confirm Password"
          style={{ width: 300 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={state.checked}
              onChange={handleChange}
              name="checked"
              color="primary"
            />
          }
          label="Remember Me"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ height: "55px" }}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};
