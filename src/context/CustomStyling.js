import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { blue } from "@mui/material/colors";
import { lightBlue } from "@mui/material/colors";
import { teal } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { lightGreen } from "@mui/material/colors";
import { lime } from "@mui/material/colors";
import { orange } from "@mui/material/colors";
import { deepOrange } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import { blueGrey } from "@mui/material/colors";

// const themeConext = useContext(ThemeContext)
export const customStyles = createTheme({
    palette: {
      mode: "light",
  
      primary: {
        light: lightBlue[300],
        main: blue.A400,
        dark: blue[900],
      },
  
      error: {
        light: red[400],
        main: red.A400,
        dark: red.A700,
      },
  
      warning: {
        light: orange[500],
        main: orange.A700,
        dark: deepOrange.A400,
      },
  
      info: {
        light: grey[400],
        main: grey[500],
        dark: grey[600],
      },
  
      success: {
        light: green.A200,
        // main: lightGreen.A700,
        main: green.A400,
        dark: green.A700,
      },
  
      secondary: {
        light: grey[300],
        main: grey[700],
        dark: grey[800],
      },
    },
  });

// lightBlue[A400];
// lightBlue[300];
// lightBlue[700];
// lightBlue[900];
// blue[500];
// blue[A400];
// blue[A700];

// teal[A200];
// teal[A400];
// lightGreen[A200];
// lightGreen[A400];
// lightGreen[A700];
// green[A200];
// green[A400];

// red[400];
// red[500];
// red[600];
// red[700];
// red[800];

// orange[500];
// orange[700];
// orange[A700];

// deepOrange[500];
// deepOrange[A400];

// blueGrey[200];
// blueGrey[400];
// blueGrey[700];

