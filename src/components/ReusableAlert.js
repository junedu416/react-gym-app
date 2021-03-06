import { Collapse, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { StyledAlert } from "../styled-components";

export const ReusableAlert = (props) => {
  const { severity, btnFunction, text, open, variant } = props;

  return (
    <Collapse in={open}>
      <StyledAlert
        severity={severity ? severity : "error"}
        variant={variant}
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
        {text}
      </StyledAlert>
    </Collapse>
  );
};
