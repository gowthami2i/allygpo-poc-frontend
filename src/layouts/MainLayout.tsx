import { Outlet } from "@tanstack/react-router";
import React from "react";
import { Header } from "./header/header";

export const MainLayout = () => {
  return (
    <div
      style={{
        backgroundColor: "#FAFAFA",
        height: "100vh",
      }}
    >
      <Header /> <Outlet />
    </div>
  );
};
