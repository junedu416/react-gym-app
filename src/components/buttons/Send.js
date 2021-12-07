import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";

const Send = (props) => {
  const { btnFunction } = props;
  return (
    <IconButton aria-label="send" component="span" onClick={btnFunction}>
      <SendIcon />
    </IconButton>
  );
};

export default Send;
