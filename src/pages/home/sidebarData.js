import ViewModuleIcon from "@mui/icons-material/ViewModule";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EventIcon from "@mui/icons-material/Event";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CampaignIcon from "@mui/icons-material/Campaign";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export const SidebarData = [
  {
    title: "Overview",
    path: "/home",
    icon: <ViewModuleIcon />,
  },
  {
    title: "Performance Stats",
    path: "/mystats",
    icon: <InsertChartIcon />,
  },
  {
    title: "My Events",
    path: "/myevents",
    icon: <EventIcon />,
  },
  {
    title: "My Workouts",
    path: "/myworkouts",
    icon: <FitnessCenterIcon />,
  },
  {
    title: "My Profile",
    path: "/myprofile",
    icon: <AccountCircleIcon />,
  },
  {
    title: "Leaderboards",
    path: "/leaderboards",
    icon: <EmojiEventsIcon />,
  },
  {
    title: "Report",
    path: "/contact",
    icon: <CampaignIcon />,
  },
];
