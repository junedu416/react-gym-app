import React, {useState, useEffect, useReducer} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment';
import {eventsReducer} from "../utils/eventsReducer"
// import { getAllEvents } from "../services/eventsServices";

const CalendarView = ({eventCategory}) => {
    const localizer = momentLocalizer(moment);
    const initialEvent = {
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: ""
    }
    const [selectedEvent, selectedEventDispatch] = useReducer(eventsReducer, initialEvent)
    const events = [
        {
            title: "David's Personal Training",
            category: "Personal Training",
            description: "Let's build muscles together",
            spotsAvailable: '1',
            startTime: new Date("2021-12-15 08:00"),
            endTime: new Date("2021-12-15 08:45")
        },
        //Example Single day and Multi Day Event - Daniel
        {
            title: "Yoga class by Mia",
            category: "Class",
            description: "1 hour intermediate yoga class",
            spotsAvailable: "20",
            startTime: new Date("2021-12-10 13:00"),
            endTime: new Date("2021-12-10 14:00")
        },
        {
            title: "Weight Lift comp",
            category: "Competition",
            description: "Who can lift the heaviest weight at Average Joes?",
            spotsAvailable: "50",
            startTime: new Date("2021-12-07 09:00"),
            endTime: new Date("2021-12-08 15:00")
        },
        {
            title: "Distance comp",
            category: "Competition",
            description: "Who can run the longest distance in total over 5 days?",
            spotsAvailable: "100",
            startTime: new Date("2021-12-10 09:00"),
            endTime: new Date("2021-12-15 15:00")
        }
    ]

    const [eventsArray, setEventsArray] = useState(events);

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
        // console.log(e)
        if(selectedEvent.title){
            selectedEventDispatch({type: "deselectEvent"})
        } else {
            const startDate = moment(e.startTime).format('Do [of] MMM')
            const startTime = moment(e.startTime).format('h:mm A')
            const endDate = moment(e.endTime).format('Do [of] MMM')
            const endTime = moment(e.endTime).format('h:mm A')
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