import React, {useState, useEffect} from "react";
import { Widget } from '../styled-components';
import { useGlobalState } from "../config/globalStore.js";
import {filterEventsByCategory} from "../utils/events-helper-functions.js";
import { sortFromOlderstToMostRecent, removeFinishedevents} from "../utils/widget-helpers.js";

export const UpcomingEventsWidget = ({events}) => {
    const {store} = useGlobalState()
    const {profile} = store;
    const [filteredEvents, setFilteredEvents] = useState(null)

    const sortAndFilterEvents = (eventsList, profile) => {
        const registeredEvents = filterEventsByCategory(eventsList, "registered events", profile)
        console.log("filtered by registration", registeredEvents)
        const eventsExceptCompetitions = registeredEvents.filter((event) => event.category !== "Competition")
        console.log("all registered events except competition", eventsExceptCompetitions)
        const eventsSortedByDate = sortFromOlderstToMostRecent(eventsExceptCompetitions, 'startTime')
        console.log("events sorted by date", eventsSortedByDate)
        const upcomingEvents = removeFinishedevents(eventsSortedByDate, 'endTime')
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

    return(
        <Widget>
            <h1>Upcoming events</h1>
            {filteredEvents && <>
                {filteredEvents.length === 0 ? <p>You have no upcoming events</p> :
                filteredEvents.map((event, index)=> {
                    if(index > 1) return;
                    return( <div key={index} style={{border: "solid 1px black"}}>
                        <h2>{event.name}</h2>
                    </div>)
                })}
                </>
            }
        </Widget>
    )
}