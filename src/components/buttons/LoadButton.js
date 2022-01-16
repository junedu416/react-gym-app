import { LoadingButton } from "@mui/lab";

export const LoadButton = (props) => {
  const {
    btnFunction,
    color,
    disabled,
    endIcon,
    loading,
    loadPosition,
    size,
    startIcon,
    style,
    sx,
    text,
    type,
    variant,
  } = props;

  const buttonStyle = { height: "55px", minWidth: "140px" };

  return (
    <LoadingButton
      onClick={btnFunction}
      endIcon={endIcon}
      startIcon={startIcon}
      color={color ? color : "primary"}
      loading={loading}
      loadingPosition={loadPosition ? loadPosition : "end"}
      variant={variant ? variant : "contained"}
      type={type}
      size={size ? size : "large"}
      style={{ ...buttonStyle, ...style }}
      sx={{ my: 2, mx: 1, ...sx }}
      disabled={disabled}
    >
      {text}
    </LoadingButton>
  );
};
