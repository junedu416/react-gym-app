import React, { useEffect, useState } from "react";
import { useGlobalState } from "../config/globalStore";
import {
  sortFromMostRecentToOldest,
  filterToToday,
} from "../utils/widget-helpers";
import { Widget } from "../styled-components";
import { EventDetails } from "./EventDetails";
import { WidgetTitle, GreyText } from "../styled-components/widgets";

export const StaffEventsWidget = ({ events }) => {
  const { store } = useGlobalState();
  const { profile } = store;
  const [myEvents, setMyEvents] = useState();

  useEffect(() => {
    const getUpcomingEvents = (eventsList) => {
      const eventsByMe = eventsList.filter(
        (event) =>
          event.createdBy === profile._id && event.category !== "Competition"
      );
      const eventsSortedByDate = sortFromMostRecentToOldest(
        eventsByMe,
        "startTime"
      );
      const eventsToday = filterToToday(
        eventsSortedByDate,
        "startTime",
        "endTime"
      );
      console.log("final return value for staff events", eventsToday);
      return eventsToday;
    };

    if (events && profile) {
      const myUpcomingEvents = getUpcomingEvents(events);
      setMyEvents(myUpcomingEvents);
    }
  }, [events, profile]);

  return (
    <Widget key="Staff Events Widget">
      <WidgetTitle>Classes by You Today</WidgetTitle>
      {myEvents && (
        <>
          {myEvents.length === 0 ? (
            <GreyText>You are not holding any classes today</GreyText>
          ) : (
            <EventDetails events={myEvents} staff />
          )}
        </>
      )}
    </Widget>
  );
};
