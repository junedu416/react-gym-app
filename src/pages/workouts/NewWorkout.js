import React, {useState} from "react";
import {  Container, Heading, MainWindow } from "../../styled-components";
import { formStyling } from "../../styled-components/login";
import BasicButton from "../../components/buttons/BasicButton";
import TextField from '@mui/material/TextField';
import { useGlobalState } from "../../config/globalStore";


export const NewWorkout = (props) => {

  const { store, dispatch } = useGlobalState();
  const { profile, workoutId } = store;
  // const workoutList = profile.workouts.filter((workout) => workout._id === workoutId)
  const [loading, setLoading] = useState(false);

  const initialFormValues = {
    name:"",
    sets: null,
    reps: null,
    weight: null,
    distance: null,
  };

  const [formValues, setFormValues] = useState(initialFormValues);


  const handleFormChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.type === 'number' ? Number(event.target.value) : event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedWorkout = profile.workouts.filter((workout) => workout._id === workoutId)[0].exercises.concat(formValues)
    console.log('selectedWorkout:', selectedWorkout )
    console.log('Form Values:', formValues )
    setLoading(true);
    // dispatch ({type: "setWorkout", data: })

  }
    
  return (
    <MainWindow>
      <Heading>Create Exercise</Heading>
      <form onSubmit={handleSubmit}>
      <Container>
      <TextField
          required
          id="outlined-required"
          label="Exercise Name"
          name="name"
          style={formStyling}
          onChange={handleFormChange}
        />
      <TextField
          id="outlined-number"
          label="Sets"
          name="sets"
          type="number"
          style={formStyling}
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
          style={formStyling}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={handleFormChange}
        />
        <TextField
          id="outlined-number"
          label="Weight"
          name="weight"
          type="number"
          style={formStyling}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={handleFormChange}
        />
         <TextField
          id="outlined-number"
          label="Distance"
          name="distance"
          type="number"
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
            text={ loading ? "Logging..." : "Add Exercise"}
            sx={{ my: 0 }}
            loading={loading}
            loadPosition="start"
          />

      </form> 
    </MainWindow>
  );
};
