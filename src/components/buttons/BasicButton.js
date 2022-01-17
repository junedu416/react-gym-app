import Button from "@mui/material/Button";

const BasicButton = (props) => {
    // Variant types: contained, outlined, text (default)
    // colour options for buttons: primary, secondary, warning, error, success
    // size options: small, medium, large
    const { btnFunction, text, color, size, style, disabled, variant, startIcon, endIcon, sx, type, onChangeFunction } = props;
    const buttonStyle = {height: "55px", minWidth: "140px"}

  return (
    <Button
      variant={ variant ? variant : "contained" }
      color={ color ? color : "primary" }
      size={ size ? size : "large" }
      style={{...buttonStyle, ...style}}
      onClick={btnFunction}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{my: 2, mx: 1, ...sx}}
      type={type}
      onChange={onChangeFunction}
    >
      {text}
    </Button>
  );
};

export default BasicButton;