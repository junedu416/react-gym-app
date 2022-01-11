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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useRedirectUnauthorisedUser } from "../../config/customHooks";

export const PerformanceStats = (props) => {
  useRedirectUnauthorisedUser();
  const {store} = useGlobalState();
  const {profile} = store;
  let workouts;
  if (profile) workouts = profile.workouts;

  const [workoutIndex, setWorkoutIndex] = useState(0);
  const [labels, setLabels] = useState();
  const [data, setData] = useState();

  const colors = ["red", "blue", "yellow", "orange", "blueviolet", "brown", "darkgoldenrod", "seagreen", "powderblue", "darkgrey"];
  const options = {
    responsive: true
  }

  useEffect(() => {
    if (Object.keys(workoutList).length > 0) {
      const prevStats = workoutList[workoutIndex].exercises[0].prevWeights ?? workoutList[workoutIndex].exercises[0].prevDistances;
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
            backgroundColor: "black"
          }
        })
      }
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
        {
          (Object.keys(workoutList).length > 0)
          ?
          <>
          <select value={workoutIndex} onChange={handleChange}>
            {
              workoutList.map((workout, i) => <option value={i}>{workout.name}</option>)
            }
          </select>
          {labels && <Line options={options} data={data} style={{width: "75vw", height: "50vh"}}/>}
          </>
          :
          <p>You have no workouts.</p>
        }
      </Container>
    </MainWindow>
  );
};
