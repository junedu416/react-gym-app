import React, { useState, useEffect, useReducer, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useGlobalState } from "../config/globalStore";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { getAllEvents } from "../services/eventsServices.js";
import { eventsReducer } from "../utils/events-reducer";
import { EventPopup } from "../pages/events/EventPopup";
import { convertTimeToAcceptedFormat } from "../utils/events-helper-functions.js";
import useMediaQuery from "@mui/material/useMediaQuery";

// Changes Calendar days to start on Mon - Sun, rather than Sun - Sat
import 'moment/locale/en-gb';
import { Wrapper } from "../styled-components/events";
moment.locale('en-gb');


const CalendarView = ({
  eventCategory,
  trainerParams,
  classFilters,
  filterList,
  setFilterList,
  trainerFilters,
  competitionFilters,
  weekdayFilters,
}) => {
  const { store } = useGlobalState();
  const { dispatch } = useGlobalState();
  const { profile, allevents } = store;
  const localizer = momentLocalizer(moment);
  const initialEventsVars = {
    events: null,
    filteredEvents: [],
  };

  const [eventsVars, dispatchEventsVars] = useReducer(
    eventsReducer,
    initialEventsVars
  );
  const [clickedEvent, setClickedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  const ipadAndPhone = useMediaQuery("(max-width:800px)");

  const scrollToTime = new Date();
  scrollToTime.setHours(9, 0, 0);

  const filterEventsByCategory = useCallback(() => {
    if (eventCategory) {
      // console.log(`event Category from prop is: ${eventCategory}`);
      dispatchEventsVars({
        type: "setCategorisedEventsList",
        data: { category: eventCategory, profile: profile },
      });
    }
    return;
  }, [eventCategory, profile]);

  const filterEventsByClass = useCallback(() => {
    if (classFilters) {
      // console.log("CLASS FILTERS: ", classFilters);
      dispatchEventsVars({
        type: "filterByClass",
        data: { category: eventCategory, gymClass: classFilters },
      });
    }
    return;
  }, [classFilters, eventCategory]);

  const filterClassesByTrainer = useCallback(() => {
    if (eventCategory === "class" && trainerFilters.filter(trainer => trainer !== undefined).length > 0) {
      console.log("TOGGLE: ", eventCategory, "  TRAINERS selected: ", trainerFilters);
      dispatchEventsVars({
        type: "filterClassesByTrainer",
        data: { category: eventCategory, trainers: trainerFilters },
      });
    }
    return;
  }, [trainerFilters, eventCategory]);

  const filterEventsByTrainerParams = useCallback(() => {
    if (trainerParams) {
      // console.log("filtered Trainer ID from params: ", trainerParams);
      dispatchEventsVars({
        type: "filterByTrainerParams",
        data: { category: "Personal Training", trainerId: trainerParams },
      });
    }
    return;
  }, [trainerParams, eventCategory]);

  const filterEventsByTrainer = useCallback(() => {
    if (!trainerParams && trainerFilters) {
      console.log("TRAINER FILTERS: ", trainerFilters, "category: ", eventCategory);
      dispatchEventsVars({
        type: "filterEventsByTrainer",
        data: { category: eventCategory, trainers: trainerFilters },
      });
    }
    return;
  }, [trainerFilters, eventCategory]);

  //=======
  // load events from backend
  //=======
  useEffect(() => {
    getAllEvents()
      .then((eventsList) => {
        // console.log("fetched data", eventsList);
        eventsList.forEach((event) => {
          convertTimeToAcceptedFormat(event);
        });
        dispatchEventsVars({ type: "setEventsList", data: eventsList });
        dispatch({ type: "setAllEvents", data: eventsList});
      })
      .catch((error) => console.log(`error caught fetching events: `, error));
  }, []);

  // ==========
  // filter events  by category
  // ===========
  useEffect(() => {
    if (eventsVars.events?.length > 0) {
      filterEventsByCategory();
    }
    return;
  }, [eventsVars.events, filterEventsByCategory]);

  useEffect(() => {
    if (eventsVars.events?.length > 0 && eventCategory === "class" && classFilters.length > 0) {
      filterEventsByClass();
    }
    return;
  }, [eventsVars.events, filterEventsByClass])

  useEffect(() => {
    if (eventsVars.events?.length > 0 && eventCategory === "personal training" && trainerFilters.length > 0 && !trainerParams) {
      filterEventsByTrainer();
    }
    return;
  }, [eventsVars.events, filterEventsByTrainer])

  useEffect(() => {
    if (eventsVars.events?.length > 0 && eventCategory === "class" && trainerFilters.length > 0) {
      filterClassesByTrainer();
    }
    return;
  }, [eventsVars.events, filterClassesByTrainer])

  //if params exist for trainer, filter events by trainer
  useEffect(() => {
    if (trainerParams && eventsVars.events?.length > 0) {
      filterEventsByTrainerParams();
    }
    return;
  }, [eventsVars.events, filterEventsByTrainerParams]);


  const onClickEvent = (e) => {
    console.log(e);
    if (clickedEvent) {
      setClickedEvent(null);
    } else {
      setOpen(true);
      setClickedEvent(e);
    }
  };

  const applyFilters = () => {


  }

  return (
    <div
      style={{
        height: "80vh",
        width: ipadAndPhone ? "95%" : "80%",
        overflowY: "scroll",

      }}
    >
      {clickedEvent && (
        <EventPopup
          event={clickedEvent}
          setEvent={setClickedEvent}
          open={open}
          setOpen={setOpen}
          dispatchEventsVars={dispatchEventsVars}
        />
      )}
      <Wrapper>
        <Calendar
          localizer={localizer}
          defaultView="week"
          events={eventsVars.filteredEvents}
          titleAccessor="name"
          startAccessor="startTime"
          endAccessor="endTime"
          onSelectEvent={onClickEvent}
          step={30}
          style={{ height: 1500, width: ipadAndPhone ? "800px" : null }}
          // Set min and max range for time displayed on calendar
          min={new Date(0, 0, 0, 7, 0, 0)}
          max={new Date(0, 0, 0, 21, 0, 0)}
          // showMultiDayTimes //Needs to be included to show times for multi-day events instead of it being treated as all day - Daniel
          scrollToTime={scrollToTime}
          views={["month", "week", "day"]}
        />
      </Wrapper>
    </div>
  );
};

export default CalendarView;
