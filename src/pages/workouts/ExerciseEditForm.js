import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { formStyling } from "../../styled-components/login";


export const ExerciseEditForm = ({open, setFormOpen, exercise}) => {

  const handleClose = () => {
    setFormOpen(false);
  };
  
  const handleFormChange = () => {

  }
  
 
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
      {console.log("Editting workout:", exercise)}
        <DialogTitle>Edit {exercise.exerciseId? exercise.exerciseId.name: exercise.customisedName}</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}