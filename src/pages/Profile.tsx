import { useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { mockUpdateProfile } from "../services/mockProfile";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  yearsOfExperience: z
    .number()
    .min(0, "Years of experience must be 0 or greater")
    .max(50, "Years of experience must be 50 or less"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  country: z.string().min(1, "Country is required"),
  postcode: z.string().min(1, "Postal code is required"),
  workingHours: z.string().min(1, "Working hours are required"),
});

type ProfileFormFields = z.infer<typeof profileSchema>;

export const Profile = () => {
  const { user, profileFields, updateProfileFields } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProfileFormFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.name.first || "",
      lastName: user?.name.last || "",
      phone: user?.phone || "",
      jobTitle: profileFields.jobTitle || "",
      yearsOfExperience: profileFields.yearsOfExperience || 0,
      street: user?.location.street.name || "",
      city: user?.location.city || "",
      state: user?.location.state || "",
      country: user?.location.country || "",
      postcode: String(user?.location.postcode || ""),
      workingHours: profileFields.workingHours || "9:00 AM - 5:00 PM",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("firstName", user.name.first);
      setValue("lastName", user.name.last);
      setValue("phone", user.phone);
      setValue(
        "street",
        `${user.location.street.number} ${user.location.street.name}`
      );
      setValue("city", user.location.city);
      setValue("state", user.location.state);
      setValue("country", user.location.country);
      setValue("postcode", String(user.location.postcode));
    }
    if (profileFields.jobTitle) {
      setValue("jobTitle", profileFields.jobTitle);
    }
    if (profileFields.yearsOfExperience !== undefined) {
      setValue("yearsOfExperience", profileFields.yearsOfExperience);
    }
    if (profileFields.workingHours) {
      setValue("workingHours", profileFields.workingHours);
    }
  }, [user, profileFields, setValue]);

  const {
    mutateAsync: updateProfile,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (data: ProfileUpdateData) => mockUpdateProfile(data),
    onSuccess: (data) => {
      updateProfileFields({
        jobTitle: data.jobTitle,
        yearsOfExperience: data.yearsOfExperience,
        workingHours: data.workingHours,
      });
    },
  });

  const onSubmit = async (formData: ProfileFormFields) => {
    try {
      const profileData: ProfileUpdateData = {
        name: {
          first: formData.firstName,
          last: formData.lastName,
        },
        phone: formData.phone,
        jobTitle: formData.jobTitle,
        yearsOfExperience: formData.yearsOfExperience,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postcode: formData.postcode,
        },
        workingHours: formData.workingHours,
      };

      await updateProfile(profileData);
    } catch (err) {
      // Error is handled by the mutation
      console.error("Profile update error:", err);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">User data not available</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 1 }}>
          Edit Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Update your personal information and work details
        </Typography>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Personal Information
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Work Information
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                placeholder="e.g., Software Engineer"
                {...register("jobTitle")}
                error={!!errors.jobTitle}
                helperText={errors.jobTitle?.message}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                type="number"
                {...register("yearsOfExperience", { valueAsNumber: true })}
                error={!!errors.yearsOfExperience}
                helperText={errors.yearsOfExperience?.message}
                disabled={isSubmitting}
                inputProps={{ min: 0, max: 50 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Working Hours"
                placeholder="e.g., 9:00 AM - 5:00 PM"
                {...register("workingHours")}
                error={!!errors.workingHours}
                helperText={
                  errors.workingHours?.message || "Format: 9:00 AM - 5:00 PM"
                }
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Address
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                {...register("street")}
                error={!!errors.street}
                helperText={errors.street?.message}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State/Province"
                {...register("state")}
                error={!!errors.state}
                helperText={errors.state?.message}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                {...register("country")}
                error={!!errors.country}
                helperText={errors.country?.message}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                {...register("postcode")}
                error={!!errors.postcode}
                helperText={errors.postcode?.message}
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>

          {isError && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error instanceof Error
                ? error.message
                : "Failed to update profile"}
            </Alert>
          )}

          {isSuccess && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Profile updated successfully!
            </Alert>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={
                isSubmitting ? <CircularProgress size={20} /> : <Save />
              }
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
