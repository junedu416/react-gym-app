import React from "react";
import { Routes, Route } from "react-router-dom";
// import { NavBar } from "./components/NavBar";
import { Sidebar } from "./pages/home/Sidebar"

// Log in
import { Landing } from "./pages/login/Landing";
import { Register } from "./pages/login/Register";
import { SignIn } from "./pages/login/Login";
import { Welcome } from "./pages/login/Welcome";
import { ForgotPassword } from "./pages/login/ForgotPassword";

// Home
import { Home } from "./pages/home/Home";
import { Overview } from "./pages/home/Overview";
import { Checkins } from "./pages/home/Checkins.js";
import { PerformanceStats } from "./pages/home/PerformanceStats";
import { MyProfile } from "./pages/home/MyProfile";
import { Leaderboards } from "./pages/home/Leaderboards";
import { Contact } from "./pages/home/Contact";

// Events
import { Events } from "./pages/events/Events";
import { NewEvent } from "./pages/events/NewEvent";
// import { Classes } from "./pages/events/Classes";
// import { Class } from "./pages/events/Class";
import { TrainerBookings } from "./pages/events/TrainerBookings";
import { ShowEvent } from "./pages/events/ShowEvent";
import { EditEvent } from './pages/events/EditEvent';


// Workouts
import { Workouts } from "./pages/workouts/Workouts";
import { WorkoutStart } from "./pages/workouts/WorkoutStart";
import { NewWorkout } from "./pages/workouts/NewWorkout";
import { Exercises } from "./pages/workouts/Exercises";
import { Exercise } from "./pages/workouts/Exercise";
import { NewExercise } from "./pages/workouts/NewExercise";
import { EditWorkouts } from "./pages/workouts/WorkoutsEdit";

// Our Team
import { MeetTheTeam } from "./pages/ourTeam/MeetTheTeam";
import { TrainerPage } from "./pages/ourTeam/TrainerPage";

// Contact
import { Reporting } from "./pages/contact/Reporting";

// Notification
import Notification from "./components/Notification";

//Global State
import {useReducer} from "react"
import globalReducer from "./config/globalReducer";
import initialGlobalState from "./config/initialGlobalState";
import { StateContext } from "./config/globalStore";
import RememberMe from "./components/RememberMe";


const App = () => {
  const [store, dispatch] = useReducer(globalReducer, initialGlobalState)

  return (
    <>
      <StateContext.Provider value={{store, dispatch}}>
      {/*<NavBar />*/}
      <RememberMe />
      <Notification />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/workouts/start" element={<WorkoutStart />} />
        <Route path="/workouts/new" element={<NewWorkout />} />
        <Route path="/workouts/edit" element={<EditWorkouts />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercises/:id" element={<Exercise />} />
        <Route path="/exercises/new" element={<NewExercise />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/new" element={<NewEvent />} />
        <Route path="/events/:id" element={<ShowEvent />} />
        <Route path="/events/:id/edit" element={<EditEvent />} />
        {/* <Route path="/events/classes" element={<Classes />} /> */}
        {/* <Route path="/events/classes/:id" element={<Class />} /> */}
        <Route path="/events/leaderboards" element={<Leaderboards />} />
        <Route path="/events/leaderboards/:id" element={<Leaderboards />} />
        <Route path="/trainerbookings" element={<TrainerBookings />} />
        <Route path="/our-team" element={<MeetTheTeam />} />
        <Route path="/our-team/:id" element={<TrainerPage />} />
        <Route path="/contact" element={<Reporting />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/checkins" element={<Checkins />} />
        <Route path="/mystats" element={<PerformanceStats />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </StateContext.Provider>
    </>
  );
};

export default App;
