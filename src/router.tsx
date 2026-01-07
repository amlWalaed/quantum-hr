import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { RootLayout } from "./layouts/RootLayout";
import { GuestLayout } from "./layouts/GuestLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Index } from "./pages/Index";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRouteGuard } from "./guards/ProtectedRouteGuard";
import { GuestRouteGuard } from "./guards/GuestRouteGuard";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const protectedRoute = createRoute({
  id: "_protected",
  getParentRoute: () => rootRoute,
  component: AuthLayout,
  beforeLoad: () => {
    ProtectedRouteGuard();
  },
});

const guestRoute = createRoute({
  id: "_guest",
  getParentRoute: () => rootRoute,
  component: GuestLayout,
  beforeLoad: () => {
    GuestRouteGuard();
  },
});

// Routes
const indexRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/",
  component: Dashboard,
});

const loginRoute = createRoute({
  getParentRoute: () => guestRoute,
  path: "/login",
  component: Login,
});

const routeTree = rootRoute.addChildren([
  guestRoute.addChildren([loginRoute]),
  protectedRoute.addChildren([indexRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
