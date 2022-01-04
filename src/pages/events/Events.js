import React from "react";
import { useNavigate } from "react-router";
import Info from "../../components/buttons/Info";
// import Book from "../../components/buttons/Book"
import { MainWindow } from "../../styled-components";
import { Calendar } from "./Calendar";
import CreateEvent from "../../components/buttons/CreateEvent";

export const Events = (props) => {
  const navigate = useNavigate();

  function handleNewEvent() {
    navigate("/events/new");
  }

  return (
    <>
      <MainWindow>
        <Calendar style={{ marginBottom: "50px", padding: "50px" }} />

        <Info />
        <CreateEvent btnFunction={handleNewEvent} />
      </MainWindow>
    </>
  );
};
