// THIS COMPONENT IS NOT USED IN PRODUCTION,
// THE COMPONENT IS COMMENTED OUT, NOT FULLY FUNCTIONAL AS IT ISN'T FILTERING ANY EVENTS.

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { gymClasses, 
  // weekdays, 
  // competitionFilters 
} from "../data/events";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import { Container } from "../styled-components";
import BasicButton from "./buttons/BasicButton";
import {
  ClearButtonFade,
  FilterBox,
  FilterItem,
} from "../styled-components/events";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import { eventsReducer } from "../utils/events-reducer";

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

// CUSTOM STYLING FOR MATERIAL UI ACCORDION COMPONENT: rotation for arrow icon and text color when expanded
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

export const FilterEvents = (props) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const phone = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    eventCategory,
    filterList,
    setFilterList,
    setClassFilters,
    setTrainerFilters,
    // trainerFilters,
    // setWeekdayFilters,
    // setCompetitionFilters,
    staffProfiles,
    // profile,
    resetFilters,
    allevents,
  } = props;

  // const [disabled, setDisabled] = useState(false);

  // const initialEventsVars = {
  //   events: null,
  //   filteredEvents: [],
  // };
  // const [eventsVars, dispatchEventsVars] = useReducer(
  //   eventsReducer,
  //   initialEventsVars
  // );

  const trainers = staffProfiles.map((profile) => {
    return {
      fullname: `${profile.firstName} ${profile.lastName}`,
      id: profile._id,
    };
  });

  //  console.log("TRAINERS==================== ", trainers);

  const hasFilters = Boolean(filterList.length > 0);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState("panel1");

  const applyFilterFunction = () => {
    console.log("FILTER LIST IS: ", filterList);
    console.log("ALL TRAINER FULLNAME AND ID: ", trainers);
    console.log(
      "MATCH: ",
      filterList.filter((item) =>
        trainers.map((trainer) => trainer.fullname === item)
      )
    );
    // console.log("FIRST TRAINER FULLNAME: ", trainers[8].fullname);

    const classSelection = gymClasses
      .map((item) => filterList.filter((gymClass) => gymClass === item.name))
      .flat();
  
    const trainerSelection = filterList
      .map((selection) => {
        return trainers.filter((trainer) => selection === trainer.fullname);
      })
      .flat();

    // const weekdaySelection = weekdays
    //   .map((item) => filterList.filter((selection) => selection === item.label))
    //   .flat();

    // const competitionSelection = competitionFilters.map((competitionCategory) =>
    //   filterList.filter((selection) => selection === competitionCategory.label)
    // );

    console.log("classes selection: ", classSelection.flat());
    console.log("trainer selection: ", trainerSelection.flat());
    // console.log("weekday selection: ", weekdaySelection.flat());
    // console.log("competition selection: ", competitionSelection.flat());

    if (classSelection.flat().length > 0) {
      setClassFilters(classSelection.flat());
    }
    // if (weekdaySelection.flat().length > 0) {
    //   setWeekdayFilters(weekdaySelection.flat());
    // }
    if (trainerSelection.length > 0) {
      // console.log("TRAINER FILTER SELECTED HERE!:  ", trainerSelection);
      setTrainerFilters(trainerSelection);
    }
    // if (
    //   eventCategory === "competition" &&
    //   competitionSelection.flat().length > 0
    // ) {
    //   setCompetitionFilters(competitionSelection.flat());
    // }
  };

  const handleFilterSelect = (filter) => {
    const isSelected = filterList.includes(filter);

    // If the option has already been selected, removes it from the array.
    // Otherwise, adds it to the filterList array.
    const newSelection = isSelected
      ? filterList.filter((item) => item !== filter)
      : [...filterList, filter];
    setFilterList(newSelection);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const clearFilters = () => {
    setFilterList([]);
    setClassFilters([]);
    setTrainerFilters([]);
    // setWeekdayFilters([]);
    // setCompetitionFilters([]);

    // console.log("ALLEVENTS AT CLEAR FILTER BUTTON: ############# ", allevents);
    resetFilters(allevents);
  };

  const fadeInAnimation = {
    animation: "fadeInAnimation 1000ms ease-in",
  };
  const fadeOutAnimation = {
    animation: "fadeOutAnimation 1000ms ease-in-out",
  };

  return (
    <>
      {hasFilters ? (
        <ClearButtonFade
          style={hasFilters ? fadeInAnimation : fadeOutAnimation}
        >
          <BasicButton
            m="0px"
            text="Clear Filters"
            endIcon={<CancelIcon sx={{ color: "rgba(40, 40, 40, 0.7)" }} />}
            size="small"
            variant="outlined"
            sx={{
              p: 0,
              backgroundColor: "rgba(180,180,180, 0.8)",
              border: "none",
              color: "rgba(40, 40, 40, 0.7)",
              "&:hover": {
                backgroundColor: "rgb(150, 150, 150)",
                border: "none",
              },
            }}
            style={{ height: "37px", transition: "all ease-in 0.7s" }}
            btnFunction={clearFilters}
          />
        </ClearButtonFade>
      ) : (
        <Container w="200px">
          <span>&nbsp;</span>
        </Container>
      )}

      <ClickAwayListener onClickAway={handleClickAway}>
        <Container pl="10px" style={{ position: "relative" }}>
          <Container direction="row" ml="0px" mr="20px">
            <Button
              variant="outlined"
              onClick={handleClick}
              sx={{ pl: 1 }}
              disabled={eventCategory === "competition" || eventCategory === "registered events" ? true : false}
            >
              <FilterAltIcon sx={{ mr: "5px" }} />
              Filters
            </Button>
          </Container>

          {open ? (
            <FilterBox desktop={desktop} phone={phone}>
              {eventCategory === "class" && (
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary>
                    <Typography fontWeight="bold">Class</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 1 }}>
                    {gymClasses.map((groupClass) => {
                      return (
                        <FilterItem
                          key={groupClass.name}
                          onClick={() => {
                            handleFilterSelect(groupClass.name);
                          }}
                        >
                          <Typography>{groupClass.name}</Typography>
                          {filterList.includes(groupClass.name) && (
                            <DoneIcon color="success" />
                          )}
                        </FilterItem>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              )}

              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary>
                  <Typography fontWeight="bold">Instructor</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 1 }}>
                  {trainers.map((instructor) => {
                    return (
                      <FilterItem
                        key={instructor.fullname}
                        onClick={() => {
                          // customAction(instructor)
                          console.log("HI TRAINER:", instructor);
                          handleFilterSelect(instructor.fullname);
                        }}
                      >
                        <Typography>{instructor.fullname}</Typography>
                        {filterList.includes(instructor.fullname) && (
                          <DoneIcon color="success" />
                        )}
                      </FilterItem>
                    );
                  })}
                </AccordionDetails>
              </Accordion>

              <Container
                style={{
                  backgroundColor: "white",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              >
                {hasFilters && (
                  <ClearButtonFade
                    applyButton={true}
                    style={hasFilters ? fadeInAnimation : fadeOutAnimation}
                  >
                    <BasicButton
                      text="Apply"
                      size="small"
                      sx={{ m: "10px auto" }}
                      style={{ height: "40px" }}
                      btnFunction={applyFilterFunction}
                    />
                  </ClearButtonFade>
                )}
              </Container>
            </FilterBox>
          ) : null}
        </Container>
      </ClickAwayListener>
    </>
  );
};
