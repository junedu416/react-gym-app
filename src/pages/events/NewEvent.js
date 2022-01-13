import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, MainWindow } from "../../styled-components";
import { createNewEvent } from "../../services/eventsServices";
import { useGlobalState } from "../../config/globalStore";
import { EventForm } from "./EventForm";


export const NewEvent = () => {
  const {store, dispatch} = useGlobalState();
  const profile = store.profile;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("")

  const submitNewEvent = (data) => {
    createNewEvent(data).then(result => {
      if (result.error){
        console.log("error in data validation: ", result.error)
        setErrorMessage(result.error);
        throw new Error(result.error)
      } else {
        setErrorMessage("");
      }
    })
    .then(() => {
      dispatch({type: "setNotification", data: "Event successfully created"})
      navigate('/events')
    })
    .catch(error => {
      console.log("error caught: ", error)
      setErrorMessage(JSON.parse(error).Error)
    });
  }

  useEffect(() => {
    if(!profile || !profile.isStaff) {
      dispatch({type: 'setNotification', data: 'You are not authorised to access this page'})
      navigate("/events")
    }
  }, [profile, dispatch, navigate])


  return (
    <MainWindow>
      <Heading>Create Event</Heading>
      {errorMessage && <p>{errorMessage}</p>}
      <EventForm submitFunction={submitNewEvent}/>
    </MainWindow>
  );
};
