import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
// import { Link } from 'react-router-dom';
import EditButton from "../../components/buttons/Edit";
import {
  Container,
  Heading,
  SmallHeading,
  MainWindow,
  Grid,
  ButtonLink,
  StyledAlert,
  Text, 
  TextLink
} from "../../styled-components";
import { Collapse } from "@mui/material";
import {
  WorkoutCardStyling,
  WorkoutList,
} from "../../styled-components/workouts";
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { workoutList } from "../../data/workouts-dummy";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import CloseIcon from "@mui/icons-material/Close";

import BasicButton from "../../components/buttons/BasicButton"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useGlobalState } from "../../config/globalStore";
import { editProfile } from "../../services/profileServices";

export const Workouts = () => {
  useRedirectUnauthorisedUser();
  const [open, setOpen] = useState(false);
  const initialWorkout = {
    name: null, 
    exercises:[]
  }
  const [newWorkout, setNewWorkout] = useState(initialWorkout);
  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalState();
  const { profile} = store;
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (profile){
      editProfile(profile.userId, profile)
      .catch((err) => {
        console.log(err.message);
      })
    }
  },[profile])

  const handleChange = (event) => {
    const workoutObj = {
      ...newWorkout,
      name: event.target.value
    }
    setNewWorkout(workoutObj)
  }

  const handleCreateBtn = () => {
    console.log(newWorkout)
    dispatch({type: "addNewWorkout", data: newWorkout})
    dispatch({
      type: "setNotification",
      data: "Successfully Create New Workout"
    })
    setOpen(false);
  }

  const [activeWorkout, setActiveWorkout] = useState("");
  const handleClick = (selectedWorkout) => {
    if (selectedWorkout !== null) {
      setActiveWorkout(selectedWorkout);
    }
  };

  const navigateToLogin = () => {
    navigate("/auth/login");
  };

  // console.log(activeWorkout);

  function workoutStart() {
    navigate("/workouts/start");
  }
  

  function editWorkout(index) {
    dispatch ({type: "selectWorkout", data: profile.workouts[index]._id })
    navigate("/workouts/edit")
  } 
  
  return (
    <MainWindow>
      {!profile && (
        <Collapse in={display}>
          <StyledAlert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDisplay(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            }
          >
            <Text>
              Please
              <TextLink mt="0" p="0 6px" onClick={navigateToLogin}>
                login
              </TextLink>
              to view workout
            </Text>
          </StyledAlert>
        </Collapse>
      )}

      {profile && <Container>
        <Heading>Workouts</Heading>
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
           Create Workout List
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New Workout"
              helperText="Please enter your workout list name"
              fullWidth
              variant="standard"
              onChange ={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreateBtn}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
      {profile.workouts.length === 0 && <Text>You don't have a workout list yet! Click the button above to create your first workout</Text>}
        <Container>
          <Grid>
            {profile.workouts.map((workout, index) => {
              return (
                <Container>
                  <EditButton btnFunction={() => editWorkout(index)}/>
                  <WorkoutCardStyling value={index} onClick={handleClick}>
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
                          {exercise.exerciseId? <p>{exercise.exerciseId.name}</p>: <p>{exercise.customisedName}</p>}
                            {exercise.sets === null||0 ? null : (
                              <span style={{ display: "flex", width: "30px" }}>
                                <p>{exercise.sets}</p>
                                <p
                                  style={{
                                    textTransform: "lowercase",
                                    padding: "0 5px",
                                  }}
                                >
                                  {exercise.reps === null||0 ? "":"x"}
                                </p>
                                <p>{exercise.reps === null||0 ? null:exercise.reps}</p>
                              </span>
                            )}
                            {exercise.distance == null||0 ? null: <p>{exercise.distance}</p>}   
                            <IconButton>
                              <ArrowForwardIosIcon />
                            </IconButton>
                          </WorkoutList>
                          <Divider sx={{ width: "90%" }} />
                        </Container>
                      );
                    })}
                  </WorkoutCardStyling>
                  <BasicButton
                    text="Start Workout"
                    variant="outlined"
                    style={{
                      color: "lime",

                      marginTop: "25px",
                      border: "1.7px solid lime",
                      borderRadius: "6px",
                      opacity: "0.8",
                      "&:hover": { opacity: "1", color: "red" },
                    }}
                    btnFunction={workoutStart}
                  />
                  {/* <StartWorkout btnFunction={workoutStart} /> */}
                </Container>
              );
            })}
          </Grid>

          <ButtonLink to="/workouts/trainer-workouts">
            <BasicButton text="Trainer Workouts" />
          </ButtonLink>

          <ButtonLink to="/exercises">
            <BasicButton
              text="View Exercises"
              variant="outlined"
              color="error"
            />
          </ButtonLink>
        </Container>
      </Container>}
    </MainWindow>
  );
};
