import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button, IconButton, Stack } from "@mui/material";
import { BackWrapper } from "../styled-components";

export const Back = (props) => {
  const { btnFunction } = props;

  return (
    <BackWrapper>
      {/* <Stack direction="row" spacing={1}>
        <Button
          variant="text"
          onClick={btnFunction}
          startIcon={<ArrowBackIosNewIcon />}
        >
          Back
        </Button>
      </Stack> */}

      <IconButton color="primary" aria-label="back" size="large">
        <ArrowBackIosNewIcon onClick={btnFunction} sx={{ fontSize:"2.2rem" }} />
      </IconButton>
    </BackWrapper>
  );
};
