import ViewModuleIcon from "@mui/icons-material/ViewModule";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EventIcon from "@mui/icons-material/Event";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CampaignIcon from "@mui/icons-material/Campaign";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { RegisterIcon } from "../../components/RegisterIcon";
import GroupsIcon from "@mui/icons-material/Groups";


// Dashboard components
import { Overview } from "./Overview";
import { Checkins } from "./Checkins.js";
import { PerformanceStats } from "./PerformanceStats";
import { MyEvents } from "./MyEvents";
import { MyWorkouts } from "./MyWorkouts";
import { MyProfile } from "./MyProfile";
import { Leaderboards } from "./Leaderboards";
import { Contact } from "./Contact";
import { Register } from "../login/Register";
import { SignIn } from "../login/Login";

const iconMargin = {
  marginRight: "7px",
};
export const SidebarData = [
  {
    title: [<ViewModuleIcon style={iconMargin} />, "Overview"],
    display: <Overview />,
    route: "/home/overview"
  },
  {
    title: [<QrCode2Icon style={iconMargin} />, "Checkins"],
    display: <Checkins />,
    route: "/home/checkins"
  },
  {
    title: [<InsertChartIcon style={iconMargin} />, "Performance Stats"],
    display: <PerformanceStats />,
    route: "/home/mystats"
  },
  {
    title: [<EventIcon style={iconMargin} />, "My Events"],
    display: <MyEvents />,
    route: "/events"
  },
  {
    title: [<FitnessCenterIcon style={iconMargin} />, "My Workouts"],
    display: <MyWorkouts />,
    route: "/workouts"
  },
  {
    title: [<AccountCircleIcon style={iconMargin} />, "My Profile"],
    display: <MyProfile />,
    route: "/home/myprofile"
  },
  {
    title: [<EmojiEventsIcon style={iconMargin} />, "Leaderboards"],
    display: <Leaderboards />,
    route: "/home/leaderboards"
  },
  {
    title: [<CampaignIcon style={iconMargin} />, "Reports"],
    display: <Contact />,
    route: "/home/contact"

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
    title: [<LogoutIcon style={iconMargin} />, "Sign Out"]
  },
  {
    title: [<RegisterIcon style={iconMargin} />, "Register"],
    display: <Register />,
    route: "/register"
  }
];
