import React, { useEffect } from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  RouterProvider,
} from "@tanstack/react-router";
import { MainLayout } from "../layouts/MainLayout";
import { ContractExplorer } from "../pages/contractExplorer/ContractExplorer";
import ViewDetails from "../pages/viewDetails/ViewDetails";
import { RouteConstant } from "../constants/routeConstant";
import Login from "../pages/login/Login";
import { LoginLayout } from "../layouts/LoginLayout";

const { VIEW_DETAILS } = RouteConstant;

// Main Layout Routes
const mainRootRoute = createRootRoute();

const onBeforeLoad = () => {
  if (!sessionStorage.getItem("isAuthenticated")) {
    redirect({
      to: "/login",
      throw: true,
    });
  }
};

const mainRoutes = [
  createRoute({
    getParentRoute: () => mainRootRoute,
    path: "/home",
    component: () => (
      <MainLayout>
        <ContractExplorer />
      </MainLayout>
    ),
    beforeLoad: onBeforeLoad,
  }),
  createRoute({
    getParentRoute: () => mainRootRoute,
    path: VIEW_DETAILS,
    component: () => (
      <MainLayout>
        <ViewDetails />
      </MainLayout>
    ),
    beforeLoad: onBeforeLoad,
  }),

  createRoute({
    getParentRoute: () => mainRootRoute,
    path: "/",
    loader: () => {
      redirect({
        to: "/login",
        throw: true,
      });
    },
  }),
  createRoute({
    getParentRoute: () => mainRootRoute,
    path: "/login",
    component: () => <LoginLayout><Login/></LoginLayout>,
  }),
];

const mainRouteTree = mainRootRoute.addChildren(mainRoutes);

const router = createRouter({
  routeTree: mainRouteTree,
});

// Export RouterComponent
export const RouterComponent = () => <RouterProvider router={router} />;
