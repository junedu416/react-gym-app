export const workoutList = [
  {
    id: "0",
    name: "Workout A",
    exercises: [
      { name: "deadlift", sets: 1, reps: 5, weight: 100, prevWeights: [80, 90, 95], distance: null },
      { name: "bench", sets: 3, reps: 5, weight: 60, prevWeights: [50, 55, 50], distance: null },
      { name: "squat", sets: 5, reps: 5, weight: 80, prevWeights: [70,70, 75], distance: null },
    ],
  },
  {
    id: "1",
    name: "Workout B",
    exercises: [
      { name: "Exercise 1", sets: 3, reps: 10, prevWeights: [100, 110, 120], distance: null },
      { name: "Exercise 2", sets: 3, reps: 8, prevWeights: [80, 90, 95], distance: null },
      { name: "Exercise 3", sets: 1, reps: 5, prevWeights: [50, 70, 60], distance: null },
    ],
  },
  {
    id: "2",
    name: "Workout C",
    exercises: [
      { name: "Row", sets: null, reps: null, prevDistances: [300, 400, 450], distance: "500m" },
      { name: "Run", sets: null, reps: null, prevDistances: [5000, 5000, 7000], distance: "8km" },
      { name: "Swim", sets: null, reps: null, prevDistances: [500, 600, 700], distance: "800m" },
    ],
  },
];
