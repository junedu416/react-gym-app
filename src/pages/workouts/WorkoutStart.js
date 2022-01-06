import React, { useState, useEffect } from "react";
import EditButton from "../../components/buttons/Edit";
import {
  Container,
  MainWindow,
  SmallHeading,
} from "../../styled-components";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import { WorkoutText } from "../../styled-components/workouts";
import moment from "moment";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { blueGrey } from "@mui/material/colors";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { workoutList } from "../../data/workouts-dummy";
import { ReusableModal } from "../../components/ReusableModal";

// const borderOutline = blueGrey[200];

export const WorkoutStart = (props) => {
  const navigate = useNavigate();
  const selectedWorkout = workoutList[0];
  const workoutEx = selectedWorkout.exercises;

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [counter, setCounter] = useState(0);
  const [disableExButtons, setDisableExButtons] = useState(new Array(workoutEx.length));
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
    setExerciseCompleted(prevState => [...prevState, newExerciseCompleted]);
  };  

  useEffect(() => {
    const tempDisableExButtons = [...disableExButtons];
    for(let i = 0; i < tempDisableExButtons.length; i++) {
      tempDisableExButtons[i] = false;
    }
    setDisableExButtons(tempDisableExButtons);
  }, [])

  function toggleDisabledButtons(index) {
    const tempDisableExButtons = [...disableExButtons];
    tempDisableExButtons[index] = !tempDisableExButtons[index];
    setDisableExButtons(tempDisableExButtons);
  }

  const disableGroup = (exercise) => {
    setDisabledList({...disabledList, exercise})
  };

  const finishExercise = (event, exercise, isCompleted) => {
    setCounter(counter + 1);
    exercise.completed = isCompleted
    handleExerciseCompleted(exercise)
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

  console.log("Total Exercises: ", `${totalExercises + 1}`);
  console.log("Completed Exercises: ", counter);

  return (
    <>
      <MainWindow verticalMiddle>
        <Container p="0 25px" br="20px" greyBorder shadow>
          <p style={{ alignSelf: "flex-end" }}>{moment().format("LL")}</p>
          <Container
            direction="row"
            style={{ width: "100%" }}
            justify="space-between"
          >
            <SmallHeading style={{ margin: "0" }}>Workout A</SmallHeading>
            <EditButton />
          </Container>

          <Container align="flex-end" justify="flex-end" direction="row" w="100%">
            <span style={{ color: "lime", paddingRight: "23px", alignSelf: "flex-end" }}>
              Completed
            </span>
            <span style={{ color: "red", paddingRight: "15px" }}>
              Incomplete
            </span>
          </Container>

          {list.map((exercise, index) => (
            <>
              <Container
                key={exercise.id}
                active={false}
                align="flex-start"
                pb="10px"
                style={{
                  
                  // paddingBottom: "10px",
                  // padding: "0 30px 10px 30px",
                }}
              >
                <SmallHeading
                  size="1.6rem"
                  // color="rgba(40, 40, 40, 0.8)"
                  color={disableExButtons[index] ? "grey" : "lime"}
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
                    <Container>
                      <WorkoutText mb="0">Sets</WorkoutText>
                      <WorkoutText>{exercise.sets}</WorkoutText>
                    </Container>
                    <Container>
                      <WorkoutText mb="0">Reps</WorkoutText>
                      <WorkoutText>{exercise.reps}</WorkoutText>
                    </Container>
                    <Container>
                      <WorkoutText mb="0">Weight</WorkoutText>
                      <WorkoutText>{exercise.weight}</WorkoutText>
                    </Container>
                  </Container>

                  <ButtonGroup
                    id={`group${index}`}
                    variant={btnDisabled ? "contained" : "text"}
                    disableElevation={btnDisabled}
                    // color="success"
                    aria-label="complete workout button group"
                    onClick={() => disableGroup(exercise)}
                    disabled={btnDisabled}
                    sx={{ mx: 3 }}
                  >
                    <Button
                      key={index + "Completed"}
                      // color={btnDisabled ? "success" : "primary"}
                      onClick={(e) => {
                        finishExercise(e, exercise, true)
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
