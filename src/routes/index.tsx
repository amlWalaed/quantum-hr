import { createFileRoute } from '@tanstack/react-router';
import { Box, Container, Typography, Button } from '@mui/material';
import { useExampleStore } from '../stores/exampleStore';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { count, increment } = useExampleStore();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Quantum HR
        </Typography>
        <Typography variant="body1" paragraph>
          Your React + TypeScript + Vite project is ready!
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Zustand Store Example:
          </Typography>
          <Typography variant="body1" gutterBottom>
            Count: {count}
          </Typography>
          <Button variant="contained" onClick={increment} sx={{ mt: 2 }}>
            Increment
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

