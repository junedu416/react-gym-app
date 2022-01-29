import React, { useState, useEffect } from "react";
import { Widget } from "../styled-components";
import { useGlobalState } from "../config/globalStore.js";
import { filterEventsByCategory } from "../utils/events-helper-functions.js";
import {
  sortFromMostRecentToOldest,
  filterToToday,
} from "../utils/widget-helpers.js";
import { EventDetails } from "./EventDetails";
import { WidgetTitle, GreyText } from "../styled-components/widgets";

export const UpcomingEventsWidget = ({ events }) => {
  const { store } = useGlobalState();
  const { profile } = store;
  const [filteredEvents, setFilteredEvents] = useState(null);

  const sortAndFilterEvents = (eventsList, profile) => {
    const registeredEvents = filterEventsByCategory(
      eventsList,
      "registered events",
      profile
    );
    const eventsExceptCompetitions = registeredEvents.filter(
      (event) => event.category !== "Competition"
    );
    const eventsSortedByDate = sortFromMostRecentToOldest(
      eventsExceptCompetitions,
      "startTime"
    );
    const upcomingEvents = filterToToday(
      eventsSortedByDate,
      "startTime",
      "endTime"
    );
    console.log("final return value for filtered events", upcomingEvents);
    return upcomingEvents;
  };

  useEffect(() => {
    console.log(
      "useeffect for events widget, events and profile are",
      events,
      profile
    );
    if (events && profile) {
      const upcomingEvents = sortAndFilterEvents(events, profile);
      console.log("upcoming events for james", upcomingEvents);
      setFilteredEvents(upcomingEvents);
    }
  }, [events, profile]);

  return (
    <Widget>
      <WidgetTitle>Today you are going to...</WidgetTitle>
      {filteredEvents && (
        <>
          {filteredEvents.length === 0 ? (
            <GreyText>You are not registered for any classes today</GreyText>
          ) : (
            <EventDetails events={filteredEvents} />
          )}
        </>
      )}
    </Widget>
  );
};
