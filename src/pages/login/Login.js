import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Container } from "../../styled-components"

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
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Membership ID"
          style={{ width: 300 }}
        />
        <TextField
          id="standard-basic"
          label="Password"
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
          startIcon={<ExitToAppIcon />}
          style={{ height: "55px" }}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};
