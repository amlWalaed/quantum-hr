import { Box, Container } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

export const GuestLayout = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
          py: 4,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

