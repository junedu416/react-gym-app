import Button from "@mui/material/Button";

const BasicButton = (props) => {
    // colour options for buttons: primary, secondary, warning, error, success
    // size options: small, medium, large
    const { btnFunction, text, color, size, style } = props;
    const buttonStyle = {height: "55px", width: "116px"}

  return (
    <Button
      variant="contained"
      color={color}
      size={size}
      style={{...buttonStyle, ...style}}
      onClick={btnFunction}
    >
      {text}
    </Button>
  );
};

export default BasicButton;
