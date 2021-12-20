import React, { useState } from "react";
import EditButton from "../../components/buttons/Edit";
import { Container, MainWindow, SmallHeading } from "../../styled-components";
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

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

  return (
    <MainWindow>
      <EditButton />

      <Container>
        <p>{Date.now()}</p>
        <p>
          <span style={{ color: "lime" }}>Completed</span>
          <span style={{ color: "red" }}>Incomplete</span>
        </p>
        {dummyData.map((exercise, index) => (
          <Container>
            <SmallHeading>{exercise.name}</SmallHeading>
            <Container>
            <Container>

              <Container>
                <p>Sets</p>
                <p>{exercise.sets}</p>
              </Container>
              <Container>
                <p>Reps</p>
                <p>{exercise.reps}</p>
              </Container>
              <Container>
                <p>Weight</p>
                <p>{exercise.weight}</p>
              </Container>
            </Container>
            <Container>
              <IconButton>
                <DoneIcon />
              </IconButton>
              <IconButton>
                <ClearIcon />
              </IconButton>
            </Container>
            </Container>
          </Container>
        ))}
        <Container></Container>
      </Container>
    </MainWindow>
  );
};
