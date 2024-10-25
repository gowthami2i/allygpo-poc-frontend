import React from "react";
import { Outlet } from "@tanstack/react-router";
export const BlankLayout = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--app-bgColor)",
        height: "100vh",
      }}
    >
      <Outlet />
    </div>
  );
};
