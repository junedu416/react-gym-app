import React, {useState} from "react";
import { Heading, MainWindow } from "../../styled-components";
import { ExerciseForm } from'./ExerciseForm';
import { useGlobalState } from "../../config/globalStore";
import { editProfile } from "../../services/profileServices";

export const NewWorkout = () => {

  const {store, dispatch} = useGlobalState();
  const {profile, workoutId} = store;
  const [errorMessage, setErrorMessage] = useState("");


  const updateProfileExercise = () => {
    console.log('profile workouts:', [profile.workouts] )
    editProfile(profile.userId, profile)
    .then(res => {
      if(res.error){ setErrorMessage(res.error)}
    })
    .then(() => {
      dispatch({type: 'setNotification', data: "Successfully added exercise"})
    })
    .catch(error => {
      setErrorMessage(error)
    });
  }

    
  return (
    <MainWindow>
      <Heading>Create Exercise</Heading>
      {errorMessage && <p>{errorMessage}</p>}
      <ExerciseForm submitFunc = {updateProfileExercise} workoutId = {workoutId}/>
    </MainWindow>
  );
};
