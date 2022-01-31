import React, { useState, useReducer, useCallback } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarView from "../../components/CalendarView";
import { FilterEvents } from "../../components/FilterEvents";
import { Container } from "../../styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { eventsReducer } from "../../utils/events-reducer";
// import { useLocation, useNavigate } from 'react-router-dom';

export const Calendar = (props) => {
  const { categoryParams, trainerParams, setSearchParams, staffProfiles, profile, allevents } = props;

  const [eventSelect, setEventSelect] = useState(categoryParams ? categoryParams.toLowerCase() : "class");

  const initialEventsVars = {
    events: null,
    filteredEvents: [],
  };

  const [eventsVars, dispatchEventsVars] = useReducer(
    eventsReducer,
    initialEventsVars
  );

  // console.log("TOGGLE: ", eventSelect);
  const [filterList, setFilterList] = useState([]);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  // const phone = useMediaQuery(theme.breakpoints.down("sm"));

  const [classFilters, setClassFilters] = useState([]);
  const [trainerFilters, setTrainerFilters] = useState([]);
  // const [weekdayFilters, setWeekdayFilters] = useState([]);
  // const [competitionFilters, setCompetitionFilters] = useState([])
  
  // console.log("TRAINER FILTERS ===========", trainerFilters);

  // const location = useLocation()
  // const history = useNavigate()

  // const removeQueries = (eventSelect) => {
  //   URL.search = `?category=${eventSelect}`;
  // }

  const handleEventSelect = (event, eventSelect) => {
    if (event.target.value !== eventSelect) return null;
    else {
      // removeQueries(eventSelect);
      setSearchParams(`category=${eventSelect}`);
      setEventSelect(eventSelect);
    }
  };

  // console.log("ALL EVENTS CALENDAR LEVEL============= : ", allevents);

  const resetFilters = useCallback((everyEvent) => {
    if (eventSelect) {
      // console.log("INSIDE RESET FILTER CALLBACK!!!!!!!!!!!!! ", everyEvent);
      dispatchEventsVars({
        type: "setEventsList",
        data: { category: eventSelect, profile: profile },
      });
      dispatchEventsVars({
        type: "resetEvents",
        data: { events: everyEvent, category: eventSelect },
      });
    }
    return;
  }, [eventSelect, profile]);

  return (
    <>
      <Container
        direction="row"
        w={desktop ? "calc(100vw - 220px)" : "100%"}
        justify="space-between"
      >
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
          w={desktop ? "25%" : "100%"}
          justify={desktop ? "flex-end" : "flex-end"}
          style={{
            position: desktop ? "" : "absolute",
            right: 0,
            bottom: desktop ? "" : 30,
          }}
        >
        {/* If there's trainer params, it's already showing filtered PT events for that trainer, don't need to filter events,
            hence, only show if there aren't any trainer params */}
        {trainerParams ? null : 
          <FilterEvents
            eventCategory={eventSelect}
            // applyFilterFunction={applyFilterFunction}
            filterList={filterList}
            setFilterList={setFilterList}
            setClassFilters={setClassFilters}
            trainerFilters={trainerFilters}
            setTrainerFilters={setTrainerFilters}
            // setWeekdayFilters={setWeekdayFilters}
            // setCompetitionFilters={setCompetitionFilters}
            staffProfiles={staffProfiles}
            profile={profile}
            resetFilters={resetFilters}
            allevents={allevents}
          />
        }

        </Container>
        {/* Responsive element to keep everything aligned/centered when shifting the filter button to bottom for phone view. */}
        {desktop ? null : (
          <Container w={desktop ? "25%" : "15%"}>
            <span>&nbsp;</span>
          </Container>
        )}
      </Container>

      <CalendarView
        eventCategory={eventSelect}
        trainerParams={trainerParams}
        filterList={filterList}
        setFilterList={setFilterList}
        classFilters={classFilters}
        trainerFilters={trainerFilters}
        allevents={allevents}
      />

      <Container></Container>
    </>
  );
};
