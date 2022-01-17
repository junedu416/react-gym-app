import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../config/globalStore';
import { Heading, MainWindow } from '../../styled-components';
import { editEvent } from '../../services/eventsServices';
import { EventForm } from './EventForm';

export const EditEvent = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    console.log("state pulled from useLocation", state)
    const {event, createdBy} = state;
    const [errorMessage, setErrorMessage] = useState("");
    const {store, dispatch} = useGlobalState();
    const {profile} = store;

    // REDIRECT USERS THAT ARE NOT A CREATOR OF EVENT TRYING TO EDIT
    useEffect(() => {
        if(!event) {
            navigate('/events')
            return
        }
        if(!profile || createdBy !== profile._id) {
            dispatch({type: 'setNotification', data: "You are not authorised to access this page"})
            navigate(-1)
        }
    }, [profile, event, dispatch, createdBy, navigate])

    // MAKES PUT REQ TO BACKEND TO UPDATE EVENT INFO
    const updateEvent = async(data) => {
        try {
          const result = await editEvent(event._id, data);
        if (result.error){
          // when validation error occurs make error message more readable and displauy on screen.
          console.log("error in data validation: ", result.error)
          const errorClone = await JSON.parse(JSON.stringify(result))
          const errorMsg = errorClone.error.replace(/startTime: |endTime: /ig, "")
          setErrorMessage(errorMsg)
        } else {
          setErrorMessage("")
          dispatch({type: "setNotification", data: "Successfully updated event"})
          navigate('/events')
        }
      } catch(e) {
        console.log("error caught: ", e)
        setErrorMessage("Failed to connect to server")
      }
    }

    
    return(
        <MainWindow>
            <Heading>Edit Event</Heading>
            {errorMessage && <p>{errorMessage}</p>}
            <EventForm submitFunction={updateEvent} event={event} eventId={event._id} buttonText="Update" />
        </MainWindow>
    )
}