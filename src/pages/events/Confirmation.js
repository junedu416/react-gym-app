import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Confirm from "../../components/buttons/Confirm";
import Cancel from "../../components/buttons/Cancel";
import { modalStyling } from "../../styled-components/modal";
import { StyledModal } from "../../styled-components";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

export const BookingConfirmation = ({title, eventName, instructor, date, time, level}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleClick() {
    // ADD LOGIC HERE FOR BOOKING CONFIRMATION
  }

  function determineColor(level) {
    if (level === "Beginner") return "success";
    else if (level === "Intermediate") return "warning";
    else if (level === "Advance") return "error";
    else return "primary";
  }

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        style={{ height: "50px" }}
        onClick={handleOpen}
      >
        Book - popup confirmation
      </Button>
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
              {title}
            </Typography>
            <Typography id="booking-confirmation-description" sx={{ my: 3 }}>
              <p><b>Class:</b> <u>{eventName}</u></p>
              <p><b>Instructor: </b> {instructor}</p>
              <p><b>Level: </b> <Chip label={level} color={determineColor(level)} variant="outlined" /></p>
              <p><b>Date: </b> {date}</p>
              <p><b>Time: </b> {time}</p>
            </Typography>
            <Confirm 
              btnFunction = {() => {
                handleClick()
              }} 
            />
            <Cancel btnFunction={handleClose} />
          </Box>
        </Fade>
      </StyledModal>
      
    </div>
  );
}
