import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const Route = createFileRoute("/_guest/Login")({
  component: RouteComponent,
});
type FormFields = {
  email: string;
  password: string;
};

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit = (data: FormFields) => {
    console.log("Form submitted:", data);
    // TODO: Implement login logic
  };

  return (
    <Paper
      elevation={8}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 420,
        borderRadius: 3,
        background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          QuantumHR
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to your account
        </Typography>
      </Box>

      {/* {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )} */}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isSubmitting}
          sx={{ mb: 2.5 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
          placeholder="q@quantum.io"
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Password is required",
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isSubmitting}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  disabled={isSubmitting}
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
            boxShadow: "0 4px 14px rgba(26, 35, 126, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)",
              boxShadow: "0 6px 20px rgba(26, 35, 126, 0.5)",
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign In"
          )}
        </Button>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: "center", mt: 3 }}
        >
          Use: q@quantum.io / qTask123#
        </Typography>
      </Box>
    </Paper>
  );
}
