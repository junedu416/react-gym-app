import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

const EditButton = (props) => {
  const { btnFunction, hoverStyling } = props;
  return (
    <Button
      variant="text"
      onClick={btnFunction}
      color="inherit"
      sx={{
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