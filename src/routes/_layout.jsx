import React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../layouts/header/header";

export const MainLayout = () => {
  return (
    <div>
      <Header /> <Outlet />
    </div>
  );
};
export const Route = createFileRoute("/_layout")({
  component: MainLayout,
});
