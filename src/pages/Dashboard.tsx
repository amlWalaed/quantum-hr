import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
  Button,
  Alert,
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useUsersStore } from "../stores/usersStore";
import { fetchUsers } from "../services/usersApi";
import { UserDetailsModal } from "../components/UserDetailsModal";
import { UserList } from "../components/UserList";

export const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    setUsers,
    setSearchQuery,
    setCurrentPage,
    searchQuery,
    currentPage,
    getPaginatedUsers,
    getTotalPages,
    refreshUsers,
  } = useUsersStore();

  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (users) {
      setUsers(users);
    }
  }, [users, setUsers]);

  const handleRefresh = async () => {
    await refreshUsers();
    refetch();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const paginatedUsers = getPaginatedUsers();
  const totalPages = getTotalPages();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h4" component="h1" fontWeight={700}>
            User Dashboard
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={isLoading}
          >
            Refresh Users
          </Button>
        </Box>

        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search users by name..."
            value={searchQuery}
            onChange={handleSearchChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ maxWidth: 400 }}
          />
        </Paper>

        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error instanceof Error ? error.message : "Failed to load users"}
          </Alert>
        )}

        <UserList
          users={paginatedUsers}
          isLoading={isLoading}
          searchQuery={searchQuery}
          onViewDetails={handleViewDetails}
        />

        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Showing {paginatedUsers.length} of{" "}
            {useUsersStore.getState().filteredUsers.length} users
            {searchQuery &&
              ` (filtered from ${useUsersStore.getState().users.length} total)`}
          </Typography>
        </Box>
      </Box>

      <UserDetailsModal
        open={modalOpen}
        user={selectedUser}
        onClose={() => {
          setModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </Container>
  );
};
