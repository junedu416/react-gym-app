import React from 'react';
import { useNavigate } from 'react-router-dom';
import BasicButton from '../components/buttons/BasicButton';
import moment from 'moment';

export const EventDetails = ({events, staff}) => {
    const navigate = useNavigate();

    const viewEvent = (e, eventId) => {
        e.preventDefault();
        navigate(`/events/${eventId}`)
    }

    return(
        events.map((event, index)=> {
            if(index > 1) return <></>;
            return( <div key={index} style={{border: "solid 1px black", width: "100%"}}>
                <h5>{event.name}</h5>
                <p>{moment(event.startTime).format('h:mm A')} - {moment(event.endTime).format('h:mm A')}</p>
                {staff && <p>{event.registeredUsers.length} {event.registeredUsers.length === 1 ? "person" : "people"} registered</p>}
                <BasicButton text="Details" btnFunction={((e)=> viewEvent(e, event._id))} style={{height: "30px", minWidth: "50px"}}/>
            </div>)
        })
    )
}