import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { showEventReducer } from "../utils/showEvent-reducer";

export const PopupCard = ({selectedEvent}) => {
    const initialEventDates = {
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        isFinished: false
    }
    const [eventDates, dispatchEventDates] = useReducer(showEventReducer, initialEventDates)
    
    useEffect(() => {
        dispatchEventDates({
            type: "setEventTimes",
            data: {
                startTime: selectedEvent.startTime,
                endTime: selectedEvent.endTime
            }
        })
    }, [selectedEvent.startTime, selectedEvent.endTime])

    return(
        <>
            <div>
                <h3>{selectedEvent.title}</h3>
                <p>{selectedEvent.description}</p>
                <p>{eventDates.startDate} at {eventDates.startTime} ~ {eventDates.endDate} {eventDates.endTime}</p>
                {!eventDates.isFinished && <p>Spots left: {selectedEvent.spotsAvailable}</p>}
                <Link to={`/events/${selectedEvent._id}`}>More Details</Link>
            </div>
        </>
    )
}