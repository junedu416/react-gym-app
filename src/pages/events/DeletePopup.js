import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../config/globalStore';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { modalStyling } from "../../styled-components/modal";
import { StyledModal } from "../../styled-components";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import BasicButton from '../../components/buttons/BasicButton';
import { deleteEvent } from '../../services/eventsServices';


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
        <StyledModal aria-labelledby="delete-event" aria-describedby="delete-event" open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 600, }}>
                <Fade in={open}>
                    <Box sx={modalStyling}>
                        <IconButton onClick={handleClose} aria-label="close confirmation popup" style={{ position: "absolute", right:"0px", top:"0px" }}>
                            <CloseIcon fontSize="large" />
                        </IconButton>

                        <h2>Are you sure you want to delete this event?</h2>
                        <BasicButton text="Confirm" color="error" size="medium" btnFunction={removeEvent} />
                        <BasicButton text="Cancel" color="info" size="medium" btnFunction={cancelConfirmation} />
                    </Box>
            </Fade>
        </StyledModal>
    )
}