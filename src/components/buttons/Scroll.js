import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ButtonScroll, Container } from "../../styled-components";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.pageYOffset > 150) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
//   });
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const inAnimation = {
    animation: "inAnimation 1400ms ease"
  };
  const outAnimation = {
    animation: "outAnimation 800ms ease-in-out"
  };

  return (
      <Container style={{ opacity: visible ? 1 : 0, transition: "opacity 1s" }}>
    <ButtonScroll
      onClick={scrollToTop}
      style={ visible ? inAnimation : outAnimation }
    >
      <KeyboardArrowUpIcon sx={{ fontSize: "3rem" }} />
    </ButtonScroll>
    </Container>
  );
};

export default ScrollButton;
