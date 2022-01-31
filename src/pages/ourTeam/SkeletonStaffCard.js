import { Skeleton } from "@mui/material";
import { SkeletonText } from "../../components/SkeletonSquare";
import { Container, Row } from "../../styled-components";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const SkeletonStaffCard = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(
    theme.breakpoints.up("sm") && theme.breakpoints.down("md")
  );

  return (
    <Container
      w={mobile ? "95vw" : tablet ? "435px" : "400px"}
      h={mobile ? "280px" : "300px"}
      br=" 10px"
      greyBorder
      shadow
      hoverMixin
      justify="flex-start"
      m="0 auto"
      style={{ overflow: "hidden", height: "100%" }}
    >
      <Skeleton animation="wave" variant="text" width="70%" height={70} />
      <Row w="100%" p="0 20px 25px">
        <Container w="minmax(35%, 35%)" justify="flex-start" mr="12px">
          <Skeleton
            animation="wave"
            variant="circular"
            width="120px"
            height="120px"
          />

          <Skeleton
            animation="wave"
            variant="rectangular"
            width={100}
            height={50}
            sx={{
              mr: 1,
              borderRadius: "7px",
              p: "20px",
              m: "25px 5px 10px",
            }}
          />
        </Container>

        <Container w="65%" h="100%" justify="flex-start" ml="20px">
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
          <SkeletonText width="50%" height={40} sx={{ mt: 1 }} />
        </Container>
      </Row>
    </Container>
  );
};
