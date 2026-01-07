import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "../stores/authStore";

export const GuestRouteGuard = () => {
  const { isAuthenticated, token, user } = useAuthStore.getState();

  const authenticated = isAuthenticated || !!(token && user);

  if (authenticated) {
    throw redirect({
      to: "/",
    });
  }
};
