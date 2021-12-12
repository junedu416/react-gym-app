import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import { grey } from '@mui/material/colors'

const Info = (props) => {
  const { btnFunction } = props;
  const tooltipText = `View details about ${props.info}`;
  const color = grey[400];
  return (
    <Tooltip title={tooltipText} enterDelay={400}>
      <Button
        variant="contained"
        size="large"
        color="info"
        onClick={btnFunction}
        // style={{ marginLeft: "10px" }}
      >
        More Info
      </Button>
    </Tooltip>
  );
};

export default Info;
