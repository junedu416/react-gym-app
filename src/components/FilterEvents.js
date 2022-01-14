import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  gymClasses,
  trainers,
  weekdays,
  competitionFilters,
//   allFilters,
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
import { ClearButtonFade, FilterBox, FilterItem } from "../styled-components/events";

// import { Translate } from "@mui/icons-material";
// import CloseIcon from '@mui/icons-material/Close';

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
  const { eventSelect, applyFilterFunction } = props;

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState("panel1");

  // const [filters, setFilters] = useState(() => []);

  const [filterList, setFilterList] = useState([]);
  const hasFilters = Boolean(filterList.length > 0);

  const handleFilterSelect = (filter) => {
    const isSelected = filterList.includes(filter);

    // If the option has already been selected, removes it from the array.
    // Otherwise, adds it to the filterList array.
    const newSelection = isSelected
      ? filterList.filter((item) => item !== filter)
      : [...filterList, filter];
    setFilterList(newSelection);
  };

  // function toggleFilters(id) {
  //   const tempFilterList = [...filterList];
  //   tempFilterList[id] = !tempFilterList[id];
  //   setFilterList(tempFilterList);
  // }

  // Clears all filters onload
  useEffect(() => {
    const tempFilterList = [...filterList];
    for (let i = 0; i < tempFilterList.length; i++) {
      tempFilterList[i] = false;
    }
    setFilterList(tempFilterList);
  }, []);

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
  };

  const fadeInAnimation = {
    animation: "fadeInAnimation 1000ms ease-in"
  };
  const fadeOutAnimation = {
    animation: "fadeOutAnimation 1000ms ease-in-out"
  };

  return (
    <>
      {hasFilters ? (
       <ClearButtonFade style={ hasFilters ? fadeInAnimation : fadeOutAnimation }>
        <BasicButton
          text="Clear Filters"
          endIcon={<CancelIcon sx={{ color: "rgba(40, 40, 40, 0.7)" }} />}
          size="small"
          variant="outlined"
          sx={{
            p: 0,
            m: "0 20px",
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
      ) :
      ( <Container w="200px">
          <span>&nbsp;</span>
      </Container>

      )
      }

      <ClickAwayListener onClickAway={handleClickAway}>
        <Container pl="20px" style={{ position: "relative" }}>
          <Container direction="row" ml="0px" mr="20px">
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
                    <Typography fontWeight="bold">Comp. Category</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 1 }}>
                    {competitionFilters.map((category, index) => {
                      return (
                        <FilterItem
                          key={category.label}
                          onClick={() => {
                            handleFilterSelect(category.label);
                          }}
                        >
                          <Typography>{category.label}</Typography>
                          {filterList.includes(category.label) && (
                            <DoneIcon color="success" />
                          )}
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
                    sx={
                      {
                        // borderTopLeftRadius: "8px",
                        // borderTopRightRadius: "8px",
                      }
                    }
                  >
                    <AccordionSummary>
                      <Typography fontWeight="bold">Day</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 1 }}>
                      {weekdays.map((day) => {
                        return (
                          <FilterItem
                            key={day.label}
                            onClick={() => {
                              handleFilterSelect(day.label);
                            }}
                          >
                            <Typography>{day.label}</Typography>
                            {filterList.includes(day.label) && (
                              <DoneIcon color="success" />
                            )}
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
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                  >
                    <AccordionSummary>
                      <Typography fontWeight="bold">Instructor</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 1 }}>
                      {trainers.map((instructor) => {
                        return (
                          <FilterItem
                            key={instructor.name}
                            onClick={() => handleFilterSelect(instructor.name)}
                          >
                            <Typography>{instructor.name}</Typography>
                            {filterList.includes(instructor.name) && (
                              <DoneIcon color="success" />
                            )}
                          </FilterItem>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
              <Container
                style={{
                  backgroundColor: "white",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              >
                {hasFilters && (
                <ClearButtonFade applyButton={true} style={ hasFilters ? fadeInAnimation : fadeOutAnimation }>
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