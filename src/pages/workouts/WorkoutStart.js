import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";

import { editProfile } from "../../services/profileServices";
import { displayUnits } from "../../utils/workoutFunctions";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { useGlobalState } from "../../config/globalStore";

import { Container, SmallHeading } from "../../styled-components";
import { WorkoutDate, WorkoutText } from "../../styled-components/workouts";

import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReusableModal } from "../../components/ReusableModal";
import useMediaQuery from "@mui/material/useMediaQuery";


export const WorkoutStart = () => {
  useRedirectUnauthorisedUser();
  const navigate = useNavigate();

  // REMOVE LATER!!
  const desktop = useMediaQuery("(min-width:1024px)");

  const { store, dispatch } = useGlobalState();
  const { profile, workoutIndex } = store;
  const profWorkoutsClone = JSON.parse(JSON.stringify(profile.workouts)); //deep clone
  const workoutList = profWorkoutsClone[workoutIndex];
  const list = workoutList.exercises;

  const [counter, setCounter] = useState(0);
  const [disableExButtons, setDisableExButtons] = useState(
    new Array(list.length)
  );
  const [exerciseCompleted, setExerciseCompleted] = useState({
    ...workoutList,
    exercises: [],
  });
  const [open, setOpen] = useState(false);

  const totalExercises = list.length - 1;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/workouts");
  };

  const handleExerciseCompleted = (newExerciseCompleted) => {
    setExerciseCompleted({
      ...exerciseCompleted,
      exercises: [...exerciseCompleted.exercises, newExerciseCompleted],
    });
  };

  function toggleDisabledButtons(index) {
    const tempDisableExButtons = [...disableExButtons];
    tempDisableExButtons[index] = !tempDisableExButtons[index];
    setDisableExButtons(tempDisableExButtons);
  }

  //keep track of previous stats and increment weight/distance for next workout if successful.
  const finishExercise = (exercise, isCompleted) => {
    setCounter(counter + 1);
    if (exercise.weight) {
      exercise.prevWeights.push(exercise.weight);
    } else {
      exercise.prevDistances.push(exercise.distance);
    }
    if (isCompleted) {
      if (exercise.weight) {
        exercise.weight = exercise.weight + 5;
      } else {
        exercise.distance = exercise.distance + 100;
      }
    }
    handleExerciseCompleted(exercise);
    isWorkoutCompleted(counter);
  };

  const isWorkoutCompleted = (counter) => {
    if (counter === totalExercises) {
      handleOpen();
      setTimeout(() => handleClose(), 2000);
    }
  };

  const updateProfileWorkouts = useCallback(() => {
    profWorkoutsClone[workoutIndex] = exerciseCompleted;
    console.log("profWorkoutsClone", profWorkoutsClone);
    editProfile(profile.userId, {
      ...profile,
      workouts: profWorkoutsClone,
    }).then((response) => {
      dispatch({ type: "setProfile", data: response.data })
      setExerciseCompleted({
        ...exerciseCompleted,
      exercises: []
      });
    });
  }, [profile, dispatch, profWorkoutsClone, workoutIndex, exerciseCompleted]);

  useEffect(() => {
    if (exerciseCompleted.exercises.length === list.length) {
      updateProfileWorkouts();
    }
  }, [exerciseCompleted, updateProfileWorkouts, list.length]);

  return (
    <>
      <Container
        p="0 10px 0 15px"
        greyBorder
        shadow
        m="15px 5px 80px"
        style={{ borderRadius: "15px", maxWidth: "100vw" }}
      >
        <WorkoutDate>{moment().format("LL")}</WorkoutDate>
        <Container
          direction="row"
          style={{ maxWidth: "80vw" }}
          justify="space-between"
        >
          <SmallHeading style={{ margin: "0" }}>
            {workoutList.name}
          </SmallHeading>
        </Container>

        <Container
          align="flex-start"
          justify="flex-end"
          direction="row"
          w="100%"
          p= {desktop ? "0 10px" : "0"}
        >
          <span style={{ color: "lime", paddingRight: desktop ? "17px" : "7px" }}>Completed</span>
          <span style={{ color: "red" }}>Incomplete</span>
        </Container>

        {list.map((exercise, index) => (
          <>
            <Container
              key={index}
              align="flex-start"
              w="100%"
              p="5px 0px 0px 15px"
              style={{
                minWidth: desktop ? "400px" : "",
                maxWidth: desktop ? "450px" : "100%",
                background: disableExButtons[index] ? "rgba(20, 20, 80, 0.12)" : "white",
                borderRadius: "10px"
              }}
            >
              <SmallHeading
                size={desktop ? "1.6rem" : "1.3rem"}
                color="rgba(40, 40, 40, 0.65)"
                style={{ margin: "0" }}
              >
                {exercise.exerciseId?.name || exercise.customisedName}
              </SmallHeading>
              <Container
                direction="row"
                style={{ width: "100%" }}
                justify="space-between"
              >
                <Container
                  direction="row"
                  style={{
                    gap: desktop ? "50px" : "22px",
                    marginRight: desktop ? "30px" : "10px",
                  }}
                >
                  {exercise.sets && (
                    <Container>
                      <WorkoutText mb="0">Sets</WorkoutText>
                      <WorkoutText>{exercise.sets}</WorkoutText>
                    </Container>
                  )}
                  {exercise.reps && (
                    <Container>
                      <WorkoutText mb="0">Reps</WorkoutText>
                      <WorkoutText>{exercise.reps}</WorkoutText>
                    </Container>
                  )}
                  {exercise.weight && (
                    <Container>
                      <WorkoutText mb="0">Weight</WorkoutText>
                      <WorkoutText>{exercise.weight} kg</WorkoutText>
                    </Container>
                  )}
                  {exercise.distance && (
                    <Container>
                      <WorkoutText mb="0">Distance</WorkoutText>
                      <WorkoutText>
                        {displayUnits(exercise.distance)}
                      </WorkoutText>
                    </Container>
                  )}
                </Container>

                <ButtonGroup
                  variant="text"
                  color="inherit"
                  aria-label="complete workout button group"
                >
                  <Button
                    onClick={(e) => {
                      finishExercise(exercise, true);
                      toggleDisabledButtons(index);
                    }}
                    disabled={disableExButtons[index]}
                  >
                    <DoneIcon
                      sx={{ fontSize: desktop ? "5rem" : "4rem" }}
                      color={disableExButtons[index] ? "disabled" : "success"}
                    />
                  </Button>
                  <Button
                    onClick={(e) => {
                      finishExercise(exercise, false);
                      toggleDisabledButtons(index);
                    }}
                    disabled={disableExButtons[index]}
                  >
                    <ClearIcon
                      sx={{ fontSize: desktop ? "5rem" : "4rem" }}
                      color={disableExButtons[index] ? "disabled" : "error"}
                    />
                  </Button>
                </ButtonGroup>
              </Container>
            </Container>
            <Divider sx={{ width: "95%", pb: 1, mb: desktop ? 1 : 0, mr: 3 }} />
          </>
        ))}
      </Container>
      <ReusableModal
        title="YAY!! You completed your workout!! 🎉🎉"
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
