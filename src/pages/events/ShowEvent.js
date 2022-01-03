import React, {useState, useEffect, useReducer} from 'react';
import { useParams } from 'react-router-dom';
import { MainWindow } from '../../styled-components';
import { getEventById } from '../../services/eventsServices';
import { showEventReducer } from '../../utils/showEvent-reducer';
import Book from '../../components/buttons/Book';

export const ShowEvent = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState("");
    const [event, dispatchEvent] = useReducer(showEventReducer, {})

    useEffect(() => {
        getEventById(id)
        .then((response) => {
            console.log("loaded response is: ", response)
            dispatchEvent({type: 'setEvent', data: response})
            dispatchEvent({
                type: "setEventTimes", data: {
                    startTime: response.startTime,
                    endTime: response.endTime
                }})
        }).then(() => setLoading(false))
        .catch((error) => {
            console.log(error)
            setLoading(false)
            setErrorMsg("Oops, something went wrong.")
        })
    }, [id])


    return(
        <MainWindow>
            <h1>Show Event Page</h1>
            {loading && <p>Loading...</p>}
            {errorMsg && <p>{errorMsg}</p>}
            {event && 
                <div>
                    <div>
                        <h2>{event.name}</h2>
                        <h3>{event.category}</h3>
                        <h4>Event Listed by {event.creatorName}</h4>
                        {event.eventImage ?  <img href={event.eventImage} alt={event.name}/> : <p>no image available</p>}
                        <p>{event.description}</p>
                        {(event.startDate !== event.endDate) && <p>{event.startDate} at {event.startTime} ~ {event.endDate} at {event.endTime}</p>}
                        {(event.startDate === event.endDate) && <p>{event.startDate} from {event.startTime} ~ {event.endTime}</p>}
                        {event.spotsAvailable !== 0 && <>
                            <p>{event.spotsAvailable} {event.spotsAvailable === 1 ? "spot" : "spots"} left!</p>
                            <Book></Book>
                            </>}

                    </div>
                </div>
            }
        </MainWindow>
    )
}