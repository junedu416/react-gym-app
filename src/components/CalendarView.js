import React, {useState, useEffect} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment';
// import { getAllEvents } from "../services/eventsServices";
import {events} from "../data/events-dummy.js"
import { PopupCard } from "./PopupCard";

const CalendarView = ({eventCategory}) => {
    const localizer = momentLocalizer(moment);
    // events currently loaded from data/dummy-data.js
    const [eventsArray, setEventsArray] = useState(events);
    const [clickedEvent, setClickedEvent] = useState(null);

    //=======
    // load events from backend
    //=======
    useEffect(() => {
        console.log(`event Category from prop is: ${eventCategory}`)
        const filteredEvents = events.filter((event) => event.category.toLowerCase() === eventCategory.toLowerCase())
        console.log(filteredEvents)
        setEventsArray(filteredEvents)
        return
    }, [eventCategory])

    const onClickEvent = (e) => {
        console.log(e)
        if(clickedEvent) {
            setClickedEvent(null)
        } else {
            setClickedEvent(e)
        }
    }

    return(
        <div>
        {clickedEvent && <PopupCard selectedEvent={clickedEvent}/>}
        <Calendar 
            localizer={localizer}
            defaultView="week"
            events={eventsArray}
            startAccessor="startTime"
            endAccessor="endTime"
            onSelectEvent={onClickEvent}
            // showMultiDayTimes //Needs to be included to show times for multi-day events instead of it being treated as all day - Daniel
            style={{height: "50vh"}}
        />
        </div>
    )
}

export default CalendarView;