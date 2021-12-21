import Button from "@mui/material/Button";

const StartWorkout = (props) => {
  const { btnFunction } = props;
  return (
    <Button
      variant="outlined"
      size="large"
      color="success"
      onClick={btnFunction}
      style={{
        color: "lime",
        marginTop: "20px",
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
