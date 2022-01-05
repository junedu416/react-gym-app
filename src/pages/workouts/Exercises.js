import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {Container, Grid, Heading, MainWindow } from "../../styled-components";
import { ExerciseCardStyling } from "../../styled-components/exercises";
import { useGlobalState } from "../../config/globalStore";
import { getAllExercises } from "../../services/exerciseServices";
import { editProfile } from "../../services/profileServices";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Exercises = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // const exerciseCategories = [
  //   "Callisthenics",
  //   "Cardio",
  //   "Fat Burn",
  //   "Free Weights",
  //   "Muscle Gain",
  //   "Tone",
  // ];
  // const muscleGroups = [
  //   "Arms",
  //   "Chest",
  //   "Core",
  //   "Glutes",
  //   "Legs",
  //   "Lower Back",
  //   "Shoulders",
  //   "Upper Back",
  // ];
  const { store, dispatch } = useGlobalState();
  const { profile } = store;

  useEffect(() => {
    getAllExercises().then((exercises) => {
      setExerciseList(exercises);
    });
  }, []);

  const initialValue = {
    sets: 0,
    reps: 0,
    weight: 0,
    distance: 0,
  };

  const [newExercise, setNewExercise] = useState(initialValue);
  const [message, setMessage] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [added, setAdded] = useState([]);

  const navigate = useNavigate();
  

  const navigateToLogIn = () => {
    navigate("/auth/login");
  }

  const containExercise = (obj, list) => {
    var exercise;
    for (exercise in list) {
        if (list.hasOwnProperty(exercise) && list[exercise] === obj) {
            return true;
        }
    }
    return false;
}

  //this function adds exercise to profile workout array
  const handleAddExercise = async (event, index) => {
    if (added.includes(index)) {
      setAdded(added.filter((sindex) => sindex !== index));
    } else {
      let newAdded = [...added];
      newAdded.push(index);
      setAdded(newAdded);
    }

    setNewExercise({
      ...newExercise,
      _id: exerciseList[index]._id,
      sets: exerciseList[index].defaultSets? exerciseList[index].defaultSets: 0,
      reps: exerciseList[index].defaultSets? exerciseList[index].defaultSets: 0,
      weight: exerciseList[index].defaultWeight? exerciseList[index].defaultWeight: 0,
      distance: exerciseList[index].defaultDistance? exerciseList[index].defaultDistance: 0
    });

    const workout = await selectWorkoutList(event)

   if (containExercise(workout.exercises, newExercise)){
    workout.exercises.push(newExercise)
   }else{
    dispatch({type: "setNotification", data: "Exercise already in your workout list"})
   }
    
    editProfile(profile.userId, profile).then((data) => {
      console.log("profile data", data)
    }).catch((err) => {console.log(err.message)})
    
  };

  const [workoutListName, setWorkoutListName] = useState("My Workouts");
  const selectWorkoutList = async (event) => {
    setWorkoutListName(event.target.getAttribute("name"));
    console.log("Selected Workout List:", workoutListName);
    const workout = await profile.workouts.find((el) => el.name === workoutListName)
    return workout
  };
 

  return (
    <MainWindow>
      <Heading>Select Exercise</Heading>
      {!profile && (
        <p>Please log in to view exercises <button onClick={navigateToLogIn}> Log in</button></p>
      )}

      {profile && (
      <Container>
        <Grid>
          {exerciseList.map((exercise, index) => (
            <ExerciseCardStyling key={index}>
              <h4>{index+1}. {exercise.name}</h4>
              <p>{exercise.description}</p>
              <p>
                {exercise.defaultReps? exercise.defaultReps: 0} reps, 
                {exercise.defaultSets? exercise.defaultSets: 0} sets, 
                {exercise.defaultWeight? exercise.defaultWeight: 0}kg,
                {exercise.defaultDistance? exercise.defaultDistance/1000: 0}km(s)
              </p>
              <Button baria-describedby={id} variant="contained" onClick={handleClick}>
              Add To My Workout
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              > 
                <Typography sx={{ p: 2 }}>
                  {profile.workouts.map((el, i) => (
                    <li key={i} name={el.name} onClick={(event)=> handleAddExercise(event, index)}>
                       {el.name}
                    </li>
                  ))}
                </Typography>
              </Popover>
            </ExerciseCardStyling>
          ))}
        </Grid>
      </Container>
    )}
      {/* <Container>
        <SmallHeading>Category Type</SmallHeading>
        <Grid>
          {exerciseCategories.map((category) => (
            <ExerciseCardStyling>
              <NavBarLink to="/exercises">{category}</NavBarLink>
            </ExerciseCardStyling>
          ))}
        </Grid>
      </Container>
      <Container>
      <SmallHeading>Muscle Group</SmallHeading>
        <Grid>
          {muscleGroups.map((muscleGroup) => (
            <ExerciseCardStyling>
              <NavBarLink to="/exercises">{muscleGroup}</NavBarLink>
            </ExerciseCardStyling>
          ))}
        </Grid>
      </Container> */}
    </MainWindow>
  );
};
