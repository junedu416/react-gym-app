import React from "react";
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

export const PerformanceStats = (props) => {
  const {store} = useGlobalState();
  const {profile} = store;
  let workouts;
  if (profile) workouts = profile.workouts;
  const dummyWorkout = workoutList[0];
  console.log(dummyWorkout);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true
  }

  const colors = ["red", "blue", "yellow", "orange", "black"]

  const prevStats = dummyWorkout.exercises[0].prevWeights ?? dummyWorkout.exercises[0].prevDistances;
  const labels = prevStats.map(() => "");
   
  const data = {
    labels,
    datasets: dummyWorkout.exercises.map((e, i) => {
      return {
        label: e.name,
        data: e.prevWeights ?? e.prevDistances,
        borderColor: colors[i],
        backgroundColor: "black"
      }
    })
  }

    
  return (
    <MainWindow>
      <Heading>Performance Stats</Heading>
      <Container>
        <Line options={options} data={data} style={{width: "75vw", height: "50vh"}}/>
      </Container>
    </MainWindow>
  );
};
