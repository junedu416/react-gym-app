import React, { useState, useEffect, useReducer } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarView from "../../components/CalendarView";
import { Container } from "../../styled-components";

import { FilterEvents } from "../../components/FilterEvents";

import { id } from "date-fns/locale";

export const Calendar = (props) => {
  const [eventSelect, setEventSelect] = useState("class");
  const { desktop, phone } = props;

  const handleEventSelect = (event, newEventSelect) => {
    if (!newEventSelect) setEventSelect("class");
    else {
      setEventSelect(newEventSelect);
    }
  };

  const applyFilterFunction = () => {
    // ====================================================================================================
    // FILTERING CODE HERE
    // ====================================================================================================
  };

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
// ========================== NEED TO ADJUST LINE BELOW FOR PHONE MEDIA QUERY ==========================
          w={desktop ? "25%" : phone ? "100%" : "100%"}
          justify={desktop ? "flex-start" : "flex-end"}
          style={{
            position: desktop ? "" : "absolute",
            right: 0,
            bottom: desktop ? "" : 30, // switch around when pass desktop prop in. ***********************
          }}
        >
          <FilterEvents eventSelect={eventSelect} applyFilterFunction={applyFilterFunction} />
        </Container>

        {/* ================ NEED TO CHANGE THIS WHEN HAVE PHONE MEDIA QUERY DONE ============== */}
        {desktop ? null : (
          <Container w={desktop ? "25%" : "15%"}>
            <span>&nbsp;</span>
          </Container>
        )}
      </Container>

      <CalendarView eventCategory={eventSelect} />

      <Container></Container>
    </>
  );
};
