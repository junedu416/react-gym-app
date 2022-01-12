import React from 'react';
import { useNavigate } from 'react-router';
import { useGlobalState } from '../../config/globalStore';
import { Container } from "../../styled-components";
import BasicButton from "../../components/buttons/BasicButton";

export const DeleteWorkout = ({handleClose}) => {
    const {store, dispatch} = useGlobalState();
    const {profile, workoutIndex } = store;
    const navigate = useNavigate();

    function handleWorkoutDelete(e) {
        e.preventDefault();
        console.log("delete button clicked")
        const workoutsClone = [...profile.workouts];
        workoutsClone.splice(workoutIndex, 1);
        dispatch({ type: "setWorkout", data: workoutsClone });
        dispatch({ type: "setNotification", data: "Delete workout successfully!" });
        navigate("/workouts");
    }

    return(
    <Container mt="40px" direction="row">
      <BasicButton
        color="error"
        sx={{ mr: 5 }}
        btnFunction={handleWorkoutDelete}
        text="Delete"
      />
      <BasicButton color="info" btnFunction={handleClose} text="Cancel" />
    </Container>
    )
}