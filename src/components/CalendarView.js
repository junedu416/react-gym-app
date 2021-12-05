import React, {useReducer} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment';
import { myEvents } from "../data/events-dummy";
import {eventsReducer} from "../utils/eventsReducer"

const CalendarView = () => {
    const initialEvent = {
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: ""
    }
    const [selectedEvent, selectedEventDispatch] = useReducer(eventsReducer, initialEvent)

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
        },
        {
            title: "single day event w time overlapping",
            allDay: false,
            start: new Date("2021-12-10 13:00"),
            end: new Date("2021-12-10 15:00")
        }
    ]

    const onClickEvent = (e) => {
        // console.log(e)
        if(selectedEvent.title){
            selectedEventDispatch({type: "deselectEvent"})
        } else {
            const startDate = moment(e.start).format('Do [of] MMM')
            const startTime = moment(e.start).format('h:mm A')
            const endDate = moment(e.end).format('Do [of] MMM')
            const endTime = moment(e.end).format('h:mm A')
            selectedEventDispatch({type: "setEvent", data: {
                title: e.title, 
                startDate: startDate, 
                endDate: endDate,
                startTime: startTime,
                endTime: endTime 
            }})
        }
    }

    return(
        <div>
        <h1>Calendar</h1>
        {selectedEvent.title && 
            <div>
                <h3>{selectedEvent.title}</h3>
                <p>{selectedEvent.startDate} at {selectedEvent.startTime} ~ {selectedEvent.endDate && selectedEvent.endDate} {selectedEvent.endTime}</p>
                <button>Details</button>
            </div>
        }
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