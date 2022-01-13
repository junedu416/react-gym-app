import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../config/globalStore';
import { sortFromOldestToMostRecent, filterToCurrent } from '../utils/widget-helpers';
import { Widget } from '../styled-components';
import { EventDetails } from './EventDetails';

export const StaffEventsWidget = ({events}) => {
    const {store} = useGlobalState();
    const {profile} = store;
    const [myEvents, setMyEvents] = useState();


    useEffect(() => {
        const getUpcomingEvents = (eventsList) => {
            const eventsByMe = eventsList.filter((event) => event.createdBy === profile._id && event.category !== "Competition");
            const eventsSortedByDate = sortFromOldestToMostRecent(eventsByMe, 'startTime')
            const eventsToday = filterToCurrent(eventsSortedByDate, 'startTime', 'endTime')
            console.log("final return value for staff events", eventsToday)
            return eventsToday
        }

        if (events && profile){
            const myUpcomingEvents = getUpcomingEvents(events)
            setMyEvents(myUpcomingEvents)
        }
    }, [events, profile])

    return(
        <Widget>
        <h4>Classes by You Today</h4>
            {myEvents && <>
                {myEvents.length === 0 ? <p>You are not holding any classes today</p> :
                <EventDetails events={myEvents} staff/>
                }
                </>
            }
        </Widget>
    )

}