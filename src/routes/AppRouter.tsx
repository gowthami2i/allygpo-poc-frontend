// import {
//   createRootRoute,
//   createRoute,
//   createRouter,
//   RouterProvider,
// } from "@tanstack/react-router";
// import { MainLayout } from "../layouts/MainLayout";
// import { ContractExplorer } from "../pages/contractExplorer/ContractExplorer";
// import ViewDetails from "../pages/viewDetails/ViewDetails";
// import { RouteConstant } from "../constants/routeConstant";
// import Login from "../pages/login/Login";

// const rootRoute = createRootRoute({
//   component: () => <MainLayout />,
// });

// const { HOME, VIEW_DETAILS } = RouteConstant;

// const routesData = [
//   {
//     path: HOME,
//     component: ContractExplorer,
//     title: "Contract Explorer",
//   },
//   {
//     path: VIEW_DETAILS,
//     component: ViewDetails,
//     title: "View Details",
//   },
//   {
//     path:"/login",
//     component: Login,
//     title: "Login",
//   }
// ];

// const routes = routesData?.map((route: any) => {
//   return createRoute({
//     getParentRoute: () => rootRoute,
//     path: route.path,
//     component: route.component,
//   });
// });


// const routeTree = rootRoute.addChildren(Object.values(routes));

// const router = createRouter({
//   routeTree,
// });

// export const RouterComponent = () => <RouterProvider router={router} />;


import React, { useState, createContext, useContext } from "react";
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

// Context for authentication

const { HOME, VIEW_DETAILS } = RouteConstant;

// Root Route
const rootRoute = createRootRoute({
  component: () => {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated,"login")
    return isAuthenticated ? (<MainLayout ><h1></h2></MainLayout>) : <Login />;
  }
});

// Routes
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

const routes = routesData.map((route: any) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: route.path,
    component: route.component,
  })
);

const routeTree = rootRoute.addChildren(Object.values(routes));

// Login Route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

routeTree.addChildren([loginRoute]);

const router = createRouter({
  routeTree,
});

export const RouterComponent = () => (
  <AuthProvider>
    <RouterProvider router={router} />
   </AuthProvider>
);
