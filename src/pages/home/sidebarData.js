import ViewModuleIcon from "@mui/icons-material/ViewModule";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EventIcon from "@mui/icons-material/Event";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CampaignIcon from "@mui/icons-material/Campaign";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { RegisterIcon } from "../../components/RegisterIcon";
import GroupsIcon from "@mui/icons-material/Groups";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


// Dashboard components
import { Overview } from "./Overview";
import { Checkins } from "./Checkins.js";
import { PerformanceStats } from "./PerformanceStats";
import { MyProfile } from "./MyProfile";
import { Leaderboards } from "./Leaderboards";
import { Reporting } from "../contact/Reporting";
import { Register } from "../login/Register";
import { SignIn } from "../login/Login";
import { Landing } from "../login/Landing";
import { Events } from "../events/Events";
import { Workouts } from "../workouts/Workouts";

const iconMargin = {
  marginRight: "7px",
};
export const SidebarData = [
  {
    title: [<ViewModuleIcon style={iconMargin} />, "Overview"],
    display: <Overview />,
    route: "/overview"
  },
  {
    title: [<QrCode2Icon style={iconMargin} />, "Check-ins"],
    display: <Checkins />,
    route: "/checkins"
  },
  {
    title: [<InsertChartIcon style={iconMargin} />, "Performance Stats"],
    display: <PerformanceStats />,
    route: "/mystats"
  },
  {
    title: [<EventIcon style={iconMargin} />, "Events"],
    display: <Events />,
    route: "/events"
  },
  {
    title: [<FitnessCenterIcon style={iconMargin} />, "Workouts"],
    display: <Workouts />,
    route: "/workouts"
  },
  {
    title: [<AccountCircleIcon style={iconMargin} />, "Profile"],
    display: <MyProfile />,
    route: "/myprofile"
  },
  {
    title: [<EmojiEventsIcon style={iconMargin} />, "Leaderboards"],
    display: <Leaderboards />,
    route: "/leaderboards"
  },
  {
    title: [<CampaignIcon style={iconMargin} />, "Reports"],
    display: <Reporting />,
    route: "/contact"

    // display: {
    //     user: <Contact />,
    //     staff:  <div>
    //               <EquipmentReports />
    //               <BehaviourReports />
    //             </div>
    // },
  },
  {
    title: [<GroupsIcon style={iconMargin} />, "Our Team"],
    route: "/our-team"    
  },
  {
    title: [<LoginIcon style={iconMargin} />, "Sign In"],
    display: <SignIn />,
    route: "/auth/login"
  },
  {
    title: [<LogoutIcon style={iconMargin} />, "Sign Out"],
    display: <Landing />,
    route: "/"
  },
  {
    title: [<AppRegistrationIcon style={iconMargin} />, "Register"],
    display: <Register />,  
    route: "/register"
  }
];
