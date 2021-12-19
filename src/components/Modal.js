import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Confirm from "./buttons/Confirm";
import Cancel from "./buttons/Cancel";

import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  //   border: '1px solid white',
  boxShadow: 24,
  p: 5,
};

const StyledModal = styled(Modal)`
  .MuiBackdrop-root {
    background-color: rgba(0,0,0, 0.8);
    backdrop-filter: blur(1px);
  }
`;

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
          <Box sx={style}>
            <Typography
              id="booking-confirmation-title"
              variant="h6"
              fontWeight="bold"
              component="h2"
            >
              Booking Confirmation
            </Typography>
            <Typography id="booking-confirmation-description" sx={{ my: 3 }}>
              Confirm booking for <u>Beginner's Yoga class</u> with Tracy Summers 
              on <b>Weds 22nd Dec at 1:00pm - 2:00pm</b>.
            </Typography>
            <Confirm style={{ marginRight: "5" }} />
            <Cancel />
          </Box>
        </Fade>
      </StyledModal>
    </div>
  );
}
