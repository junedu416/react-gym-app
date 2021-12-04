import React, {useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment';
import { myEvents } from "../data/events-dummy";

const CalendarView = () => {

    const [message, setMessage] = useState("")

    const localizer = momentLocalizer(moment);
    const events = [
        {
            title: "first event",
            allDay: false,
            start: new Date("2021-12-15"),
            end: new Date("2021-12-17")
        },
        //Example Single day and Multi Day Event - Daniel
        {
            title: "single day event w time",
            allDay: false,
            start: new Date("2021-12-10 13:00"),
            end: new Date("2021-12-10 15:00")
        },
        {
            title: "multi day event w time",
            allDay: false,
            start: new Date("2021-12-07 09:00"),
            end: new Date("2021-12-08 15:00")
        }
    ]

    const onClickEvent = () => {
        if(message){
            setMessage("")
        } else {
            setMessage("Clicked event")
        }
    }

    return(
        <div>
        <h1>Calendar</h1>
        {message && <p>{message}</p>}
        <Calendar 
            localizer={localizer}
            defaultView="week"
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={onClickEvent}
            showMultiDayTimes //Needs to be included to show times for multi-day events instead of it being treated as all day - Daniel
            style={{height: "50vh"}}
        />
        </div>
    )
}

export default CalendarView;