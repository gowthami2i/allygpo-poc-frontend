import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import Home from "../pages/Home";
import { MainLayout } from "../layouts/MainLayout";
import Profile from "../pages/Profile";
import { ContractExplorer } from "../pages/contractExplorer/ContractExplorer";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <MainLayout />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: ContractExplorer,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "profile",
  component: Profile,
});

const routeTree = rootRoute.addChildren([homeRoute, profileRoute]);

const router = createRouter({
  routeTree,
});

export const RouterComponent = () => <RouterProvider router={router} />;
