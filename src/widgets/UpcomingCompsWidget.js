import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../config/globalStore';
import { filterEventsByCategory } from '../utils/events-helper-functions';
import { sortFromOldestToMostRecent, filterToCurrent } from '../utils/widget-helpers';
import { Widget } from "../styled-components";
import BasicButton from '../components/buttons/BasicButton';
import { useNavigate } from 'react-router-dom';

export const UpcomingCompsWidget = ({events}) => {
    const {store} = useGlobalState();
    const {profile} = store;
    const navigate = useNavigate();
    const [competitions, setCompetitions] = useState(null)


    const getUpcomingCompetitions = (eventsList, profile) => {
        const registeredEvents = filterEventsByCategory(eventsList, "registered events", profile)
        const eventsExceptCompetitions = registeredEvents.filter((event) => event.category === "Competition")
        const eventsSortedByDate = sortFromOldestToMostRecent(eventsExceptCompetitions, 'startTime')
        const upcomingComps = filterToCurrent(eventsSortedByDate, 'startTime', 'endTime')
        console.log("final return value for filtered events", upcomingComps)
        return upcomingComps
    }

    useEffect(() => {
        console.log("useeffect for events widget, events and profile are", events, profile)
        if(events && profile){
            const upcomingComps = getUpcomingCompetitions(events, profile);
            console.log("upcoming events for james", upcomingComps)
            setCompetitions(upcomingComps)
        }
    }, [events, profile])

    const viewEvent = (e, eventId) => {
        e.preventDefault();
        navigate(`/events/${eventId}`)
    }

    return(
        <Widget>
        <h4>Competitions</h4>
            {competitions && <>
                {competitions.length === 0 ? <p>No upcoming competitions</p> :
                competitions.map((event, index)=> {
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