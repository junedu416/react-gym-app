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
import { DateDisplay } from './DateDisplay';
import { useRedirectUnauthorisedUser } from '../../config/customHooks';
import { Heading, ErrorText, SmallHeading, Container } from '../../styled-components';
import { Description, EventImage, ShowEventContent } from '../../styled-components/events';
import { ReusableAlert } from '../../components/ReusableAlert';
import { CategoryChip } from './CategoryChip';

export const ShowEvent = () => {
    useRedirectUnauthorisedUser();
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
        if(!profile) {
            dispatch({type: "setNotification", data: "You must be logged in to view this page"})
            navigate("/auth/login")
        }
        return
    }, [profile, dispatch, navigate])

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
            setErrorMsg("Oops, something went wrong loading information.")
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
            <Container m="50px 80px" >
                {loading && <SmallHeading>Loading...</SmallHeading>}
                {errorMsg && <ReusableAlert open={!!errorMsg} text={errorMsg} btnFunction={()=> setErrorMsg("")} />}
                {event && 
                    <ShowEventContent>
                        <Heading phone="2rem" desktop="2.7rem" >{event.name}</Heading>
                        <h2><CategoryChip category={event.category} /></h2>
                        {instructor && <h3>Event Listed by {`${instructor.firstName} ${instructor.lastName}`}</h3>}
                        {formatDates.isFinished ? <p>This event has already ended.</p> : <DateDisplay formatDates={formatDates} />}
                        {event.eventImage ?  <EventImage src={event.eventImage} alt={event.name}/> : <p>-no image available-</p>}
                        <Description>{event.description}</Description>
                        <div>
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
                    </ShowEventContent>
                }
            </Container>
        </MainWindow>
    )
}