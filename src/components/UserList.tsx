import {
  Box,
  Card,
  CardContent,
  CardActions,
  Skeleton,
  Typography,
} from "@mui/material";
import { UserCard } from "./UserCard";

interface UserListProps {
  users: User[];
  isLoading: boolean;
  searchQuery: string;
  onViewDetails: (user: User) => void;
}

export const UserList = ({
  users,
  isLoading,
  searchQuery,
  onViewDetails,
}: UserListProps) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Card elevation={2} key={index}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Skeleton variant="circular" width={56} height={56} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="text" width="40%" height={20} />
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Skeleton variant="circular" width={16} height={16} />
                  <Skeleton variant="text" width="70%" height={20} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Skeleton variant="circular" width={16} height={16} />
                  <Skeleton variant="text" width="80%" height={20} />
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Skeleton variant="rectangular" width="100%" height={36} />
            </CardActions>
          </Card>
        ))}
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {searchQuery
            ? "No users found matching your search"
            : "No users available"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 3,
      }}
    >
      {users.map((user) => (
        <UserCard
          key={user.login.uuid}
          user={user}
          onViewDetails={onViewDetails}
        />
      ))}
    </Box>
  );
};
