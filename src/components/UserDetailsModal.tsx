import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Avatar,
  Typography,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import { Close, Email, Phone, LocationOn, Person } from "@mui/icons-material";

interface UserDetailsModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

export const UserDetailsModal = ({
  open,
  user,
  onClose,
}: UserDetailsModalProps) => {
  if (!user) return null;

  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const fullAddress = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}, ${user.location.country}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" component="span">
            User Details
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Avatar
            src={user.picture.large}
            alt={fullName}
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h5" fontWeight={600}>
            {fullName}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Email color="primary" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
            </Box>
            <Typography variant="body1">{user.email}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Phone color="primary" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Phone
              </Typography>
            </Box>
            <Typography variant="body1">{user.phone}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <LocationOn color="primary" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Address
              </Typography>
            </Box>
            <Typography variant="body1">{fullAddress}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Person color="primary" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Nationality
              </Typography>
            </Box>
            <Typography variant="body1">{user.nat}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

