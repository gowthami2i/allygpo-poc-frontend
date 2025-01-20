import React, { useEffect } from "react";
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

const {  VIEW_DETAILS } = RouteConstant;

// Main Layout Routes
const mainRootRoute = createRootRoute({
  component: () => <MainLayout></MainLayout>,
});

const mainRoutes = [
  createRoute({
    getParentRoute: () => mainRootRoute,
    path: "/home",
    component: ContractExplorer,
  }),
  createRoute({
    getParentRoute: () => mainRootRoute,
    path: VIEW_DETAILS,
    component: ViewDetails,
  }),
];

const mainRouteTree = mainRootRoute.addChildren(mainRoutes);

// Login Route (No Layout)
const loginRootRoute = createRootRoute({
  component: Login, // Login page directly rendered without a parent layout
});

const loginRouteTree = loginRootRoute; // No children needed for login route

// Authenticated Router
const AuthenticatedRouterProvider = () => {
  const { isAuthenticated,setIsAuthenticated } = useAuth();
  const isAuth = sessionStorage.getItem('isAuthenticated');
  
  
useEffect(() => {
   // Check if the current URL path is "/login"
   if (window.location.pathname === '/login') {
    sessionStorage.removeItem('isAuthenticated'); // Clear sessionStorage

  }
  // Retrieve the value from sessionStorage on component mount
  if (isAuth) {
    setIsAuthenticated(isAuth);
  }
}, []);


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

