import Button from "@mui/material/Button";
import { ButtonLink } from "../../styled-components";

const ViewExercises = (props) => {
  const { btnFunction } = props;
  return (
    <ButtonLink to="/exercises">
      <Button
        variant="outlined"
        size="large"
        // color="primary"
        onClick={btnFunction}
        style={{
          color: "lime",
          border: "1.7px solid lime",
          borderRadius: "6px",
          opacity: "1",
          "&:hover": { opacity: "1" },
        }}
      >
        View Exercises
      </Button>
    </ButtonLink>
  );
};

export default ViewExercises;
