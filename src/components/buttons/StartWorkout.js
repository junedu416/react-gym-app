import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";

const StartWorkout = (props) => {
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
      Start Workout
    </Button>
  );
};

export default StartWorkout;
