import Skeleton from "@mui/material/Skeleton";
import { Container } from "../styled-components";

export const SkeletonSquare = () => {
  return (
    <Skeleton
      animation="wave"
      variant="rectangular"
      width={580}
      height={290}
      sx={{
        mr: 1,
        borderRadius: "20px",
        p: "20px",
        m: "10px 5px",
        maxWidth: "98%",
      }}
    />
  );
};

export const SkeletonNotification = () => {
  return (
    <Container direction="row" justify="flex-start" w="100%">
      <Skeleton
        animation="wave"
        variant="circular"
        width={45}
        height={45}
        sx={{ mr: 1, ml: "30px" }}
      />
      <Skeleton animation="wave" variant="text" width={250} />
    </Container>
  );
};
