import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Dashboard,
  Person,
  Logout,
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";
import { useNavigate, Link } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user, profileFields } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const profile = {
    name: user ? `${user.name.first} ${user.name.last}` : "Quantum User",
    jobTitle: profileFields.jobTitle || "User",
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    setMobileOpen(false);
    logout();
    navigate({ to: "/login", replace: true });
  };

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    handleClose();
    setMobileOpen(false);
  };

  const navItems = [
    { label: "Dashboard", path: "/", icon: <Dashboard /> },
    { label: "Profile", path: "/profile", icon: <Person /> },
  ];

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, mb: 2 }}>
        <IconButton onClick={() => setMobileOpen(false)}>
          <Close />
        </IconButton>
      </Box>
      <Box sx={{ px: 2, mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          QuantumHR
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <Link
              to={item.path}
              activeOptions={{ exact: item.path === "/" }}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              {({ isActive }) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    px: 2,
                    py: 1.5,
                    cursor: "pointer",
                    backgroundColor: isActive
                      ? "action.selected"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                  onClick={() => {
                    handleNavigation(item.path);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 40,
                      color: isActive ? "primary.main" : "inherit",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography sx={{ ml: 2 }}>{item.label}</Typography>
                </Box>
              )}
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="primary"
                onClick={() => setMobileOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                cursor: "pointer",
              }}
              onClick={() => navigate({ to: "/" })}
            >
              Quantum HR
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  activeOptions={{ exact: item.path === "/" }}
                  style={{ textDecoration: "none" }}
                >
                  {({ isActive }) => (
                    <Box
                      component="span"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        px: 2,
                        py: 1,
                        color: isActive ? "primary.main" : "text.primary",
                        fontWeight: isActive ? 600 : 400,
                        fontSize: "0.875rem",
                        borderRadius: 1,
                        position: "relative",
                        cursor: "pointer",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 2,
                          backgroundColor: isActive
                            ? "primary.main"
                            : "transparent",
                          borderRadius: "2px 2px 0 0",
                        },
                        "&:hover": {
                          backgroundColor: "action.hover",
                          color: isActive ? "primary.main" : "text.primary",
                        },
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "1.125rem",
                        }}
                      >
                        {item.icon}
                      </Box>
                      {item.label}
                    </Box>
                  )}
                </Link>
              ))}
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={handleMenu} size="small">
              <Avatar>{profile?.name?.charAt(0).toUpperCase() || "Q"}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              slotProps={{
                paper: {
                  elevation: 3,
                  sx: {
                    mt: 1,
                    minWidth: 180,
                    borderRadius: 2,
                  },
                },
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {profile?.name || "Quantum User"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {profile?.jobTitle || "User"}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={() => handleNavigation("/profile")}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem
                sx={{
                  color: "error.main",
                }}
                onClick={handleLogout}
              >
                <ListItemIcon>
                  <Logout color="error" fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
