import ViewModuleIcon from "@mui/icons-material/ViewModule";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EventIcon from "@mui/icons-material/Event";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CampaignIcon from "@mui/icons-material/Campaign";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import QrCode2Icon from "@mui/icons-material/QrCode2";

// Dashboard components
import { Overview } from "./Overview";
import { Checkins } from "./Checkins.js";
import { PerformanceStats } from "./PerformanceStats";
import { MyEvents } from "./MyEvents";
import { MyWorkouts } from "./MyWorkouts";
import { MyProfile } from "./MyProfile";
import { Leaderboards } from "./Leaderboards";
import { Contact } from "./Contact";

const iconMargin = {
  marginRight: "7px",
};
export const SidebarData = [
  {
    title: [<ViewModuleIcon style={iconMargin} />, "Overview"],
    display: <Overview />,
  },
  {
    title: [<QrCode2Icon style={iconMargin} />, "Checkins"],
    display: <Checkins />,
  },
  {
    title: [<InsertChartIcon style={iconMargin} />, "Performance Stats"],
    display: <PerformanceStats />,
  },
  {
    title: [<EventIcon style={iconMargin} />, "My Events"],
    display: <MyEvents />,
  },
  {
    title: [<FitnessCenterIcon style={iconMargin} />, "My Workouts"],
    display: <MyWorkouts />,
  },
  {
    title: [<AccountCircleIcon style={iconMargin} />, "My Profile"],
    display: <MyProfile />,
  },
  {
    title: [<EmojiEventsIcon style={iconMargin} />, "Leaderboards"],
    display: <Leaderboards />,
  },
  {
    title: [<CampaignIcon style={iconMargin} />, "Reports"],
    display: <Contact />,

    // display: {
    //     user: <Contact />,
    //     staff:  <div>
    //               <EquipmentReports />
    //               <BehaviourReports />
    //             </div>
    // },
  },
];
