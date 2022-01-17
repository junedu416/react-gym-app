import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, MainWindow } from "../../styled-components";
import { createNewEvent } from "../../services/eventsServices";
import { useGlobalState } from "../../config/globalStore";
import { EventForm } from "./EventForm";


export const NewEvent = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false);

  // onSubmit callback used to create new event via form
  const submitNewEvent = async(data) => {
    try {
        setLoading(true);
        const result = await createNewEvent(data);
      if (result.error){
        console.log("error in data validation: ", result.error)
        const errorClone = await JSON.parse(JSON.stringify(result))
        const errorMsg = errorClone.error.replace(/startTime: |endTime: /ig, "")
        setErrorMessage(errorMsg)
        setLoading(false);
      } else {
        setErrorMessage("")
        dispatch({type: "setNotification", data: "Event successfully created"})
        navigate('/events')
      }
    } catch(e) {
      console.log("error caught: ", e)
      setLoading(false)
      setErrorMessage("Failed to connect to server")
    }
  }


  return (
    <MainWindow>
      <Heading>Create Event</Heading>
      {errorMessage && <p>{errorMessage}</p>}
      <EventForm submitFunction={submitNewEvent} loading={loading} />
    </MainWindow>
  );
};
