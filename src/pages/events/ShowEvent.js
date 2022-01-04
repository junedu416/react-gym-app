import React, {useState, useEffect, useReducer} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainWindow } from '../../styled-components';
import { getEventById } from '../../services/eventsServices';
import { showEventReducer } from '../../utils/showEvent-reducer';
import { EventPopup } from './EventPopup';
import BasicButton from '../../components/buttons/BasicButton';

export const ShowEvent = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState("");
    const [event, dispatchEvent] = useReducer(showEventReducer, {})
    const [formatDates, dispatchformatDates] = useReducer(showEventReducer, {})
    const [instructor, setInstructor] = useState("")

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

    const navigateBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }


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
                        {event.eventImage ?  <img href={event.eventImage} alt={event.name}/> : <p>-no image available-</p>}
                        <p>{event.description}</p>
                        {formatDates.isFinished ? <p>This event has already ended.</p> : <>
                            {(formatDates.startDate !== formatDates.endDate) && <p>{formatDates.startDate} at {formatDates.startTime} ~ {formatDates.endDate} at {formatDates.endTime}</p>}
                            {(formatDates.startDate === formatDates.endDate) && <p>{formatDates.startDate} from {formatDates.startTime} ~ {formatDates.endTime}</p>}
                            </>
                        }
                        {!event.isFinished && event.spotsAvailable !== 0 && <>
                            <p>{event.spotsAvailable} {event.spotsAvailable === 1 ? "spot" : "spots"} left!</p>
                            <EventPopup event={event} /> 
                            </>}
                    </div>
                </div>
            }
        </MainWindow>
    )
}