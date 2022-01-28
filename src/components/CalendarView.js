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
  const { profile } = store;
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

  const filterEventsByTrainer = useCallback(() => {
    if (trainerParams) {
      // console.log("filtered Trainer ID from params: ", trainerParams);
      dispatchEventsVars({
        type: "filterByTrainer",
        data: { category: eventCategory, trainerId: trainerParams },
      });
    }
    return;
  }, [trainerParams, eventCategory]);

  const filterEventsByClass = useCallback(() => {
    if (classFilters) {
      console.log("CLASS FILTERS: ", classFilters);
      dispatchEventsVars({
        type: "filterByClass",
        data: { category: "Class", gymClass: classFilters },
      });
    }
    return;
  }, [classFilters]);

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
      })
      .catch((error) => console.log(`error caught fetching events: `, error));
  }, []);

  // ==========
  // filter events  by category, and if params exist for trainer and personal training, filter events by trainer
  // ===========
  useEffect(() => {
    if (eventsVars.events?.length > 0) {
      filterEventsByCategory();
      filterEventsByTrainer();
    }
    return;
  }, [eventsVars.events, filterEventsByCategory, filterEventsByTrainer]);

  useEffect(() => {
    if (eventsVars.events?.length > 0 && classFilters.length > 0) {
      filterEventsByClass();
    }
    return;
  }, [eventsVars.events, filterEventsByClass])


  const onClickEvent = (e) => {
    console.log(e);
    if (clickedEvent) {
      setClickedEvent(null);
    } else {
      setOpen(true);
      setClickedEvent(e);
    }
  };

  return (
    <div
      style={{
        height: "80vh",
        width: ipadAndPhone ? "95%" : "80%",
        overflow: "scroll",
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
    </div>
  );
};

export default CalendarView;
