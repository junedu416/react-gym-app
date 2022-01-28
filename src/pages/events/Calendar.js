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
  const { categoryParams, trainerParams, setSearchParams } = props;

  const [eventSelect, setEventSelect] = useState(
    categoryParams ? categoryParams : "class"
  );

  const [filterList, setFilterList] = useState([]);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const phone = useMediaQuery(theme.breakpoints.down("sm"));

  const [classFilters, setClassFilters] = useState([]);

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

  // const applyFilterFunction = (filterList) => {
  //   //   // ====================================================================================================
  //   //   // FILTERING CODE HERE
  //   //   // ====================================================================================================

  //   // This is updating whenever a selection is made, but button isn't clicked.....

  //   console.log("APPLYING FILTERS: filterlist is ", filterList);
  //   const classesSelected = filterList.filter((gymClass) => gymClasses.map(item => gymClass === item.name))
  //   console.log("classes selected: ", classesSelected);

  //   setClassFilters(classesSelected);
  // };

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
          {/* This Filter component isn't fully functional, it doesn't filter events, but all the logic with selecting and toggling
          a filter, state for if a filter is selected, and clearing all filters is working. */}
          <FilterEvents
            eventSelect={eventSelect}
            // applyFilterFunction={applyFilterFunction}
            filterList={filterList}
            setFilterList={setFilterList}
            setClassFilters={setClassFilters}
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
        classFilters={classFilters}
        setClassFilters={setClassFilters}
        filterList={filterList}
        setFilterList={setFilterList}
      />

      <Container></Container>
    </>
  );
};
