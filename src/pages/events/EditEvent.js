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

    const updateEvent = (data) => {
        editEvent(event._id, data).then(result => {
            if (result.error){
              console.log("error in data validation: ", result.error)
              setErrorMessage(result.error);
            } else {
              console.log("success")
              setErrorMessage("");
            }
          })
          .then(() => {
              dispatch({type: 'setNotification', data: "Successfully updated event"})
              navigate('/events')
            })
          .catch(error => {
            setErrorMessage("Failed to connect to server.")
          });
    }
    return(
        <MainWindow>
            <Heading>Edit Event</Heading>
            {errorMessage && <p>{errorMessage}</p>}
            <EventForm submitFunction={updateEvent} event={event} eventId={event._id}/>
        </MainWindow>
    )
}