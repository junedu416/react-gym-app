import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Container } from "../../styled-components";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventIcon from "@mui/icons-material/Event";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CampaignIcon from '@mui/icons-material/Campaign';

const drawerWidth = 240;

const Dashboard = () => {
  const icons = {
    0: <ViewModuleIcon />,
    1: <InsertChartIcon />,
    2: <EventIcon />,
    3: <FitnessCenterIcon />,
    4: <AccountCircleIcon />,
    5: <EmojiEventsIcon />,
  };

  const contactIcons = {
    0: <CampaignIcon />,
    1: <ChatBubbleOutlineIcon />,
  }

  return (
    <Container style={{ border: "5px solid red" }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            mt: "100px",
          }}
        >
          <Container>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                TITLE DISPLAY
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            height: `calc(100vh - 90px)`,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {/* <Toolbar />
          <Divider /> */}
          <List>
            {[
              "Overview",
              "Performance Stats",
              "My Events",
              "My Workouts",
              "My Profile",
              "Leaderboards",
            ].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Report", "Message"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {contactIcons[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* ================ Dashboard content display ================ */}

          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <Typography paragraph>Stuff goes here</Typography>
            <Typography paragraph>More Stuff</Typography>
          </Box>

      </Box>
    </Container>
  );
};

export default Dashboard;
