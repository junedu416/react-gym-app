import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Confirm from "./buttons/Confirm";
import Cancel from "./buttons/Cancel";
import { modalStyling } from "../styled-components/modal";
import { StyledModal } from "../styled-components";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function ModalTransition() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                  aria-lable="close confirmation popup"
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
            //   style={{ display: "flex", justifyContent:"space-between", alignItems: "center"}}
            >
              Booking Confirmation

            </Typography>
            <Typography id="booking-confirmation-description" sx={{ my: 3 }}>
              Confirm booking for <u>Beginner's Yoga class</u> with Tracy Summers 
              on <b>Weds 22nd Dec at 1:00pm - 2:00pm</b>.
            </Typography>
            <Confirm />
            <Cancel />
          </Box>
        </Fade>
      </StyledModal>
      
    </div>
  );
}
