import React, { useState } from "react";
import EditButton from "../../components/buttons/Edit";
import { Container, MainWindow, SmallHeading, StyledModal } from "../../styled-components";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import { WorkoutText } from "../../styled-components/workouts";
import moment from "moment";
import { Box, Fade, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { modalStyling } from "../../styled-components/modal";
import Backdrop from "@mui/material/Backdrop";

export const WorkoutStart = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { 
    setOpen(false);
    navigate("/workouts");
  }

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
  const [completed, setCompleted] = useState(false);
  const totalExercises = dummyData.length - 1;

  const finishExercise = (event, isCompleted) => {
    setCounter(counter + 1);
    console.log("Completed (True/False): ", isCompleted);
    console.log("Event : ", event);

// **************************************************************************************************************

// NEED TO TARGET BOTH THE TICK AND CROSS TO BE DISABLED.. NOT SURE HOW TO DO THIS:
// THINKING TO TARGET THE STACK ELEMENT AND BASED ON IF THAT'S DISABLED, PASS THE DISABLED PROPS TO THE CHILDREN
// ELEMNTS (BUTTONS).

    // setDisableButton(true);
    const parent = event.target.parentElement.parentElement;
    parent.disabled = true;
    
    event.target.disabled = true;
    
    event.target.parentElement.disabled = true;

    console.log("disabled: ", event.target.disabled);
    
    console.log("Parent: ", event.target.parentElement.parentElement)

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
                  <Stack
                    direction="row"
                    disabled
                    // onclick={() => (Children.disabled = true)}
                  >
                    <IconButton
                      key={index + "Completed"}
                      // disabled={disableButton}
                      onClick={(e) => {
                        finishExercise(e, true);
                        // disableButton(e);
                      }}
                      // onClick={() => (finishExercise(), exerciseCompleted(true))}
                    >
                      <DoneIcon
                        sx={{ fontSize: "5rem" }}
                        color="success"
                        // color={disableButton ? "disabled" : "success"}
                      />
                    </IconButton>
                    <IconButton
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
                    </IconButton>
                  </Stack>
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

         {workoutCompleted && <Typography>YAY!! You completed your workout!! 🎉🎉</Typography>}

         </Box>
         </Fade>
      </StyledModal>
    </MainWindow>
  );
};
