import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "../stores/authStore";

export const ProtectedRouteGuard = () => {
  const { isAuthenticated, token, user } = useAuthStore.getState();

  const authenticated = isAuthenticated || !!(token && user);

  if (!authenticated) {
    throw redirect({
      to: "/login",
      search: {
        redirect: window.location.pathname,
      },
    });
  }
};
