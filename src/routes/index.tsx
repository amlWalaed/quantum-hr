import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Container } from "@mui/material";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Container maxWidth="md">
      <Outlet />
    </Container>
  );
}
