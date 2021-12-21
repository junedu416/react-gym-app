import Button from "@mui/material/Button";
import { ButtonLink } from "../../styled-components";
// import AddCircleIcon from "@mui/icons-material/AddCircle";

const CreateWorkout = (props) => {
  const { btnFunction } = props;
  return (
    <ButtonLink to="/workouts/new">
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={btnFunction}
        sx={{m:4}}
      >
       {/* <AddCircleIcon />  */}
       Create Workout
      </Button>
    </ButtonLink>
  );
};

export default CreateWorkout;
