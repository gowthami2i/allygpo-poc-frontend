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

const rootRoute = createRootRoute({
  component: () => <MainLayout />,
});

const routesData = [
  {
    path: "/",
    component: ContractExplorer,
    title: "Contract Explorer",
  },
  {
    path: "/view-details",
    component: ViewDetails,
    title: "View Details",
  },
];

const routes = routesData?.map((route: any) => {
  return createRoute({
    getParentRoute: () => rootRoute,
    path: route.path,
    component: route.component,
  });
});

const routeTree = rootRoute.addChildren(Object.values(routes));

const router = createRouter({
  routeTree,
});

export const RouterComponent = () => <RouterProvider router={router} />;
