import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const Send = (props) => {
  const { btnFunction, sx, text } = props;
  return (
    <label htmlFor="icon-button-file">
      <Input accept="image/*" id="icon-button-file" type="file" filename ="reportImage" onChange={btnFunction} />
      <IconButton type="file" aria-label="send" component="span" sx={{ ...sx }} >
        <AttachFileIcon /> {text}
      </IconButton>
    </label>
  );
};

export default Send;
