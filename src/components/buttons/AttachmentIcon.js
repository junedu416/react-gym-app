import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton } from "@mui/material";

const Send = (props) => {
  const { btnFunction } = props;
  return (
    <IconButton aria-label="send" color="default" component="span" onClick={btnFunction}>
      <AttachFileIcon />
    </IconButton>
  );
};

export default Send;
