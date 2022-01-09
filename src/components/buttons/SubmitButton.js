import Button from "@mui/material/Button";

const SubmitButton = (props) => {
  const { btnFunction } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      style={{ height: "55px" }}
      onClick={btnFunction}
      type="submit"
    >
      Submit
    </Button>
  );
};

export default SubmitButton;
