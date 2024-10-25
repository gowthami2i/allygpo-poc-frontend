import React from "react";
import { Outlet } from "@tanstack/react-router";
import { Header } from "../components/header/header";

export const MainLayout = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          backgroundColor: "var(--app-bg-color)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
