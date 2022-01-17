import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export const UploadIcon = (props) => {
  const { btnFunction } = props;
  return (
    <IconButton aria-label="upload" color="default" component="span" onClick={btnFunction}>
      <PhotoCameraIcon />
    </IconButton>
  );
};

export const UploadButton = (props) => {
  const { btnFunction } = props;
  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
      onClick={btnFunction}
    >
      <PhotoCameraIcon style={{marginRight:"7px"}} /> Upload
    </Button>
  );
};
