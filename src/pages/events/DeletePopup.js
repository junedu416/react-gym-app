import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../config/globalStore';
import BasicButton from '../../components/buttons/BasicButton';
import { deleteEvent } from '../../services/eventsServices';
import { PopupCard } from '../../components/PopupCard';


export const DeletePopup = ({eventId, open, setOpen}) => {
    const navigate = useNavigate();
    const {dispatch} = useGlobalState();

    const handleClose = () => {
        setOpen(false)
    }
    const cancelConfirmation = (e) => {
        e.preventDefault();
        setOpen(false)
    }

    const removeEvent = (e) => {
        e.preventDefault();
        deleteEvent(eventId)
        .then(() => {
            dispatch({type: "setNotification", data: "Event successfully removed"})
            navigate('/events')
        }).catch((err) => console.log(err))
    }

    return(
        
        <PopupCard open={open} handleClose={handleClose} >
            <h2>Are you sure you want to delete this event?</h2>
            <BasicButton text="Confirm" color="error" size="medium" btnFunction={removeEvent} />
            <BasicButton text="Cancel" color="info" size="medium" btnFunction={cancelConfirmation} />
        </PopupCard>
                    
    )
}