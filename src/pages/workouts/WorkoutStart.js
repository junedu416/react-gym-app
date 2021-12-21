import React, { useState } from "react";
import EditButton from "../../components/buttons/Edit";
import { Container, MainWindow, SmallHeading } from "../../styled-components";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import { WorkoutText } from "../../styled-components/workouts";
import moment from "moment";

export const WorkoutStart = (props) => {
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

  let [counter, setCounter] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const totalExercises = dummyData.length; 
  console.log(totalExercises);

  const finishExercise = (completed) => {
    console.log("Exercise was: ", completed);
    setDisableButton(true);
    setCounter(+1);
    isWorkoutCompleted(counter)
  };

  const isWorkoutCompleted = (counter) => {
    if (counter === totalExercises){
      setWorkoutCompleted(true);
      displayCompletedMessage()
    }
      

  }

  function displayCompletedMessage(){
    console.log("CONGRATS! You finished your workout 🎉");
    // navigate("/workouts");
  }
  

  return (
    <MainWindow>
      <Container
        style={{ padding: "0 25px", borderRadius: "20px" }}
        greyBorder
        shadow
        mt
      >
        <p style={{ alignSelf: "flex-end" }}>{moment().format("LL")}</p>
        <Container direction="row" style={{width:"100%"}} justify="space-between">
          <SmallHeading style={{ margin: "0" }}>
            Workout A
          </SmallHeading>
          <EditButton />
        </Container>

        <p style={{ alignSelf: "flex-end", margin: "0px" }}>
          <span style={{ color: "lime", paddingRight: "23px" }}>Completed</span>
          <span style={{ color: "red", paddingRight: "15px" }}>Incomplete</span>
        </p>
        {dummyData.map((exercise, index) => (
          <>
            <Container
              // key={index}
              active={false}
              style={{
                width: "100%",
                padding: "0 30px 10px 30px",
              }}
            >
              <SmallHeading
                size="1.6rem"
                color={disableButton ? "grey" : "lime"}
                style={{ margin: "20px 0 0 0", alignSelf: "flex-start" }}
              >
                {exercise.name}
              </SmallHeading>
              <Container
                direction="row"
                style={{ width: "100%" }}
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
                <Container direction="row">
                  <IconButton key={index} disabled={disableButton} onClick={ () => finishExercise(true) }>
                    <DoneIcon
                      sx={{ fontSize: "5rem" }}
                      color= { disableButton ? "warning" : "success"}
                     
                    />
                  </IconButton>
                  <IconButton onClick={ () => finishExercise(false) }>
                      
                    <ClearIcon
                      sx={{ fontSize: "5rem" }}
                      color="error"
                    />
                  </IconButton>
                </Container>
              </Container>
            </Container>
            <Divider sx={{ width: "90%" }} />
          </>
        ))}
        <Container></Container>
      </Container>
      {workoutCompleted && "YAYYY!! YOU FINISHED YOUR WORKOUT!!"}
    </MainWindow>
  );
};
