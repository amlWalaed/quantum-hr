import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Visibility, Email, LocationOn } from "@mui/icons-material";

interface UserCardProps {
  user: User;
  onViewDetails: (user: User) => void;
}

export const UserCard = ({ user, onViewDetails }: UserCardProps) => {
  const fullName = `${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.country}`;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Avatar
            src={user.picture.medium}
            alt={fullName}
            sx={{ width: 56, height: 56 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600} noWrap>
              {fullName}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              {user.name.title}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Email fontSize="small" color="action" />
            <Typography variant="body2" noWrap sx={{ flex: 1 }}>
              {user.email}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2" noWrap sx={{ flex: 1 }}>
              {location}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Visibility />}
          onClick={() => onViewDetails(user)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};
