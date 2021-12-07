import Button from "@mui/material/Button";

const Confirm = (props) => {
  const { btnFunction } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      style={{ height: "55px" }}
    >
      Confirm
    </Button>
  );
};

export default Confirm;
