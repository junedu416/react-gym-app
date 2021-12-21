import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOutUser } from "../services/userServices";
import { RegisterIcon } from "../components/RegisterIcon";
import { Home } from "../pages/home/Home";
import { Workouts } from "../pages/workouts/Workouts";
import { Events } from "../pages/events/Events";
import { MeetTheTeam } from "../pages/ourTeam/MeetTheTeam";
import { Reporting } from "../pages/contact/Reporting";
import { MyProfile } from "../pages/home/MyProfile";
import { SignIn } from "../pages/login/Login";
import { Register } from "../pages/login/Register";
import { Landing } from "../pages/login/Landing";

const iconMargin = {
  marginRight: "7px",
};

const navFontSize = {
  fontSize: "2.5rem",
};

export const navbarData = [
  {
    
    icon: <HomeIcon  sx={ navFontSize } />,
    title: "home",
    display: <Home />,
  },
  {
    icon: <FitnessCenterIcon  sx={ navFontSize } />,
    title: "workouts",
    display: <Workouts />,
  },
  {
    icon: <EventIcon  sx={ navFontSize } />,
    title: "events",
    display: <Events />,
  },
  {
    icon: <GroupsIcon  sx={ navFontSize } />,
    title: "our-team",
    display: <MeetTheTeam />,
  },
  {
    icon: <ChatBubbleOutlineIcon  sx={ navFontSize } />,
    title: "contact",
    display: <Reporting />,
  },
  {
    icon: <AccountBoxIcon  sx={ navFontSize } />,
    title: "profile",
    display: <MyProfile />,
  },
  {
    icon: <LoginIcon  sx={ navFontSize } />,
    title: "login",
    display: <SignIn />,
  },
  {
    icon: <RegisterIcon  sx={ navFontSize } />,
    title: "register",
    display: <Register />,
  },
  {
    icon: <LogoutIcon  sx={ navFontSize } />,
    title: "logout",
    display: <Landing />,
  },
];
