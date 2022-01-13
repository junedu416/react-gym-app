import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../config/globalStore';
import { sortFromOldestToMostRecent, filterToCurrent } from '../utils/widget-helpers';
import { Widget } from '../styled-components';
import BasicButton from '../components/buttons/BasicButton';

export const StaffEventsWidget = ({events}) => {
    const {store} = useGlobalState();
    const {profile} = store;
    const navigate = useNavigate();
    const [myEvents, setMyEvents] = useState();

    const getUpcomingEvents = (eventsList) => {
        const eventsByMe = eventsList.filter((event) => event.createdBy === profile._id && event.category !== "Competition");
        const eventsSortedByDate = sortFromOldestToMostRecent(eventsByMe, 'startTime')
        const eventsToday = filterToCurrent(eventsSortedByDate, 'startTime', 'endTime')
        console.log("final return value for staff events", eventsToday)
        return eventsToday
    }

    const viewEvent = (e, eventId) => {
        e.preventDefault();
        navigate(`/events/${eventId}`)
    }

    useEffect(() => {
        if (events && profile){
            const myUpcomingEvents = getUpcomingEvents(events)
            setMyEvents(myUpcomingEvents)
        }
    }, [events, profile])

    return(
        <Widget>
        <h4>Your Upcoming Classes</h4>
            {myEvents && <>
                {myEvents.length === 0 ? <p>You are not holding any classes today</p> :
                myEvents.map((event, index)=> {
                    if(index > 1) return;
                    return( <div key={index} style={{border: "solid 1px black", width: "100%"}}>
                        <h5>{event.name}</h5>
                        <p>{event.registeredUsers.length} {event.registeredUsers.length === 1 ? "person" : "people"} registered</p>
                        {/* <p>{event.startTime} - {event.endTime}</p> */}
                        <BasicButton text="Details" btnFunction={((e)=> viewEvent(e, event._id))} style={{height: "30px", minWidth: "50px"}}/>
                    </div>)
                })}
                </>
            }
        </Widget>
    )

}