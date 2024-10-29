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

const rootRoute = createRootRoute({
  component: () => <MainLayout />,
});

const { HOME, VIEW_DETAILS } = RouteConstant;

const routesData = [
  {
    path: HOME,
    component: ContractExplorer,
    title: "Contract Explorer",
  },
  {
    path: VIEW_DETAILS,
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
