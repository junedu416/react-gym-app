import React, { useState } from "react";
import EditButton from "../../components/buttons/Edit";
import {
  Container,
  MainWindow,
  SmallHeading,
  StyledModal,
} from "../../styled-components";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import { WorkoutText } from "../../styled-components/workouts";
import moment from "moment";
import {
  Box,
  Button,
  ButtonGroup,
  Fade,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { modalStyling } from "../../styled-components/modal";
import Backdrop from "@mui/material/Backdrop";
import { blueGrey } from "@mui/material/colors";
const borderOutline = blueGrey[200];

export const WorkoutStart = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/workouts");
  };

  const dummyData = [
    {
      name: "Bench Press",
      sets: 3,
      reps: 5,
      weight: "50kg",
      completed: false,
    },
    {
      name: "Bar Bell Row",
      sets: 5,
      reps: 5,
      weight: "40kg",
      completed: false,
    },
    {
      name: "Deadlift",
      sets: 1,
      reps: 3,
      weight: "100kg",
      completed: false,
    },
  ];

  const [counter, setCounter] = useState(0);
  // const [disableButton, setDisableButton] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const totalExercises = dummyData.length - 1;
  const [btnDisabled, setBtnDisabled] = useState(false);

  const finishExercise = (event, isCompleted) => {
    setCounter(counter + 1);
    console.log("Completed (True/False): ", isCompleted);
    console.log("Event : ", event);
    setBtnDisabled(true);

    // **************************************************************************************************************

    // NEED TO TARGET BOTH THE TICK AND CROSS TO BE DISABLED.. NOT SURE HOW TO DO THIS:
    // THINKING TO TARGET THE STACK ELEMENT AND BASED ON IF THAT'S DISABLED, PASS THE DISABLED PROPS TO THE CHILDREN
    // ELEMNTS (BUTTONS).

    // setDisableButton(true);
    const targetElement = event.target;
    const parent = event.target.parentElement;
    const grandparent = event.target.parentElement.parentElement;
    const thirdParent = event.target.parentElement.parentElement.parentElement;

    const parentNode = event.currentTarget.parentNode;
    const grandParentNode = parentNode.parentNode;

    parentNode.disabled = true;
    console.log("PARENTNODE: ", parentNode)
    console.log("GrandparentNODE: ", grandParentNode)


    console.log("key: ", parent[0]);

    // targetElement.disabled = true;
    // parent.disabled = true;
    // grandparent.disabled = true;
    // thirdParent.disabled = true;

    console.log("Disabled: ", event.target.disabled);
    console.log("Target: ", targetElement);

    console.log("Parent: ", parent);
    console.log("Grandparent: ", grandparent);
    console.log("3rd Parent: ", thirdParent);

    event.target.parentElement.parentElement.disabled = true;

    // **************************************************************************************************************

    isWorkoutCompleted(counter);
  };

  const isWorkoutCompleted = (counter) => {
    if (counter === totalExercises) {
      setWorkoutCompleted(true);
      handleOpen();
      displayCompletedMessage();

      // ================================ ADD LOGIC TO SEND TO BACKEND ==========================
      // sendData();
      // navigate("/workouts");

      // =========================================================================================
    }
  };

  const disableButtons = (event) => {
    console.log("disable event: ", event);
    event.target.disabled = true;
  };

  function displayCompletedMessage() {
    console.log("CONGRATS! You finished your workout 🎉");
    // navigate("/workouts");
  }

  // const disableButton = (event) => {
  //   event.target.disabled = true;
  // };

  console.log("Total Exercises: ", totalExercises);
  console.log("Completed Exercises: ", counter);

  return (
    <MainWindow>
      <Container
        style={{ padding: "0 25px", borderRadius: "20px" }}
        greyBorder
        shadow
        mt
      >
        <p style={{ alignSelf: "flex-end" }}>{moment().format("LL")}</p>
        <Container
          direction="row"
          style={{ width: "100%" }}
          justify="space-between"
        >
          <SmallHeading style={{ margin: "0" }}>Workout A</SmallHeading>
          <EditButton />
        </Container>

        <p style={{ alignSelf: "flex-end", margin: "0px" }}>
          <span style={{ color: "lime", paddingRight: "23px" }}>Completed</span>
          <span style={{ color: "red", paddingRight: "15px" }}>Incomplete</span>
        </p>
        {dummyData.map((exercise, index) => (
          <>
            <Container
              key={exercise}
              active={false}
              align="flex-start"
              style={{
                width: "100%",
                paddingBottom: "10px",
                // padding: "0 30px 10px 30px",
              }}
            >
              <SmallHeading
                size="1.6rem"
                color="rgba(40, 40, 40, 0.8)"
                // color={disableButton ? "grey" : "lime"}
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

                {/* <Container direction="row"> */}
                <ButtonGroup
                  key={index}
                  variant="text"
                  color="success"
                  aria-label="complete workout button group"
                  onclick={(e) => disableButtons(e)}
                  // disabled
                >
                  <Button
                    key={index + "Completed"}
                    // disabled={ btnDisabled ? true : false }
                    // disabled={disableButton}
                    // disabled={props.disabled}

                    onClick={(e) => {
                      finishExercise(e, true);
                      // disableButton(e);
                    }}
                  >
                    <DoneIcon
                      sx={{ fontSize: "5rem" }}
                      color="success"
                      // color={ btnDisabled ? "disabled" : "success"}
                    />
                  </Button>
                  <Button
                    key={index + "Incomplete"}
                    // disabled={disableButton}
                    onClick={(e) => finishExercise(e, false)}
                    // onClick={() => (finishExercise(), exerciseCompleted(false))}
                  >
                    <ClearIcon
                      sx={{ fontSize: "5rem" }}
                      color="error"
                      // color={disableButton ? "disabled" : "error"}
                    />
                  </Button>
                </ButtonGroup>

                {/* </Container> */}
              </Container>
            </Container>
            <Divider sx={{ width: "90%" }} />
          </>
        ))}
      </Container>
      <StyledModal
        aria-labelledby="booking-confirmation"
        aria-describedby="booking-confirmation"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 600,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyling}>
            {workoutCompleted && (
              <Typography>YAY!! You completed your workout!! 🎉🎉</Typography>
            )}
          </Box>
        </Fade>
      </StyledModal>
    </MainWindow>
  );
};
