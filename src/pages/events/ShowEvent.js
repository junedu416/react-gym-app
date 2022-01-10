import React, {useState, useEffect, useReducer} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainWindow } from '../../styled-components';
import { getEventById } from '../../services/eventsServices';
import { showEventReducer } from '../../utils/showEvent-reducer';
import BasicButton from '../../components/buttons/BasicButton';
import { useGlobalState } from '../../config/globalStore';
import { editEvent } from '../../services/eventsServices';
import { isUserRegistered, cancelUserRegistration, registerUserToEvent} from '../../utils/events-helper-functions';
import { DeleteEvent } from './DeleteEvent';

export const ShowEvent = () => {
    const navigate = useNavigate();
    const {store, dispatch} = useGlobalState();
    const {profile} = store;
    const {id} = useParams();
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState("");
    const [event, dispatchEvent] = useReducer(showEventReducer, {})
    const [formatDates, dispatchformatDates] = useReducer(showEventReducer, {})
    const initialInstructor = {
        _id: "",
        firstName: "",
        lastName: ""
    }
    const [instructor, setInstructor] = useState(initialInstructor)
    const [userIsRegistered, setUserIsRegistered] = useState(false)

    useEffect(() => {
        getEventById(id)
        .then((response) => {
            console.log("loaded response is: ", response)
            dispatchEvent({type: 'setEvent', data: response})
            dispatchformatDates({
                type: "setEventTimes", data: {
                    startTime: response.startTime,
                    endTime: response.endTime
                }})
            setInstructor(response.createdBy)
        }).then(() => setLoading(false))
        .catch((error) => {
            console.log(error)
            setLoading(false)
            setErrorMsg("Oops, something went wrong.")
        })
    }, [id])

    useEffect(() => {
        if(event) {
            const userIsRegistered = isUserRegistered(profile, event.registeredUsers)
            setUserIsRegistered(userIsRegistered)
        }
    }, [event, profile])

    const updateEvent = (columnsToUpdate, message) => {
        const updatedEvent = {
          ...event,
          ...columnsToUpdate
        }
        console.log("updated event object is: ", updatedEvent);
        editEvent(event._id, updatedEvent)
        .then((response) => {
        console.log(`successfully updates event: `, response)
        dispatchEvent({type: 'updateEvent', data: response})
        })
        .then(() => {
            dispatch({type: 'setNotification', data: message})
            navigate('/events')
        })
        .catch(e => console.log(e))
    }
    
    const registerToEvent =(e) => {
        registerUserToEvent(event, profile._id, updateEvent)
    }

    const cancelRegistration = (e) => {
        cancelUserRegistration(event, profile._id, updateEvent)
    }

    const goToEditPage = (e) => {
        e.preventDefault();
        navigate('./edit', {state: {event: event, createdBy: instructor._id}})
    }


    return(
        <MainWindow>
            {loading && <p>Loading...</p>}
            {errorMsg && <p>{errorMsg}</p>}
            {event && 
                <div>
                    <h1>{event.name}</h1>
                    <h2>{event.category}</h2>
                    {instructor && <h3>Event Listed by {`${instructor.firstName} ${instructor.lastName}`}</h3>}
                    {event.eventImage ?  <img src={event.eventImage} alt={event.name}/> : <p>-no image available-</p>}
                    <p>{event.description}</p>
                    {formatDates.isFinished ? <p>This event has already ended.</p> : <>
                        {(formatDates.startDate !== formatDates.endDate) ? 
                                <p>{formatDates.startDate} at {formatDates.startTime} ~ {formatDates.endDate} at {formatDates.endTime}</p> :
                                <p>{formatDates.startDate} from {formatDates.startTime} ~ {formatDates.endTime}</p>}
                        </>
                    }
                    {!formatDates.isFinished && <>
                        {event.spotsAvailable && (event.spotsAvailable === 0) && <p>There are no more spots available for this event</p>}
                        {userIsRegistered && <>
                            <p>You are already registered in this event</p>
                            <BasicButton text="Cancel Registration" color="error" size="large" btnFunction={cancelRegistration}/>
                        </>}
                        {event.category !== "Competition" && event.spotsAvailable !== 0 && !userIsRegistered && <>
                            <p>{event.spotsAvailable} {event.spotsAvailable === 1 ? "spot" : "spots"} left!</p>
                            {instructor && (instructor._id !== profile._id) && <BasicButton text="Register" color="success" size="large" btnFunction={registerToEvent} />}
                            </>}
                        {event.category === "Competition" && !userIsRegistered && <BasicButton text="Register" color="success" size="large" btnFunction={registerToEvent} />}
                    </>
                    }
                    {instructor && (instructor._id === profile._id) && <>
                        <BasicButton text="Edit" color="warning" size="large" btnFunction={goToEditPage} />
                        <DeleteEvent eventId={event._id}/>
                    </>}
                </div>
            }
        </MainWindow>
    )
}