import React from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { MainLayout } from "../layouts/MainLayout";
import { ContractExplorer } from "../pages/contractExplorer/ContractExplorer";
import ViewDetails from "../pages/viewDetails/ViewDetails";
import { RouteConstant } from "../constants/routeConstant";
import Login from "../pages/login/Login";
import { AuthProvider, useAuth } from "../context/AuthContext";

const { HOME, VIEW_DETAILS } = RouteConstant;

// Main Layout Routes
const mainRootRoute = createRootRoute({
  component: () => <MainLayout />,
});

const mainRoutes = [
  createRoute({
    getParentRoute: () => mainRootRoute,
    path: "/",
    component: ContractExplorer,
  }),
  createRoute({
    getParentRoute: () => mainRootRoute,
    path: VIEW_DETAILS,
    component: ViewDetails,
  }),
];

const mainRouteTree = mainRootRoute.addChildren(mainRoutes);

// Login Route
const loginRootRoute = createRootRoute({
  component: () => <Login/>,
});

const loginRoutes = [
  createRoute({
    getParentRoute: () => loginRootRoute, // Attach to the loginRootRoute
    path: "/login", // Define the path for the login page
    component: () => <Login />, // Render the Login component
  }),
];
const loginRouteTree = loginRootRoute.addChildren(loginRoutes); // No children needed for Login

// Authenticated Router
const AuthenticatedRouterProvider = () => {
  const { isAuthenticated } = useAuth();

  const router = createRouter({
    routeTree: isAuthenticated ? mainRouteTree : loginRouteTree,
  });

  return <RouterProvider router={router} />;
};

// Export RouterComponent
export const RouterComponent = () => (
  <AuthProvider>
    <AuthenticatedRouterProvider />
  </AuthProvider>
);
