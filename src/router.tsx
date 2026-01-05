import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";
import { RootLayout } from "./layouts/RootLayout";
import { GuestLayout } from "./layouts/GuestLayout";
import { Index } from "./pages/Index";
import { Login } from "./pages/Login";
import { useAuthStore } from "./stores/authStore";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

const guestRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_guest",
  component: GuestLayout,
  beforeLoad: ({}) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      redirect({ to: "/" });
    }
  },
});

const loginRoute = createRoute({
  getParentRoute: () => guestRoute,
  path: "/login",
  component: Login,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  guestRoute.addChildren([loginRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
