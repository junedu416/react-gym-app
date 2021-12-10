import React, { useState } from "react";
import EditButton from "../../components/buttons/Edit";
import { Container, Grid, Heading, MainWindow } from "../../styled-components";
import { ExerciseCardStyling } from "../../styled-components/exercises";
import { NavBarLink } from "../../styled-components/navbar";

export const Exercises = (props) => {
  const exerciseCategories = [
    "Callisthenics",
    "Cardio",
    "Fat Burn",
    "Free Weights",
    "Muscle Gain",
    "Tone",
  ];
  const muscleGroups = [
    "Arms",
    "Chest",
    "Core",
    "Glutes",
    "Legs",
    "Lower Back",
    "Shoulders",
    "Upper Back",
  ];

  return (
    <MainWindow>
      <Heading>Select Exercise</Heading>
      <Grid>
        {exerciseCategories.map((category) => (
          <ExerciseCardStyling>
            <NavBarLink to="/exercises">
              {category}
            </NavBarLink>
          </ExerciseCardStyling>
        ))}
      </Grid>
    </MainWindow>
  );
};
