import React, {useState} from "react";
import BasicButton from "../../components/buttons/BasicButton";
import { DeletePopup } from "./DeletePopup";

export const DeleteEvent = ({eventId}) => {
    const [open, setOpen] = useState(false)

    // when open = true opens popup to confirm event deletion
    const confirmDelete = (e) => {
        e.preventDefault();
        setOpen(true);
    }


    return(
        <>
            <BasicButton text="Delete" color="error" size="large" btnFunction={confirmDelete} />
            {open && <DeletePopup open={open} setOpen={setOpen} eventId={eventId} />}
        </>

    )
}