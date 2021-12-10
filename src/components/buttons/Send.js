import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

const Send = (props) => {
  const { btnFunction } = props;
  return (
    <IconButton aria-label="send" color="primary" component="span" onClick={btnFunction}>
      <SendIcon />
    </IconButton>
  );
};

export default Send;
