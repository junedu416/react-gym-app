import React from 'react';
import { modalStyling } from "../styled-components/modal";
import { StyledModal } from "../styled-components";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

export const PopupCard = ({open, handleClose, children}) =>  {

    return(
        <StyledModal
            aria-labelledby="popup-card"
            aria-describedby="popup-card"
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
                    <IconButton onClick={handleClose}
                        aria-label="close-popup"
                        style={{ position: "absolute", right:"0px", top:"0px" }}>
                        <CloseIcon fontSize="large" />
                    </IconButton>

                    {children}

                </Box>
            </Fade>
        </StyledModal>
    )
}