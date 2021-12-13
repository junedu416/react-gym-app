import Button from "@mui/material/Button";
import { ButtonLink } from "../../styled-components";

const TrainerWorkouts = (props) => {
  const { btnFunction } = props;
  return (
    <ButtonLink to="/workouts/trainer-workouts">
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={btnFunction}
        sx={{m:4}}
      >
       Trainer Workouts
      </Button>
    </ButtonLink>
  );
};

export default TrainerWorkouts;
