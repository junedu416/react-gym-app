import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Heading,
  MainWindow,
  TextLink,
} from "../../styled-components";
import {
  WorkoutCardStyling,
  WorkoutList,
} from "../../styled-components/workouts";
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditButton from "../../components/buttons/Edit";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Button } from "@mui/material";
import { workoutList } from "../../data/workouts-dummy";

export const EditWorkouts = (props, workouts) => {
  const navigate = useNavigate();
  const [activeWorkout, setActiveWorkout] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleClick = (selectedWorkout) => {
    if (selectedWorkout !== null) {
      setActiveWorkout(selectedWorkout);
    }
  };

  console.log(activeWorkout);

  function workoutStart() {
    navigate("/workouts/start");
  }

  function editWorkout(workout) {
    navigate(`/workouts/edit?${workout.name}`)
  }

  function handleEdit() {
    setEditMode(true)
  } 

  function removeWorkout(workout, index) {
    workoutList = workoutList.filter((exercise) => exercise.name !== workout.name)
    console.log("After Removed: ", workoutList);
    return workoutList;
  }

  return (
    <MainWindow>
      <Container>
        <Heading>Workouts</Heading>

        <EditButton btnFunction={handleEdit} />
        <Container>
          <WorkoutCardStyling onClick={handleClick}>
            {workoutList.map((workout, index) => {
              return (
                <Container>
                  <WorkoutList p="10px 0 10px" ml="20px">
                    {workout.name}
                    <IconButton onClick={() => editWorkout(workout)}>
                      {editMode ? <RemoveCircleIcon sx={{ color:"red" }} onClick={()=> removeWorkout(workout, index)}/> :
                      <ArrowForwardIosIcon />}
                    </IconButton>
                  </WorkoutList>
                  <Divider sx={{ width: "90%" }} />
                </Container>
              );
            })}
            <TextLink
              direction="row"
              p="20px 0"
              ml="25px"
              mt="0"
              justify="flex-start"
              onClick={() => navigate("/workouts/new")}
            >
              <AddCircleIcon sx={{ mr: 1 }} /> Add Workout
            </TextLink>
          </WorkoutCardStyling>
        </Container>
        {editMode &&
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3}}
          onClick={()=> setEditMode(false)}
        >
          Done
        </Button>}
      </Container>
    </MainWindow>
  );
};
