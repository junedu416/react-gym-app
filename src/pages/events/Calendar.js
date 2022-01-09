import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarView from "../../components/CalendarView";
import { Container } from "../../styled-components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Chip from "@mui/material/Chip";
import { FilterBox, FilterItem } from "../../styled-components/events";
import { gymClasses, trainers, weekdays } from "../../data/events";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FilterHeading } from "../../components/FilterHeading";
import BasicButton from "../../components/buttons/BasicButton";
// import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from "@mui/icons-material/Cancel";

// const ListItem = styled('li')(({ theme }) => ({
//   margin: theme.spacing(2),
// }));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

// CUSTOM STYLING FOR MATERIAL UI ACCORDION COMPONENT
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1.3rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    color: "#0288d1",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(0.9),
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    color: "#0288d1",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export const Calendar = () => {
  const [eventSelect, setEventSelect] = useState("class");
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([]);

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const classFilters = [
    { key: 0, label: "Class" },
    { key: 1, label: "Day" },
    { key: 2, label: "Trainer" },
    { key: 3, label: "Full Capacity" },
  ];

  const trainerFilters = [
    { key: 0, label: "Trainer" },
    { key: 1, label: "Day" },
  ];

  const competitionFilters = [
    { key: 0, label: "Cardio" },
    { key: 1, label: "Cycling" },
    { key: 2, label: "Lifting" },
    { key: 3, label: "Rowing" },
    { key: 4, label: "Running" },
    { key: 5, label: "Weight Loss" },
  ];

  const eventSelection = () => {
    if (eventSelect === "class") return classFilters;
    if (eventSelect === "competition") return competitionFilters;
    if (eventSelect === "personal training") return trainerFilters;
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleEventSelect = (event, newEventSelect) => {
    if (!newEventSelect) setEventSelect("class");
    else {
      setEventSelect(newEventSelect);
    }
  };

  // useEffect(() => {
  //   for (let i = 0; i < filters.length; i++) {
  //     filters[i] = false;
  //   }
  //   setFilters(filters);
  // }, []);

  return (
    <>
      <Container direction="row" w="100%" justify="space-between">
        <Container direction="row" w="35%" justify="flex-start">
          <ClickAwayListener onClickAway={handleClickAway}>
            <Container pl="20px" style={{ position: "relative" }}>
              <Container direction="row" ml="70px" mr="20px">
                <Button variant="outlined" onClick={handleClick} sx={{ pl: 1 }}>
                  <FilterAltIcon sx={{ mr: "5px" }} />
                  Filters
                </Button>
              </Container>
              {open ? (
                <FilterBox>
                { eventSelect === "competition" ? (
                  <Accordion
                    expanded
                    onChange={handleChange("panel3")}
                    sx={{ borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px"}}
                  >
                    <AccordionSummary>
                      <Typography fontWeight="bold">Comp. Category</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 1 }}>
                      {competitionFilters.map((category, index) => {
                        return (
                          <FilterItem key={category.label}>
                            <Typography>{category.label}</Typography>
                            <DoneIcon color="success" />
                          </FilterItem>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>) :
 (              <>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                    sx={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px"}}
                  >
                    <AccordionSummary>
                      <Typography fontWeight="bold">Day</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 1 }}>
                      {weekdays.map((day) => {
                        return (
                          <FilterItem key={day.label}>
                            <Typography>{day.label}</Typography>
                            <DoneIcon color="success" />
                          </FilterItem>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>

                  { eventSelect === "class" && (
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary>
                      <Typography fontWeight="bold">Class</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 1 }}>
                      {gymClasses.map((groupClass, index) => {
                        return (
                          <FilterItem key={index}>
                            <Typography>{groupClass.name}</Typography>
                            <DoneIcon color="success" />
                          </FilterItem>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                  
                  )}

                  <Accordion
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                    sx={{ borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px"}}
                  >
                    <AccordionSummary>
                      <Typography fontWeight="bold">Trainer</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 1 }}>
                      {trainers.map((trainer) => {
                        return (
                          <FilterItem key={trainer.name}>
                            <Typography>{trainer.name}</Typography>
                            <DoneIcon color="success" />
                          </FilterItem>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>

  
                  </>
                )}
                </FilterBox>
              ) : null}
            </Container>
          </ClickAwayListener>

          {
            <BasicButton
              text="Clear Filters"
              endIcon={<CancelIcon sx={{ color: "rgba(40, 40, 40, 0.7)" }} />}
              size="small"
              variant="outlined"
              sx={{
                p: 0,
                m: 0,
                backgroundColor: "rgba(180,180,180, 0.8)",
                border: "none",
                color: "rgba(40, 40, 40, 0.7)",
                "&:hover": {
                  backgroundColor: "rgb(150, 150, 150)",
                  border: "none",
                },
              }}
              style={{ height: "37px" }}

              // ADD FUNCTION HERE!!!!!!!!!
              btnFunction={{   }}
            />
          }
        </Container>

        <Container w="30%">
          <ToggleButtonGroup
            value={eventSelect}
            exclusive
            onChange={handleEventSelect}
            aria-label="calendar event display toggle selection"
            size="medium"
            color="warning"
            style={{ backgroundColor: "lightBlue", margin: "15px" }}
          >
            <ToggleButton
              value="class"
              aria-label="class"
              sx={{ color: "grey" }}
            >
              Classes
            </ToggleButton>
            <ToggleButton
              value="competition"
              aria-label="competition"
              sx={{ color: "grey" }}
            >
              Competitions
            </ToggleButton>
            <ToggleButton
              value="personal training"
              aria-label="personal training"
              sx={{ color: "grey" }}
            >
              Personal Training
            </ToggleButton>
          </ToggleButtonGroup>
        </Container>
        <Container w="35%">
          <span></span>
        </Container>
      </Container>
      <CalendarView eventCategory={eventSelect} />
    </>
  );
};
