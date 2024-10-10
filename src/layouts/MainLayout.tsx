import { Outlet } from "@tanstack/react-router";
import { Header } from "./header/Header";

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
