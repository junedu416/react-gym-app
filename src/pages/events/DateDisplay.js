import React from "react";

export const DateDisplay = ({formatDates}) => {
    const {startDate, startTime, endDate, endTime} = formatDates
    return(
        <>
            {startDate !== endDate && <>
                <p><b>From: </b>{startDate} {startTime}</p> 
                <p><b>To: </b>{endDate} {endTime}</p>
            </>}
            {startDate === endDate && <>
                <p><b>Date: </b> {startDate}</p>
                <p><b>Time: </b> {startTime} - {endTime}</p>
            </>}
        </>
    )
}