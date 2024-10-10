import React from "react";
import { Outlet } from "@tanstack/react-router";
import { Header } from "./header/header";
export const MainLayout = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--app-bgColor)",
        height: "100vh",
      }}
    >
      <Header /> <Outlet />
    </div>
  );
};
