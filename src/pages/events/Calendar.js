import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarView from "../../components/CalendarView";
import { FilterEvents } from "../../components/FilterEvents";
import { Container } from "../../styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { gymClasses } from "../../data/events";
// import { useLocation, useNavigate } from 'react-router-dom';

export const Calendar = (props) => {
  const { categoryParams, trainerParams, setSearchParams, staffProfiles } = props;

  const [eventSelect, setEventSelect] = useState(
    categoryParams ? categoryParams : "class"
  );

  const [filterList, setFilterList] = useState([]);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const phone = useMediaQuery(theme.breakpoints.down("sm"));

  const [classFilters, setClassFilters] = useState([]);
  const [weekdayFilters, setWeekdayFilters] = useState([]);
  const [trainerFilters, setTrainerFilters] = useState([]);
  const [competitionFilters, setCompetitionFilters] = useState([])
  
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

          <FilterEvents
            eventSelect={eventSelect}
            // applyFilterFunction={applyFilterFunction}
            filterList={filterList}
            setFilterList={setFilterList}
            setClassFilters={setClassFilters}
            setWeekdayFilters={setWeekdayFilters}
            setTrainerFilters={setTrainerFilters}
            setCompetitionFilters={setCompetitionFilters}
            staffProfiles={staffProfiles}
          />
          
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
        weekdayFilters={weekdayFilters}
        trainerFilters={trainerFilters}
        competitionFilters={competitionFilters}
      />

      <Container></Container>
    </>
  );
};
