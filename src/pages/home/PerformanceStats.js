import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../config/globalStore";
import { Container, Heading, MainWindow } from "../../styled-components/";
import { workoutList } from "../../data/workouts-dummy";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ReusableAlert } from "../../components/ReusableAlert";
import { Collapse, MenuItem, Select } from "@mui/material";

export const PerformanceStats = (props) => {
  const { store } = useGlobalState();
  const { profile } = store;
  let workouts;
  if (profile) workouts = profile.workouts;

  const [workoutIndex, setWorkoutIndex] = useState(0);
  const [labels, setLabels] = useState();
  const [data, setData] = useState();
  const [open, setOpen] = useState(true);

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
  const options = {
    responsive: true,
  };

  useEffect(() => {
    if (Object.keys(workoutList).length > 0) {
      const prevStats =
        workoutList[workoutIndex].exercises[0].prevWeights ??
        workoutList[workoutIndex].exercises[0].prevDistances;
      const newLabels = prevStats.map(() => "");
      setLabels(newLabels);
    }
  }, [workoutIndex]);

  useEffect(() => {
    if (Object.keys(workoutList).length > 0) {
      const newData = {
        labels,
        datasets: workoutList[workoutIndex].exercises.map((e, i) => {
          return {
            label: e.name,
            data: e.prevWeights ?? e.prevDistances,
            borderColor: colors[i],
            backgroundColor: "black",
          };
        }),
      };
      setData(newData);
    }
  }, [labels]);

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
    <MainWindow>
      <Heading>Performance Stats</Heading>
      <Container>
        {Object.keys(workoutList).length > 0 ? (
          <Container align="flex-end">
            <Select
              value={workoutIndex}
              onChange={handleChange}
              sx={{ p: 1, mb: 2 }}
              style={{ height: "30px", background: "lightgrey" }}
            >
              {workoutList.map((workout, i) => (
                <MenuItem value={i}>{workout.name}</MenuItem>
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
    </MainWindow>
  );
};
