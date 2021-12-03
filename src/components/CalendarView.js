import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment';

const CalendarView = () => {

    const localizer = momentLocalizer(moment);
    const myEvents = [
        {
            title: "first event",
            allDay: true,
            start: moment("2021-12-05"),
            end: moment("2021-12-06")
        }
    ]

    return(
        <div>
        <h1>Calendar</h1>
        <Calendar 
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            style={{height: "50vh"}}
        />
        </div>
    )
}

export default CalendarView;