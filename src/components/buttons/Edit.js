import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

const EditButton = (props) => {
  const { btnFunction, hoverStyling, color } = props;
  return (
    <Button
      variant="text"
      onClick={btnFunction}
      sx={{
        color: color ? color : "inherit",
        border: "none",
        display: "flex",
        flexDirection: "column",
        borderRadius: "50%",
        alignSelf: `${props.align ? props.align : "flex-end"}`,
        ...hoverStyling 
      }}
    >
      <EditIcon />
      <p style={{ margin: "0", textTransform: "lowercase" }}>edit</p>
    </Button>
  );
};

export default EditButton;