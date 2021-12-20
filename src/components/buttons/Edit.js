import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';

const EditButton = (props) => {
  const { btnFunction } = props;
  return (
    <Button
      variant="outlined"
      size="large"
      color="success"
      onClick={btnFunction}
      style={{
        color: "grey",
        border: "none",
        display: "flex",
        flexDirection: "column",
        borderRadius: "100%",
        alignSelf: `${props.align ? props.align : "flex-end"}`,
      }}
    >
      <EditIcon />
      <p style={{color: "lime", textTransform: "lowercase", margin: "0"}}>Edit</p>
    </Button>
  );
};

export default EditButton;
