import { Alert, Collapse, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const ReusableAlert = (props) => {
  const { type, btnFunction, message } = props;
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
      <Alert
        severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={ btnFunction }
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
};
