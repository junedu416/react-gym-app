import ViewModuleIcon from "@mui/icons-material/ViewModule";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EventIcon from "@mui/icons-material/Event";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CampaignIcon from "@mui/icons-material/Campaign";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { RiLineChartLine } from "react-icons/ri";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import QrCode2Icon from '@mui/icons-material/QrCode2';

// Dashboard components
import { Overview } from "./Overview";
import { Checkins } from "./Checkins.js";
import { PerformanceStats } from "./PerformanceStats";
import { MyEvents } from "./MyEvents";
import { MyWorkouts } from "./MyWorkouts";
import { MyProfile } from "./MyProfile";
import { Leaderboards } from "./Leaderboards";
import { Contact } from "./Contact";
import { EquipmentReports } from "./Contact";
import { BehaviourReports } from "./Contact";

const iconMargin = {
  marginRight: "7px"
}
export const SidebarData = [
  {
    title: [<ViewModuleIcon style={ iconMargin } />, "Overview"],
    path: "/home",
    icon: <ViewModuleIcon />,
    display: <Overview />
  },
  {
    title: [<QrCode2Icon style={ iconMargin }  />, "Checkins"],
    path: "/home/checkins",
    icon: <QrCode2Icon />,
    display: <Checkins />
  },
  {
    title: [<InsertChartIcon style={ iconMargin }  />, "Performance Stats"],
    path: "/home/mystats",
    icon: <InsertChartIcon />,
    display: <PerformanceStats />
  },
  {
    title: [<EventIcon style={ iconMargin }  />, "My Events"],
    path: "/home/myevents",
    icon: <EventIcon />,
    display: <MyEvents />
  },
  {
    title: [<FitnessCenterIcon style={ iconMargin }  />, "My Workouts"],
    path: "/home/myworkouts",
    icon: <FitnessCenterIcon />,
    display: <MyWorkouts />
  },
  {
    title: [<AccountCircleIcon style={ iconMargin }  />, "My Profile"],
    path: "/home/myprofile",
    icon: <AccountCircleIcon />,
    display: <MyProfile />
  },
  {
    title: [<EmojiEventsIcon style={ iconMargin }  />, "Leaderboards"],
    path: "/home/leaderboards",
    icon: <EmojiEventsIcon />,
    display: <Leaderboards />
  },
  {
    title: [<CampaignIcon style={ iconMargin }  />, "Contact"],
    path: "/home/contact",
    icon: <CampaignIcon />,
    display: <Contact />
    
    // display: {   
    //     user: <Contact />,
    //     staff:  <div>
    //               <EquipmentReports />
    //               <BehaviourReports />
    //             </div>
    // },
  }
];
