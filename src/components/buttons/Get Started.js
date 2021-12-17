import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import { green } from "@mui/material/colors";

const GetStarted = (props) => {
  const { btnFunction } = props;
  const color = green;
  return (
    <Button
      variant="outlined"
      size="large"
      color="success"
      onClick={btnFunction}
      style={{
        color: "lime",
        border: "1.7px solid lime",
        borderRadius: "6px",
        opacity: "1",
        "&:hover": { opacity: "1" }
      }}
    >
      Get Started
    </Button>
  );
};

export default GetStarted;
