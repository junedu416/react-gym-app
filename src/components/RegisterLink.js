import { TextLink } from "../styled-components";


export const RegisterLink = (props) => {
  const { navigateLink } = props;
  return (
    <p style={{ display: "flex" }}>
      Don't have an account?
      <TextLink mt="0" p="0 10px" onClick={navigateLink}>
        Register
      </TextLink>
    </p>
  );
};
