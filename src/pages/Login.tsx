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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { mockLogin } from "../services/mockLogin";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "@tanstack/react-router";

const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type FormFields = z.infer<typeof loginSchema>;

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: onSubmit } = useMutation({
    mutationFn: (variables: FormFields) => {
      return mockLogin(variables);
    },
    onSuccess: (data) => {
      setAuth(data.access, {
        gender: "other",
        name: {
          title: "Mx",
          first: "Quantum",
          last: "User",
        },
        location: {
          street: {
            number: 123,
            name: "Tech Street",
          },
          city: "San Francisco",
          state: "CA",
          country: "USA",
          postcode: "94102",
          coordinates: {
            latitude: "37.7749",
            longitude: "-122.4194",
          },
          timezone: {
            offset: "-08:00",
            description: "Pacific Time (US & Canada)",
          },
        },
        email: "q@quantum.io",
        login: {
          uuid: "fake-uuid-1234",
          username: "quantumuser",
          password: "qTask123#",
          salt: "abc123",
          md5: "md5hash",
          sha1: "sha1hash",
          sha256: "sha256hash",
        },
        dob: {
          date: "1990-01-01T00:00:00.000Z",
          age: 34,
        },
        registered: {
          date: "2020-01-01T00:00:00.000Z",
          age: 4,
        },
        phone: "+1 (555) 123-4567",
        cell: "+1 (555) 765-4321",
        id: {
          name: "SSN",
          value: "123-45-6789",
        },
        picture: {
          large: "https://randomuser.me/api/portraits/lego/1.jpg",
          medium: "https://randomuser.me/api/portraits/med/lego/1.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/lego/1.jpg",
        },
        nat: "US",
      });
      navigate({ to: "/" });
    },
    onError: (error) => {
      setError("email", { message: error.message });
    },
  });

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 420,
        padding: 4,
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

      <Box
        component="form"
        onSubmit={handleSubmit((data) => onSubmit(data))}
        noValidate
      >
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isSubmitting}
          sx={{ mb: 2.5 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            },
          }}
          placeholder="q@quantum.io"
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isSubmitting}
          sx={{ mb: 3 }}
          slotProps={{
            input: {
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
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isSubmitting}
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
};
