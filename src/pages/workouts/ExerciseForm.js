import React, { useState } from "react";
import { Container } from "../../styled-components";
import { formStyling } from "../../styled-components/login";
import BasicButton from "../../components/buttons/BasicButton";
import TextField from "@mui/material/TextField";
import { useGlobalState } from "../../config/globalStore";

export const ExerciseForm = ({ workoutId, submitFunc }) => {
  const { store, dispatch } = useGlobalState();
  const { profile } = store;
  const [loading, setLoading] = useState(false);

  const initialFormValues = {
    customisedName: "",
    sets: null,
    reps: null,
    weight: null,
    distance: null,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleFormChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]:
        event.target.type === "number"
          ? Number(event.target.value)
          : event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const workoutsData = profile.workouts;
    workoutsData
      .filter((workout) => workout._id === workoutId)[0]
      .exercises.push(formValues);

    setLoading(true);
    dispatch({ type: "setWorkout", data: workoutsData });
    submitFunc();
    dispatch({ type: "setNotification", data: "Add exercise successfully!" });
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <TextField
          required
          id="outlined-required"
          label="Exercise Name"
          name="customisedName"
          style={formStyling}
          onChange={handleFormChange}
        />
        <TextField
          id="outlined-number"
          label="Sets"
          name="sets"
          type="number"
          style={formStyling}
          InputProps={{ inputProps: { min: 0 } }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={handleFormChange}
        />
        <TextField
          id="outlined-number"
          label="Reps"
          name="reps"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          style={formStyling}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={handleFormChange}
        />
        <TextField
          id="outlined-number"
          label="Weight(kg)"
          name="weight"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          style={formStyling}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={handleFormChange}
        />
        <TextField
          id="outlined-number"
          label="Distance(m)"
          name="distance"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          style={formStyling}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={handleFormChange}
        />
      </Container>

      <BasicButton
        type="submit"
        text={loading ? "Logging..." : "Add Exercise"}
        sx={{ my: 0 }}
        loading={loading}
        loadPosition="start"
      />
    </form>
  );
};
