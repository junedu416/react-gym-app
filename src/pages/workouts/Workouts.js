import React, { useState } from "react";
import { useNavigate } from "react-router";
import EditButton from "../../components/buttons/Edit";
import ViewExercises from "../../components/buttons/ViewExercises";
import StartWorkout from "../../components/buttons/StartWorkout";
import {
  Container,
  Heading,
  SmallHeading,
  MainWindow,
  Grid,
} from "../../styled-components";
import {
  WorkoutCardStyling,
  WorkoutList,
} from "../../styled-components/workouts";
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { workoutList } from "../../data/workouts-dummy";
import { Button } from "@mui/material";
import { ReusableModal } from "../../components/ReusableModal";



export const Workouts = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [activeWorkout, setActiveWorkout] = useState("");
  // const handleClick = (selectedWorkout) => {
  //   if (selectedWorkout !== null) {
  //     setActiveWorkout(selectedWorkout);
  //   }
  // };

  const newWorkout = "/workouts/new";
  const trainerWorkout = "/workouts/trainer-workouts";

  const handleClick = () => {
    navigate(newWorkout);
  };
  const handleClick2 = () => {
    navigate(trainerWorkout);
  };

  const actionButtons = [
    <Container mt="40px" direction="row">
      <Button
        variant="contained"
        size="large"
        color="primary"
        sx={{ mr: 5 }}
        style= {{ height: "70px", width:"50%" }}
        onClick={handleClick}
      >
        Custom Workout
      </Button>
      <Button
        variant="contained"
        size="large"
        color="warning"
        style= {{ height: "70px", width:"50%" }}
        onClick={handleClick2}
      >
        View Trainer Workouts
      </Button>
    </Container>,
  ];

  

  console.log(activeWorkout);

  function workoutStart() {
    navigate("/workouts/start");
  }

  function editWorkout(workout) {
    // navigate(`/workouts/edit`);
    navigate(`/workouts/edit?${workout.name}`)
  }


  return (
    <>
      <MainWindow>
        <Container>
          <Heading>Workouts</Heading>

          <Container>
            <Grid>
              {workoutList.map((workout, index) => {
                return (
                  <Container>
                    <EditButton btnFunction={() => editWorkout(workout) } />
                    <WorkoutCardStyling
                      value={index}
                      // onClick={handleClick}
                    >
                      <SmallHeading
                        p="10px 0 0 20px"
                        m="0 0 10px"
                        style={{ fontSize: "1.5rem" }}
                      >
                        {workout.name}
                      </SmallHeading>

                      {workout.exercises.map((exercise) => {
                        return (
                          <Container>
                            <WorkoutList p="0 5px 0 15px">
                              <p>{exercise.name}</p>
                              {exercise.sets === null ? null : (
                                <span style={{ display: "flex" }}>
                                  <p>{exercise.sets}</p>
                                  <p
                                    style={{
                                      textTransform: "lowercase",
                                      padding: "0 5px",
                                    }}
                                  >
                                    {"x"}
                                  </p>
                                  <p>{exercise.reps}</p>
                                </span>
                              )}
                              {exercise.distance === null ? null : (
                                <p>{exercise.distance}</p>
                              )}
                              <IconButton>
                                <ArrowForwardIosIcon />
                              </IconButton>
                            </WorkoutList>
                            <Divider sx={{ width: "90%" }} />
                          </Container>
                        );
                      })}
                    </WorkoutCardStyling>
                    <StartWorkout btnFunction={workoutStart} />
                  </Container>
                );
              })}
            </Grid>

            {/* <TrainerWorkouts /> */}

            {/* <CreateWorkout /> */}

            <Button variant="contained" size="large" sx={{ my:5 }} onClick={() => handleOpen()}>
              Add Workout
            </Button>

            <ViewExercises />
          </Container>
        </Container>
      </MainWindow>
      <ReusableModal
        title="Would you like to create your own custom workout or select a trainer workout?"
        open={open}
        handleClose={handleClose}
        children={actionButtons}
      />
    </>
  );
};
