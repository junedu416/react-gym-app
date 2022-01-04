import React, { useEffect, useReducer } from "react";
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

export const EventPopup = ({open, setOpen, event}) => {
  const handleClose = () => setOpen(false);

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
  }
}, [event])


  const bookClass = (e) => {
    e.preventDefault();
  }

  const navigateToShowPage = (e) => {
    e.preventDefault();
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
              {/* <p><b>Instructor: </b> {event.creatorName}</p> */}
              <p><Chip label={event.category} color={determineColor(event.category)} variant="outlined" /></p>
              <p><b>Date: </b> {eventDates.startDate} {(eventDates.startDate !== eventDates.endDate) && ` - ${eventDates.endDate}`}</p>
              <p><b>Time: </b> {eventDates.startTime} - {eventDates.endTime}</p>
            </Typography>
            <BasicButton text="Count me in!" color="success" size="large" btnFunction={bookClass}/>
            <BasicButton text="More Details" color="secondary" size="large" btnFunction={navigateToShowPage} />
          </Box>
        </Fade>
      </StyledModal>
      
    </div> }
    </>
  );
}
