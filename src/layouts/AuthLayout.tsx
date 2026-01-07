import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import Navbar from "./partials/Navbar";

export const AuthLayout = () => {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Navbar />
      <Box component="main" sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
        <Outlet />
      </Box>
    </Box>
  );
};
