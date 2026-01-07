import { Box, Typography } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import Navbar from "./partials/Navbar";

export const AuthLayout = () => {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "grey.50" }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          py: 3,
          minHeight: "85svh",
          backgroundColor: "grey.50",
        }}
      >
        <Outlet />
      </Box>
      <Typography
        align="center"
        color="textDisabled"
        variant="body2"
        paddingBlock={2}
      >
        All rights reserved by Aml walaed &copy; 2026
      </Typography>
    </Box>
  );
};
