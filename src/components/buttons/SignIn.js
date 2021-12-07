import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';

const SignInButton = (props) => {
  const { btnFunction } = props;
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      startIcon={<LoginIcon />}
      style={{ height: "55px" }}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
