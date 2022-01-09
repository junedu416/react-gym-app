import React, { useState, useEffect, useReducer } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarView from "../../components/CalendarView";
import { Container } from "../../styled-components";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// import Chip from "@mui/material/Chip";
import { FilterBox, FilterItem } from "../../styled-components/events";
import { gymClasses, trainers, weekdays, competitionFilters, allFilters } from "../../data/events";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import BasicButton from "../../components/buttons/BasicButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import { id } from "date-fns/locale";
// import CloseIcon from '@mui/icons-material/Close';
// import { FilterHeading } from "../../components/FilterHeading";

// const ListItem = styled('li')(({ theme }) => ({
//   margin: theme.spacing(2),
// }));

const ACTIONS = {
  ADD_FILTER: 'add-filter',
  REMOVE_FILTER: 'remove-filter',
  TOGGLE_FILTER: 'toggle-filter',
}

// function reducer(state, action) {
//   switch (action.type) {
//     case 'addFilter':
//       return [...filterList, state.payload]
//     case 'removeFilter':
//       return filterList.filter(filter => filter.id !== state.payload.id)
//     case 'toggle':
//       return allFilters.map(filter => {
//         if (filter.id === action.payload.id) {
//           return { ...allFilters, filter: !filter.selected }
//         }
//         return filter
//       })
//     case 'reset':
//       return []
//     default:
//       return state
//   }
// }

function reducer(filterList, action) {
  switch (action.type) {
    case ACTIONS.ADD_FILTER: 
      // return [...filterList, newFilter(action.payload.label)]
    case ACTIONS.TOGGLE_FILTER:
      return [];
    case ACTIONS.REMOVE_FILTER:
      return allFilters.filter(item => item.id !== action.payload.id)
    default: 
      return filterList
  }
}

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
  const [expanded, setExpanded] = useState("panel1");

  
  const [filter, setFilter] = useState("");

  

  const [filterList, dispatch] = useReducer(reducer, []);

  function newFilter(name) {
    return allFilters.filter(item => item.label === name) 
  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
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
  }

  function handleFilterSelect(e) {
    dispatch({ type: ACTIONS.ADD_FILTER, payload: { name: filter } })
    
  }

  // function toggleFilter(id) {
  //   return allFilters.filter(item => {
  //     if(item.id === action.payload.id) {
  //       item.filter = !item.filter
  //     }
  //   }
  // }

  // useEffect(() => {
  //   for (let i = 0; i < filters.length; i++) {
  //     filters[i] = false;
  //   }
  //   setFilters(filters);
  // }, []);


  // function selectFilter(key) {
  //   const tempFilterList = [...filterList];
  //   tempFilterList[key] = !tempFilterList[key];
  //   setFilterList(tempFilterList);
  // }

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
                  {eventSelect === "competition" ? (
                    <Accordion
                      expanded
                      onChange={handleChange("panel3")}
                      sx={{
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      <AccordionSummary>
                        <Typography fontWeight="bold">
                          Comp. Category
                        </Typography>
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
                    </Accordion>
                  ) : (
                    <>
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                        sx={{
                          borderTopLeftRadius: "8px",
                          borderTopRightRadius: "8px",
                        }}
                      >
                        <AccordionSummary>
                          <Typography fontWeight="bold">Day</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 1 }}>
                          {weekdays.map((day) => {
                            return (
                              <FilterItem key={day.label} onClick={ () => {} }>
                                <Typography>{day.label}</Typography>
                                <DoneIcon color="success" />
                              </FilterItem>
                            );
                          })}
                        </AccordionDetails>
                      </Accordion>

                      {eventSelect === "class" && (
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
                                <FilterItem key={groupClass.name} onClick={ {}}>
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
                        sx={{
                          borderBottomLeftRadius: "8px",
                          borderBottomRightRadius: "8px",
                        }}
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
              btnFunction={{}}
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
  )
}
