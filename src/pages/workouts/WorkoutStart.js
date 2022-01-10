import React, { useState, useEffect } from "react";
import EditButton from "../../components/buttons/Edit";
import { Container, MainWindow, SmallHeading } from "../../styled-components";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import { WorkoutDate, WorkoutText } from "../../styled-components/workouts";
import moment from "moment";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { workoutList } from "../../data/workouts-dummy";
import { ReusableModal } from "../../components/ReusableModal";

export const WorkoutStart = (props) => {
  const navigate = useNavigate();
  const selectedWorkout = workoutList[0];
  const list = selectedWorkout.exercises;

  const [counter, setCounter] = useState(0);
  const [disableExButtons, setDisableExButtons] = useState(
    new Array(list.length)
  );
  const [disabledList, setDisabledList] = useState([]);
  const [exerciseCompleted, setExerciseCompleted] = useState([]);
  const [open, setOpen] = useState(false);

  const totalExercises = workoutList.length - 1;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/workouts");
  };

  const handleExerciseCompleted = (newExerciseCompleted) => {
    setExerciseCompleted((prevState) => [...prevState, newExerciseCompleted]);
  };

  useEffect(() => {
    const tempDisableExButtons = [...disableExButtons];
    for (let i = 0; i < tempDisableExButtons.length; i++) {
      tempDisableExButtons[i] = false;
    }
    setDisableExButtons(tempDisableExButtons);
  }, []);

  function toggleDisabledButtons(index) {
    const tempDisableExButtons = [...disableExButtons];
    tempDisableExButtons[index] = !tempDisableExButtons[index];
    setDisableExButtons(tempDisableExButtons);
  }

  // const disableGroup = (exercise) => {
  //   setDisabledList({ ...disabledList, exercise });
  // };

  const finishExercise = (exercise, isCompleted) => {
    setCounter(counter + 1);
    exercise.completed = isCompleted;
    handleExerciseCompleted(exercise);
    isWorkoutCompleted(counter);
  };

  const isWorkoutCompleted = (counter) => {
    if (counter === totalExercises) {
      handleOpen()
      setTimeout(() => handleClose(), 3500)
      
      // ================================ ADD LOGIC TO SEND TO BACKEND ==========================
      // sendData();
      // navigate("/workouts");

      // =========================================================================================
    }
  };

  const determineUnits = (distance) => {
    if (distance > 1000) return `${distance / 1000} km`;
    else if (distance > 0) return `${distance} m`;
    else return null;
  };

  return (
    <>
      <MainWindow verticalMiddle>
        <Container
          p="0 10px 0 30px"
          greyBorder
          shadow
          style={{ borderRadius: "15px" }}
        >
          <WorkoutDate>
            {moment().format("LL")}
          </WorkoutDate>
          <Container
            direction="row"
            style={{ width: "100%" }}
            justify="space-between"
          >
            <SmallHeading style={{ margin: "0" }}>Workout A</SmallHeading>
            <EditButton />
          </Container>

          <Container
            align="flex-start"
            justify="flex-end"
            direction="row"
            w="100%"
            p="0 10px"
          >
            <span style={{ color: "lime", paddingRight: "17px" }}>
              Completed
            </span>
            <span style={{ color: "red" }}>
              Incomplete
            </span>
          </Container>

          {list.map((exercise, index) => (
            <>
              <Container align="flex-start">
                <SmallHeading
                  size="1.6rem"
                  color="rgba(40, 40, 40, 0.65)"
                  // color={disableExButtons[index] ? "grey" : "lime"}
                  style={{ margin: "0" }}
                >
                  {exercise.name}
                </SmallHeading>
                <Container
                  direction="row"
                  style={{ width: "100%" }}
                  justify="space-between"
                >
                  <Container direction="row" style={{ gap: "50px", marginRight: "30px" }}>
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
                          {determineUnits(exercise.distance)}
                        </WorkoutText>
                      </Container>
                    )}
                  </Container>

                  <ButtonGroup
                    variant="text"
                    color="inherit"
                    aria-label="complete workout button group"
                    // onClick={() => disableGroup(exercise)}    // Don't need this
                  >
                    <Button
                      onClick={(e) => {
                        finishExercise(exercise, true);
                        toggleDisabledButtons(index); // Daniel Refactor 5th Jan
                      }}
                      disabled={disableExButtons[index]} // Daniel Refactor 5th Jan
                    >
                      <DoneIcon
                        sx={{ fontSize: "5rem" }}
                        color={disableExButtons[index] ? "disabled" : "success"} // Daniel Refactor 5th Jan
                      />
                    </Button>
                    <Button
                      onClick={(e) => {
                        finishExercise(exercise, false);
                        toggleDisabledButtons(index); // Daniel Refactor 5th Jan
                      }}
                      disabled={disableExButtons[index]} // Daniel Refactor 5th Jan
                    >
                      <ClearIcon
                        sx={{ fontSize: "5rem" }}
                        color={disableExButtons[index] ? "disabled" : "error"} // Daniel Refactor 5th Jan
                      />
                    </Button>
                  </ButtonGroup>
                </Container>
              </Container>
              <Divider sx={{ width: "95%", pb: 2, mb: 1, mr: 3 }} />
            </>
          ))}
        </Container>
      </MainWindow>
      <ReusableModal
        title="YAY!! You completed your workout!! 🎉🎉"
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
