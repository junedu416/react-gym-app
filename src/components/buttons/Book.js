import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

const Book = (props) => {
    const { btnFunction } = props;
    const tooltipText = `Book appointment for ${props.booking}`;
    return (
      <Tooltip title={tooltipText} enterDelay={400}>
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={btnFunction}
          // style={{ marginLeft: "10px" }}
        >
          Book
        </Button>
      </Tooltip>
    );  
}

export default Book;