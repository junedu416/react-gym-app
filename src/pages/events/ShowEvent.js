import React, {useState, useEffect, useReducer} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainWindow } from '../../styled-components';
import { getEventById } from '../../services/eventsServices';
import { showEventReducer } from '../../utils/showEvent-reducer';
import BasicButton from '../../components/buttons/BasicButton';
import { useGlobalState } from '../../config/globalStore';
import { editEvent } from '../../services/eventsServices';
import { isUserRegistered } from '../../utils/events-helper-functions';

export const ShowEvent = () => {
    const navigate = useNavigate();
    const {store} = useGlobalState();
    const {profile} = store;
    const {id} = useParams();
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState("");
    const [event, dispatchEvent] = useReducer(showEventReducer, {})
    const [formatDates, dispatchformatDates] = useReducer(showEventReducer, {})
    const [instructor, setInstructor] = useState("")
    const [initialSpots, setInitialSpots] = useState(null)
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
            setInstructor(`${response.createdBy.firstName} ${response.createdBy.lastName}`)
        }).then(() => setLoading(false))
        .catch((error) => {
            console.log(error)
            setLoading(false)
            setErrorMsg("Oops, something went wrong.")
        })
    }, [id])

    useEffect(() => {
        if(event) {
            setInitialSpots(event.spotsAvailable)
            const userIsRegistered = isUserRegistered(profile, event.registeredUsers)
            setUserIsRegistered(userIsRegistered)
        }
    }, [event, profile])

    const navigateBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    const registerForEvent = (e) => {
        e.preventDefault();
        console.log(typeof event.spotsAvailable)
        dispatchEvent({type: 'registerToEvent', data: {
            profileId: profile._id
        }})
    }

    const cancelRegistration = (e) => {
        e.preventDefault();
        dispatchEvent({type: 'cancelRegistration', data: { profileId: profile._id }})
    }

    useEffect(() => {
        if(initialSpots && (event.spotsAvailable !== initialSpots)){
        editEvent(id, event)
            .then((response) => {
                console.log(`successfully updated event: `, response)
                // navigate("/overview")
            })
            .catch(e => {
                console.log(e)
                setErrorMsg("Failed to connect to server")
            })
        }
    }, [event.spotsAvailable, initialSpots, event, id, navigate])

    return(
        <MainWindow>
            <BasicButton text="back" size="small" color="primary" btnFunction={navigateBack} />
            {loading && <p>Loading...</p>}
            {errorMsg && <p>{errorMsg}</p>}
            {event && 
                <div>
                    <div>
                        <h1>{event.name}</h1>
                        <h2>{event.category}</h2>
                        <h3>Event Listed by {instructor}</h3>
                        {event.eventImage ?  <img src={event.eventImage} alt={event.name}/> : <p>-no image available-</p>}
                        <p>{event.description}</p>
                        {formatDates.isFinished ? <p>This event has already ended.</p> : <>
                            {(formatDates.startDate !== formatDates.endDate) && <p>{formatDates.startDate} at {formatDates.startTime} ~ {formatDates.endDate} at {formatDates.endTime}</p>}
                            {(formatDates.startDate === formatDates.endDate) && <p>{formatDates.startDate} from {formatDates.startTime} ~ {formatDates.endTime}</p>}
                            </>
                        }
                        {!event.isFinished && event.spotsAvailable !== 0 && !userIsRegistered && <>
                            <p>{event.spotsAvailable} {event.spotsAvailable === 1 ? "spot" : "spots"} left!</p>
                            <BasicButton text="Register" color="success" size="large" btnFunction={registerForEvent} /> 
                            </>}
                        {!event.isFinished && userIsRegistered && <>
                            <p>You are already registered in this event</p>
                            <BasicButton text="Cancel Registration" color="error" size="large" btnFunction={cancelRegistration}/>
                        </>}
                    </div>
                </div>
            }
        </MainWindow>
    )
}