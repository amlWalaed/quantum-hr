import { Container } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

export const Index = () => {
  return (
    <Container maxWidth="md">
      <Outlet />
    </Container>
  );
};

