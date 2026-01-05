import { createFileRoute } from "@tanstack/react-router";
import { Box, Container, Typography, Button } from "@mui/material";
import { useExampleStore } from "../stores/exampleStore";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <Container maxWidth="md"></Container>;
}
