import Button from "@mui/material/Button";

const CreateEvent = (props) => {
  const { btnFunction } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      style={{ height: "55px" }}
      onClick={btnFunction}
    >
      Create Event
    </Button>
  );
};

export default CreateEvent;
