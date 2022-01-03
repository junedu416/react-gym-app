// //Unused Component
// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import { Container } from "../../styled-components";
// import { Overview } from "./Overview";

// const drawerWidth = "230px";

// const Dashboard = () => {
//   const [dashboardView, setDashboardView] = useState(<Overview />);

//   return (
//     <Container style={{ flexDirection: "row" }}>
//       <CssBaseline />
//       {/* ================ Dashboard content display ================ */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           bgcolor: "background.default",
//           px: 3,
//           height: "100vh",
//           width: `calc(100vw - ${drawerWidth})`,
//         }}
//       >
//         {dashboardView}
//       </Box>
//     </Container>
//   );
// };

// export default Dashboard;
