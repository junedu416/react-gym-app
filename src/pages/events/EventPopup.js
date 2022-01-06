import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { modalStyling } from "../../styled-components/modal";
import { StyledModal } from "../../styled-components";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import { showEventReducer } from "../../utils/showEvent-reducer";
import BasicButton from "../../components/buttons/BasicButton";
import { useGlobalState } from "../../config/globalStore";
import { editEvent } from "../../services/eventsServices";
import { isUserRegistered } from "../../utils/events-helper-functions";

export const EventPopup = ({open, setOpen, event, setEvent, dispatchEventsVars}) => {
  const {store, dispatch} = useGlobalState();
  const {profile} = store;
  const navigate = useNavigate();
  const [confirmMessage, setConfirmMessage] = useState("")
  const [userIsRegistered, setUserIsRegistered] = useState(false)

  const initialEventDates = {
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    isFinished: false
}
  const [eventDates, dispatchEventDates] = useReducer(showEventReducer, initialEventDates)

  useEffect(() => {
    if(event){
      dispatchEventDates({
          type: "setEventTimes",
          data: {
              startTime: event.startTime,
              endTime: event.endTime
          }
      })
      const userIsRegistered = isUserRegistered(profile, event.registeredUsers)
      setUserIsRegistered(userIsRegistered)
    }
  }, [event, profile])


  const handleClose = () => {
    setOpen(false);
    setEvent(null);
  }

  const bookClass = (e) => {
    e.preventDefault();
    setConfirmMessage("confirm")
  }

  const cancelBooking = (e) => {
    e.preventDefault();
    setConfirmMessage("cancel")
  }

  const navigateToShowPage = (e) => {
    navigate(`./${event._id}`)
  }

  const updateEvent = (columnsToUpdate, message) => {
    const updatedEvent = {
      ...event,
      ...columnsToUpdate
    }
    console.log("updated event object is: ", updatedEvent);
    editEvent(event._id, updatedEvent)
    .then((response) => {
      console.log(`successfully updates event: `, response)
      dispatchEventsVars({type: "updateSingleEvent", data: response})
    }).then(() => {
      dispatch({type: 'setNotification', data: message})
      setEvent(null)
      setOpen(false);
    })
    .catch(e => console.log(e))
  }

  const registerToEvent =(e) => {
    const columnsToUpdate = {
      registeredUsers: [...event.registeredUsers, profile._id],
      spotsAvailable: event.spotsAvailable - 1
    }
    updateEvent(columnsToUpdate, "Successfully registered")
  }

  const cancelRegistration = (e) => {
    const registeredClone = [...event.registeredUsers];
    const updatedRegisteredUsers = registeredClone.filter((id) => id !== profile._id)

    const columnsToUpdate = {
      spotsAvailable: event.spotsAvailable + 1,
      registeredUsers: updatedRegisteredUsers
    }
    updateEvent(columnsToUpdate, "Successfully cancelled your registration")
  }

  function determineColor(category) {
    if (category === "Class") return "success";
    else if (category === "Personal Training") return "warning";
    else if (category === "Competition") return "error";
    else return "primary";
  }

  return (
    <>
    {event && 
    <div>
      <StyledModal
        aria-labelledby="booking-confirmation"
        aria-describedby="booking-confirmation"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 600,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyling}>
          <IconButton 
                  onClick={handleClose}
                  aria-label="close confirmation popup"
                  style={{ position: "absolute", right:"0px", top:"0px" }}
                //   size="large"
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            <Typography
              id="booking-confirmation-title"
              variant="h5"
              fontWeight="bold"
              component="h2"
            >
              {event.name}
            </Typography>
            <Typography id="booking-confirmation-description" sx={{ my: 3 }}>
              <p><Chip label={event.category} color={determineColor(event.category)} variant="outlined" /></p>
              <p><b>Date: </b> {eventDates.startDate} {(eventDates.startDate !== eventDates.endDate) && ` - ${eventDates.endDate}`}</p>
              <p><b>Time: </b> {eventDates.startTime} - {eventDates.endTime}</p>
            </Typography>
            {!eventDates.isFinished && !userIsRegistered && 
              <BasicButton text="Count me in!" color="success" size="medium" btnFunction={bookClass}/>}
            {!eventDates.isFinished && userIsRegistered && 
              <BasicButton text="Cancel Registration" color="success" size="medium" btnFunction={cancelBooking}/>}
              <BasicButton text="More Details" color="secondary" size="medium" btnFunction={navigateToShowPage} />
            {confirmMessage && 
              <div>
                <p>Are you sure?</p>
                {confirmMessage === 'confirm' && <BasicButton text="Confirm" color="error" size="medium" btnFunction={registerToEvent} />}
                {confirmMessage === 'cancel' && <BasicButton text="Cancel" color="error" size="medium" btnFunction={cancelRegistration} />}
              </div>
            }
          </Box>
        </Fade>
      </StyledModal>
      
    </div> }
    </>
  );
}
