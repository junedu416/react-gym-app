import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "../../components/buttons/BasicButton";
import { useGlobalState } from "../../config/globalStore";
import { deleteEvent } from "../../services/eventsServices";

export const DeleteEvent = ({eventId}) => {
    const navigate = useNavigate();
    const [confirmMsg, setConfirmMsg] = useState("")
    const {dispatch} = useGlobalState();

    const confirmDelete = (e) => {
        e.preventDefault();
        setConfirmMsg("Confirm Deletion?")
    }

    const cancelConfirmation = (e) => {
        e.preventDefault();
        setConfirmMsg("")
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
        <>
            <BasicButton text="Delete" color="error" size="large" btnFunction={confirmDelete} />
            {confirmMsg && <>
                <p>{confirmMsg}</p>
                <BasicButton text="Confirm" color="error" size="medium" btnFunction={removeEvent} />
                <BasicButton text="Cancel" color="info" size="medium" btnFunction={cancelConfirmation} />
            </>}
        </>

    )
}