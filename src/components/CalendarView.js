import React, {useState, useEffect, useReducer, useCallback} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment';
import { getAllEvents } from "../services/eventsServices.js";
import { eventsReducer } from "../utils/events-reducer";
import { EventPopup } from "../pages/events/EventPopup";
import { convertTimeToAcceptedFormat } from "../utils/events-helper-functions.js";

const CalendarView = ({eventCategory}) => {
    const localizer = momentLocalizer(moment);
    const initialEventsVars = {
        events: [],
        filteredEvents: []
    }
    const [eventsVars, dispatchEventsVars] = useReducer(eventsReducer, initialEventsVars);
    const [clickedEvent, setClickedEvent] = useState(null);
    const [open, setOpen] = useState(false);
 
    const filterEventsByCategory = useCallback(() => {
        if(eventCategory){
            console.log(`event Category from prop is: ${eventCategory}`)
            dispatchEventsVars({type: 'setCategorisedEventsList', data: eventCategory})
        }
        return
    }, [eventCategory])

    //=======
    // load events from backend
    //=======
    useEffect(() => {
        if(eventsVars.events.length === 0) {
            getAllEvents()
            .then((eventsList) => {
                console.log("fetched data")
                eventsList.forEach((event) => {
                    // event.startTime = new Date(event.startTime);
                    // event.endTime = new Date(event.endTime);
                    convertTimeToAcceptedFormat(event)
                })
                dispatchEventsVars({type: 'setEventsList', data: eventsList})
                filterEventsByCategory();
            })
            .catch(error => console.log(`error caught fetching events: `, error))
        }
    }, [eventsVars.events, filterEventsByCategory])

    // ==========
    // filter events  by category
    // ===========
    useEffect(() => {
        console.log(`event category changed.`)
        dispatchEventsVars({type: 'setCategorisedEventsList', data: eventCategory})
        return
    }, [eventCategory, eventsVars.events])

   


    const onClickEvent = (e) => {
        console.log(e)
        if(clickedEvent) {
            setClickedEvent(null)
        } else {
            setOpen(true)
            setClickedEvent(e)
        }
    }

    return(
        <div>
        {clickedEvent && <EventPopup event={clickedEvent} setEvent={setClickedEvent} open={open} setOpen={setOpen} dispatchEventsVars={dispatchEventsVars}/>}
        <Calendar 
            localizer={localizer}
            defaultView="week"
            events={eventsVars.filteredEvents}
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