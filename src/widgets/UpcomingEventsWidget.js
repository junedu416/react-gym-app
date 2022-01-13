import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Widget } from '../styled-components';
import { useGlobalState } from "../config/globalStore.js";
import {filterEventsByCategory} from "../utils/events-helper-functions.js";
import { sortFromOlderstToMostRecent, filterToToday} from "../utils/widget-helpers.js";
import BasicButton from '../components/buttons/BasicButton';

export const UpcomingEventsWidget = ({events}) => {
    const {store} = useGlobalState()
    const {profile} = store;
    const navigate = useNavigate();
    const [filteredEvents, setFilteredEvents] = useState(null)

    const sortAndFilterEvents = (eventsList, profile) => {
        const registeredEvents = filterEventsByCategory(eventsList, "registered events", profile)
        const eventsExceptCompetitions = registeredEvents.filter((event) => event.category !== "Competition")
        const eventsSortedByDate = sortFromOlderstToMostRecent(eventsExceptCompetitions, 'startTime')
        const upcomingEvents = filterToToday(eventsSortedByDate, 'startTime')
        console.log("final return value for filtered events", upcomingEvents)
        return upcomingEvents
    }

    useEffect(() => {
        console.log("useeffect for events widget, events and profile are", events, profile)
        if(events && profile){
            const upcomingEvents = sortAndFilterEvents(events, profile);
            console.log("upcoming events for james", upcomingEvents)
            setFilteredEvents(upcomingEvents)
        }
    }, [events, profile])

    const viewEvent = (e, eventId) => {
        e.preventDefault();
        navigate(`/events/${eventId}`)
    }

    return(
        <Widget>
            <h4>Upcoming for you today</h4>
            {filteredEvents && <>
                {filteredEvents.length === 0 ? <p>No upcoming schedule for today</p> :
                filteredEvents.map((event, index)=> {
                    if(index > 1) return;
                    return( <div key={index} style={{border: "solid 1px black", width: "100%"}}>
                        <h5>{event.name}</h5>
                        {/* <p>{event.startTime} - {event.endTime}</p> */}
                        <BasicButton text="Details" btnFunction={((e)=> viewEvent(e, event._id))} style={{height: "30px", minWidth: "50px"}}/>
                    </div>)
                })}
                </>
            }
        </Widget>
    )
}