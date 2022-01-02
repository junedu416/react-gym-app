import React, {useState, useEffect, useReducer, useCallback} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment';
// import {events} from "../data/events-dummy.js";
import { PopupCard } from "./PopupCard";
import { getAllEvents } from "../services/eventsServices.js";
import { eventsReducer } from "../utils/events-reducer";

const CalendarView = ({eventCategory}) => {
    const localizer = momentLocalizer(moment);
    const initialEventsVars = {
        events: []
    }
    const [eventsVars, dispatchEventsVars] = useReducer(eventsReducer, initialEventsVars);
    const [clickedEvent, setClickedEvent] = useState(null);
 
    const filterEventsByCategory = useCallback(() => {
        console.log(`event Category from prop is: ${eventCategory}`)
        dispatchEventsVars({type: 'setCategorisedEventsList', data: eventCategory})
    }, [eventCategory])
    //=======
    // load events from backend
    //=======
    useEffect(() => {
        getAllEvents()
        .then((eventsList) => {
            console.log("fetched data")
            eventsList.forEach((event) => {
                event.startTime = new Date(event.startTime);
                event.endTime = new Date(event.endTime);
            })
            dispatchEventsVars({type: 'setEventsList', data: eventsList})
            filterEventsByCategory();
        })
        .catch(error => console.log(`error caught fetching events: `, error))
    }, [filterEventsByCategory])

    // ==========
    // filter events  by category
    // ===========
    useEffect(() => {
        console.log(`event category changed.`)
        dispatchEventsVars({type: 'setCategorisedEventsList', data: eventCategory})
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
            events={eventsVars.events}
            titleAccessor="name"
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