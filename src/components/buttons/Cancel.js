import Button from "@mui/material/Button";

const Cancel = (props) => {
  const { btnFunction } = props;
  return (
    <Button
      variant="contained"
      color="error"
      size="large"
      style={{ height: "55px", width: "116px" }}
      onClick={btnFunction}
    >
      Cancel
    </Button>
  );
};

export default Cancel;
