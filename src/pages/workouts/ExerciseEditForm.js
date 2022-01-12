import React, { useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { formStyling } from "../../styled-components/login";
import { navigate } from 'react-big-calendar/lib/utils/constants';
import { useGlobalState } from "../../config/globalStore";


export const ExerciseEditForm = ({open, setFormOpen, exercise, workoutIndex}) => {

  const { store, dispatch } = useGlobalState();
  const { profile } = store;

  const initialFormValues = {
    sets: null,
    reps: null,
    weight: null,
    distance: null,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleClose = () => {
    setFormOpen(false);
  };
  
  const handleFormChange = (event) => {
    setFormValues({
      ...formValues, 
      [event.target.name]: event.target.value ? Number(event.target.value) : event.target.defaultValue,
    });
  }

  function editExercise(exercise, formVars){
    const workoutsClone = profile.workouts
    workoutsClone[workoutIndex].exercises.map((el) => {
      if(el._id === exercise._id){
        el.sets = formVars.sets;
        el.reps = formVars.reps;
        el.weight = formVars.weight;
        el.distance= formVars.distance;
      }
      console.log("workoutsClone:",workoutsClone)
      dispatch({type: "setWorkout", data: workoutsClone})
      
    })
  }
  
  const handleSubmit = (exercise) => {
    setFormOpen(false);
    setFormValues({
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      distance: exercise.distance,
    })
    console.log("value to send:", formValues)
    editExercise(exercise, formValues)
    console.log(profile.workouts)
  }
 
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit {exercise.exerciseId? exercise.exerciseId.name: exercise.customisedName}</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            id="outlined-required"
            label="Exercise Name"
            name="customisedName"
            defaultValue={exercise.customisedName? exercise.customisedName: exercise.exerciseId.name}
            style={formStyling}
            onChange={handleFormChange}
            />
        <TextField
            id="outlined-number"
            label="Sets"
            name="sets"
            type="number"
            style={formStyling}
            defaultValue={exercise.sets? exercise.sets: 0}
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
            defaultValue={exercise.reps? exercise.reps: 0}
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
            defaultValue={exercise.weight? exercise.weight: 0}
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
            defaultValue={exercise.distance? exercise.distance: 0}
            InputProps={{ inputProps: { min: 0 } }}
            style={formStyling}
            InputLabelProps={{
                shrink: true,
            }}
            variant="filled"
            onChange={handleFormChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit(exercise)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}