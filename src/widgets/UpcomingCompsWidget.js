import React, { useState, useEffect, useReducer } from "react";
import { useGlobalState } from "../config/globalStore";
import { filterEventsByCategory } from "../utils/events-helper-functions";
import {
  sortFromOldestToMostRecent,
  filterToCurrent,
} from "../utils/widget-helpers";
import { Widget } from "../styled-components";
import BasicButton from "../components/buttons/BasicButton";
import { useNavigate } from "react-router-dom";
import { showEventReducer } from "../utils/showEvent-reducer";
import {
  WidgetTitle,
  GreyText,
  CompTitle,
  CompTimes,
  TimeDiv,
} from "../styled-components/widgets.js";

export const UpcomingCompsWidget = ({ events }) => {
  const { store } = useGlobalState();
  const { profile } = store;
  const navigate = useNavigate();
  const [competition, setCompetition] = useState(null);
  const initialCompDates = {
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  };
  const [compDates, dispatchCompDates] = useReducer(
    showEventReducer,
    initialCompDates
  );

  const getUpcomingCompetitions = (eventsList, profile) => {
    const registeredEvents = filterEventsByCategory(
      eventsList,
      "registered events",
      profile
    );
    const eventsExceptCompetitions = registeredEvents.filter(
      (event) => event.category === "Competition"
    );
    const eventsSortedByDate = sortFromOldestToMostRecent(
      eventsExceptCompetitions,
      "startTime"
    );
    const upcomingComps = filterToCurrent(
      eventsSortedByDate,
      "startTime",
      "endTime"
    );
    console.log("final return value for filtered events", upcomingComps);
    return upcomingComps;
  };

  const chooseRandomComp = (eventsList) => {
    if (eventsList.length === 0) return null;
    else {
      const randomIndex = Math.floor(Math.random() * eventsList.length);
      const randomUpcomingCompetition = eventsList[randomIndex];
      return randomUpcomingCompetition;
    }
  };

  useEffect(() => {
    console.log(
      "useeffect for events widget, events and profile are",
      events,
      profile
    );
    if (events && profile) {
      const upcomingComps = getUpcomingCompetitions(events, profile);
      console.log("upcoming events for james", upcomingComps);
      const randomComp = chooseRandomComp(upcomingComps);
      setCompetition(randomComp);
    }
  }, [events, profile]);

  useEffect(() => {
    if (competition) {
      dispatchCompDates({
        type: "setEventTimes",
        data: {
          startTime: competition.startTime,
          endTime: competition.endTime,
        },
      });
    }
    return;
  }, [competition]);

  const viewEvent = (e, eventId) => {
    e.preventDefault();
    navigate(`/events/${eventId}`);
  };

  return (
    <Widget key="Competition Widget">
      <WidgetTitle>Competitions Today</WidgetTitle>
      {competition ? (
        <>
          <CompTitle>{competition.name}</CompTitle>
          {compDates.startDate === compDates.endDate ? (
            <TimeDiv>
              <CompTimes>
                <b>{compDates.startDate}</b> {compDates.startTime} -{" "}
                {compDates.endTime}
              </CompTimes>
            </TimeDiv>
          ) : (
            <TimeDiv>
              <CompTimes>
                <b>From: </b>
                {compDates.startDate} at {compDates.startTime}
              </CompTimes>
              <CompTimes>
                <b>To: </b>
                {compDates.endDate} at {compDates.endTime}
              </CompTimes>
            </TimeDiv>
          )}
          <BasicButton
            text="Details"
            btnFunction={(e) => viewEvent(e, competition._id)}
            style={{ height: "40px", minWidth: "100px" }}
          />
        </>
      ) : (
        <GreyText>
          {" "}
          You are not registered to any competition held today
        </GreyText>
      )}
    </Widget>
  );
};
