import React from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";

// Log in
import { Landing } from "./pages/login/Landing";
import { Register } from "./pages/login/Register";
import { SignIn } from "./pages/login/Login";
import { Welcome } from "./pages/login/Welcome";

// Home
import { Home } from "./pages/home/Home";
import { Overview } from "./pages/home/Overview";
import { Checkins } from "./pages/home/Checkins.js";
import { PerformanceStats } from "./pages/home/PerformanceStats";
import { MyEvents } from "./pages/home/MyEvents";
import { MyWorkouts } from "./pages/home/MyWorkouts";
import { MyProfile } from "./pages/home/MyProfile";
import { Leaderboards } from "./pages/home/Leaderboards";
import { Contact } from "./pages/home/Contact";

// Events
import { Events } from "./pages/events/Events";
import { Event } from "./pages/events/Event";
import { NewEvent } from "./pages/events/NewEvent";
import { Classes } from "./pages/events/Classes";
import { Class } from "./pages/events/Class";
import { TrainerBookings } from "./pages/events/TrainerBookings";

// Workouts
import { Workouts } from "./pages/workouts/Workouts";
import { WorkoutStart } from "./pages/workouts/WorkoutStart";
import { NewWorkout } from "./pages/workouts/NewWorkout";
import { Exercises } from "./pages/workouts/Exercises";
import { Exercise } from "./pages/workouts/Exercise";
import { NewExercise } from "./pages/workouts/NewExercise";

// Our Team
import { MeetTheTeam } from "./pages/ourTeam/MeetTheTeam";
import { TrainerPage } from "./pages/ourTeam/TrainerPage";

// Contact
import { Reporting } from "./pages/contact/Reporting";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/workouts/start" element={<WorkoutStart />} />
        <Route path="/workouts/new" element={<NewWorkout />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercises/:id" element={<Exercise />} />
        <Route path="/exercises/new" element={<NewExercise />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<Event />} />
        <Route path="/event/new" element={<NewEvent />} />
        <Route path="/events/classes" element={<Classes />} />
        <Route path="/events/classes/:id" element={<Class />} />
        <Route path="/events/leaderboards" element={<Leaderboards />} />
        <Route path="/events/leaderboards/:id" element={<Leaderboards />} />
        <Route path="/trainerbookings" element={<TrainerBookings />} />
        <Route path="/our-team" element={<MeetTheTeam />} />
        <Route path="/our-team/:id" element={<TrainerPage />} />
        <Route path="/contact" element={<Reporting />} />
        <Route path="/home/overview" element={<Overview />} />
        <Route path="/home/checkins" element={<Checkins />} />
        <Route path="/home/mystats" element={<PerformanceStats />} />
        <Route path="/home/myevents" element={<MyEvents />} />
        <Route path="/home/myworkouts" element={<MyWorkouts />} />
        <Route path="/home/myprofile" element={<MyProfile />} />
        <Route path="/home/leaderboards" element={<Leaderboards />} />
        <Route path="/home/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
