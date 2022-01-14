import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Fade, IconButton, Tooltip } from "@mui/material";
import { BackWrapper } from "../styled-components";

export const Back = (props) => {
  const { btnFunction, open, desktop } = props;

  return (
    <BackWrapper open={open} desktop={desktop}>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 800 }}
        title="Back"
        arrow
      >
        <IconButton color="primary" aria-label="back" size="large">
          <ArrowBackIosNewIcon
            onClick={btnFunction}
            sx={{ fontSize: "2.2rem" }}
          />
        </IconButton>
      </Tooltip>
    </BackWrapper>
  );
};
