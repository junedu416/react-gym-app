export const workoutList = [
  {
    id: "0",
    name: "Workout A",
    exercises: [
      { name: "deadlift", sets: 1, reps: 5, weight: 100, prevDistances: [150, 180, 190], distance: null },
      { name: "bench", sets: 3, reps: 5, weight: 60, prevWeights: [50, 55, 50], distance: null },
      { name: "squat", sets: 5, reps: 5, weight: 80, prevWeights: [70,70, 75], distance: null },
    ],
  },
  {
    id: "1",
    name: "Workout B",
    exercises: [
      { name: "Exercise 1", sets: 3, reps: 10, distance: null },
      { name: "Exercise 2", sets: 3, reps: 8, distance: null },
      { name: "Exercise 3", sets: 1, reps: 5, distance: null },
    ],
  },
  {
    id: "2",
    name: "Workout C",
    exercises: [
      { name: "Row", sets: null, reps: null, distance: "500m" },
      { name: "Run", sets: null, reps: null, distance: "8km" },
      { name: "Swim", sets: null, reps: null, distance: "800m" },
    ],
  },
];
