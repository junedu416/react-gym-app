import React, {useState, useEffect} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment';
// import {events} from "../data/events-dummy.js"
import { PopupCard } from "./PopupCard";
import { getAllEvents } from "../services/eventsServices.js";

const CalendarView = ({eventCategory}) => {
    const localizer = momentLocalizer(moment);
    const [eventsArray, setEventsArray] = useState([]);
    const [clickedEvent, setClickedEvent] = useState(null);

    //=======
    // load events from backend
    //=======
    useEffect(() => {
        getAllEvents()
        .then((eventsList) => {
            console.log(eventsList)
            setEventsArray(eventsList)
        })
        .catch(error => console.log(`error caught fetching events: `, error))
    }, [])

    // ==========
    // filter events  by category
    // ===========
    // useEffect(() => {
    //     if(eventCategory) {
    //         console.log(`event Category from prop is: ${eventCategory}`)
    //         filterEventsByCategory(eventCategory)
    //     } else {
    //         setEventsArray(eventsArray)
    //     }
    //     return
        
    // }, [eventCategory])

    function filterEventsByCategory(eventsList, category){
        const filteredEvents = eventsList.filter((event) => event.category.toLowerCase() === category.toLowerCase())
        setEventsArray(filteredEvents)
    }

    

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