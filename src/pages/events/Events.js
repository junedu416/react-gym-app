import React from "react";
import { useNavigate } from "react-router";
import Info from "../../components/buttons/Info";
// import Book from "../../components/buttons/Book"
import { MainWindow } from "../../styled-components";
import { Calendar } from "./Calendar";
import { EventPopup } from "./Confirmation";
// import { NewEvent } from "./NewEvent";
import CreateEvent from "../../components/buttons/CreateEvent";

export const Events = (props) => {
  const navigate = useNavigate();

  function handleNewEvent() {
    navigate("/events/new");
  }

  const title = "Class Booking";
  const eventName = "Yoga";
  const instructor = "April Summers";
  const date = "Weds 22nd Dec";
  const time = "2:00PM - 3:00PM";
  const level = "Beginner";

  return (
    <>
      <MainWindow>
        <Calendar style={{ marginBottom: "50px", padding: "50px" }} />
        <EventPopup
          title={title}
          eventName={eventName}
          instructor={instructor}
          date={date}
          time={time}
          level={level}
        />

        <Info />
        <CreateEvent btnFunction={handleNewEvent} />
      </MainWindow>
    </>
  );
};
