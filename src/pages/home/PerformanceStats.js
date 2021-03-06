import React, { useCallback, useEffect, useState } from "react";
import { useGlobalState } from "../../config/globalStore";
import { Container, Heading } from "../../styled-components/";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { ReusableAlert } from "../../components/ReusableAlert";
import { Collapse, MenuItem, Select } from "@mui/material";

export const PerformanceStats = (props) => {
  useRedirectUnauthorisedUser();
  const {store} = useGlobalState();
  const {profile} = store;
  const workoutList = profile?.workouts;

  const [workoutIndex, setWorkoutIndex] = useState(0);
  const [labels, setLabels] = useState();
  const [data, setData] = useState();
  const [open, setOpen] = useState(true);

  
  const options = {
    responsive: true,
  };

  //get the prev exercise with the most ammount of data in its statistics to ensure no data is missing.
  const getLargestPrevWorkouts = useCallback(() => {
    let longestLength = 0;
    workoutList[workoutIndex].exercises.forEach((exercise) => {
      const prevWeightsLength = exercise.prevWeights.length;
      const prevDistancesLength = exercise.prevDistances.length;
      const longest = prevWeightsLength > prevDistancesLength ? prevWeightsLength : prevDistancesLength;
      if (longest > longestLength) {
        longestLength = longest;
      }
    })
    return longestLength;
  }, [workoutList, workoutIndex ]);

  useEffect(() => {
    if (Object.keys(workoutList).length > 0) {
      const labelsToCreate = getLargestPrevWorkouts();
      const newLabels = [];
      for (let x = 0; x < labelsToCreate; x++) {
        newLabels.push("");
      }
      console.log("newLables will be: ", newLabels);
      setLabels(newLabels);
    }
  }, [workoutIndex, workoutList, getLargestPrevWorkouts]);

  useEffect(() => {
    const colors = [
      "red",
      "blue",
      "yellow",
      "orange",
      "blueviolet",
      "brown",
      "darkgoldenrod",
      "seagreen",
      "powderblue",
      "darkgrey",
    ];

    console.log("workoutList", workoutList[workoutIndex]);
    if (Object.keys(workoutList).length > 0) {
      const newData = {
        labels,
        datasets: workoutList[workoutIndex].exercises.map((e, i) => {
          return {
            label: e.exerciseId?.name || e.customisedName,
            data:  e.prevWeights.length > 0 ? e.prevWeights : e.prevDistances,
            borderColor: colors[i],
            backgroundColor: "black",
          };
        }),
      };
      console.log("newData", newData);
      setData(newData);
    }
  }, [labels, workoutList, workoutIndex]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  function handleChange(event) {
    setWorkoutIndex(event.target.value);
  }

  return (
    <>
      <Heading>Performance Stats</Heading>
      <Container>
        {Object.keys(workoutList).length > 0 ? (
          <Container align="flex-end">
            <Select
              key={workoutIndex}
              value={workoutIndex}
              onChange={handleChange}
              sx={{ p: 1, mb: 2 }}
              style={{ height: "30px", background: "lightgrey" }}
            >
              {workoutList.map((workout, i) => (
                <MenuItem key={i} value={i}>{workout.name}</MenuItem>
              ))}
            </Select>
            {labels && (
              <Line
                options={options}
                data={data}
                style={{ width: "75vw", height: "50vh" }}
              />
            )}
          </Container>
        ) : (
          <Collapse in={open}>
            <ReusableAlert
              text="You have no workouts"
              open={open}
              btnFunction={() => {
                setOpen(false);
              }}
            />
          </Collapse>
        )}
      </Container>
    </>
  );
};
