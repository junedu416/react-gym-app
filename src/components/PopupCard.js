import React from "react";
import { modalStyling } from "../styled-components/modal";
import { StyledModal } from "../styled-components";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";


export const PopupCard = ({open, handleClose}) => {
  
    return(
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
                        <IconButton onClick={handleClose} aria-label="close confirmation popup" style={{ position: "absolute", right:"0px", top:"0px" }}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Fade>
            </StyledModal>
      </div>
    )
}