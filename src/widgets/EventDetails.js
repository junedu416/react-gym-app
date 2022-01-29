import React from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "../components/buttons/BasicButton";
import moment from "moment";
import {
  WidgetDiv,
  EventTitle,
  EventParag,
  AlignRight,
} from "../styled-components/widgets";
import { getShortenedString } from "../utils/widgetUtils";

export const EventDetails = ({ events, staff }) => {
  const navigate = useNavigate();

  const viewEvent = (e, eventId) => {
    e.preventDefault();
    navigate(`/events/${eventId}`);
  };

  return events.map((event, index) => {
    if (index > 1) return <></>;
    return (
      <WidgetDiv key={index}>
        <EventTitle>{getShortenedString(event.name, 20)}</EventTitle>
        <EventParag>
          {moment(event.startTime).format("h:mm A")} -{" "}
          {moment(event.endTime).format("h:mm A")}
        </EventParag>
        {staff && (
          <EventParag>
            {event.registeredUsers.length}{" "}
            {event.registeredUsers.length === 1 ? "person" : "people"}{" "}
            registered
          </EventParag>
        )}
        <AlignRight>
          <BasicButton
            text="Details"
            btnFunction={(e) => viewEvent(e, event._id)}
            style={{
              height: "38px",
              minWidth: "100px",
              textAlign: "right",
              margin: "0",
            }}
          />
        </AlignRight>
        {index === 0 && events.length > 1 && <hr />}
      </WidgetDiv>
    );
  });
};
