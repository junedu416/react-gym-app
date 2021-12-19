import React from "react";
import { useNavigate } from "react-router";
import Info from "../../components/buttons/Info"
import Book from "../../components/buttons/Book"
import { MainWindow } from "../../styled-components";
import { Calendar } from "./Calendar";
import { BookingConfirmation } from "./Confirmation";
// import { NewEvent } from "./NewEvent";
import CreateEvent from "../../components/buttons/CreateEvent";

export const Events = (props) => {
  const navigate = useNavigate();

  function handleNewEvent() {
    navigate("/events/new");
  }

  return (
    <>
    <MainWindow stlye={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
      <Calendar style={{ marginBottom:"50px", padding:"50px" }}/>
      <BookingConfirmation 
        title="Class Booking"
        event="Beginner's Yoga"
        instructor="April Summers"
        date="Weds 22nd Dec"
        time="1:00PM - 2:00PM"
        level="Intermediate "
      />

      <Info />
      <CreateEvent btnFunction={handleNewEvent}/>
    </MainWindow>
    </>
  );
};
