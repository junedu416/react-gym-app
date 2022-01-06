import Button from "@mui/material/Button";

const BasicButton = (props) => {
    // colour options for buttons: primary, secondary, warning, error, success
    // size options: small, medium, large
    const { btnFunction, text, color, size, style, disabled, type } = props;
    const buttonStyle = {height: "55px", minWidth: "116px"}

  return (
    <Button
      variant={type ? type : "contained"}
      color={color ? color : "primary"}
      size={size}
      style={{...buttonStyle, ...style}}
      onClick={btnFunction}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default BasicButton;
