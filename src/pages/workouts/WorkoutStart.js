import React, { useState, useEffect } from "react";
import EditButton from "../../components/buttons/Edit";
import { Container, MainWindow, SmallHeading } from "../../styled-components";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import { WorkoutText } from "../../styled-components/workouts";
import moment from "moment";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { workoutList } from "../../data/workouts-dummy";
import { ReusableModal } from "../../components/ReusableModal";

export const WorkoutStart = (props) => {
  const navigate = useNavigate();
  const selectedWorkout = workoutList[0];
  const workoutEx = selectedWorkout.exercises;

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [counter, setCounter] = useState(0);
  const [disableExButtons, setDisableExButtons] = useState(
    new Array(workoutEx.length)
  );
  const [disabledList, setDisabledList] = useState([]);
  const [exerciseCompleted, setExerciseCompleted] = useState([]);
  const [list, setList] = useState(workoutEx);
  const [open, setOpen] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

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

  const disableGroup = (exercise) => {
    setDisabledList({ ...disabledList, exercise });
  };

  const finishExercise = (event, exercise, isCompleted) => {
    setCounter(counter + 1);
    exercise.completed = isCompleted;
    handleExerciseCompleted(exercise);
    isWorkoutCompleted(counter);
  };

  const isWorkoutCompleted = (counter) => {
    if (counter === totalExercises) {
      setWorkoutCompleted(true);
      handleOpen();

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
          p="0 25px"
          br="20px"
          greyBorder
          shadow
          style={{ borderRadius: "15px" }}
        >
          <p style={{ alignSelf: "flex-end", paddingTop:"10px", margin:"0" }}>
            {moment().format("LL")}
          </p>
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
            p="0 30px"
          >
            <span
              style={{
                color: "lime",
                paddingRight: "23px",
              }}
            >
              Completed
            </span>
            <span style={{ color: "red" }}>
              Incomplete
            </span>
          </Container>

          {list.map((exercise, index) => (
            <>
              <Container key={exercise.id} active={false} align="flex-start">
                <SmallHeading
                  size="1.6rem"
                  color="rgba(40, 40, 40, 0.8)"
                  // color={disableExButtons[index] ? "grey" : "lime"}
                  style={{ margin: "20px 0 0 0" }}
                >
                  {exercise.name}
                </SmallHeading>
                <Container
                  direction="row"
                  style={{ width: "100%", marginRight: "40px" }}
                  justify="space-between"
                >
                  <Container direction="row" style={{ gap: "50px" }}>
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
                    id={`group${index}`}
                    variant="text"
                    color="inherit"
                    aria-label="complete workout button group"
                    onClick={() => disableGroup(exercise)}
                    sx={{ mx: 3 }}
                  >
                    <Button
                      key={index + "Completed"}
                      onClick={(e) => {
                        finishExercise(e, exercise, true);
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
                      key={index + "Incomplete"}
                      onClick={(e) => {
                        finishExercise(e, exercise, false);
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
              <Divider sx={{ width: "90%" }} />
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
