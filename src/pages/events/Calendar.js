import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarView from "../../components/CalendarView";
import { Container } from "../../styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

//import { id } from "date-fns/locale";

export const Calendar = () => {
  const [eventSelect, setEventSelect] = useState("class");

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const phone = useMediaQuery(theme.breakpoints.down("sm"));
  

  const handleEventSelect = (event, newEventSelect) => {
    if (!newEventSelect) setEventSelect("class");
    else {
      setEventSelect(newEventSelect);
    }
  };

  // const applyFilterFunction = () => {
  //   // ====================================================================================================
  //   // FILTERING CODE HERE
  //   // ====================================================================================================
  // };

  return (
    <>
      <Container direction="row" w="calc(100% - 260px)" justify="space-between">
        <Container w={desktop ? "25%" : "15%"}>
          <span>&nbsp;</span>
        </Container>

        <Container w={desktop ? "50%" : "70%"}>
          <ToggleButtonGroup
            value={eventSelect}
            exclusive
            onChange={handleEventSelect}
            aria-label="calendar event display toggle selection"
            size={desktop ? "large" : "small"}
            color="warning"
            sx={{ color: "grey" }}
            style={{ backgroundColor: "lightBlue", margin: "15px" }}
          >
            <ToggleButton value="class" aria-label="class">
              Classes
            </ToggleButton>
            <ToggleButton value="competition" aria-label="competition">
              Competitions
            </ToggleButton>
            <ToggleButton
              value="personal training"
              aria-label="personal training"
            >
              Personal Training
            </ToggleButton>
            <ToggleButton value="registered events" aria-label="my events">
              My Events
            </ToggleButton>
          </ToggleButtonGroup>
        </Container>

        <Container
          direction="row"
          w={desktop ? "25%" : phone ? "100%" : "100%"}
          justify={desktop ? "flex-end" : "flex-end"}
          style={{
            position: desktop ? "" : "absolute",
            right: 0,
            bottom: desktop ? "" : 30,
          }}
        >
{/*           
          This Filter component isn't fully functional, it doesn't filter events, but all the logic with selecting and toggling
          a filter, state for if a filter is selected, and clearing all filters is working.
          <FilterEvents eventSelect={eventSelect} applyFilterFunction={applyFilterFunction} /> */}
        </Container>
{/* Responsive element to keep everything aligned/centered when shifting the filter button to bottom for phone view.
        {desktop ? null : (
          <Container w={desktop ? "25%" : "15%"}>
            <span>&nbsp;</span>
          </Container>
        )} */}
      </Container>

      <CalendarView eventCategory={eventSelect} />

      <Container></Container>
    </>
  );
};
