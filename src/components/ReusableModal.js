import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { modalStyling } from "../styled-components/modal";
import { StyledModal } from "../styled-components";

export const ReusableModal = ({
  title,
  subtitle,
  children,
  open,
  handleClose,
  actionButtons,
}) => {
  return (
    <>
      <StyledModal
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
              aria-label="close popup"
              style={{ position: "absolute", right: "0px", top: "0px" }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>

            <DialogTitle id="title" fontWeight="bold">
              {title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>{subtitle}</DialogContentText>
              {children}
            </DialogContent>
            <DialogActions>{actionButtons}</DialogActions>
          </Box>
        </Fade>
      </StyledModal>
    </>
  );
};
