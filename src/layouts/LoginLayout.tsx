import { Outlet } from "@tanstack/react-router";
import { Header } from "../components/global/header/Header";

export const LoginLayout = () => {
  return (
    <div
      style={{
        height: "100%",
      }}
    >
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
