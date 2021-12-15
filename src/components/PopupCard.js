import React from "react";
import moment from "moment";

export const PopupCard = ({selectedEvent}) => {
    const startDate = moment(selectedEvent.startTime).format('Do [of] MMM')
    const startTime = moment(selectedEvent.startTime).format('h:mm A')
    const endDate = moment(selectedEvent.endTime).format('Do [of] MMM')
    const endTime = moment(selectedEvent.endTime).format('h:mm A')
    
    return(
        <div>
            <h3>{selectedEvent.title}</h3>
            <p>{selectedEvent.description}</p>
            <p>{startDate} at {startTime} ~ {endDate} {endTime}</p>
            <p>Spots left: {selectedEvent.spotsAvailable}</p>
            <button>Details</button>
        </div>
    )
}